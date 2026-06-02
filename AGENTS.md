# AGENTS.md

## Objective
This project can use multiple browser automation and debugging tools:
- Chrome DevTools MCP
- Playwright MCP
- Selenium MCP
- Playwright CLI

The agent must choose the tool based on the user's explicit request.

## Main Selection Rule
If the user explicitly requests a tool, use exactly the requested tool.
When there is an explicit request, do not substitute another tool based on personal preference.

Examples of explicit requests:
- "use playwright cli to..."
- "use selenium mcp to..."
- "use chrome devtools mcp to..."
- "use playwright mcp to..."

## Rule for Requests Without Explicit Tool
If the user doesn't specify which tool to use, choose the most suitable tool for the objective:
- Use Chrome DevTools MCP for active browser debugging, console analysis, network, performance, CSS, layout and live session inspection.
- Use Playwright MCP for modern navigation automation, forms, end-to-end flows and interactive validation.
- Use Selenium MCP for legacy flows, Selenium/WebDriver compatibility or when Selenium is the best technical option.
- Use Playwright CLI when the task requires terminal-driven execution or when the local skill flow is more appropriate.

## Priority Rule
1. Tool explicitly requested by the user.
2. Rules in this AGENTS.md.
3. Guidelines in `Guia_Cypress_Template.md`.
4. Current state of the page or session.

## Specific Rules for Playwright CLI
When using Playwright CLI, first consult the skill at `SKILL.md`.

## Mandatory Use of Playwright CLI
Before any action with Playwright CLI:
1. Read `SKILL.md`.
2. Execute `playwright-cli --help`.
3. Confirm the appropriate commands for the task.
4. Only then start the automation.

## Standard Flow with Playwright CLI
Always follow this sequence:
1. Open the browser or page with `playwright-cli open`
2. Navigate with `playwright-cli goto <url>` if necessary
3. Execute `playwright-cli snapshot`
4. Identify elements from the returned refs
5. Interact using those refs
6. Execute new `playwright-cli snapshot` after any DOM update
7. Use `playwright-cli screenshot` to record evidence

## Interaction Rules with Playwright CLI
- Prefer refs from snapshot instead of guessing selectors.
- Only use interaction commands after inspecting the page.
- Take a new snapshot whenever the page state changes.
- Consult the skill and `--help` for any doubt about syntax.

## Execution Rules
- Do not switch tools when the user has requested a specific tool.
- If a command fails, stop and explain the error before continuing.
- Always log the executed commands and important results.
- Confirm the current state of the browser after an error.
- Maintain consistency if you choose a tool for an ambiguous task.

## Document Date Standard (MANDATORY)
ALL documentation files MUST end with the generation date in the following format:
```
---

**Documento gerado em:** AAAA-MM-DD
```
This rule applies to every document in the project:
- Sumario_Executivo.md
- Sumario_Executivo_TEMPLATE.md
- Especificacao_Tecnica_Web.md
- Especificacao_Tecnica_Web_TEMPLATE.md
- Especificacao_Tecnica_API.md
- Especificacao_Tecnica_API_TEMPLATE.md
- Suite_BDD.md
- Suite_BDD_TEMPLATE.md
- Guia_Cypress_Template.md
- Especificacao_Tecnica_Performance.md
- Especificacao_Tecnica_Performance_TEMPLATE.md
- Relatorio_Resultados_Performance.md
- Relatorio_Resultados_Performance_TEMPLATE.md
- Seletores.md
- README.md

When creating or updating any documentation file, the agent MUST append this footer with the **current date** (not a fixed placeholder).

---

# Operational Governance (MANDATORY)

## Configuration Files Backup
Before making ANY changes to documentation files:
1. **CREATE BACKUP** in the `Backup/` folder.
2. Format: `[FILENAME]_[YYYYMMDD_HHmmss].[ext]`.
3. **Command:** `copy "[file]" "Backup/[FILENAME]_[YYYYMMDD_HHmmss].[ext]"`

### General Documentation Files (Backup MANDATORY):
- `AGENTS.md`
- `README.md`

