const { defineConfig } = require('cypress')
const fs = require('fs')
const path = require('path')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

const ALLURE_RESULTS = path.join(__dirname, 'cypress', 'allure', 'allure-results')

module.exports = defineConfig({
  e2e: {
    projectId: 'automationexercise',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://www.automationexercise.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: true,
    videoCompression: 32,
    screenshotsFolder: 'cypress/screenshots',
    screenshotOnRunFailure: true,
    retries: {
        runMode: process.env.CI ? 1 : 0,
        openMode: 0,
    },
    defaultCommandTimeout: process.env.CI ? 15000 : 10000,
    pageLoadTimeout: process.env.CI ? 90000 : 60000,
    requestTimeout: process.env.CI ? 15000 : 10000,
    responseTimeout: process.env.CI ? 60000 : 30000,
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on, config) {
      config.env.allure = true
      config.env.allureResultsPath = path.join('cypress', 'allure', 'allure-results')
      allureWriter(on, config)

      on('before:run', () => {
        const historyDir = path.join(ALLURE_RESULTS, 'history')
        const hasHistory = fs.existsSync(historyDir)
        if (hasHistory) {
          const tmpDir = path.join(__dirname, 'cypress', 'allure', '.history_backup')
          if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true })
          fs.cpSync(historyDir, tmpDir, { recursive: true })
          if (fs.existsSync(ALLURE_RESULTS)) fs.rmSync(ALLURE_RESULTS, { recursive: true })
          fs.mkdirSync(ALLURE_RESULTS, { recursive: true })
          fs.mkdirSync(historyDir, { recursive: true })
          fs.cpSync(tmpDir, historyDir, { recursive: true })
          fs.rmSync(tmpDir, { recursive: true })
        } else {
          if (fs.existsSync(ALLURE_RESULTS)) fs.rmSync(ALLURE_RESULTS, { recursive: true })
          fs.mkdirSync(ALLURE_RESULTS, { recursive: true })
        }
        const propsSrc = path.join(__dirname, 'cypress', 'allure', 'allure.properties')
        const propsDst = path.join(ALLURE_RESULTS, 'allure.properties')
        if (fs.existsSync(propsSrc)) {
          fs.copyFileSync(propsSrc, propsDst)
        }
      })

      // Organizar screenshots na pasta correta apos cada spec (web/ api/ performance/)
      on('after:spec', (spec, results) => {
        if (!results || results.stats.failures + results.stats.passes === 0) return
        const rel = spec.relative || ''
        // rel = "cypress/e2e/web/TC###.cy.js" → extrair "web"
        const parts = rel.replace(/\\/g, '/').split('/')
        const e2eIdx = parts.indexOf('e2e')
        if (e2eIdx === -1 || e2eIdx + 2 >= parts.length) return
        const subDir = parts[e2eIdx + 1]
        if (!subDir) return
        const specName = parts[parts.length - 1]
        const specFolder = specName.replace('.cy.js', '') + '.cy.js'
        const ssDir = path.join(__dirname, 'cypress', 'screenshots')
        const flat = path.join(ssDir, specFolder)
        const nested = path.join(ssDir, subDir, specFolder)
        if (fs.existsSync(flat) && !fs.existsSync(nested)) {
          fs.mkdirSync(path.join(ssDir, subDir), { recursive: true })
          try { fs.renameSync(flat, nested) } catch (e) {
            const files = fs.readdirSync(flat)
            for (const f of files) {
              try { fs.renameSync(path.join(flat, f), path.join(nested, f)) } catch (e2) { /* skip */ }
            }
            try { fs.rmdirSync(flat) } catch (e3) { /* skip */ }
          }
        }
      })

      on('task', {
        apiRequest(options) {
          const https = require('https')
          return new Promise((resolve, reject) => {
            const startTime = Date.now()
            const reqOptions = {
              hostname: options.hostname,
              path: options.path,
              method: options.method || 'GET',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': options.body ? Buffer.byteLength(options.body) : 0
              }
            }
            console.log('')
            console.log('═══════════════════════════════════════════════════════════════')
            console.log('  REQUEST')
            console.log('═══════════════════════════════════════════════════════════════')
            console.log(`  Method:  ${reqOptions.method}`)
            console.log(`  URL:     https://${reqOptions.hostname}${reqOptions.path}`)
            console.log(`  Body:    ${options.body || '(empty)'}`)
            console.log('───────────────────────────────────────────────────────────────')
            const req = https.request(reqOptions, (res) => {
              let data = ''
              res.on('data', chunk => data += chunk)
              res.on('end', () => {
                const duration = Date.now() - startTime
                const responseBody = JSON.parse(data || '{}')
                console.log('  RESPONSE')
                console.log('═══════════════════════════════════════════════════════════════')
                console.log(`  Status:  ${res.statusCode}`)
                console.log(`  Time:    ${duration}ms`)
                console.log(`  Body:    ${data.substring(0, 500)}${data.length > 500 ? '...' : ''}`)
                console.log('═══════════════════════════════════════════════════════════════')
                console.log('')
                resolve({
                  status: res.statusCode,
                  body: responseBody,
                  _meta: {
                    duration,
                    timestamp: new Date().toISOString(),
                    request: {
                      hostname: reqOptions.hostname,
                      path: reqOptions.path,
                      method: reqOptions.method,
                      body: options.body
                    }
                  }
                })
              })
            })
            req.on('error', (err) => {
              console.error('  ERROR:', err.message)
              reject(err)
            })
            if (options.body) {
              req.write(options.body)
            }
            req.end()
          })
        },
        generateEvidenceReport(data) {
          const testId = data.testId || 'UNKNOWN'
          // Salvar em screenshots/api/ — mesmo nome a cada execucao (sobrescreve)
          const destDir = path.join(__dirname, 'cypress', 'screenshots', 'api')
          
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true })
          }
          
          const htmlPath = path.join(destDir, `${testId}_api_result.html`)
          
          if (fs.existsSync(htmlPath)) {
            fs.unlinkSync(htmlPath)
          }
          
          const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
    <title>Evidência de Teste API - ${testId}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Consolas', 'Courier New', monospace; background: #0d1117; color: #c9d1d9; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { color: #58a6ff; font-size: 24px; margin-bottom: 20px; border-bottom: 1px solid #30363d; padding-bottom: 10px; }
    .header { background: #161b22; border: 1px solid #30363d; border-radius: 6px; padding: 15px; margin-bottom: 20px; }
    .header-item { display: flex; margin-bottom: 8px; }
    .header-label { color: #8b949e; width: 120px; flex-shrink: 0; }
    .header-value { color: #c9d1d9; }
    .pass { color: #3fb950; font-weight: bold; }
    .fail { color: #f85149; font-weight: bold; }
    .section { background: #161b22; border: 1px solid #30363d; border-radius: 6px; margin-bottom: 15px; overflow: hidden; }
    .section-title { background: #21262d; padding: 10px 15px; font-weight: bold; color: #58a6ff; border-bottom: 1px solid #30363d; }
    .section-content { padding: 15px; }
    .json { background: #0d1117; padding: 15px; border-radius: 4px; white-space: pre-wrap; word-break: break-all; font-size: 12px; overflow-x: auto; max-height: 400px; overflow-y: auto; }
    .assertion { display: flex; align-items: center; padding: 8px 0; border-bottom: 1px solid #21262d; }
    .assertion:last-child { border-bottom: none; }
    .assertion-icon { margin-right: 10px; font-size: 16px; }
    .assertion-text { color: #c9d1d9; }
    .timestamp { color: #8b949e; font-size: 12px; margin-top: 20px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Relatório de Evidência de Teste API</h1>
    <div class="header">
      <div class="header-item">
        <span class="header-label">Test ID:</span>
        <span class="header-value">${testId}</span>
      </div>
      <div class="header-item">
        <span class="header-label">Test Name:</span>
        <span class="header-value">${data.testName || 'N/A'}</span>
      </div>
      <div class="header-item">
        <span class="header-label">Horário:</span>
        <span class="header-value">${data.timestamp ? new Date(data.timestamp).toLocaleString('pt-BR').replace(',', ' -') : 'N/A'}</span>
      </div>
      <div class="header-item">
        <span class="header-label">Duração:</span>
        <span class="header-value">${data.duration || 'N/A'}ms</span>
      </div>
      <div class="header-item">
        <span class="header-label">Status:</span>
        <span class="header-value ${data.status === 'PASS' ? 'pass' : 'fail'}">${data.status}</span>
      </div>
    </div>
    <div class="section">
      <div class="section-title">REQUISIÇÃO</div>
      <div class="section-content">
        <div class="json">Method: ${data.request?.method || 'N/A'}
URL: https://${data.request?.hostname || 'N/A'}${data.request?.path || 'N/A'}
Body: ${data.request?.body || '(empty)'}</div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">RESPOSTA</div>
      <div class="section-content">
        <div class="json">Status: ${data.response?.status || 'N/A'}
Body: ${JSON.stringify(data.response?.body, null, 2)}</div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">ASSERÇÕES (${data.assertions?.length || 0})</div>
      <div class="section-content">
        ${(data.assertions || []).map((a, i) => `
        <div class="assertion">
          <span class="assertion-icon">${a.passed ? '✓' : '✗'}</span>
          <span class="assertion-text">${a.description}</span>
        </div>
        `).join('')}
      </div>
    </div>
    <div class="timestamp">Gerado em: ${new Date().toISOString()} | Sistema de Evidências API v1.0</div>
  </div>
</body>
</html>`
          fs.writeFileSync(htmlPath, htmlContent)
          console.log(`  [EVIDENCE] HTML report saved: ${htmlPath}`)
          return htmlPath
        }
      })
      return config
    },
  },
})