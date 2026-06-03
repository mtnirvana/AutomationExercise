# Guia de Cypress - Automation Exercise
**Versão:** 1.0.0<br>
**Metodologia:** POM (Page Object Model)<br>
**Responsável:** Rafael Barelli

---

## 1. Naming Rules (MANDATORY)

Todos os arquivos DEVEM seguir este padrão de nomenclatura:

| Element | Format | Example |
|---------|--------|---------|
| Arquivo de Teste (E2E) | `TC_WEB_[##]_[sucesso/erro]_[titulo].cy.js` | `TC_WEB_005_erro_registrar_usuario_email_existente.cy.js` |
| Arquivo de Teste (API) | `TC_API_[##]_[sucesso/erro]_[titulo].cy.js` | `TC_API_004_erro_pesquisar_produto_sem_parametro.cy.js` |
| Arquivo de Teste (Performance) | `TC_PF_[##]_[titulo].js` ou `.cy.js` | `TC_PF_005_estresse_api_produtos.js` |
| describe() (E2E) | `TC_WEB_### - [Titulo em PORTUGUÊS]` | `describe('TC_WEB_005 - Registrar usuário com email existente')` |
| describe() (API) | `TC_API_### - [Titulo em PORTUGUÊS]` | `describe('TC_API_012 - Validar método POST em productsList via API')` |
| describe() (Performance) | `TC_PF_### - [Titulo em PORTUGUÊS]` | `describe('TC_PF_005 - Estresse progressivo no /api/productsList')` |
| it() | `[verbo] [resultado]` | `it('deve mostrar erro ao registrar com email existente')` |
| Screenshot (Argumento) | `[passo]_[descricao_em_portugues]` | `05_pagina_erro_exibida` |
| Screenshot (Arquivo Final) | `TC_WEB_[##]_[passo]_[descricao_em_portugues]` | `TC_WEB_005_05_pagina_erro_exibida` |
| Page Object | PascalCase + Page.js | `LoginPage.js` |
| Factory | PascalCase + Factory.js | `UserFactory.js` |
| JSDoc Tags | `@sucesso/@erro` + `@TC_###` | `@tags @sucesso @TC_WEB_005` |
| JSDoc Título | `TC_### - [título em português]` | `TC_WEB_005 - Registrar usuário com email existente` |

### Rules for describe() (MANDATORY):
1. **TODOS os describe() DEVEM estar em PORTUGUÊS**
2. **O título do Test Case (linha 1 do JSDoc) DEVE estar em PORTUGUÊS** (traduzir do .txt original)
3. **O describe() DEVE conter o ID do teste + descrição** no formato `TC_[TIPO]_### - [Descrição]` (ex: `TC_WEB_005 - Registrar usuário com email existente`)
4. **NÃO incluir** "Test Case ##" nem "Sucesso/Erro -" no describe() - apenas o ID e a descrição
5. Regras por tipo de teste:
   - **E2E:** `TC_WEB_### - [Descrição]` (ex: `TC_WEB_005 - Registrar usuário com email existente`)
   - **API:** `TC_API_### - [Descrição]` (ex: `TC_API_012 - Validar método POST em productsList via API`)
   - **Performance:** `TC_PF_### - [Descrição]` (ex: `TC_PF_005 - Estresse progressivo no /api/productsList`)
6. Exemplos de tradução:
   - `Test Case 1: Register User` → `TC_WEB_001 - Registrar usuário`
   - `Test Case 2: Login User with correct email and password` → `TC_WEB_002 - Login de usuário com email e senha corretos`
   - `Test Case 5: Register User with existing email` → `TC_WEB_005 - Registrar usuário com email existente`

### Rules for Sucesso/Erro (MANDATORY)
1. **IDENTIFICAR o tipo**: Analisar o .txt para verificar se o cenário termina com sucesso ou erro
2. **Tag no JSDoc**: Adicionar `@sucesso` ou `@erro` + `@TC###` (ex: `@tags @sucesso @TC_WEB_001`)
3. **describe()**: Usar apenas `[Descrição]` (sem "Test Case ## - Sucesso/Erro -")
4. **Arquivo**: Adicionar prefixo `TC##_sucesso_` ou `TC##_erro_`

Exemplos de classificação:
- "Login User with correct email and password" → Sucesso
- "Login User with incorrect email and password" → Erro
- "Register User with existing email" → Erro
- "Register User" → Sucesso