### E2E Documentation Files (Backup MANDATORY):
- `Sumario_Executivo.md`
- `Sumario_Executivo_TEMPLATE.md`
- `Especificacao_Tecnica_Web.md`
- `Especificacao_Tecnica_Web_TEMPLATE.md`

### BDD Documentation Files (Backup MANDATORY):
- `Suite_BDD.md`
- `Suite_BDD_TEMPLATE.md`

### API Documentation Files (Backup MANDATORY):
- `Sumario_Executivo.md`
- `Sumario_Executivo_TEMPLATE.md`
- `Especificacao_Tecnica_API.md`
- `Especificacao_Tecnica_API_TEMPLATE.md`

### Performance Documentation Files (Backup MANDATORY):
- `Sumario_Executivo.md`
- `Sumario_Executivo_TEMPLATE.md`
- `Especificacao_Tecnica_Performance.md`
- `Especificacao_Tecnica_Performance_TEMPLATE.md`
- `Relatorio_Resultados_Performance.md`
- `Relatorio_Resultados_Performance_TEMPLATE.md`

### IA Documentation Files (Backup MANDATORY):
- `Guia_Cypress_Template.md`
- `Seletores.md`

## Pipeline Order (MANDATORY)

The standard pipeline for ALL new test cases MUST follow this exact order:

1. **CODE** — Create the test file, Page Objects (if E2E), and all supporting code
2. **RUN** — Execute the test and verify it passes completely
3. **BACKUP** — Create backups of all documentation files before any changes
4. **UPDATE DOCS** — Increment Sumario_Executivo, Especificacao_Tecnica, Suite_BDD, and Relatorio (if applicable) using their respective templates
5. **ALLURE** — Ensure Allure results are generated (Cypress auto-generates for .cy.js; k6 requires conversion via `convert_k6_to_allure.js`)
6. **VERIFY** — Confirm all documents compile correctly with no broken links or numbering gaps

> **NEVER** update documentation with unexecuted tests. Code first, document after, Allure last.

---

## Document Generation Rules (MANDATORY)

Whenever creating ANY new documentation file (whether for a real test or a mock/temp test), the agent MUST:

1. **READ THE TEMPLATE FIRST** — Before writing any document, read its corresponding `*_TEMPLATE.md` file completely.
2. **MIRROR THE TEMPLATE STRUCTURE** — The generated document MUST follow the exact same sections, subsections, tables, and formatting as the template. The template is the source of truth for structure.
3. **BDD MUST USE GHERKIN** — Every BDD scenario MUST have proper Gherkin blocks: `Dado`, `Quando`, `Então` (and optionally `E`). Never list scenarios without their Gherkin description. Each scenario must have business-readable language (no technical terms).
4. **SUMARIO_EXECUTIVO MUST BE COMPLETE** — The executive summary must include: visão geral, escopo, tabela de casos de teste, e configuração do ambiente. Never output a minimal table-only version.
5. **ESPECIFICAÇÃO TÉCNICA MUST BE COMPLETE** — Every TC must have: objetivo, tipo, criticidade, dados, pós-condição, tabela de passos detalhados, e asserção chave.
6. **EXECUTE AND INCLUDE EVIDENCE** — After generating scripts, run the tests, collect screenshots/HTML reports/videos, and include them in the output folder.
7. **PERFORMANCE TESTS** — Follow `Especificacao_Tecnica_Performance_TEMPLATE.md` to create new performance TCs. Each performance TC must have: objective, type (smoke/carga/estresse/resistência/pico), configuration (VUs, stages, thresholds), k6 script, validation steps.
8. **PERFORMANCE RESULTS REPORT** — After executing performance tests, update `Relatorio_Resultados_Performance.md` with collected metrics (avg, p95, error rate) and generate evidence via `--summary-export`.
9. **HEADING STANDARDIZATION** — All documents MUST follow this heading hierarchy:

   | Level | Format | Usage |
   |:-----:|:-------|:------|
   | `#` | Document title | `# Title - Automation Exercise` |
   | `##` | Major section | `## 1. Section Name` |
   | `###` | Subsection | `### 1.1 Subsection Name` |
   | `####` | TC / sub-subsection | `#### TC_WEB_001 - Test name` |
   | `**bold**` | Metadata | `**Versão:** 1.0.0`, `**Responsável:** Rafael Barelli` |
   | normal text | Content | Paragraphs, lists, tables, code blocks |

   The `---` separator MUST appear after the metadata block (with a blank line before it) and between major sections.

