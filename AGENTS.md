# AGENTS2.md — Versão Otimizada para Economia de Tokens
**Versão:** 1.0.0<br>
**Baseado em:** `AGENTS.md` (revisão 7)<br>
**Objetivo:** Reduzir ~51% do consumo de tokens sem perder acurácia ou qualidade<br>
**Responsável:** Rafael Barelli

---

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

## Rule for Requests Without Explicit Tool
If the user doesn't specify which tool to use, choose the most suitable tool for the objective:
- Use Chrome DevTools MCP for active browser debugging, console analysis, network, performance, CSS, layout and live session inspection.
- Use Playwright MCP for modern navigation automation, forms, end-to-end flows and interactive validation.
- Use Selenium MCP for legacy flows, Selenium/WebDriver compatibility or when Selenium is the best technical option.
- Use Playwright CLI when the task requires terminal-driven execution or when the local skill flow is more appropriate.

## Priority Rule
1. Tool explicitly requested by the user.
2. Rules in this AGENTS2.md.
3. Guidelines in `Guia_Cypress_Template.md`.
4. Current state of the page or session.

---

## Token Economy Rules (MANDATORY)

Todas as etapas DEVEM seguir estas regras de leitura seletiva para evitar desperdício de tokens. Cada arquivo é lido UMA ÚNICA VEZ na etapa que precisa dele — nunca releitura.

| Etapa | Lê do disco | Usa do contexto |
|:------|:------------|:----------------|
| DISSECT | `Template_Story.md` + story + `glob` para listar nomes de testes existentes | Nada |
| CODE | Handoff + **apenas o necessário** (regras abaixo) | Nada (invocação nova) |
| RUN | Nada | Nada |
| UPDATE DOCS | `.md` existentes + `*_TEMPLATE.md` | POs, fixtures, `.cy.js`, screenshots herdados do CODE |
| ALLURE | Nada | Nada |
| VERIFY | Nada | Nada |

---

## Story Dissection (MANDATORY - FIRST STEP)

Whenever a user story file (`.txt`, `Story.txt`, `*.story`, or any free-text file containing a feature description) is provided:

### Step 0: Read the Dissection Template

1. Read `automationexercise/templates/Template_Story.md` completely.
2. Read the provided story file completely.
3. Use `glob` to list existing test file names (e.g. `**/TC_WEB_*.cy.js`) and extract the highest TC number. The next TC number = max + 1. This number MUST be used in the handoff.

<<<<<<< Updated upstream
**The dissecting agent reads ONLY the template and the story. It does NOT read the project codebase, Page Objects, fixtures, or existing tests.** Project exploration is the CODE agent's responsibility. This keeps the dissect phase pure (business analysis) and prevents context bleed.

### Step 1: Apply the Template (Silent Internal Reasoning)

The agent MUST process EACH section of the dissection template as INTERNAL ANALYSIS.
Sections 1 through 8 are working memory — the agent reasons through them mentally
and must NEVER output them to the user or use the `question` tool.

The agent MUST IMMEDIATELY launch a NEW task invocation (using the `task` tool) for
the CODE phase, passing Section 8 (Handoff) as the prompt input. The CODE agent is
a fresh invocation — it does NOT inherit context from the dissection agent.
The dissecting agent NEVER proceeds to CODE itself. After launching the CODE task,
the full pipeline (CODE → RUN → BACKUP → DOCS → ALLURE → VERIFY) executes inside
that new task invocation without outputting intermediate analysis or prompting the user.

The user sees only concrete results: files created, test execution output,
screenshots, and error messages if something fails.
=======
**The dissecting agent reads ONLY the template, the story, and a glob listing of existing test file names (to determine the next sequential TC number). It does NOT read Page Objects, fixtures, or full test files.** Project exploration is the CODE agent's responsibility.

### Step 1: Apply the Template (Silent Internal Reasoning)

The agent MUST process EACH section of the dissection template as INTERNAL ANALYSIS. Sections 1 through 8 are working memory — the agent reasons through them mentally and must NEVER output them to the user or use the `question` tool.