### Rules for Screenshots (MANDATORY):
1. **Sempre usar prefixo TC##** antes do nome em describe() e it()
2. **Nome do arquivo de teste** deve seguir o padrão `TC##_sucesso_...` ou `TC##_erro_...`
3. **Sincronia de Passos**: Ao chamar a função `takeScreenshot(...)` nos testes, o nome DEVE iniciar com a mesma numeração `NN_` exata do comentário numérico do passo correspondente (ex: `// 4. Click...` -> `takeScreenshot('04_clicou_botao')`).
4. **Múltiplos Prints no mesmo passo**: Se houver mais de um screenshot associado ao mesmo passo numérico (ex: Passo 5), deve-se obrigatoriamente usar sufixos alfabéticos (`05_`, `05a_`, `05b_`) para não desalinhar ou pular a numeração oficial. O texto deve ser sempre em PORTUGUÊS.
5. **Comando Customizado (cy.captura)**: OBRIGATÓRIO o uso de `cy.captura()` (via helper `takeScreenshot`).
6. **Geração de GIFs Animados**: Após a execução dos testes, o script `scripts/gerar_gifs.js` processa os PNGs gerados e produz GIFs animados na mesma pasta das screenshots para cada spec, facilitando a revisão visual rápida.
    - **IMPORTANTE**: O comando `cy.captura` extrai automaticamente o `TC##` do título do teste (`it`) e o adiciona como prefixo no arquivo final. 
    - **NUNCA** passe o prefixo `TC_WEB_##` como argumento para o `takeScreenshot`, para evitar redundância (ex: `TC_WEB_001_TC_WEB_001_05...`).

### Rules for File Naming (MANDATORY):
Ao criar arquivo de teste:
1. Pegar título da linha 1 do JSDoc (formato: "Test Case #: Título traduzido")
2. Converter para underscore (espaços → underscore, lowercase)
3. **IDENTIFICAR se é Sucesso ou Erro** (analisar .txt)
4. Adicionar prefixo `TC##_sucesso_` ou `TC##_erro_`
5. Adicionar extensão `.cy.js`
6. **O nome do arquivo DEVE ser igual ao título da linha 1 do JSDoc** (não ao describe)

Exemplos E2E (prefixo TC_WEB):
- "Test Case 3: Login de usuário com email e senha incorretos" → "TC_WEB_003_erro_login_usuario_email_senha_incorretos.cy.js"
- "Test Case 4: Logout de usuário" → "TC_WEB_004_sucesso_logout_usuario.cy.js"
- "Test Case 5: Registrar usuário com email existente" → "TC_WEB_005_erro_registrar_usuario_email_existente.cy.js"

Exemplos API (prefixo TC_API):
- "Test Case 12: Validar método POST em productsList" → "TC_API_012_erro_validar_metodo_post_em_productslist.cy.js"

Exemplos Performance (prefixo TC_PF):
- "Load test: /api/productsList" → "TC_PF_003_carga_api_produtos.js"

---

## 2. BeforeEach Centralizado (MANDATORY)

O `beforeEach()` e o `cy.fixture('users').as('usersData')` DEVEM estar centralizados em `cypress/support/e2e.js`.

**Em cypress/support/e2e.js:**
```javascript
beforeEach(() => {
  cy.visit('/')
  cy.fixture('users').as('usersData')
})
```

**NO tests: NUNCA repetir beforeEach nos arquivos em cypress/e2e/.**
Manter apenas os comentários de passo para rastreabilidade.

---

## 3. When to Use Factory vs Fixture (MANDATORY)

**Usar `UserFactory.generate()` quando:**
- Teste CRIA usuário E DELETA conta no final
- Necessita dados dinâmicos únicos por execução
- Cada execução precisa de usuário diferente

**Usar `cy.fixture('users')` quando:**
- Teste apenas LOGA usuário mas NÃO deleta
- Teste precisa de dados pré-cadastrados
- Exemplo: TC_WEB_004 (logout), TC_WEB_016 (login before checkout)

**Como carregar fixture:**
```javascript
// beforeEach global ja carrega a fixture em cypress/support/e2e.js

// Opção 1: Usando this.usersData (função deve usar 'function()'):
LoginPage.loginEmail.type(this.usersData.testUser.email)
LoginPage.loginPassword.type(this.usersData.testUser.password)

// Opção 2: Usando cy.get('@usersData').then() (arrow function):
cy.get('@usersData').then((usersData) => {
  LoginPage.login(usersData.testUser.email, usersData.testUser.password)
})
```
> **IMPORTANTE:** Dentro do `.then((usersData) => ...)`, SEMPRE usar o nome do parâmetro (`usersData`) e NUNCA `data` (ex: `usersData.paymentData`, NÃO `data.paymentData`).