> **HYPERLINK RULE:** Every reference to another document (`.md`, `.js`, `.json`, etc.) within any documentation file MUST be a clickable Markdown link in the format `` `filename` ``. Bare filenames in backticks (`` `file.md` ``) are NOT allowed unless they are inside code blocks or inlined code examples.
>
> **METADATA LINE BREAK RULE:** Every metadata field in the document header (`**Versão:**`, `**Responsável:**`, `**Metodologia:**`, `**Ferramenta:**`, `**Data:**`, `**Ambiente:**`) and every TC metadata field (`**Objetivo:**`, `**Tipo:**`, `**Criticidade:**`, `**Dados:**`, `**Pós-condição:**`, `**Configuração:**`, `**Thresholds:**`) MUST end with `<br>` to force line breaks on GitHub. Example:
> ```
> **Objetivo:** Validar o ciclo de vida completo de criação e exclusão de conta.<br>
> **Tipo:** Sucesso<br>
> **Criticidade:** Crítica<br>
> **Dados:** `UserFactory.generate()` - dados dinâmicos únicos por execução<br>
> **Pós-condição:** Conta criada e excluída ao final do teste<br>
> **Passos Detalhados:**
> ```
> The field `**Asserção Chave:**` MUST end with `<br>` when followed by `**Resultado esperado:**`. Only the field `**Asserção Chave:**` when followed by a code block or paragraph does NOT need `<br>.`
>
> **RESULTADO ESPERADO RULE:** All tests (E2E, API, BDD, Performance) MUST include the field `**Resultado esperado:**` after `**Pós-condição:**` describing the expected business outcome of the test. This field applies to both technical documents and BDD scenarios.
>
> **SCRIPT HYPERLINK RULE:** Every TC in technical documents (E2E Web, API, Performance) AND every BDD scenario MUST include the field `**Script:**` after `**Resultado esperado:**` with the script filename and a clickable hyperlink to the respective `.cy.js` or `.js` file. Example:
> ```
> **Resultado esperado:** Usuário consegue se registrar...<br>
> **Script:** `TC_WEB_001_sucesso_registrar_usuario.cy.js`<br>
> ```
> For BDD scenarios, use the `- **Script:**` format:
> ```
> - **Resultado esperado:** Usuário consegue se registrar...
> - **Script:** `TC_WEB_001_sucesso_registrar_usuario.cy.js`
> ```

> **Exception:** Templates already have `AAAA-MM-DD` as a date placeholder. Always replace it with the **current date** when generating the document.

---

## BDD Documentation (MANDATORY)
The BDD document provides a business-readable overview of all test scenarios organized by functional area.

### BDD Generation Rules:
1. **CREATE BACKUP** of BDD files before any change (`Backup/[FILENAME]_[YYYYMMDD_HHmmss].[ext]`).
2. **READ ALL SOURCE DOCUMENTS FIRST** — Before reading the BDD template:
   - Read `Especificacao_Tecnica_Web.md`
   - Read `Especificacao_Tecnica_API.md`
   - Read `Sumario_Executivo.md`
3. **READ Suite_BDD_TEMPLATE.md** — Only after the source documents are read, read the template to understand the structure.
4. **GENERATE FROM TECHNICAL DOCUMENTS** — The BDD must reflect the exact scenarios defined in the technical test plans, NOT invent new scenarios.
5. **MATCH TECHNICAL DETAILS** — Each BDD entry must align with its corresponding entry in Especificacao_Tecnica_Web.md, Especificacao_Tecnica_API.md and Sumario_Executivo.md.
6. **BDD SIMPLIFICATION** — Each scenario must use grouped Given/When/Then steps (resumo) by business intent:
   - Maximum of **7 blocks** per scenario
   - Group related actions into single When steps (e.g., "adiciono dois produtos ao carrinho" instead of separate hover+click steps)
   - Given = 1 line (precondition)
   - When = actions grouped by business intent
   - Then = validations grouped
   - The technical plan has the granular steps; the BDD summarizes by intention