The agent MUST IMMEDIATELY launch a NEW task invocation (using the `task` tool) for the CODE phase, passing Section 8 (Handoff) as the prompt input. The CODE agent is a fresh invocation — it does NOT inherit context from the dissection agent. The dissecting agent NEVER proceeds to CODE itself. After launching the CODE task, the full pipeline (CODE → RUN → BACKUP → DOCS → ALLURE → VERIFY) executes inside that new task invocation without outputting intermediate analysis or prompting the user.
>>>>>>> Stashed changes

The template is NOT a form to fill — it is a GUIDE. For each section:

| Section | Action |
|:-------:|--------|
| 1. Extração Estrutural | Parse title, description, acceptance criteria, additional info |
| 2. Classificação + Granularidade | Identify story type (E2E/API/Performance/Bug/Security/UI/Data/Mixed) and decide 1 vs N tests |
| 3. Análise de Fluxo | Map steps, checkpoints, application states |
| 4. Análise de Dados | List entities, quantities, differentiation needs, whether order matters |
| 5. Engenharia de Asserção | For each checkpoint: business rule → exact assertion → false positive risk → mitigation → validity proof → weight |
| 6. Premissas Ocultas | Surface assumptions not stated in the story |
| 7. Ambiguidades | Identify open questions and document decisions |
| 8. Saída para Pipeline | Produce the structured handoff for the CODE phase |

### Handoff Rule

The dissection output (Section 8) IS the input for the pipeline. The AI that executes CODE MUST consume the dissection output — NOT the raw story file.

<<<<<<< Updated upstream
> **The handoff is passed via the `task` tool prompt.** The dissecting agent launches
> a `task` with subagent_type="general", passing the full Section 8 output as the
> prompt. The CODE agent reads the handoff and nothing else — it does NOT re-read
> the story or the template. This guarantees zero context bleed and zero ambiguity.

> **Project exploration is the CODE agent's job.** The CODE agent, upon receiving
> the handoff, MUST first read the project codebase — Page Objects, existing tests,
> fixtures, data factories, configuration, and `Seletores.md` — to understand how to
> implement the test technically. The dissecting agent includes NO technical
> implementation details in the handoff. This guarantees zero context bleed and zero
> ambiguity.

> **Pipeline runs inside the CODE task.** After project exploration, the same agent
> invocation executes RUN → BACKUP → UPDATE DOCS → ALLURE → VERIFY sequentially.
> The UPDATE DOCS stage inherits all context from CODE (modified POs, fixtures,
> `.cy.js`, screenshots) — it only reads the existing `.md` docs and `*_TEMPLATE.md`
> from disk, never re-reading POs, fixtures, or the `.cy.js` file.
=======
> **The handoff is passed via the `task` tool prompt.** The dissecting agent launches a `task` with subagent_type="general", passing the full Section 8 output as the prompt. The CODE agent reads the handoff and nothing else — it does NOT re-read the story or the template.

> **Project exploration is the CODE agent's job.** The CODE agent, upon receiving the handoff, MUST read only the necessary files per the Token Economy rules below. The dissecting agent includes NO technical implementation details in the handoff.

> **TC Numbering Rules — CRITICAL:**
> 1. **DISSECT** — Before generating the handoff, use `glob` to list existing test files and extract the highest TC number. The next TC number = max + 1. Never hardcode a number without this check.
> 2. **CODE** — Upon receiving the handoff, re-validate the TC number from the handoff against the glob of existing tests. If the handoff's number is already taken or skips available numbers, CORRECT it to the next available sequential number. Do NOT blindly trust the handoff's number.
> 3. **UPDATE DOCS** — When incrementing documentation, verify the TC number is sequential with the last documented entry. If it is not sequential but was already used in the `.cy.js` filename, log a warning.

