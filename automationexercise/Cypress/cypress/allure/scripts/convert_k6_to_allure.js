const fs = require('fs')
const path = require('path')

const K6_DIR = path.join(__dirname, '..', '..', '..', 'cypress', 'reports', 'k6')
const ALLURE_RESULTS_DIR = path.join(__dirname, '..', 'allure-results')

const pfNames = {
  'TC_PF_001': { name: 'Smoke test - Validação de pipeline', feature: 'Performance - Smoke' },
  'TC_PF_002': { name: 'Carga concorrente na página inicial', feature: 'Performance - Carga' },
  'TC_PF_003': { name: 'Carga no endpoint /api/productsList', feature: 'Performance - Carga' },
  'TC_PF_004': { name: 'Carga no endpoint /api/verifyLogin', feature: 'Performance - Carga' },
  'TC_PF_005': { name: 'Estresse no endpoint /api/productsList', feature: 'Performance - Estresse' },
  'TC_PF_006': { name: 'Resistência (Soak) - endpoint /api/productsList', feature: 'Performance - Resistência' },
  'TC_PF_007': { name: 'Pico (Spike) - endpoint /api/productsList', feature: 'Performance - Pico' },
  'TC_PF_009': { name: 'Carga no fluxo de checkout', feature: 'Performance - Carga' },
  'TC_PF_010': { name: 'Auditoria de imagens', feature: 'Performance - Auditoria' },
  'TC_PF_011': { name: 'Carga no endpoint /api/updateAccount', feature: 'Performance - Carga' },
  'TC_PF_012': { name: 'Carga no endpoint /api/getUserDetailByEmail', feature: 'Performance - Carga' },
  'TC_PF_013': { name: 'Carga no endpoint /api/searchProduct', feature: 'Performance - Carga' },
  'TC_PF_014': { name: 'Carga na página de produtos', feature: 'Performance - Carga' },
}

if (!fs.existsSync(K6_DIR)) {
  console.log('Nenhum resultado k6 encontrado. Execute os testes k6 primeiro.')
  process.exit(0)
}

const files = fs.readdirSync(K6_DIR).filter(f => f.endsWith('.json') && !f.includes('k6_report'))
console.log(`Encontrados ${files.length} arquivos de resultado k6`)

let testCount = 0
const k6Children = []

for (const file of files) {
  const raw = fs.readFileSync(path.join(K6_DIR, file), 'utf-8')
  const data = JSON.parse(raw)

  const tcMatch = file.match(/^(TC_PF_\d+)/)
  const tcId = tcMatch ? tcMatch[1] : path.basename(file, '.json')
  const nameInfo = pfNames[tcId] || { name: tcId.replace(/_/g, ' '), feature: 'Performance' }

  const metrics = data.metrics || {}
  const checks = data.root_group?.checks || {}
  const httpReqFailed = metrics.http_req_failed || {}
  const httpReqDuration = metrics.http_req_duration || {}
  const checksObj = metrics.checks || {}

  const p95 = httpReqDuration['p(95)'] || 0
  const errorRate = httpReqFailed.value || 0
  const totalChecks = checksObj.passes || 0
  const failedChecks = checksObj.fails || 0

  const testStatus = (failedChecks > 0 || errorRate > 0) ? 'failed' : 'passed'

  const duration = Math.max(Math.floor(httpReqDuration.avg || 1000) * (httpReqDuration.count || 1), 1000)
  const startTime = Date.now() - Math.floor(Math.random() * 600000)
  const endTime = startTime + duration

  const testUuid = `${tcId.toLowerCase().replace(/_/g, '-')}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
  k6Children.push(testUuid)

  const steps = []
  let stepIdx = 1
  for (const [checkName, checkData] of Object.entries(checks)) {
    const isOk = (checkData.fails || 0) === 0
    steps.push({
      name: `${stepIdx}. ${checkName}`,
      status: isOk ? 'passed' : 'failed',
      stage: 'finished',
      start: startTime + stepIdx * 500,
      stop: startTime + stepIdx * 500 + 300,
    })
    stepIdx++
  }

  const statusLabel = testStatus === 'passed' ? 'Aprovado' : 'Falhou'
  steps.push({
    name: `${stepIdx}. Resumo: p95=${(p95).toFixed(0)}ms | Erro=${(errorRate * 100).toFixed(1)}% | ${totalChecks - failedChecks}/${totalChecks + failedChecks} checks | ${statusLabel}`,
    status: testStatus,
    stage: 'finished',
    start: endTime - 100,
    stop: endTime,
  })

  const result = {
    name: nameInfo.name,
    status: testStatus,
    stage: 'finished',
    start: startTime,
    stop: endTime,
    uuid: testUuid,
    historyId: tcId.toLowerCase(),
    fullName: `Performance - ${nameInfo.name}`,
    labels: [
      { name: 'epic', value: 'performance' },
      { name: 'tag', value: 'performance' },
      { name: 'tag', value: tcId },
      { name: 'feature', value: nameInfo.feature },
      { name: 'suite', value: 'Performance' },
    ],
    parameters: [
      { name: 'Test Case', value: tcId },
      { name: 'p95', value: `${(p95).toFixed(0)}ms` },
      { name: 'Error Rate', value: `${(errorRate * 100).toFixed(1)}%` },
      { name: 'Checks', value: `${totalChecks - failedChecks}/${totalChecks + failedChecks}` },
      { name: 'Duration', value: `${(duration / 1000).toFixed(1)}s` },
    ],
    steps: steps,
    attachments: [],
  }

  const filePath = path.join(ALLURE_RESULTS_DIR, `${result.uuid}-result.json`)
  fs.writeFileSync(filePath, JSON.stringify(result, null, 2))
  testCount++
  console.log(`  OK: ${tcId} - ${nameInfo.name} [${testStatus}]`)
}

if (k6Children.length > 0) {
  const k6Container = {
    uuid: 'container-performance-k6',
    name: 'Performance (k6)',
    children: k6Children,
    befores: [],
    afters: [],
    start: Date.now() - 600000,
    stop: Date.now(),
  }
  fs.writeFileSync(path.join(ALLURE_RESULTS_DIR, 'container-performance-k6-container.json'), JSON.stringify(k6Container, null, 2))
  console.log(`Container: Performance (k6) (${k6Container.children.length} testes)`)
}

console.log(`\nTotal: ${testCount} testes k6 convertidos para Allure`)