7. **REQUIRED DADO FIELD** — Every scenario MUST have the `Dado` field filled with natural language context (input data, preconditions, or required resources). NEVER use "Nenhum" when context applies — describe the resource or condition needed. Example: "Que existem credenciais pré-cadastradas no sistema" instead of "Nenhum".
8. **DADO LANGUAGE STANDARD** — The `Dado` field must follow consistent patterns for stakeholder readability:

| Cenário | Padrão `Dado` |
|---------|---------------|
| Login (usuário existente) | `Que existem credenciais pré-cadastradas no sistema` |
| Falha de login | `Que existem credenciais inexistentes no sistema` |
| Registro (criar nova conta) | `Que existem dados de registro disponíveis` |
| Checkout com login | `Que existem credenciais pré-cadastradas e dados de pagamento disponíveis` |
| API criar conta | `Que existem dados de registro e a API de criação de conta está disponível` |
| API excluir conta | `Que existem credenciais pré-cadastradas e a API de exclusão de conta está disponível` |
| API atualizar conta | `Que existem dados de registro e a API de atualização de conta está disponível` |
| API consultar conta | `Que existem dados de registro e a API de consulta de conta está disponível` |

**Regras:**
- Nunca usar "por execução", "dinâmico", "timestamp" ou termos técnicos no `Dado`
- "Credenciais pré-cadastradas" = usuário já existe no sistema
- "Dados de registro" = criar novo usuário
- "API de [função] disponível" = APIs específicas com dados dinâmicos

### BDD Increment Rules:
When creating a new test case, the BDD must be updated AFTER the technical documents are updated:

1. **READ ALL SOURCE DOCUMENTS FIRST** — Before reading the BDD template:
   - Read `Especificacao_Tecnica_Web.md`
   - Read `Especificacao_Tecnica_API.md`
   - Read `Sumario_Executivo.md`
2. **READ Suite_BDD_TEMPLATE.md** — Only after the source documents are read, read the template to understand the structure.
3. **CHECK** if TC already exists in Suite_BDD.md.
4. **CREATE BACKUP** of BDD files before any change.
5. **UPDATE BDD** using Suite_BDD_TEMPLATE.md as base:
   - Extract the exact scenarios from the source documents
    - **SUMMARIZE steps** by grouping actions into Given/When/Then blocks (max 7 blocks per scenario)
   - Populate the template with the collected data
   - **REQUIRED DADO FIELD:** Every scenario MUST have the `Dado` field filled with natural language context. Never use "Nenhum" when context applies.
   - **DADO LANGUAGE STANDARD:** Follow the language patterns defined in item 8 — use "Que existem credenciais pré-cadastradas no sistema" for login, "Que existem dados de registro disponíveis" for registration, etc.
   - **SCRIPT FIELD:** Every BDD scenario MUST include `- **Script:** `filename`` after `- **Resultado esperado:**` with a hyperlink to the respective test script.
   - Add new entry to the appropriate functional area (E2E or API)
   - Update totals in Meta e Escopo section
   - Update classification tables (Sucesso/Erro counts and percentages)
   - Update mapping tables (Test Cases)

### BDD Documentation:
The BDD document must follow the structure defined in:
📄 `Suite_BDD_TEMPLATE.md`

Template file for increment:
📄 `Suite_BDD_TEMPLATE.md`

## Centralized BeforeEach (MANDATORY)
The `beforeEach()` with `cy.visit('/')` and `cy.fixture('users').as('usersData')` must be centralized in `cypress/support/e2e.js`.
- **DO NOT** repeat individual `beforeEach` in test files inside `cypress/e2e/`
- The step `// 2. Navegar para url... (via beforeEach)` remains in tests for traceability
- The step `// 1. Abrir navegador (via beforeEach cy.visit('/'))` remains in tests for traceability

## Coding & Naming Standards
The Agent **MUST** follow the appropriate standards based on the test type:

### E2E Tests (Default)
The Agent **MUST** follow all coding, naming, and documentation standards defined in:
📄 - `Guia_Cypress_Template.md`

### API Tests
The Agent **MUST** follow all coding, naming, and documentation standards defined in:
📄 `Guia_Cypress_Template.md`
📄 `Sumario_Executivo.md`
📄 `Especificacao_Tecnica_API.md`