> **Pipeline runs inside the CODE task.** After project exploration, the same agent invocation executes RUN → BACKUP → UPDATE DOCS → ALLURE → VERIFY sequentially. The UPDATE DOCS stage inherits all context from CODE (modified POs, fixtures, `.cy.js`, screenshots) — it only reads the existing `.md` docs and `*_TEMPLATE.md` from disk.
>>>>>>> Stashed changes

---

## Pipeline Order (MANDATORY)

The standard pipeline for ALL new test cases MUST follow this exact order:

<<<<<<< Updated upstream
0. **DISSECT** — When a story file is provided, read `Template_Story.md`
   and apply it silently. Output the structured analysis as handoff for CODE.
   See "Story Dissection" section above for details.
1. **CODE** — Create the test file, Page Objects (if E2E), and all supporting code
2. **RUN** — Execute the test and verify it passes completely
3. **BACKUP** — Create backups of all documentation files before any changes
4. **UPDATE DOCS** — First read the existing `.md` documents (Sumario_Executivo.md, Especificacao_Tecnica_Web.md, Suite_BDD.md) to understand current state. Then read their respective `*_TEMPLATE.md`. Then increment each document. Use the context inherited from CODE (POs, fixtures, `.cy.js`, screenshots) to populate the new entry — do NOT re-read those files from disk.
=======
0. **DISSECT** — When a story file is provided, read `Template_Story.md` and apply it silently. Output the structured analysis as handoff for CODE.
1. **CODE** — Create the test file, Page Objects (if E2E), and all supporting code (leitura seletiva obrigatória — ver seção "CODE — Leitura Seletiva" abaixo)
2. **RUN** — Execute the test. Use `--quiet` ou pipe para reduzir output.  
   ⚠️ **REGRRA DE OURO:** Se o teste falhar porque o sistema NÃO implementa a regra de negócio (ex: comentário não aparece, fatura sem conteúdo), **NÃO remova nem enfraqueça a asserção**. A falha é o resultado CORRETO — revela um bug. Documente o bug e prossiga.  
   Se o teste falhar por erro de código/teste (seletor quebrado, timeout, etc.), aí sim corrija o teste.
3. **BACKUP** — Create backups of all documentation files before any changes
4. **UPDATE DOCS** — Read existing `.md` documents + `*_TEMPLATE.md` only. Use inherited context (POs, fixtures, `.cy.js`, screenshots) to populate new entry.
5. **ALLURE** — Ensure Allure results are generated (Cypress auto-generates for `.cy.js`; k6 requires conversion via `convert_k6_to_allure.js`)
6. **VERIFY** — Confirm all documents compile correctly with no broken links or numbering gaps
>>>>>>> Stashed changes

> **NEVER** update documentation with unexecuted tests. Code first, document after, Allure last.

### No Permission Asking (MANDATORY)

<<<<<<< Updated upstream
The agent MUST NOT ask the user for permission, confirmation, or approval to advance
between pipeline stages (DISSECT → CODE → RUN → BACKUP → DOCS → ALLURE → VERIFY).
The pipeline is fully automatic.

The only valid reasons to stop or ask are:
(a) a command fails with an error requiring human decision, or
(b) a selector cannot be resolved after exhausting all recovery tools.

Asking "can I proceed?", "do you want me to continue?", or showing the handoff to
the user for approval is a violation of this rule.
=======
The agent MUST NOT ask the user for permission, confirmation, or approval to advance between pipeline stages. The pipeline is fully automatic. The only valid reasons to stop or ask are: (a) a command fails with an error requiring human decision, or (b) a selector cannot be resolved after exhausting all recovery tools.

---

## CODE — Leitura Seletiva (TOKEN ECONOMY)

Esta seção substitui a abordagem "leia tudo" por leitura direcionada. O objetivo é consumir ~9K tokens em vez de ~22K (~59% de economia).

### Leitura Obrigatória (essencial)

