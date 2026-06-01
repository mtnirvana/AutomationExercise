# 🧪 Automation Exercise — Framework de Automação com IA

[![Cypress](https://img.shields.io/badge/Cypress-15.15.0-69D3A7)](https://www.cypress.io/)
[![k6](https://img.shields.io/badge/k6-2.0+-7D64FF)](https://k6.io/)
[![Node](https://img.shields.io/badge/Node-20.19.5-339933)](https://nodejs.org/)
[![Allure](https://img.shields.io/badge/Allure-2.42.0-orange)](https://allurereport.org/)
[![Playwright CLI](https://img.shields.io/badge/Playwright_CLI-1.0+-45ba4b)](https://github.com/microsoft/playwright-cli)
[![Chrome DevTools MCP](https://img.shields.io/badge/Chrome_DevTools_MCP-latest-FFD700)](https://github.com/ChromeDevTools/chrome-devtools-mcp)
[![Playwright MCP](https://img.shields.io/badge/Playwright_MCP-latest-45ba4b)](https://github.com/microsoft/playwright-mcp)
[![Selenium MCP](https://img.shields.io/badge/Selenium_MCP-latest-43B02A)](https://github.com/angiejones/mcp-selenium)

Framework de automação de testes para o site [Automation Exercise](https://www.automationexercise.com) — uma loja virtual de demonstração — que integra **testes funcionais (E2E + API)**, **testes de performance (k6)**, **auditoria front-end (Lighthouse/Core Web Vitals)** e **geração automatizada de todo o ciclo de QA** — scripts, Page Objects, documentação técnica e executiva, evidências visuais e manutenção contínua via self-healing.

**Stack:** Cypress (Page Object Model - POM, data factories, screenshots numerados, GIFs, scripts comentados) · k6 (smoke, carga, estresse, resistência, pico, auditoria de imagens) · Lighthouse (LCP, CLS, TTFB, FCP, INP) · Playwright CLI (self-healing e inspeção de seletores) · governança por IA que padronizam e automatizam o ciclo completo de QA.

Arquitetura orientada a **alta manutenibilidade e repetibilidade**: Page Objects centralizam seletores, fixtures isolam dados, factories geram dados únicos, `beforeEach` global e `cy.captura()` eliminam duplicação. Framework escalável do Automation Exercise para E2E, API, performance e auditoria visual.

**61 casos de teste no Allure** · 26 E2E Web · 14 API · 13 Performance (k6) · 1 Core Web Vitals (Cypress, 8 checks)

---

---

## 📋 Sumário

- [Stack](#stack)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar](#como-executar)
- [Testes E2E Web](#testes-e2e-web-26)
- [Testes de API](#testes-de-api-14)
- [Testes de Performance](#testes-de-performance-14)
- [Evidências](#evidencias)
- [Documentação](#documentacao)
- [🤖 Uso com Agentes de IA](#uso-com-agentes-de-ia)
- [Documentação IA](#documentacao-ia)
- [Rastreabilidade Histórica](#rastreabilidade-historica)

---

<a name="stack"></a>
## 🛠 Stack

| Ferramenta | Versão | Finalidade |
|:-----------|:------:|:-----------|
| [Cypress](https://www.cypress.io/) | 15.15.0 | Testes E2E, API e Core Web Vitals |
| [k6](https://k6.io/) | 2.0+ | Testes de performance e carga |
| [Playwright CLI](https://github.com/microsoft/playwright-cli) | 1.0+ | Self-healing e inspeção de seletores  |
| [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) | latest | Debugging ativo — console, network, performance, Lighthouse |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) | latest | Automação de navegação, formulários e fluxos E2E |
| [Selenium MCP](https://github.com/angiejones/mcp-selenium) | latest | Fluxos legados e compatibilidade WebDriver |
| [Allure](https://allurereport.org/) | 2.42.0 | Relatório interativo dos testes (pt-BR + dark mode) |
| [gifencoder](https://www.npmjs.com/package/gifencoder) | 2.x | Geração de GIFs animados |
| [canvas](https://www.npmjs.com/package/canvas) | 2.x | Processamento de imagens |
| [Node.js](https://nodejs.org/) | 20.19.5 | Runtime |

---

<a name="estrutura-do-projeto"></a>
## 🏗 Estrutura do Projeto

```
antigravity PORTFOLIO/
│
├── AGENTS.md                                      # Governança para agentes de IA
├── README.md                                      # Este arquivo
│
├── automationexercise/
│   ├── install_all.sh                             # Instala todas as dependências
│   │
│   ├── Cypress/                                   # Motor de automação
│   │   ├── cypress.config.js                      # Config: trash, video, reporter, after:spec
│   │   ├── run_all.bat                            # Script único: Cypress + k6 + GIFs + relatório
│   │   ├── package.json                           # Dependências Node (Cypress, Allure, etc.)
│   │   ├── scripts/                               # Utilitários
│   │   │   └── gerar_gifs.js                      # Gera GIFs animados
│   │   │
│   │   ├── cypress/
│   │   │   ├── e2e/
│   │   │   │   ├── web/                           # 26 testes E2E Web (TC_WEB_001-TC_WEB_026)
│   │   │   │   ├── api/                           # 14 testes de API (TC_API_001-TC_API_014)
│   │   │   │   └── performance/                   # 13 k6 + 1 Cypress Core Web Vitals
│   │   │   │
│   │   │   ├── pages/                             # 9 Page Objects (POM)
│   │   │   │   ├── index.js                       # Exportação centralizada dos pages
│   │   │   │   ├── HomePage.js                    # Página inicial, cabeçalho, rodapé
│   │   │   │   ├── LoginPage.js                   # Página de login e signup
│   │   │   │   ├── SignupPage.js                  # Página de cadastro completo
│   │   │   │   ├── AccountPage.js                 # Página de confirmação (criação/exclusão)
│   │   │   │   ├── ContactUsPage.js               # Página de formulário de contato
│   │   │   │   ├── TestCasesPage.js               # Página de casos de teste
│   │   │   │   ├── ProductsPage.js                # Página de produtos (listagem, busca, detalhe)
│   │   │   │   └── CheckoutPage.js                # Página de checkout e pagamento
│   │   │   │
│   │   │   ├── data/                              # Factories
│   │   │   │   └── userFactory.js                 # Dados dinâmicos únicos por execução
│   │   │   │
│   │   │   ├── fixtures/                          # Dados estáticos
│   │   │   │   ├── users.json                     # Credenciais e dados de pagamento
│   │   │   │   ├── products.json                  # Produtos, categorias, marcas
│   │   │   │   ├── contact.json                   # Mensagens e assuntos
│   │   │   │   ├── ui_texts.json                  # Labels, headers, erros, botões
│   │   │   │   └── test_file.txt                  # Arquivo de teste para upload
│   │   │   │
│   │   │   ├── support/                           # Comandos customizados
│   │   │   │   └── e2e.js                         # beforeEach centralizado + cy.captura()
│   │   │   │
│   │   │   ├── downloads/                         # Downloads temporários (faturas)
│   │   │   ├── screenshots/                       # Evidências visuais (resetado a cada run)
│   │   │   │   ├── web/                           # PNGs + GIFs por spec
│   │   │   │   ├── api/                           # HTML reports das APIs
│   │   │   │   └── performance/                   # PNGs + GIF do TC_PF_008
│   │   │   │
│   │   │   ├── reports/                           # Relatórios de execução
│   │   │   │   └── k6/                            # JSONs do k6 --summary-export
│   │   │   │
│   │   │   ├── allure/                            # Relatórios Allure (dark mode + pt-BR)
│   │   │   │   ├── package.json                   # allure-commandline
│   │   │   │   ├── allure.properties              # Tema escuro + idioma pt-BR
│   │   │   │   ├── allure-results/                # Resultados das execuções (gerado pelo Cypress)
│   │   │   │   ├── allure-report/                 # Relatório HTML estático (gerado via npm run generate)
│   │   │   │   └── scripts/                       # Conversores k6 → Allure
│   │   │   │
│   │   │   └── videos/                            # Vídeos das execuções (auto)
│   │   │
│   │   └── .gitignore
│   │
│   ├── docs/                                      # Documentação viva do projeto
│   │   ├── Sumario_Executivo.md                   # Visão geral, escopo, KPIs, riscos
│   │   ├── Especificacao_Tecnica_Web.md           # Plano detalhado dos 26 testes E2E
│   │   ├── Especificacao_Tecnica_API.md           # Plano detalhado dos 14 testes de API
│   │   ├── Especificacao_Tecnica_Performance.md   # Plano detalhado dos 14 testes de performance
│   │   ├── Suite_BDD.md                           # Cenários em Gherkin para stakeholders
│   │   ├── Relatorio_Resultados_Performance.md    # Métricas e resultados consolidados (k6 + Lighthouse)
│   │   └── Relatorio_Testes.lnk                   # Atalho → sobe Allure serve + abre em http://localhost:8765
│   │
│   └── templates/                                 # Modelos e documentação para IA
│       ├── Sumario_Executivo_TEMPLATE.md          # Template do Sumário Executivo
│       ├── Especificacao_Tecnica_Web_TEMPLATE.md  # Template de especificação técnica (E2E Web)
│       ├── Especificacao_Tecnica_API_TEMPLATE.md  # Template de especificação técnica (API)
│       ├── Especificacao_Tecnica_Performance_TEMPLATE.md # Template de especificação técnica (Performance)
│       ├── Suite_BDD_TEMPLATE.md                  # Template de cenários BDD (Gherkin)
│       ├── Relatorio_Resultados_Performance_TEMPLATE.md # Template de relatório de resultados
│       ├── Guia_Cypress_Template.md               # Template de codificação e padrões do projeto
│       └── Seletores.md                           # Histórico de seletores e self-healing (IA)
│
└── Backup/                                        # Backups automáticos de documentação
```

---

<a name="como-executar"></a>
## 🚀 Como Executar

### Instalação Rápida (tudo de uma vez)

```bash
# 1. Baixar o repositório e extrair
# 2. Instalar tudo
cd automationexercise/Cypress
bash install_all.sh
```

### Instalação Manual (passo a passo)

```bash
# 0. Baixar o repositório e extrair
# 1. Dependências Node.js
cd automationexercise/Cypress
npm install

# 2. k6 (testes de performance)
# https://grafana.com/docs/k6/latest/set-up/install/

# 3. Playwright CLI (self-healing)
npx playwright-cli --help

# 4. Allure (relatório interativo)
cd automationexercise/Cypress/cypress/allure
npm install
```

### Chrome DevTools MCP

Adicione ao config do seu cliente MCP:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

> Debugging ativo: console, network, performance traces, Lighthouse, screenshots e snapshots do DOM. [Repositório oficial](https://github.com/ChromeDevTools/chrome-devtools-mcp)

### Playwright MCP

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

> Automação de navegação, formulários, fluxos E2E e validação interativa via accessibility tree. [Repositório oficial](https://github.com/microsoft/playwright-mcp)

### Selenium MCP

```json
{
  "mcpServers": {
    "selenium": {
      "command": "npx",
      "args": ["-y", "@angiejones/mcp-selenium@latest"]
    }
  }
}
```

> Fluxos legados e compatibilidade com Selenium WebDriver (Chrome, Firefox, Edge, Safari). [Repositório oficial](https://github.com/angiejones/mcp-selenium)

### Suíte Completa

```bash
cd automationexercise/Cypress
run_all.bat
```

O `run_all.bat` executa em sequência:

| Etapa | O que faz | Saída |
|:------|:----------|:------|
| 1. Cypress | `npx cypress run` — 41 specs | Screenshots, vídeos, allure-results |
| 2. GIFs | `node scripts/gerar_gifs.js` | GIFs em `screenshots/web/` e `screenshots/performance/` |
| 3. k6 | 13 scripts de performance | JSONs em `reports/k6/` |
| 4. k6 → Allure | `node cypress/allure/scripts/convert_k6_to_allure.js` | Resultados k6 em allure-results |
| 5. Allure Generate | `npm run pre-generate` + `allure generate` | Relatório em `allure-report/` |
| — | Atalho do relatório | `docs/Relatorio_Testes.lnk` — abre servidor + navegador |

### Execuções Individuais

```bash
cd automationexercise/Cypress

# Todos os testes
npx cypress run

# Apenas E2E Web
npx cypress run --spec "cypress/e2e/web/*.cy.js"

# Apenas API
npx cypress run --spec "cypress/e2e/api/*.cy.js"

# Teste específico
npx cypress run --spec "cypress/e2e/web/TC_WEB_001_sucesso_registrar_usuario.cy.js"

# Relatório Allure (após rodar os testes)
cd automationexercise/Cypress/cypress/allure
npm run generate              # Gera o relatório HTML a partir dos resultados
npm run open                  # Abre o relatório em http://localhost:8765
npm run serve                 # Gera + serve diretamente em http://localhost:8765

# Teste de performance (k6)
k6 run cypress/e2e/performance/TC_PF_001_smoke_test.js

# Modo interativo
npx cypress open
```

---

<a name="testes-e2e-web-26"></a>
## 📊 Testes E2E Web (26)

| ID | Teste | Tipo | Grupo |
|:---|:------|:----:|:------|
| TC_WEB_001 | Registrar novo usuário | ✅ | Identidade |
| TC_WEB_002 | Login com credenciais corretas | ✅ | Identidade |
| TC_WEB_003 | Login com credenciais incorretas | ❌ | Identidade |
| TC_WEB_004 | Logout | ✅ | Identidade |
| TC_WEB_005 | Registrar com email existente | ❌ | Identidade |
| TC_WEB_006 | Formulário de contato | ✅ | Comunicação |
| TC_WEB_007 | Verificar página de casos de teste | ✅ | Comunicação |
| TC_WEB_008 | Listar produtos + detalhes | ✅ | Catálogo |
| TC_WEB_009 | Pesquisar produto | ✅ | Catálogo |
| TC_WEB_010 | Assinatura na página inicial | ✅ | Comunicação |
| TC_WEB_011 | Assinatura na página do carrinho | ✅ | Comunicação |
| TC_WEB_012 | Adicionar produtos ao carrinho | ✅ | Carrinho |
| TC_WEB_013 | Verificar quantidade no carrinho | ✅ | Carrinho |
| TC_WEB_014 | Fazer pedido (registrar no checkout) | ✅ | Checkout |
| TC_WEB_015 | Fazer pedido (registrar antes) | ✅ | Checkout |
| TC_WEB_016 | Fazer pedido (login antes) | ✅ | Checkout |
| TC_WEB_017 | Remover produtos do carrinho | ✅ | Carrinho |
| TC_WEB_018 | Visualizar por categoria | ✅ | Catálogo |
| TC_WEB_019 | Visualizar por marca | ✅ | Catálogo |
| TC_WEB_020 | Pesquisar + verificar carrinho + login | ✅ | Carrinho |
| TC_WEB_021 | Adicionar avaliação | ✅ | Catálogo |
| TC_WEB_022 | Itens recomendados | ✅ | Carrinho |
| TC_WEB_023 | Detalhes de endereço no checkout | ✅ | Checkout |
| TC_WEB_024 | Baixar fatura | ✅ | Checkout |
| TC_WEB_025 | Scroll com seta | ✅ | UX/UI |
| TC_WEB_026 | Scroll sem seta | ✅ | UX/UI |

**24 Sucesso · 2 Erro**

---

<a name="testes-de-api-14"></a>
## 📊 Testes de API (14)

| ID | Teste | Tipo |
|:---|:------|:----:|
| TC_API_001 | Listar todos os produtos | ✅ |
| TC_API_002 | Listar todas as marcas | ✅ |
| TC_API_003 | Pesquisar produto | ✅ |
| TC_API_004 | Pesquisar sem parâmetro | ❌ |
| TC_API_005 | Verificar login válido | ✅ |
| TC_API_006 | Verificar login sem email | ❌ |
| TC_API_007 | Verificar login inválido | ❌ |
| TC_API_008 | Criar conta | ✅ |
| TC_API_009 | Excluir conta | ✅ |
| TC_API_010 | Atualizar conta | ✅ |
| TC_API_011 | Obter detalhes do usuário | ✅ |
| TC_API_012 | Método POST em productsList | ❌ |
| TC_API_013 | Método PUT em brandsList | ❌ |
| TC_API_014 | Método DELETE em verifyLogin | ❌ |

**8 Sucesso · 6 Erro**

---

<a name="testes-de-performance-14"></a>
## 📊 Testes de Performance (14)

| ID | Cenário | Tipo | Status |
|:---|:--------|:----:|:------:|
| TC_PF_001 | Smoke test | Validação | ✅ |
| TC_PF_002 | Carga Homepage | Carga | ✅ |
| TC_PF_003 | Carga API Produtos | Carga | ⚠️ |
| TC_PF_004 | Carga API Login | Carga | ✅ |
| TC_PF_005 | Estresse API Produtos | Estresse | ⚠️ |
| TC_PF_006 | Resistência (Soak) | Resistência | ✅ |
| TC_PF_007 | Pico (Spike) | Pico | ⚠️ |
| TC_PF_008 | Core Web Vitals | Lighthouse | ✅ |
| TC_PF_009 | Fluxo Checkout | Carga | ✅ |
| TC_PF_010 | Auditoria de Imagens | Auditoria | ✅ |
| TC_PF_011 | Carga Update Account | Carga | ✅ |
| TC_PF_012 | Carga User Details | Carga | ✅ |
| TC_PF_013 | Carga Search Product | Carga | ✅ |
| TC_PF_014 | Carga Página Produtos | Carga | ✅ |

**12 ✅ · 2 ⚠️** (rate limiting Cloudflare)

---

<a name="evidencias"></a>
## 📸 Evidências

Cada execução gera screenshots PNG de cada passo, vídeos e relatórios HTML. O GIF abaixo ilustra o fluxo completo do checkout — 26 steps, ~50s de execução:

### TC_WEB_015 — Pedido registrando antes do checkout

![TC_WEB_015](automationexercise/Cypress/cypress/screenshots/web/TC_WEB_015_sucesso_fazer_pedido_registrar_antes_checkout.cy.js/TC_WEB_015_sucesso_fazer_pedido_registrar_antes_checkout.gif)

> GIF gerado automaticamente via `scripts/gerar_gifs.js` a partir dos PNGs de cada passo.

Cada TC na [Especificação Técnica Web](automationexercise/docs/Especificacao_Tecnica_Web.md) possui seu próprio GIF inline.

---

<a name="documentacao"></a>
## 📄 Documentação

| Documento | Conteúdo |
|:----------|:---------|
| [`Sumario_Executivo.md`](automationexercise/docs/Sumario_Executivo.md) | Visão geral, escopo, KPIs, riscos, ambiente |
| [`Especificacao_Tecnica_Web.md`](automationexercise/docs/Especificacao_Tecnica_Web.md) | Plano detalhado dos 26 testes E2E com GIFs |
| [`Especificacao_Tecnica_API.md`](automationexercise/docs/Especificacao_Tecnica_API.md) | Plano detalhado dos 14 testes de API |
| [`Especificacao_Tecnica_Performance.md`](automationexercise/docs/Especificacao_Tecnica_Performance.md) | Plano detalhado dos 14 testes de performance |
| [`Suite_BDD.md`](automationexercise/docs/Suite_BDD.md) | Cenários em Gherkin para stakeholders |
| [`Relatorio_Resultados_Performance.md`](automationexercise/docs/Relatorio_Resultados_Performance.md) | Métricas e resultados consolidados (k6 + Lighthouse) |
| [`Relatorio_Testes.lnk`](automationexercise/docs/Relatorio_Testes.lnk) | Atalho → abre servidor Allure com relatório completo |

---

<a name="uso-com-agentes-de-ia"></a>
## 🤖 Uso com Agentes de IA

O [`AGENTS.md`](AGENTS.md) é o núcleo de governança do framework. Ele define como a IA deve atuar em cada etapa do ciclo de QA, desde a geração de scripts até o self-healing de seletores. O agente não se limita a documentar — ele **orquestra o ciclo completo do framework**:

1. **Geração de scripts de teste** — Cria arquivos `.cy.js` no padrão Page Object Model, com steps numerados e comentados em português, seguindo a nomenclatura definida no projeto
2. **Page Objects e abstração** — Mantém `pages/*.js`, `fixtures/*.json`, `data/userFactory.js`, garantindo isolamento total entre camadas
3. **Self-healing de seletores** — Consulta [`templates/Seletores.md`](automationexercise/templates/Seletores.md) para alternativas antes de inspecionar o live site; marca seletores como `[QUEBRADO]` e `[RESTAURADO]` com datas. Não reutiliza seletores quebrados a menos que o seletor volte a funcionar — nesse caso, reutiliza mantendo o histórico de quebra/restauração
4. **Documentação completa** — Gera Sumário Executivo, BDD, Especificações Técnicas e Relatório de Resultados seguindo o padrão ouro do mercado em 2026 para cada documentação e scripts.
5. **Evidências visuais** — Screenshots numerados, GIFs animados, HTML reports, consolidado histórico

O agente utiliza **ferramentas atuais de IA**: skills, MCPs (Chrome DevTools, Playwright, Selenium) e live inspection do DOM para decisões de implementação.

Os [**templates**](automationexercise/templates/) são a fonte única de verdade para estrutura. Cada template mapeia seção por seção, tabela por tabela. O agente DEVE:

1. Ler o template correspondente ao tipo de teste
2. Espelhar a estrutura sem desvios
3. Preencher cada campo com os dados reais

Isso transforma o projeto em um **framework dirigido por IA**: todo artefato — script, documento, GIF, relatório — segue o mesmo padrão, independentemente do modelo de IA usado, garantindo consistência e rastreabilidade em toda a suíte.

---

<a name="documentacao-ia"></a>
## 📋 Documentação IA

Documentos de suporte utilizados exclusivamente pelo agente de IA para geração e manutenção de testes:

| Documento | Conteúdo |
|:----------|:---------|
| [`Guia_Cypress_Template.md`](automationexercise/templates/Guia_Cypress_Template.md) | Padrões de codificação, nomenclatura e boas práticas |
| [`Seletores.md`](automationexercise/templates/Seletores.md) | Histórico de seletores e self-healing |
| [`Sumario_Executivo_TEMPLATE.md`](automationexercise/templates/Sumario_Executivo_TEMPLATE.md) | Template do Sumário Executivo |
| [`Especificacao_Tecnica_Web_TEMPLATE.md`](automationexercise/templates/Especificacao_Tecnica_Web_TEMPLATE.md) | Template de especificação técnica (E2E Web) |
| [`Especificacao_Tecnica_API_TEMPLATE.md`](automationexercise/templates/Especificacao_Tecnica_API_TEMPLATE.md) | Template de especificação técnica (API) |
| [`Especificacao_Tecnica_Performance_TEMPLATE.md`](automationexercise/templates/Especificacao_Tecnica_Performance_TEMPLATE.md) | Template de especificação técnica (Performance) |
| [`Suite_BDD_TEMPLATE.md`](automationexercise/templates/Suite_BDD_TEMPLATE.md) | Template de cenários BDD (Gherkin) |
| [`Relatorio_Resultados_Performance_TEMPLATE.md`](automationexercise/templates/Relatorio_Resultados_Performance_TEMPLATE.md) | Template de relatório de resultados |

---

<a name="rastreabilidade-historica"></a>
## 📈 Rastreabilidade Histórica

### Relatório Unificado: Allure (Cypress + k6)

O [Allure](https://allurereport.org/) gera um **relatório único** com todos os testes — Cypress E2E, API e performance k6:

- **Visão geral** — Status geral, contagem de testes, tempo de execução
- **Suítes** — Navegação por grupo (Performance com steps de checks, testes de API)
- **Comportamentos** — Organização por funcionalidade (Performance - Carga, Smoke, API - Catálogo, etc.)
- **Gráficos** — Status, duração, severidade, tendências históricas
- **Linha do tempo** — Timeline completa de execução
- **Histórico** — Acumula execuções ao longo de dias/meses (append-only via `history/`)

```bash
# Tudo de uma vez:
cd automationexercise/Cypress/cypress/allure
npm run full

# Ou passo a passo:
npm run k6-to-allure       # Converte resultados k6 para Allure
npm run pre-generate       # Prepara config + restaura histórico
npm run generate           # Gera relatório em allure-report/
npm run open               # Abre http://localhost:8765

# Gera relatório estático:
npm run generate           # Gera em allure-report/ (acessível via docs/Relatorio_Testes.lnk)
```

O **histórico** funciona assim:
1. Ao gerar o relatório, o Allure salva `history/` dentro do `allure-report/`
2. O script `pre-generate` copia esse `history/` de volta pra `allure-results/` antes da próxima geração
3. Isso acumula dados de múltiplas execuções — dias, semanas, meses
4. Os gráficos de tendência mostram a evolução ao longo do tempo

---

**Documento gerado em:** 2026-06-01