**Fixture users.json padrão:**
```json
{
  "invalidUser": {
    "email": "invalid@example.com",
    "password": "wrongpassword"
  },
  "existingEmail": {
    "email": "test@test.com",
    "name": "test"
  },
  "testUser": {
    "email": "teste123@hotmail.com",
    "password": "123456R@",
    "name": "teste123"
  },
  "paymentData": {
    "nameOnCard": "John Doe",
    "cardNumber": "4242424242424242",
    "cvc": "123",
    "expiryMonth": "12",
    "expiryYear": "2028"
  }
}
```

---

## 4. cypress.config.js

> **Nota:** Este template reflete o arquivo real de configuração. O Allure plugin (`@shelex/cypress-allure-plugin`) é usado para integração com relatórios Allure. Consulte o arquivo real `cypress.config.js` no projeto para a versão completa com `before:run`, `after:spec` e Allure integration.

```javascript
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

      on('after:spec', (spec, results) => {
        if (!results || results.stats.failures + results.stats.passes === 0) return
        const rel = spec.relative || ''
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
```

---

## 5. Zero Hardcoded Policy (MANDATORY)

**É PROIBIDO** deixar dados de teste fixos nos arquivos `.cy.js`. Todo dado deve ser abstraído:

1. **Mensagens e Assuntos:** Centralizados em `cypress/fixtures/contact.json`.
2. **Produtos, Categorias e Marcas:** Centralizados em `cypress/fixtures/products.json`.
3. **Senhas e Credenciais:** Centralizadas em `cypress/fixtures/users.json`.
4. **Mensagens de Erro, Títulos e Labels de UI:** Centralizados em `cypress/fixtures/ui_texts.json`.
    - Ex: `uiData.headers.allProducts`, `uiData.buttons.submit`, `uiData.errors.login`.
5. **Termos de Busca:** Devem ser lidos de fixtures para garantir manutenibilidade.

**Exemplo de Refatoração:**
❌ `ProductsPage.searchProduct('Winter Top')`
✅ `ProductsPage.searchProduct(productsData.searchTerms.winter)`

❌ `cy.contains('button', 'Submit').click()`
✅ `cy.contains('button', uiData.buttons.submit).click()`

---

## 6. Folder Structure

```
cypress/
├── e2e/                    # Testes E2E
│   └── [teste].cy.js       # Script de teste por cenário
├── pages/                  # Page Objects
│   ├── index.js            # Exportação centralizada dos pages
│   ├── [PageName]Page.js   # Page Object por página
│   └── ...                 # Demais pages
├── data/                   # Factories
│   └── [Factory].js        # Dados dinâmicos únicos por execução
├── fixtures/               # Dados estáticos
│   └── data.json           # Massa de dados do teste
├── support/                # Comandos customizados
│   └── e2e.js              # beforeEach centralizado + cy.captura()
├── downloads/              # Downloads temporários (faturas)
├── reports/                # Relatórios de execução
│   └── k6/                 # JSONs do k6 --summary-export
├── screenshots/            # Evidências visuais
├── allure/                 # Relatórios Allure (dark mode + pt-BR)
│   ├── allure.properties   # Tema escuro + idioma pt-BR
│   ├── allure-results/     # Resultados das execuções
│   ├── allure-report/      # Relatório HTML estático
│   └── scripts/            # Conversores k6 → Allure
└── videos/                 # Vídeos das execuções (auto)
```

---

## 7. Test Template (e2e/*.cy.js)

### Complete Structure

```javascript
/**
 * TC_WEB_## - [Nome do Teste]
 * @description [Descrição breve do que o teste faz]
 * @tags @sucesso (ou @erro) @TC_WEB_##
 * @author Rafael Barelli
 */
> Para API: `TC_API_##`. Para performance: `TC_PF_##`.

import { PageName1, PageName2 } from '../pages'
import { DataFactory } from '../data/[Factory]'
import uiData from '../fixtures/ui_texts.json'