| Arquivo | Como ler | Tokens |
|:--------|:---------|:------:|
| `Guia_Cypress_Template.md` | Completo (~300 linhas) | ~1.5K |
| `Seletores.md` | **Só a seção relevante** (ex: só `CheckoutPage`) | ~0.2K |
| `UserFactory.js` | Completo (~40 linhas) | ~0.2K |
| `cypress.config.js` | Completo (~260 linhas) | ~0.5K |
| `cypress/support/e2e.js` | Completo (~50 linhas) | ~0.2K |
| Po-relevante (ex: `CheckoutPage.js`) | Completo (~200 linhas) | ~0.5K |
| Outros POs necessários | Apenas os que o handoff mencionar | ~0.5K |
| Fixtures relevantes | Apenas as mencionadas (`products.json`, `ui_texts.json`, `users.json`, `contact.json`) | ~1K |
| **Total leitura obrigatória** | | **~4.6K** |

### Leitura Seletiva de Testes Existentes (NÃO ler todos)

1. Use `glob` para listar nomes de testes existentes (barato — só nomes)
2. Re-valide o número do TC contra o glob: extraia o maior número existente. Se o número do handoff não for o próximo sequencial, CORRIJA para o próximo disponível. NÃO confiar cegamente no handoff.
3. Leia **apenas 1-2 testes do mesmo tipo** que o novo teste (ex: checkout, carrinho, login)
4. Critério de escolha: o teste mais recente e o mais similar ao fluxo do handoff

> **Exemplo:** Se o novo teste é de checkout com login, leia `TC_WEB_016` (login antes checkout) e `TC_WEB_024` (baixar fatura). Ignore os outros 24.

| Arquivo | Como ler | Tokens |
|:--------|:---------|:------:|
| 2 testes similares (~150 linhas cada) | Completos | ~1K |
| **Total** | | **~1K** |

### Leitura Proibida (evitar)

| Arquivo | Motivo | Economia |
|:--------|:-------|:--------:|
| Todos os 26 TC_WEB_* | Já entendeu o padrão com 1-2 exemplos | ~7K |
| POs que não serão modificados | Só precisa dos POs que vai usar/criar | ~4K |
| `Seletores.md` inteiro | Só precisa da seção relevante | ~1.3K |
| `Sumario_Executivo.md`, `Especificacao_Tecnica_Web.md` | É responsabilidade do UPDATE DOCS | ~5K |

### Total CODE otimizado: **~6.6K** tokens (vs ~22K original)

---

## RUN — Output Mínimo

Use `--quiet` para reduzir output do Cypress. O log completo é truncado pelo sistema de qualquer forma. Só mostre erros se houver falha.

```bash
npx cypress run --spec "cypress/e2e/TC[##]_[sucesso/erro]_[titulo].cy.js" --quiet
```

Se falhar, execute novamente sem `--quiet` para capturar o erro completo.
>>>>>>> Stashed changes

---

## Document Generation Rules (MANDATORY)

Whenever creating ANY new documentation file, the agent MUST:

1. **READ THE TEMPLATE FIRST** — Before writing any document, read its corresponding `*_TEMPLATE.md` file completely.
2. **MIRROR THE TEMPLATE STRUCTURE** — The generated document MUST follow the exact same sections, subsections, tables, and formatting as the template.
3. **BDD MUST USE GHERKIN** — Every BDD scenario MUST have proper Gherkin blocks: `Dado`, `Quando`, `Então` (and optionally `E`).
4. **SUMARIO_EXECUTIVO MUST BE COMPLETE** — Must include visão geral, escopo, tabela de casos de teste, e configuração do ambiente.
5. **ESPECIFICAÇÃO TÉCNICA MUST BE COMPLETE** — Every TC must have: objetivo, tipo, criticidade, dados, pós-condição, tabela de passos detalhados, e asserção chave.
6. **EXECUTE AND INCLUDE EVIDENCE** — After generating scripts, run the tests, collect screenshots/HTML reports/videos.
7. **HEADING STANDARDIZATION** — Follow the heading hierarchy: `#` title, `##` major section, `###` subsection, `####` TC entry, `**bold**` metadata.
8. **HYPERLINK RULE** — Every reference to another document must be a clickable Markdown link.
9. **METADATA LINE BREAK RULE** — Every metadata field must end with `<br>`.
10. **RESULTADO ESPERADO RULE** — All tests MUST include `**Resultado esperado:**` after `**Pós-condição:**`.
11. **SCRIPT HYPERLINK RULE** — Every TC MUST include `**Script:**` with hyperlink to the `.cy.js` file.
12. **ASSERÇÃO CHAVE FORMAT** — For API tests, include technical validation detail (status code + key response fields).