**Rule:** When the user explicitly mentions "API tests", "API documentation", or "testes de API", the Agent MUST use the API-specific technical document.

### Performance Tests (k6)
The Agent **MUST** follow all coding, naming, and documentation standards defined in:
📄 `Guia_Cypress_Template.md`
📄 `Sumario_Executivo.md`
📄 `Especificacao_Tecnica_Performance.md`

**Rule:** When the user explicitly mentions "performance tests", "load tests", "carga", or "testes de performance", the Agent MUST use the performance-specific technical document.

- **Step Numbering:** All steps use sequential numbering (no sub-letters like 4a, 4b, 4c). Each action is a separate step. Each step MUST have a comment in format `// N. [description in Portuguese]`. **This applies to BOTH E2E and API tests.**
- **BeforeEach:** Global em `cypress/support/e2e.js`, NAO repetir nos testes.
- **Test Naming:** File names, `describe()` and `it()` tags (MUST be in Portuguese).
- **Screenshots:** Numbering MUST exactly match the current step number (e.g., `04_`). For multiple screenshots in the same step, use suffixes `04_`, `04a_`, `04b_`. ALL descriptions in the takeScreenshot argument MUST be in Portuguese. **MANDATORY use of `cy.captura()` custom command.**
- **Zero Hardcoded Policy (MANDATORY):** Test data (emails, passwords, product names, categories, brands, or messages) and **UI TEXTS** (buttons, headers, labels) **MUST NOT** be hardcoded in test files (Always abstract to fixtures).
- **Data Fixtures:** All static data, search terms, and UI texts must be in `cypress/fixtures/` (`users.json`, `products.json`, `contact.json`, `ui_texts.json`).
    - **`ui_texts.json`**: Must contain all fixed `headers`, `buttons`, `errors`, and `labels` of the site.
- **Data Factories:** Unique dynamic data (new accounts) must come from `UserFactory.js`.
- **Selector Hierarchy:** Priority order for elements.
- **Selector Investigation Flow:** Always inspect the live site before creating selectors; register alternatives in `Seletores.md`.
- **Documentation:** One-line comment patterns for selectors and methods.
- **Selector Description Format:** All selector descriptions in `Especificacao_Tecnica_Web.md` and its template MUST follow the pattern: `[verbo/objeto] + [elemento] + (contexto se necessário)`. Examples: `Botão adicionar ao carrinho (modal)`, `Header categoria`, `Campo email newsletter`. The doc is the source of truth — the template MUST mirror the doc exactly.
- **Documentation Increment (MANDATORY):** When creating a new test case:

#### For E2E Tests:
    1. **CHECK** if TC already exists in `Sumario_Executivo.md` and `Especificacao_Tecnica_Web.md` — if yes, skip increment.
    2. **CODE FIRST — DOCUMENT AFTER:** Create the test file (`.cy.js`), Page Objects, and all supporting code first.
    3. **RUN AND CONFIRM:** Execute the test with `npx cypress run --spec "cypress/e2e/TC[##]_[sucesso/erro]_[titulo].cy.js"` and verify it **passes completely** (all steps, assertions, screenshots, and cleanup) before proceeding to documentation.
    4. **CREATE BACKUP** of all E2E documentation files before any change (`Backup/[FILENAME]_[YYYYMMDD_HHmmss].[ext]`).
    5. **Increment `Sumario_Executivo.md`:** Add new TC entry to the appropriate table (Sucesso or Erro) using `Sumario_Executivo_TEMPLATE.md` as base. Update catalog table header (e.g., `TC_WEB_001 - TC_WEB_###`).
    6. **Increment `Especificacao_Tecnica_Web.md`:** Add new TC section below the appropriate group using `Especificacao_Tecnica_Web_TEMPLATE.md` as base. Each action is a **separate step** (no grouping). Steps are numbered sequentially (no sub-letters). Update catalog table header and add entry. Each new TC section must include: title, objective, type, criticidade, dados, pós-condição, steps table, and asserção chave.
    7. **Update `Suite_BDD.md`:** Add new entry to section 8.1 (E2E) mapping table. Update totals in Meta e Escopo and Cobertura sections.
    8. **Verify** both documents compile correctly with no broken links or numbering gaps.
    9. **Allure** — Confirm allure-results were generated for the test. If not, check `@shelex/cypress-allure-plugin` configuration in `cypress.config.js`.