describe('[Título do Teste em PORTUGUÊS]', () => {

  // Captura screenshot em cada passo (usando comando customizado cy.captura)
  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function() {
    if (this.currentTest.state === 'failed') {
      // capture: 'runner' para ver o log de erro no sidebar (debug)
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('[descrição do teste em português]', function() {
    // 1. [Descrição do passo em PORTUGUÊS - corresponde ao test case original]
    PageName1.element.scrollIntoView().should('be.visible')
    takeScreenshot('01_pagina_inicial_carregada')

    // 2. [Descrição do passo em PORTUGUÊS]
    PageName1.clickMethod()
    takeScreenshot('02_clicou_botao')

    // 3. [Descrição do passo em PORTUGUÊS]
    const testData = DataFactory.generate()
    PageName2.inputField.type(testData.field)
    cy.contains('button', uiData.buttons.submit).should('be.visible').click({ force: true })
    takeScreenshot('03_preencheu_campo_e_enviou')
  })
})
```

### Test Rules

1. **Nomenclatura do arquivo:** `TC_[TIPO]_[##]_[sucesso/erro]_[titulo].cy.js` (TIPO = WEB, API, PF)
2. **Nomenclatura do teste (it):** `[verbo] [resultado esperado]` (sem [TC_##])
3. **Nomenclatura do teste (describe):** `[Título em português]` (sem "Test Case ## - Sucesso/Erro -")
4. **Tags:** `@sucesso` ou `@erro` + `@TC_###` (ex: `@tags @sucesso @TC_WEB_001`)
5. **Screenshot:** em CADA passo do teste (obrigatório uso de `cy.captura`)
6. **Dados:** usar Factory para dados dinâmicos OU fixture para dados estáticos/estáveis.
7. **Zero Hardcoded:** NUNCA deixar strings de dados (emails, produtos, mensagens) fixas no teste.
8. **Estabilidade:** Usar `.scrollIntoView().should('be.visible').click({ force: true })` para interações críticas.
9. **Seleção de gênero:** usar `toLowerCase()` para validação
10. **Ordem dos passos:** seguir o scenario original numerado
11. **Fixture vs Factory:** Verificar se teste CRIA e DELETA usuário → usar Factory
12. **Fixture vs Factory:** Verificar se teste apenas LOGA (sem delete) → usar fixture
13. **beforeEach global:** NUNCA repetir beforeEach nos testes — já está em `cypress/support/e2e.js`

---

### 7.1 API Test Template (e2e/TC_API_*.cy.js)

Para testes de API, a estrutura é diferente dos testes E2E: não há Page Objects, `beforeEach`, nem `takeScreenshot`. Em vez disso, usa-se `cy.task('apiRequest')` e `cy.task('generateEvidenceReport')`.

**Estrutura completa:**

```javascript
/**
 * TC_API_### - [Título do Teste]
 * @description [Descrição breve]
 * @tags @sucesso (ou @erro) @TC_API_###
 * @author Rafael Barelli
 */

describe('[Título em português]', () => {
  const testId = 'TC_API_###'

  it('[verbo] [resultado esperado]', () => {
    // 1. Enviar requisição [MÉTODO] para [endpoint]
    const assertions = []
    const startTime = Date.now()
    const request = {
      hostname: 'automationexercise.com',
      path: '[endpoint]',
      method: '[MÉTODO]'
    }

    cy.task('apiRequest', request).then((response) => {
      const duration = Date.now() - startTime

      // 2. Validar status code [CÓDIGO]
      assertions.push({ description: 'response.status é igual a [CÓDIGO]', passed: response.status === [CÓDIGO] })
      expect(response.status).to.eq([CÓDIGO])

      // 3. Validar responseCode (se houver body)
      assertions.push({ description: 'response.body.responseCode é igual a [CÓDIGO]', passed: response.body?.responseCode === [CÓDIGO] })
      expect(response.body.responseCode).to.eq([CÓDIGO])

      // 4. Validar mensagem (se houver)
      assertions.push({ description: 'response.body.message é igual a "..."', passed: response.body?.message === '...' })
      expect(response.body.message).to.eq('...')

      // N. Gerar evidência do teste
      cy.task('generateEvidenceReport', {
        testId,
        specName: Cypress.spec.name,
        testName: '[Título do Teste]',
        status: 'PASS',
        request,
        response: { status: response.status, body: response.body },
        assertions,
        timestamp: new Date().toISOString(),
        duration
      })
    })
  })
})
```

**Regras para testes API:**
1. **Comentários numerados OBRIGATÓRIOS:** Cada passo deve ter `// 1.`, `// 2.`, etc. em português.
2. **Evidência:** Sempre chamar `generateEvidenceReport` ao final.
3. **SpecName:** `Cypress.spec.name` DEVE ser passado no `generateEvidenceReport`.
4. **HEAD/PATCH/GET não suportados:** Retornam `status 405` diretamente sem body.
5. **POST/PUT/DELETE não suportados:** Retornam `status 200` com `responseCode: 405` no body.
6. **OPTIONS suportado:** Retorna `status 200` (CORS).
7. **Sem `beforeEach`:** Testes API não usam `beforeEach` global.
8. **Zero Hardcoded:** Strings de assertion em português nos `assertions.push`.

---

## 8. Page Object Template (pages/*.js)

### Selector Hierarchy (MANDATORY follow this order)

| Nivel | Tipo | Robustez | Exemplo |
|-------|------|----------|---------|
| 1 | data-qa / data-testid / data-cy | [ROBUSTO] | `cy.get('[data-qa="login-button"]')` |
| 2 | ID único e estável | [ROBUSTO] | `cy.get('#search_product')` |
| 3 | name attribute | [ROBUSTO] | `cy.get('input[name="email"]')` |
| 4 | Tag semantica + texto de confirmacao | [ROBUSTO] | `cy.get('h2').contains('Account Created!')` |
| 5 | href de rota estavel | [MEDIO] | `cy.get('a[href="/login"]')` |
| 6 | placeholder único na página | [MEDIO] | `cy.get('[placeholder="Name"]')` |
| 7 | Classe funcional única | [MEDIO] | `cy.get('button.close-modal')` |
| 8 | Classe CSS visual | [FRAGIL] | `cy.get('.logo')` |
| 9 | Texto de botão de ação | [FRAGIL] | `cy.get('button').contains('Login')` |
| 10 | Posicao no DOM (.eq, :nth-child) | [FRAGIL] | `cy.get('input').eq(1)` |
| 11 | XPath | [NUNCA USAR] | nao usar no Cypress |

### Selector Investigation Flow (MANDATORY)

Antes de criar qualquer seletor, o agente DEVE:
1. Abrir o site no browser (via Playwright CLI, MCP, Selenium ou Chrome DevTools).
2. Para cada elemento interativo, inspecionar o HTML completo.
3. Verificar se existe `data-qa`, `id`, `name`, `data-testid` ou `data-cy`.
4. Registrar o HTML exato encontrado no comentario do seletor.
5. Usar sempre o nível mais robusto disponível na hierarquia acima.
6. **Registrar TODAS as alternativas de seletores usando o `automationexercise/templates/Seletores_TEMPLATE.md` como modelo de estrutura de seções e categorias, depois copiar o bloco preenchido para o `automationexercise/templates/Seletores.md` oficial**.

### Selector Comment Pattern (MANDATORY)

Todo seletor DEVE ter um comentário de uma única linha. Nao escrever `[ROBUSTO]`.

```javascript
static get seletor() {
  // data-qa="login-email"
  return cy.get('input[data-qa="login-email"]')
}

static get seletorMedio() {
  // [MEDIO] unico elemento com esse placeholder na pagina
  return cy.get('input[placeholder="Name"]')
}
```

Níveis válidos para marcar: `[MEDIO]`, `[MEDIO-ALTO]`, `[FRAGIL]`. Omita o colchete se o seletor for robusto.

Os níveis `[MEDIO]` e `[MEDIO-ALTO]` diferenciam o grau de confiabilidade dentro da categoria médio. Use `[MEDIO-ALTO]` para seletores funcionais únicos na página com boa estabilidade, e `[MEDIO]` para seletores funcionais com menor garantia de singularidade.

### Selector Self-Healing Policy (MANDATORY)

Sempre que um seletor quebrar:

#### Level 1: History Check (Seletores.md)
1. Consultar o arquivo `automationexercise/templates/Seletores.md` para alternativas (ignorar `[QUEBRADO]`).
2. Se uma alternativa funcionar, marcar o antigo como `[QUEBRADO]` no `automationexercise/templates/Seletores.md`, atualizar o Page Object e o status no arquivo.

#### Level 2: Dynamic Recovery
1. Se falhar, usar ferramenta live para redescobrir o seletor.
2. Preencher o `automationexercise/templates/Seletores_TEMPLATE.md` com os novos seletores encontrados (seguir o modelo de estrutura de seções e categorias).
3. Copiar o bloco preenchido para o `automationexercise/templates/Seletores.md` oficial e atualizar o Page Object (marcando o antigo como `[QUEBRADO]`).
3. **Restauração:** Se um seletor `[QUEBRADO]` voltar a funcionar, restaure-o no arquivo mas **mantenha o histórico** de quando quebrou e quando foi recuperado.

#### Golden Rules
1. **NUNCA** usar um seletor marcado como `[QUEBRADO]` durante a execução do teste.
2. **Histórico:** A restauração deve sempre documentar o ciclo de vida (ex: `Restaurado em 2026-05-15 (Quebrou em 2026-05-10)`).

### Method Documentation Rules (Portuguese)

1. **Nomenclatura:** `[PageName]Page.js` (PascalCase)
2. **Classe:** nome da classe em PascalCase
3. **Seletores:** usar getters estaticos (`static get name()`)
4. **Comentarios de Seletor:** OBRIGATÓRIO em uma única linha (ver padrão acima)
5. **Comentarios de Metodo:** OBRIGATORIO em uma unica linha, em PORTUGUES, usando `//` (nao usar JSDoc de 3 linhas). Se houver parametros, usar `// @param` logo abaixo da descrição.
6. **Investigacao:** inspecionar o site ao vivo antes de escrever seletores
7. **Sem emoticons:** comentarios em texto limpo sem emojis
8. **Timeouts:** `cy.get(..., { timeout: 10000 })` para seletores criticos
9. **Métodos:** usar verbos (click, fill, select, verify, check)
10. **Exemplo de Método:**
```javascript
// Clica no botao de login
static clickLogin() {
  this.loginButton.click()
}

// Preenche dados do endereco
// @param {object} address - Objeto com detalhes do endereco
static fillAddress(address) {
  // ...
}
```

---

## 9. Factory Template (data/*.js)

### Complete Structure

```javascript
/**
 * [Name]Factory - Factory para geração de dados dinâmicos
 * Gera dados únicos para cada execução de teste
 * @author Rafael Barelli
 */

export class [Name]Factory {
  /**
   * Gera [entidade] com dados dinâmicos
   * @returns {Object} Objeto com dados
   */
  static generate() {
    const timestamp = Date.now()
    return {
      field1: `value${timestamp}`,
      field2: 'fixedValue',
      field3: `email${timestamp}@example.com`,
    }
  }


}
```

### Factory Rules

1. **Nomenclatura:** `[Name]Factory.js` (PascalCase)
2. **Classe:** `[Name]Factory`
3. **Timestamp:** usar `Date.now()` para garantir dados únicos
4. **Método principal:** `generate()` com dados completos
5. **Métodos secundários:** `generatePartial()`, `generateLoginData()`, etc.
6. **JSDoc:** todos os métodos devem ter JSDoc com `@returns`

---

## 10. Index Template (pages/index.js)

```javascript
/**
 * Page Objects Index - Exportação central de todos os page objects
 * @author Rafael Barelli
 */

export { HomePage } from './HomePage'
export { LoginPage } from './LoginPage'
export { SignupPage } from './SignupPage'
export { AccountPage } from './AccountPage'
// Adicionar novos Page Objects aqui
```

---

## 11. Support Template (support/e2e.js)

```javascript
import '@shelex/cypress-allure-plugin'
import { HomePage } from '../pages'
import uiData from '../fixtures/ui_texts.json'

// Screenshot custom - sempre salva dentro da pasta do spec
// Extrai o prefixo TC do nome do spec (ex: TC_WEB_001, TC_API_005, TC_PF_003)
Cypress.Commands.add('captura', (stepName) => {
  const specName = Cypress.spec.name || ''
  const tcMatch = specName.match(/^(TC_WEB_\d+|TC_API_\d+|TC_PF_\d+|TC\d+)/)
  const tcPrefix = tcMatch ? tcMatch[1] + '_' : ''
  cy.screenshot(`${tcPrefix}${stepName}`, { capture: 'runner', overwrite: true })
})

// beforeEach global - adiciona labels Allure (epic/feature/story/tag)
// para filtros nos tabs Behaviors e Suites do relatorio
beforeEach(function () {
  const specName = Cypress.spec.name
  let epic = 'web'
  if (specName.startsWith('TC_API_')) epic = 'api'
  if (specName.startsWith('TC_PF_')) epic = 'performance'

  const tcMatch = specName.match(/^(TC_WEB_\d+|TC_API_\d+|TC_PF_\d+|TC\d+)/)
  if (tcMatch) {
    const desc = specName.replace(/^TC_WEB_\d+_sucesso_|^TC_WEB_\d+_erro_|^TC_API_\d+_sucesso_|^TC_API_\d+_erro_|^TC_PF_\d+_/,'').replace('.cy.js','').replace(/_/g,' ')
    cy.allure().story(`${tcMatch[1]} - ${desc}`)
    cy.allure().tag(tcMatch[1])
  }

  cy.allure().epic(epic)

  if (specName.includes('_sucesso_')) { cy.allure().feature('sucesso'); cy.allure().tag('sucesso') }
  if (specName.includes('_erro_'))    { cy.allure().feature('erro');    cy.allure().tag('erro') }
  if (specName.includes('smoke'))     { cy.allure().feature('smoke');     cy.allure().tag('smoke') }
  if (specName.includes('carga'))     { cy.allure().feature('carga');     cy.allure().tag('carga') }
  if (specName.includes('estresse'))  { cy.allure().feature('estresse');  cy.allure().tag('estresse') }
  if (specName.includes('resistencia')) { cy.allure().feature('resistencia'); cy.allure().tag('resistencia') }
  if (specName.includes('pico') || specName.includes('spike')) { cy.allure().feature('pico'); cy.allure().tag('pico') }
  if (specName.includes('auditoria')) { cy.allure().feature('auditoria'); cy.allure().tag('auditoria') }
  if (specName.includes('vitals'))    { cy.allure().feature('frontend');  cy.allure().tag('frontend') }

  if (specName.startsWith('TC_API_') || specName.startsWith('TC_PF_')) {
    return
  }
  cy.visit('/')
  cy.fixture('users').as('usersData')
  HomePage.logo.should('be.visible')
  cy.captura(uiData.homepage.loadStep)
})

// Suporte para Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
```

---

## 12. Fixture Template (fixtures/*.json)

```json
{
  "dataName": {
    "field1": "value1",
    "field2": "value2"
  }
}
```

---

## 13. Docstring Structure

### JSDoc for File
```javascript
/**
 * [Nome do Arquivo] - [Descrição]
 * [Informações adicionais]
 * @version 1.0.0
 * @author Rafael Barelli
 */
```

### JSDoc for Method
```javascript
/**
 * [Descrição do método]
 * @param {string} [paramName] - [Descrição do parâmetro]
 * @returns {Object} [Descrição do retorno]
 */
```

### JSDoc for Test
```javascript
/**
 * TC_WEB_### - [Nome do Teste]
 * @description [Descrição breve do que o teste faz]
 * @tags @sucesso (ou @erro) @TC_WEB_###
 * @author Rafael Barelli
 */
```
> Para testes de API, usar `TC_API_###`. Para performance, usar `TC_PF_###`.

---

## 14. Standard Test Tags

| Tag | Uso |
|-----|-----|
| `@sucesso` | Teste de caminho de sucesso (sucesso) |
| `@erro` | Teste de caminho de erro (erro/validação) |
| `@TC_WEB_###` | Tag para teste E2E específico (ex: `@TC_WEB_003`) |
| `@TC_API_###` | Tag para teste de API específico |
| `@TC_PF_###` | Tag para teste de performance específico |

**Tags obrigatórias nos testes: `@sucesso` ou `@erro` + `@TC_###`**

---

## 15. Test Priorities

| Prioridade | Descrição |
|------------|-----------|
| `P0` | Crítico - Suite inteira depende |
| `P1` | Alto - Funcionalidade principal |
| `P2` | Médio - Funcionalidade secundária |
| `P3` | Baixo - Funcionalidades extras |

---

## 16. Naming Rules

| Tipo | Formato | Exemplo |
|------|---------|---------|
| Arquivo de teste (E2E) | `TC_WEB_[##]_[sucesso/erro]_[titulo].cy.js` | `TC_WEB_001_sucesso_registrar_usuario.cy.js` |
| Arquivo de teste (API) | `TC_API_[##]_[sucesso/erro]_[titulo].cy.js` | `TC_API_008_sucesso_criar_conta_usuario.cy.js` |
| Arquivo de teste (Performance) | `TC_PF_[##]_[titulo].js` ou `.cy.js` | `TC_PF_005_estresse_api_produtos.js` |
| Page Object | PascalCase + Page | `LoginPage.js` |
| Factory | PascalCase + Factory | `UserFactory.js` |
| Teste (describe) | `[titulo em português]` | `Registrar usuário` |
| Teste (it) | `[verbo] [ação]` | `deve registrar usuário` |
| JSDoc Tags | `@sucesso/@erro @TC_###` | `@tags @sucesso @TC_WEB_001` |
| Screenshot | `[passo]_[descricao_em_portugues]` | `01_pagina_inicial_carregada` |

---

## 17. Checklist for New Tests

- [ ] Ler scenario original (test_case_*.txt, história de usuário, ou passos numerados 1. 2. 3.)
- [ ] **IDENTIFICAR tipo de caminho: sucesso ou erro** (analisar .txt)
- [ ] Criar/nomear arquivo com prefixo `TC_TIPO_##_sucesso_` ou `TC_TIPO_##_erro_` (TIPO = WEB, API, PF)
- [ ] Adicionar tag `@sucesso` ou `@erro` + `@TC_TIPO_###` no JSDoc (ex: `@tags @sucesso @TC_WEB_001`)
- [ ] Usar formato `[Descrição]` no describe() (sem "Test Case ## - Sucesso/Erro -")
- [ ] Usar formato `[verbo] [resultado]` no it() (sem `[TC##]`)
- [ ] Usar template de teste
- [ ] Importar Page Objects corretos
- [ ] Importar Factory (se aplicável)
- [ ] Adicionar JSDoc no topo
- [ ] Adicionar `takeScreenshot()` em cada passo **(NOME EM PORTUGUÊS)**
- [ ] **NAO adicionar beforeEach** — já está em `cypress/support/e2e.js`
- [ ] Usar `afterEach()` para captura de erros
- [ ] Verificar se teste CRIA e DELETA → usar UserFactory.generate()
- [ ] Verificar se teste apenas LOGA (sem delete) → usar fixture
- [ ] **Numerar comentários dos passos (corresponder ao .txt)**
- [ ] **Traduzir describe() para PORTUGUÊS**
- [ ] **Garantir uso de cy.captura() para screenshots**
- [ ] **Aplicar padrões de estabilidade (should('be.visible'), click({ force: true }))**
- [ ] Rodar teste e verificar screenshots/vídeo

### Rules for Step Numbering (MANDATORY):
Cada passo do teste DEVE ter comentários numerados. Esta regra se aplica a **TESTES E2E E API**:

**Para testes E2E:**
Os comentários numerados correspondem aos passos do test case original (.txt ou Especificacao_Técnica_Web.md):

**Para testes API:**
Os comentários numerados correspondem aos passos definidos na Especificacao_Tecnica_API.md (ex: requisição, asserções, geração de evidência):

1. Usar formato: `// 1. [Descrição do passo em PORTUGUÊS]`
2. Os números DEVEM corresponder exatamente aos passos do test case, sem sub-letters (4a, 4b, 4c, etc.). Cada ação é um passo sequencial.
3. **Alinhamento com takeScreenshot**: Em testes E2E, o `takeScreenshot` DEVE refletir o mesmo número `NN_` do comentário associado. Testes API não utilizam screenshot.
4. **TRADUZIR para português** (não manter em inglês)
5. Exemplos de testes E2E:
   - `// 1. Abrir navegador (via beforeEach cy.visit('/'))`
   - `// 4. Clicar no botão 'Signup / Login'`
   - `HomePage.clickSignupLogin()`
   - `takeScreenshot('04_clicou_signup_login')`
6. Exemplos de testes API:
   - `// 1. Enviar requisição GET para /api/productsList`
   - `cy.task('apiRequest', { hostname: '...', path: '/api/productsList', method: 'GET' })`
   - `// 2. Validar status code 200`
   - `// 3. Validar responseCode igual a 200`
   - `// 4. Gerar evidência do teste`
7. Exemplos de testes Performance:
   - `// 1. Configurar opções (stages, thresholds)`
   - `export const options = { stages: [...], thresholds: {...} }`
   - `// 2. Executar requisição GET para /api/productsList`
   - `const res = http.get(BASE_URL + '/api/productsList')`
   - `// 3. Validar status code e resposta`
   - `check(res, { 'status 200': (r) => r.status === 200 })`
   - `// 4. Inserir sleep entre iterações`
   - `sleep(0.5)`

---

**Documento gerado em:** AAAA-MM-DD