---

## BDD Documentation (MANDATORY)

The BDD document provides a business-readable overview of all test scenarios organized by functional area.

### BDD Generation Rules:
1. **CREATE BACKUP** of BDD files before any change.
2. **READ ALL SOURCE DOCUMENTS FIRST** — Before reading the BDD template: read `Especificacao_Tecnica_Web.md`, `Especificacao_Tecnica_API.md`, `Sumario_Executivo.md`.
3. **READ Suite_BDD_TEMPLATE.md** — Only after the source documents are read.
4. **GENERATE FROM TECHNICAL DOCUMENTS** — The BDD must reflect the exact scenarios defined in the technical test plans.
5. **BDD SIMPLIFICATION** — Max 7 blocks per scenario. Given = 1 line. When = grouped by business intent. Then = grouped validations.
6. **REQUIRED DADO FIELD** — Every scenario MUST have `Dado` filled with natural language context.
7. **DADO LANGUAGE STANDARD:** Follow patterns for stakeholder readability.
8. **SCRIPT FIELD** — Every BDD scenario MUST include `- **Script:**` with hyperlink.
9. **TECHNICAL DETAILS** — Each BDD entry must align with its corresponding entry in the technical documents.

---

## Centralized BeforeEach (MANDATORY)

The `beforeEach()` with `cy.visit('/')` and `cy.fixture('users').as('usersData')` must be centralized in `cypress/support/e2e.js`.
- **DO NOT** repeat individual `beforeEach` in test files.
- The step `// 2. Navegar para url... (via beforeEach)` remains in tests for traceability.
- The step `// 1. Abrir navegador (via beforeEach cy.visit('/'))` remains in tests for traceability.

---

## Coding & Naming Standards

### E2E Tests (Default)
Follow all coding, naming, and documentation standards defined in `Guia_Cypress_Template.md`.

### API Tests
Follow `Guia_Cypress_Template.md`, `Sumario_Executivo.md`, `Especificacao_Tecnica_API.md`.

### Performance Tests (k6)
Follow `Guia_Cypress_Template.md`, `Sumario_Executivo.md`, `Especificacao_Tecnica_Performance.md`.

- **Step Numbering:** Sequential numbers. Each step has `// N. [description in Portuguese]`.
- **BeforeEach:** Global in `cypress/support/e2e.js`, DO NOT repeat in tests.
- **Test Naming:** Portuguese. File name: `TC_[TYPE]_[###]_[sucesso/erro]_[title].cy.js`
- **Screenshots:** Use `cy.captura()`. Numbering matches step number.
- **Zero Hardcoded Policy:** No test data or UI texts hardcoded. Use fixtures.
- **Data Fixtures:** `users.json`, `products.json`, `contact.json`, `ui_texts.json`.
- **Data Factories:** Use `UserFactory.js` for dynamic data.
- **Selector Investigation Flow:** Inspect live site before creating selectors; register in `Seletores.md`.

### Documentation Increment (MANDATORY):