#### For API Tests:
    1. **CHECK** if TC already exists in `Sumario_Executivo.md` and `Especificacao_Tecnica_API.md` — if yes, skip increment.
    2. **CODE FIRST — DOCUMENT AFTER:** Create the test file (`TC_API_*.cy.js`) in `automationexercise/Cypress/cypress/e2e/` first.
    3. **RUN AND CONFIRM:** Execute the test with `npx cypress run --spec "cypress/e2e/TC_API_*.cy.js"` and verify it **passes completely** (all assertions, responses, and cleanup) before proceeding to documentation.
    4. **CREATE BACKUP** of all API documentation files before any change (`Backup/[FILENAME]_[YYYYMMDD_HHmmss].[ext]`).
    5. **Increment `Sumario_Executivo.md`:** Add new TC entry to the appropriate table (Sucesso or Erro) using `Sumario_Executivo_TEMPLATE.md` as base. Update catalog table header (e.g., `TC_API_001 - TC_API_###`).
    6. **Increment `Especificacao_Tecnica_API.md`:** Add new TC section below the appropriate group using `Especificacao_Tecnica_API_TEMPLATE.md` as base. Each action is a **separate step** (no grouping). Steps are numbered sequentially (no sub-letters). Update catalog table header and add entry. Each new TC section must include: title, objective, type, criticidade, dados, pós-condição, steps table, and asserção chave.
    7. **Update `Suite_BDD.md`:** Add new entry to section 8.2 (API) mapping table. Update totals in Meta e Escopo and Cobertura sections.
    8. **Verify** both documents compile correctly with no broken links or numbering gaps.
    9. **Allure** — Confirm allure-results were generated for the test. If not, check `@shelex/cypress-allure-plugin` configuration in `cypress.config.js`.

#### For Performance Tests:
    1. **CHECK** if TC already exists in `Sumario_Executivo.md` and `Especificacao_Tecnica_Performance.md` — if yes, skip increment.
    2. **CODE FIRST — DOCUMENT AFTER:** Create the k6 script (`TC_PF_*.js`) or Cypress script (`TC_PF_*.cy.js`) in `automationexercise/Cypress/cypress/e2e/performance/` first.
    3. **RUN AND CONFIRM:** Execute the test with `k6 run "cypress/e2e/performance/TC_PF_*.js"` (or `npx cypress run --spec "cypress/e2e/performance/TC_PF_*.cy.js"`) and verify it **passes completely** (all checks pass, thresholds met) before proceeding to documentation.
    4. **CREATE BACKUP** of all Performance documentation files before any change (`Backup/[FILENAME]_[YYYYMMDD_HHmmss].[ext]`).
    5. **Increment `Sumario_Executivo.md`:** Add new TC entry to the appropriate line in the catalog table using `Sumario_Executivo_TEMPLATE.md` as base. Update total count.
    6. **Increment `Especificacao_Tecnica_Performance.md`:** Add new TC section below the appropriate group using `Especificacao_Tecnica_Performance_TEMPLATE.md` as base. Each TC must include: objective, type (smoke/carga/estresse/resistência/pico/auditoria), configuration (VUs, stages, thresholds), script path, validation steps table, and key assertion.
    7. **Update `Suite_BDD.md`:** Add new entry to section 8.3 (Performance) mapping table.
    8. **Update `Relatorio_Resultados_Performance.md`:** After execution, populate metrics (avg, p95, taxa de erro) using `Relatorio_Resultados_Performance_TEMPLATE.md` as base.
    9. **Verify** all documents compile correctly with no broken links or numbering gaps.
    10. **Allure** — Confirm allure-results are generated (k6 requires conversion via `convert_k6_to_allure.js`).

**Critical Rule:** NEVER update any test plan or technical test plan with a test case that has not been executed and confirmed passing. Documentation reflects the validated, working state of the test — not a planned or in-progress state.

---