#### For E2E Tests:
<<<<<<< Updated upstream
    1. **CHECK** if TC already exists in `Sumario_Executivo.md` and `Especificacao_Tecnica_Web.md` — if yes, skip increment.
    2. **CODE FIRST — DOCUMENT AFTER:** Create the test file (`.cy.js`), Page Objects, and all supporting code first.
    3. **RUN AND CONFIRM:** Execute the test with `npx cypress run --spec "cypress/e2e/TC[##]_[sucesso/erro]_[titulo].cy.js"` and verify it **passes completely** (all steps, assertions, screenshots, and cleanup) before proceeding to documentation.
     4. **CREATE BACKUP** of all E2E documentation files before any change (`automationexercise/Backup/[FILENAME]_[YYYYMMDD_HHmmss].[ext]`).
     5. **Increment `Sumario_Executivo.md`:** First read the existing file to understand current state. Then read `Sumario_Executivo_TEMPLATE.md` for format reference. Add new TC entry to the appropriate table (Sucesso or Erro). Update catalog table header (e.g., `TC_WEB_001 - TC_WEB_###`). Use the test filename (derived from naming convention) for `**Script:**` hyperlinks.
     6. **Increment `Especificacao_Tecnica_Web.md`:** First read the existing file to understand current structure. Then read `Especificacao_Tecnica_Web_TEMPLATE.md` for format reference. Add new TC section below the appropriate group using the template as base. Each action is a **separate step** (no grouping). Steps are numbered sequentially (no sub-letters). Update catalog table header and add entry. Each new TC section must include: title, objective, type, criticidade, dados, pós-condição, steps table, and asserção chave. Refer to the newly created `.cy.js` file to extract the detailed steps and evidence paths for the documentation.
     7. **Update `Suite_BDD.md`:** First read the existing file. Then read `Suite_BDD_TEMPLATE.md` for format reference. Add new entry to section 8.1 (E2E) mapping table. Update totals in Meta e Escopo and Cobertura sections.
     8. **Verify** both documents compile correctly with no broken links or numbering gaps.
    9. **Allure** — Confirm allure-results were generated for the test. If not, check `@shelex/cypress-allure-plugin` configuration in `cypress.config.js`.
=======
1. **CHECK** if TC already exists in `Sumario_Executivo.md` and `Especificacao_Tecnica_Web.md` — if yes, skip.
2. **CODE FIRST — DOCUMENT AFTER:** Create test file, Page Objects, and supporting code first.
3. **RUN AND CONFIRM:** Execute test with `npx cypress run --quiet --spec "cypress/e2e/TC[##]_[sucesso/erro]_[titulo].cy.js"` and verify it passes completely.
4. **CREATE BACKUP** of all E2E documentation files.
5. **Increment `Sumario_Executivo.md`:** Read existing file + `Sumario_Executivo_TEMPLATE.md`. Add entry. Update catalog header.
6. **Increment `Especificacao_Tecnica_Web.md`:** Read existing file + `Especificacao_Tecnica_Web_TEMPLATE.md`. Add TC section with full details.
7. **Update `Suite_BDD.md`:** Read existing file + `Suite_BDD_TEMPLATE.md`. Add entry. Update totals.
8. **Verify** both documents have no broken links or numbering gaps.
9. **Allure** — Confirm allure-results were generated.
>>>>>>> Stashed changes

#### For API Tests:
1. **CHECK** if TC exists. If yes, skip.
2. **CODE FIRST — DOCUMENT AFTER:** Create `TC_API_*.cy.js`.
3. **RUN AND CONFIRM** with `npx cypress run --quiet --spec "cypress/e2e/TC_API_*.cy.js"`.
4. **CREATE BACKUP** of all API documentation files.
5. **Increment `Sumario_Executivo.md`** and `Especificacao_Tecnica_API.md`.
6. **Update `Suite_BDD.md`** section 8.2.
7. **Verify** documents.
8. **Allure** — Confirm allure-results.

#### For Performance Tests:
1. **CHECK** if TC exists. If yes, skip.
2. **CODE FIRST — DOCUMENT AFTER:** Create k6 script or Cypress script.
3. **RUN AND CONFIRM** with `k6 run ... --quiet` or `npx cypress run --quiet --spec ...`.
4. **CREATE BACKUP** of all Performance documentation files.
5. **Increment documents** using respective templates.
6. **Update `Relatorio_Resultados_Performance.md`.**
7. **Verify** documents.
8. **Allure** — Confirm allure-results (k6 requires conversion).