## Test Case Classification (MANDATORY)

### Classification Rules
1. **Sucesso**: Test that verifies a successful flow (expected success)
2. **Erro**: Test that verifies error handling/negative validations

### Classification Criteria
| Type | Characteristics |
|------|-----------------|
| **Sucesso** | Valid login, Successful registration, Complete checkout, Search with results |
| **Erro** | Invalid credentials, Duplicate email, Invalid form, Search without results |

### Naming Convention (MANDATORY)
- **Test ID Format (MANDATORY):**
  - **E2E Tests:** `TC_WEB_###` (ex: TC_WEB_001, TC_WEB_014)
  - **API Tests:** `TC_API_###` (ex: TC_API_001, TC_API_014)
  - **Performance Tests:** `TC_PF_###` (ex: TC_PF_001, TC_PF_014)
- File: `TC_[TYPE]_[###]_[sucesso/erro]_[translated_original_title].cy.js` (same as JSDoc line 1: "Test Case #: Title")
- Examples:
  - E2E: `TC_WEB_003_erro_login_usuario_email_senha_incorretos.cy.js`
  - API: `TC_API_012_erro_validar_metodo_post_em_productslist.cy.js`
  - Performance: `TC_PF_005_estresse_api_produtos.js`

### Test Documentation (MANDATORY)
- **Test Case Title MUST be in PORTUGUESE** (translate from the original .txt), with prefix `TC_[TYPE]_### - ` in JSDoc (ex: `TC_WEB_003 - Login de usuário com credenciais incorretas`)
- Add tag `@sucesso` or `@erro` in JSDoc (ONLY these tags are allowed)
- Add tag `@TC_[TYPE]_###` in JSDoc (ex: `@TC_WEB_003`)
- **describe() format:**
  - **E2E:** `TC_WEB_### - [Description in Portuguese]` (ex: `describe('TC_WEB_003 - Login de usuário com email e senha incorretos')`)
  - **API:** `TC_API_### - [Description in Portuguese]` (ex: `describe('TC_API_012 - Validar método POST em productsList via API')`)
  - **Performance:** `TC_PF_### - [Description in Portuguese]` (ex: `describe('TC_PF_005 - Estresse progressivo no /api/productsList')`)
  - **Rule:** Do NOT include "Test Case ## -" nor "Sucesso/Erro -" in describe(). Only ID + description.
- it() format: `[verb] [result in Portuguese]` (without `[TC##]` at the start)
- Example: `it('deve mostrar erro com credenciais incorretas')`
- **Screenshot Command:** Helper `takeScreenshot` MUST use `cy.captura(`${stepName}`)`.

## API Evidence Structure (MANDATORY)
API tests MUST generate HTML-only evidence in the following structure:
- **Folder:** `cypress/screenshots/api/` (plano, sem subpasta por spec)
- **HTML Report:** `{testId}_api_result.html` (e.g., `TC_API_001_api_result.html`, sobrescrito a cada execução)

A `generateEvidenceReport` task em `cypress.config.js` salva os HTMLs diretamente em `screenshots/api/`.
All 14 API tests pass successfully with this structure.

### Test ID Format (MANDATORY)
- **E2E Tests:** `TC_WEB_###` (ex: TC_WEB_001, TC_WEB_014)
- **API Tests:** `TC_API_###` (ex: TC_API_001, TC_API_014)

### API Assertion Patterns (MANDATORY)
All API test assertions must use Portuguese descriptions in the format:
- **equals** → `é igual a {value}`
- **is_an_array** → `é um array`
- **greater_than** → `é maior que {value}`
- **has_property** → `possui propriedade {tag}`

**Example:**
```javascript
assertions.push({ description: 'response.status é igual a 200', passed: true })
assertions.push({ description: 'response.body.products é um array', passed: true })
assertions.push({ description: 'response.body.products.length é maior que 0', passed: true })
```

## Execution Protocol
Before creating any selector or when identifying a failure, the Agent must use its inspection tools to:
1. Open the site and inspect the complete HTML.
2. Search for the most robust level available (data-qa, ID, etc.).
3. **MANDATORY CHECK:** Verify if the selector (or an equivalent one) ALREADY EXISTS in the target Page Object. If it exists, **REUSE it**. Do not create redundant selectors with different names to avoid polluting the Page Objects.
4. **Register ALL found alternatives and history in the `Seletores.md` file**.