---

## Test Case Classification (MANDATORY)

### Classification Rules
1. **Sucesso**: Test that verifies a successful flow.
2. **Erro**: Test that verifies error handling/negative validations.

### Classification Criteria
| Type | Characteristics |
|------|-----------------|
| **Sucesso** | Valid login, Successful registration, Complete checkout, Search with results |
| **Erro** | Invalid credentials, Duplicate email, Invalid form, Search without results |

### Naming Convention (MANDATORY)
- **Test ID Format:** `TC_WEB_###`, `TC_API_###`, `TC_PF_###`
- **File:** `TC_[TYPE]_[###]_[sucesso/erro]_[translated_title].cy.js`

### Test Documentation (MANDATORY)
- Title in Portuguese with `TC_[TYPE]_### - ` prefix in JSDoc.
- Tags: `@sucesso` or `@erro`, `@TC_[TYPE]_###`.
- `describe()`: `TC_WEB_### - [Description in Portuguese]`.
- `it()`: `[verb] [result in Portuguese]`.
- Screenshots: `cy.captura()`.

---

## API Evidence Structure (MANDATORY)

HTML-only evidence in `cypress/screenshots/api/`. Use `generateEvidenceReport` task.

### Evidence Format Standards:
- **WEB (E2E) em Especificações Técnicas:** `**Evidência em GIF:** ![TC_WEB_###](path/to/file.gif)`
- **WEB (E2E) em BDD:** `- **Evidência:** ![TC_WEB_###](path/to/file.gif)`
- **API em Especificações Técnicas:** HTML link.
- **API em BDD:** HTML link.

---

## Execution Protocol

Before creating any selector or when identifying a failure:
1. Open the site and inspect the complete HTML.
2. Search for the most robust level available (data-qa, ID, etc.).
3. **MANDATORY CHECK:** Verify if the selector already exists in the target Page Object. If it exists, REUSE it.
4. Use `Seletores_TEMPLATE.md` as model.
5. Increment `Seletores.md` with new selectors.

---

## Self-Healing Policy (Failure/Restoration)

If a test fails due to a selector error:
1. **Step 1:** Consult `Seletores.md` for documented alternatives.
2. **Step 2:** Use Playwright CLI, Playwright MCP, or Chrome DevTools MCP to inspect.
3. **Step 3:** Fill `Seletores_TEMPLATE.md`.
4. **Step 4:** Update `Seletores.md` and Page Object (mark old selector as `[QUEBRADO]`).

---

## Golden Rules
- **NEVER** use a selector marked as `[QUEBRADO]`.
- **Restoration:** If a broken selector works again, remove the tag but keep history.
- **NEVER enfraquecer ou remover uma asserção para fazer o teste passar.** Se o sistema não implementa a regra de negócio, o teste DEVE falhar. Um falso positivo (teste passa validando nada) é pior que um teste falhando.
- **Falha legítima não é erro de teste.** Se a falha revela que o sistema não cumpre a especificação, documente o bug. Não "corrija" o teste.

---

## Useful Commands

```bash
# Run specific test (silencio máximo)
npx cypress run --spec "cypress/e2e/[test].cy.js" --quiet

# Run on specific browser
npx cypress run --spec "cypress/e2e/[test].cy.js" --browser edge --quiet

# Run all API tests
npx cypress run --spec "cypress/e2e/TC_API_*.cy.js" --quiet
```

## GIF Generation
```bash
cd automationexercise/Cypress
node scripts/gerar_gifs.js
```

## Performance Testing Commands (k6)
```bash
k6 run cypress/e2e/performance/TC_PF_001_smoke_test.js --quiet
k6 run cypress/e2e/performance/TC_PF_005_estresse_api_produtos.js --summary-export=reports/resultado.json --quiet
```
<<<<<<< Updated upstream
 
 ---
 
 **Documento gerado em:** 2026-06-12 (7ª revisão)
=======

---

**Documento gerado em:** 2026-06-12
>>>>>>> Stashed changes