## Self-Healing Policy (Failure/Restoration)
If a test fails due to a selector error:
1. **Step 1:** Consult `Seletores.md` for documented alternatives (Skip `[QUEBRADO]`).
2. **Step 2:** Consult `playwright-cli/SKILL.md` and use Playwright CLI (`playwright-cli open`, `playwright-cli goto`, `playwright-cli snapshot`) to inspect the page and find a new selector. If Playwright CLI fails, use Playwright MCP or Chrome DevTools MCP. As a last resort, use Selenium MCP.
3. **Step 3:** Update Page Object and `Seletores.md` (Marking old as `[QUEBRADO]`).

## Golden Rules
- **NEVER** use a selector marked as `[QUEBRADO]` during execution.
- **Restoration:** If a broken selector works again during investigation, remove the tag in `Seletores.md` but **KEEP the history** (Failure/Restoration dates).

---

# Useful Commands
```bash
# Open Cypress UI
npx cypress open
# Run all tests
npx cypress run
# Run specific test by tag (ex: TC_WEB_003)
npx cypress run --tag @TC_WEB_003
# Run specific test
npx cypress run --spec "cypress/e2e/[test].cy.js"
# Run on specific browser
npx cypress run --browser edge
npx cypress run --browser chrome
npx cypress run --browser firefox
```

## Supported Browsers
| Browser | Recommended Version | Note |
|---------|-------------------|------------|
| Edge | 148+ | Mais rápido |
| Firefox | 135+ | Compatível |
| Chrome | 147+ | Padrão |
| Electron | 138 | Bundled com Cypress |

## API Testing Commands
```bash
# Run all API tests
npx cypress run --spec "cypress/e2e/TC_API_*.cy.js"
# Run specific API test
npx cypress run --spec "cypress/e2e/TC_API_001_sucesso_listar_todos_produtos.cy.js"
# Run on specific browser
npx cypress run --spec "cypress/e2e/TC_API_*.cy.js" --browser edge
```

## GIF Generation
Animated GIFs from PNG screenshots are generated by:
```bash
cd automationexercise/Cypress
node scripts/gerar_gifs.js
```
GIFs are stored in the same folder as PNG screenshots (e.g., cypress/screenshots/web/TC_WEB_001.cy.js/). The script requires `gifencoder` and `canvas` npm packages.

## Performance Testing Commands (k6)
```bash
# Install k6 (Windows)
winget install GrafanaLabs.k6 --accept-package-agreements

# Smoke test
k6 run automationexercise/Cypress/cypress/e2e/performance/TC_PF_001_smoke_test.js

# Load test
k6 run automationexercise/Cypress/cypress/e2e/performance/TC_PF_003_carga_api_produtos.js

# Stress test
k6 run automationexercise/Cypress/cypress/e2e/performance/TC_PF_005_estresse_api_produtos.js

# Soak test
k6 run automationexercise/Cypress/cypress/e2e/performance/TC_PF_006_resistencia_soak.js

# Spike test
k6 run automationexercise/Cypress/cypress/e2e/performance/TC_PF_007_pico_spike.js

# Checkout flow
k6 run automationexercise/Cypress/cypress/e2e/performance/TC_PF_009_carga_checkout.js

# Image audit
k6 run automationexercise/Cypress/cypress/e2e/performance/TC_PF_010_auditoria_imagens.js

# Run with JSON evidence export
k6 run cypress/e2e/performance/TC_PF_001_smoke_test.js --summary-export=reports/resultado.json

# Run all k6 tests
# Run all k6 tests (exclui .cy.js)
for %f in (automationexercise/Cypress/cypress/e2e/performance/TC_PF_*.js) do @echo %f | findstr /v "\.cy" >nul && k6 run "%f" --quiet

# Run Core Web Vitals (Cypress)
cd automationexercise/Cypress
npx cypress run --spec "cypress/e2e/performance/TC_PF_008_core_web_vitals.cy.js" --browser edge
```
 
 ---
 
 **Documento gerado em:** 2026-05-22
