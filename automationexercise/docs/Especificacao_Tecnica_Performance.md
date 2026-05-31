# Especificação Técnica Performance - Automation Exercise
**Versão:** 1.0.0<br>
**Responsável:** Rafael Barelli<br>
**Ferramenta:** k6 (Grafana Labs) v2.0.0<br>
**Metodologia:** ISTQB (CTFL) - Testes de Performance

---

## 1. Introdução Técnica

Este documento fornece o detalhamento operacional para a execução e manutenção dos testes de performance do **Automation Exercise**. Ele serve como guia para engenheiros de QA, descrevendo a configuração técnica de cada cenário, os thresholds estabelecidos e as validações aplicadas.

### 1.1 Premissas de Execução
- **Clean Slate:** Cada teste é independente — dados de criação de conta usam timestamp único para evitar conflitos.
- **Design Pattern:** Scripts em JavaScript com uso de `stages`, `thresholds` e `check()` do k6.
- **Dados Dinâmicos:** Uso de `Date.now()` para emails únicos em cenários de criação de conta (TC_PF_009).
- **Headless:** Execução via CLI (sem GUI), modo non-interactive.

### 1.2 Arquitetura do Alvo
- **Site:** https://www.automationexercise.com
- **Framework:** jQuery (sem SPA)
- **CDN/Proxy:** Cloudflare
- **Servidor:** Nginx
- **API:** REST — retorna JSON com `responseCode`, `message`, `products`, `brands`

---

## 2. Padrões de Validação

| Elemento | Padrão Técnico |
|:--- |:---|
| **Ferramenta** | k6 via CLI (`k6 run script.js`) |
| **Configuração** | `export const options = { stages, thresholds }` |
| **Requisições** | `http.get()` e `http.post()` do módulo `k6/http` |
| **Asserções** | `check(res, { 'descricao': (r) => condição })` |
| **Thresholds** | Limites de performance no objeto `options.thresholds` |
| **Evidências** | Terminal output (stdout) + JSON export (`--summary-export`). Relatório unificado no **Allure Report**. |
| **Parâmetros** | Headers `Content-Type: application/x-www-form-urlencoded` |
| **Sleep** | `sleep(N)` entre iterações para simular comportamento realista |

### 2.1 Estrutura Padrão de um Script

```javascript
import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = 'https://www.automationexercise.com'

export const options = {
  stages: [
    { duration: '20s', target: 100 },  // ramp-up
    { duration: '3m', target: 100 },   // hold
    { duration: '10s', target: 0 },    // ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
}

export default function () {
  const res = http.get(`${BASE_URL}/api/productsList`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  check(res, {
    'status 200': (r) => r.status === 200,
  })
  sleep(0.5)
}
```

---

## 3. Catálogo Resumido de Cenários (TC_PF_001 - TC_PF_014)

| ID | Título | Tipo | Carga | Duração Total |
|:---|:-------|:----:|:-----:|:-------------:|
| **TC_PF_001** | Smoke test de validação do pipeline | Smoke | 1 VU | ~1s |
| **TC_PF_002** | Carga concorrente na página inicial | Carga | 50 VUs | ~3,5min |
| **TC_PF_003** | Carga no endpoint /api/productsList | Carga | 50→100 VUs | ~3,5min |
| **TC_PF_004** | Carga no endpoint /api/verifyLogin | Carga | 30 VUs | ~2,5min |
| **TC_PF_005** | Estresse progressivo no /api/productsList | Estresse | 25→300 VUs | ~5,5min |
| **TC_PF_006** | Resistência sustentada com mix de endpoints | Resistência | 50 VUs | ~5,5min |
| **TC_PF_007** | Pico repentino de tráfego | Pico | 10→200→10 VUs | ~3,5min |
| **TC_PF_008** | Métricas Core Web Vitals (Lighthouse) | Front-end | 1 usuário | ~5min |
| **TC_PF_009** | Carga no fluxo completo de checkout | Carga | 20 VUs | ~2,5min |
| **TC_PF_010** | Análise de tamanho e formato de imagens | Auditoria | 1 VU | ~1min |
| **TC_PF_011** | Carga no endpoint PUT /api/updateAccount | Carga | 20 VUs | ~2,5min |
| **TC_PF_012** | Carga no endpoint GET /api/getUserDetailByEmail | Carga | 20 VUs | ~2,5min |
| **TC_PF_013** | Carga no endpoint POST /api/searchProduct | Carga | 30 VUs | ~2,5min |
| **TC_PF_014** | Carga na página de produtos (/products) | Carga | 30 VUs | ~2,5min |

---

## 4. Detalhamento Exaustivo de Cenários

### 4.1 Grupo: Testes de Validação (TC_PF_001)

---

#### TC_PF_001 - Smoke test de validação do pipeline

**Objetivo:** Validar que o ambiente de teste, o script k6 e as APIs estão funcionando corretamente.<br>
**Tipo:** Smoke<br>
**Criticidade:** Alta<br>
**Configuração:** 1 VU, 1 iteração, sem ramp-up<br>
**Thresholds:** `http_req_duration p(95) < 5000`, `http_req_failed rate < 0,01`

**Script:** [`TC_PF_001_smoke_test.js`](../Cypress/cypress/e2e/performance/TC_PF_001_smoke_test.js)

**Passos de Validação:**

| Passo | Ação | Endpoint | Validação |
|:----:|:-----|:---------|:----------|
| 1 | Enviar requisição GET | GET /api/productsList | Status 200 |
| 2 | Validar responseCode | body.responseCode | Igual a 200 |
| 3 | Validar array de produtos | body.products | É um array |
| 4 | Validar products.length | body.products.length | Maior que 0 |
| 5 | Enviar requisição GET | GET /api/brandsList | Status 200 |
| 6 | Validar responseCode brands | body.responseCode | Igual a 200 |
| 7 | Validar array de brands | body.brands | É um array |
| 8 | Enviar requisição POST | POST /api/verifyLogin | Status 200 |
| 9 | Validar mensagem de login | body.message | Igual a "User exists!" |

---

### 4.2 Grupo: Testes de Carga - Web (TC_PF_002)

---

#### TC_PF_002 - Carga concorrente na página inicial

**Objetivo:** Validar a performance da homepage com 50 usuários simultâneos.<br>
**Tipo:** Carga (Load)<br>
**Criticidade:** Alta<br>
**Configuração:** Ramp-up 30s para 50 VUs, sustentar 3min, ramp-down 10s<br>
**Thresholds:** `http_req_duration p(95) < 3000`, `http_req_failed rate < 0,05`

**Script:** [`TC_PF_002_carga_homepage.js`](../Cypress/cypress/e2e/performance/TC_PF_002_carga_homepage.js)

**Stages:**
```javascript
[
  { duration: '30s', target: 50 },
  { duration: '3m', target: 50 },
  { duration: '10s', target: 0 },
]
```

**Passos de Validação:**

| Passo | Ação | Validação |
|:----:|:-----|:----------|
| 1 | 50 VUs acessam GET / | Status 200 |
| 2 | Medir latência total | http_req_duration p95 < 3000ms |
| 3 | Verificar taxa de erro | http_req_failed rate < 0,05 |

---

### 4.3 Grupo: Testes de Carga - API (TC_PF_003 - TC_PF_004)

---

#### TC_PF_003 - Carga no endpoint /api/productsList

**Objetivo:** Validar throughput e latência da API de listagem de produtos com até 100 usuários simultâneos.<br>
**Tipo:** Carga (Load)<br>
**Criticidade:** Alta<br>
**Configuração:** Ramp-up 20s para 50 VUs, sustentar 1min, ramp-up 20s para 100 VUs, sustentar 1min, ramp-down 10s<br>
**Thresholds:** `http_req_duration p(95) < 8000`, `http_req_failed rate < 0,40`

**Script:** [`TC_PF_003_carga_api_produtos.js`](../Cypress/cypress/e2e/performance/TC_PF_003_carga_api_produtos.js)

**Stages:**
```javascript
[
  { duration: '20s', target: 50 },
  { duration: '1m', target: 50 },
  { duration: '20s', target: 100 },
  { duration: '1m', target: 100 },
  { duration: '10s', target: 0 },
]
```

**Passos de Validação:**

| Passo | Ação | Endpoint | Validação |
|:----:|:-----|:---------|:----------|
| 1 | 50→100 VUs GET | /api/productsList | Status 200 |
| 2 | Validar Content-Type | response.headers | application/json |
| 3 | Validar responseCode | body.responseCode | Igual a 200 |
| 4 | Validar array | body.products | É um array |
| 5 | Validar tamanho | body.products.length | Maior que 0 |

> **Nota:** O threshold `http_req_failed rate < 0,40` tolera até 40% de erro devido ao rate limiting do Cloudflare. Em condições normais (sem rate limit), a taxa de erro é 0%.

#### TC_PF_004 - Carga no endpoint /api/verifyLogin

**Objetivo:** Validar tempo de resposta da autenticação com 30 usuários simultâneos.<br>
**Tipo:** Carga (Load)<br>
**Criticidade:** Média<br>
**Configuração:** Ramp-up 15s para 30 VUs, sustentar 2min, ramp-down 10s<br>
**Dados:** Credenciais fixas (teste123@hotmail.com / 123456R@)<br>
**Sleep:** 1s entre iterações (comportamento humano)<br>
**Thresholds:** `http_req_duration p(95) < 5000`, `http_req_failed rate < 0,10`

**Script:** [`TC_PF_004_carga_api_login.js`](../Cypress/cypress/e2e/performance/TC_PF_004_carga_api_login.js)

**Passos de Validação:**

| Passo | Ação | Endpoint | Validação |
|:----:|:-----|:---------|:----------|
| 1 | 30 VUs POST com credenciais | POST /api/verifyLogin | Status 200 |
| 2 | Validar Content-Type | response.headers | application/json |
| 3 | Validar mensagem | body.message | "User exists!" |

---

### 4.4 Grupo: Teste de Estresse (TC_PF_005)

---

#### TC_PF_005 - Estresse progressivo no /api/productsList

**Objetivo:** Encontrar o ponto de ruptura da API aumentando progressivamente a carga.<br>
**Tipo:** Estresse (Stress)<br>
**Criticidade:** Alta<br>
**Configuração:** Stages progressivos: 25 (baseline) → 50 → 100 → 200 → **300** VUs (reduzido de 500 para evitar bloqueio total do Cloudflare)<br>
**Thresholds:** `http_req_duration p(95) < 10000`, `http_req_failed rate < 0,60`

**Script:** [`TC_PF_005_estresse_api_produtos.js`](../Cypress/cypress/e2e/performance/TC_PF_005_estresse_api_produtos.js)

**Stages:**
```javascript
[
  { duration: '30s', target: 25 },   // Baseline
  { duration: '30s', target: 50 },   // Limite Cloudflare
  { duration: '1m', target: 100 },   // Rate limit esperado
  { duration: '1m', target: 200 },   // Degradação severa
  { duration: '1m', target: 300 },   // Ponto de ruptura (reduzido)
  { duration: '30s', target: 0 },    // Recuperação
]
```

**Passos de Validação:**

| Passo | Stage | VUs | Validação |
|:----:|:------|:---:|:----------|
| 1 | Baseline | 25 | Status 200 |
| 2 | Limite Cloudflare | 50 | Status 200 |
| 3 | Rate limit esperado | 100 | Identificar degradação |
| 4 | Degradação severa | 200 | Identificar ponto de ruptura |
| 5 | Limite máximo | 300 | Limite máximo do servidor (reduzido) |

---

### 4.5 Grupo: Teste de Resistência (TC_PF_006)

---

#### TC_PF_006 - Resistência sustentada com mix de endpoints

**Objetivo:** Detectar degradação gradual ou memory leak com carga constante por 5 minutos.<br>
**Tipo:** Resistência (Soak)<br>
**Criticidade:** Média<br>
**Configuração:** 50 VUs, 5min hold, mix de 4 endpoints via `__ITER % 4`<br>
**Thresholds:** `http_req_duration p(95) < 3000`, `http_req_failed rate < 0,01`

**Script:** [`TC_PF_006_resistencia_soak.js`](../Cypress/cypress/e2e/performance/TC_PF_006_resistencia_soak.js)

**Distribuição de Endpoints:**

| Iteração | Endpoint | Método |
|:--------:|:---------|:-----:|
| 0 | /api/productsList | GET |
| 1 | /api/brandsList | GET |
| 2 | /api/verifyLogin | POST |
| 3 | /api/searchProduct | POST |

**Passos de Validação:**

| Passo | Ação | Validação |
|:----:|:-----|:----------|
| 1 | 50 VUs por 5min com mix de endpoints | Estabilidade |
| 2 | Comparar latência minuto 1 vs minuto 5 | Degradação < 20% |
| 3 | Verificar taxa de erro contínua | < 1% |

---

### 4.6 Grupo: Teste de Pico (TC_PF_007)

---

#### TC_PF_007 - Pico repentino de tráfego

**Objetivo:** Validar que o sistema se recupera após um pico repentino de 200 VUs.<br>
**Tipo:** Pico (Spike)<br>
**Criticidade:** Média<br>
**Configuração:** Baseline 10 VUs (30s) → Spike 200 VUs (5s) → Hold 200 (30s) → Recuperação 10 VUs (30s) → Validar recuperação (30s)<br>
**Thresholds:** `http_req_duration p(95) < 8000`, `http_req_failed rate < 0,30`

**Script:** [`TC_PF_007_pico_spike.js`](../Cypress/cypress/e2e/performance/TC_PF_007_pico_spike.js)
Nota: Spike reduzido de 500 para 200 VUs para evitar bloqueio total do Cloudflare. Mesmo com 200 VUs, o rate limiting do Cloudflare causa ~80% de falha — comportamento esperado e documentado.

**Stages:**
```javascript
[
  { duration: '30s', target: 10 },  // Baseline
  { duration: '5s', target: 200 },  // Spike (reduzido)
  { duration: '30s', target: 200 }, // Hold pico
  { duration: '30s', target: 10 },  // Recuperação
  { duration: '30s', target: 10 },  // Validar recuperação
]
```

**Passos de Validação:**

| Passo | Fase | VUs | Validação |
|:----:|:-----|:---:|:----------|
| 1 | Baseline | 10 | Latência normal |
| 2 | Spike | 200 | Sem crash |
| 3 | Hold pico | 200 | Erro < 30% |
| 4 | Recuperação | 10 | Recuperar baseline |

---

### 4.7 Grupo: Teste de Front-end (TC_PF_008)

---

#### TC_PF_008 - Métricas Core Web Vitals (Lighthouse)

**Objetivo:** Coletar LCP, FCP, CLS e TTFB da homepage via Lighthouse.<br>
**Tipo:** Front-end<br>
**Criticidade:** Média<br>
**Configuração:** 8 paginas criticas, 1 execucao cada, navegacao real via Cypress<br>
**Ferramenta:** Cypress + Chrome DevTools (Lighthouse)

**Script (Cypress):** `automationexercise/Cypress/cypress/e2e/performance/TC_PF_008_core_web_vitals.cy.js`

**Execução:**
```bash
cd automationexercise/Cypress
npx cypress run --spec "cypress/e2e/performance/TC_PF_008_core_web_vitals.cy.js" --browser edge
```

**Páginas Testadas (8 páginas críticas):**

| Página | TCs Cobertos | LCP | CLS | TTFB |
|:-------|:-------------|:---:|:---:|:----:|
| Homepage (/) | TC_WEB_010 | **1.440ms** | 0,01 | 783ms |
| Produtos (/products) | TC_WEB_008, TC_WEB_009 | **1.080ms** | 0,02 | 794ms |
| Login (/login) | TC_WEB_001, TC_WEB_002, TC_WEB_003 | **1.028ms** | 0,00 | 901ms |
| Detalhe Produto (/product_details/1) | TC_WEB_008, TC_WEB_013 | **1.002ms** | 0,01 | 735ms |
| Carrinho (/view_cart) | TC_WEB_012, TC_WEB_017, TC_WEB_020 | **836ms** | 0,01 | 695ms |
| Checkout (/checkout) | TC_WEB_014, TC_WEB_015, TC_WEB_016, TC_WEB_023 | **888ms** | 0,00 | 731ms |
| Contato (/contact_us) | TC_WEB_006 | 993ms | 0,00 | 860ms |
| Casos de Teste (/test_cases) | TC_WEB_007 | - | - | - |

**Passos de Validação (por página):**

| Passo | Ação | Validação |
|:----:|:-----|:----------|
| 1 | Visitar pagina via Cypress com `onBeforeLoad` injetando PerformanceObservers | LCP e CLS capturados |
| 2 | Aguardar carregamento completo (body visivel + 2s) | - |
| 3 | Coletar metricas de performance (`window.__perfMetrics` e `performance.getEntriesByType('navigation')`) | LCP, CLS, FCP, TTFB lidos |
| 4 | Validar LCP, CLS e TTFB contra SLAs | LCP < 2500ms, CLS < 0,1, TTFB < 1000ms |
| 5 | Screenshot via `cy.captura()` | Evidencia visual |

**Evidências:** Lighthouse (gerado sob demanda via Chrome DevTools) + screenshots do Cypress em `cypress/screenshots/performance/TC_PF_008_core_web_vitals.cy.js/`

**Evidência em GIF:** ![TC_PF_008](../Cypress/cypress/screenshots/performance/TC_PF_008_core_web_vitals.cy.js/TC_PF_008_core_web_vitals.gif)

---

### 4.8 Grupo: Teste de Fluxo de Negócio (TC_PF_009)

---

#### TC_PF_009 - Carga no fluxo completo de checkout

**Objetivo:** Validar o funil de conversão completo (criar conta → login → listar → excluir) sob carga.<br>
**Tipo:** Carga (Load) - Fluxo Misto<br>
**Criticidade:** Alta<br>
**Configuração:** 20 VUs, ramp-up 20s, hold 2min, cada VU executa a cadeia completa<br>
**Dados:** Email único via `Date.now()` por iteração<br>
**Thresholds:** `http_req_duration p(95) < 4000`, `http_req_failed rate < 0,05`

**Script:** [`TC_PF_009_carga_checkout.js`](../Cypress/cypress/e2e/performance/TC_PF_009_carga_checkout.js)

**Passos de Validação:**

| Passo | Ação | Endpoint | Validação |
|:----:|:-----|:---------|:----------|
| 1 | Criar conta com email único | POST /api/createAccount | Status 200, responseCode 201 |
| 2 | Validar mensagem | body.message | "User created!" |
| 3 | Login com conta criada | POST /api/verifyLogin | Status 200 |
| 4 | Validar mensagem | body.message | "User exists!" |
| 5 | Listar produtos | GET /api/productsList | Status 200, responseCode 200 |
| 6 | Excluir conta (cleanup) | DELETE /api/deleteAccount | Status 200 |
| 7 | Validar mensagem | body.message | "Account deleted!" |

---

### 4.9 Grupo: Auditoria (TC_PF_010)

---

#### TC_PF_010 - Análise de tamanho e formato de imagens

**Objetivo:** Identificar imagens que excedem thresholds de performance e recomendar compressão.<br>
**Tipo:** Auditoria<br>
**Criticidade:** Baixa<br>
**Configuração:** 1 VU, lista todos os produtos e verifica Content-Length de cada imagem

**Script:** [`TC_PF_010_auditoria_imagens.js`](../Cypress/cypress/e2e/performance/TC_PF_010_auditoria_imagens.js)

**Passos de Validação:**

| Passo | Ação | Endpoint | Validação |
|:----:|:-----|:---------|:----------|
| 1 | Listar todos os produtos | GET /api/productsList | Lista completa |
| 2 | Para cada produto, HEAD da imagem | GET /get_product_picture/{id} | Content-Length |
| 3 | Reportar imagens > 200 KB | - | Threshold violado |
| 4 | Verificar Content-Type | - | JPEG → recomendar WebP |

---

### 4.10 Grupo: Gestão de Usuários - API (TC_PF_011 - TC_PF_012)

---

#### TC_PF_011 - Carga no endpoint PUT /api/updateAccount

**Objetivo:** Validar a atualização de dados do usuário via endpoint PUT sob carga.<br>
**Tipo:** Carga (Load)<br>
**Criticidade:** Alta<br>
**Configuração:** 20 VUs, ramp-up 20s, hold 2min, cada VU executa: criar → atualizar → excluir<br>
**Dados:** Email único via `Date.now()` por iteração. Password consistente em todo o fluxo.<br>
**Thresholds:** `http_req_duration p(95) < 5000`, `http_req_failed rate < 0,15`

**Script:** [`TC_PF_011_carga_atualizar_conta.js`](../Cypress/cypress/e2e/performance/TC_PF_011_carga_atualizar_conta.js)

**Cobre:** TC_API_010 (Atualizar conta de usuário via API)

**Passos de Validação:**

| Passo | Ação | Endpoint | Validação |
|:----:|:-----|:---------|:----------|
| 1 | Criar conta com email único | POST /api/createAccount | Status 200, responseCode 201 |
| 2 | Atualizar conta (mesmo email + password) | PUT /api/updateAccount | Status 200, responseCode 200 |
| 3 | Validar mensagem | body.message | "User updated!" |
| 4 | Excluir conta (cleanup) | DELETE /api/deleteAccount (via http.del) | Status 200, "Account deleted!" |

---

#### TC_PF_012 - Carga no endpoint GET /api/getUserDetailByEmail

**Objetivo:** Validar a consulta de detalhes de usuário por email sob carga.<br>
**Tipo:** Carga (Load)<br>
**Criticidade:** Alta<br>
**Configuração:** 20 VUs, ramp-up 20s, hold 2min, cada VU executa: criar → consultar → excluir<br>
**Dados:** Email único via `Date.now()`. Password consistente.<br>
**Thresholds:** `http_req_duration p(95) < 5000`, `http_req_failed rate < 0,15`

**Script:** [`TC_PF_012_carga_detalhes_usuario.js`](../Cypress/cypress/e2e/performance/TC_PF_012_carga_detalhes_usuario.js)

**Cobre:** TC_API_011 (Obter detalhes do usuário por email via API)

**Passos de Validação:**

| Passo | Ação | Endpoint | Validação |
|:----:|:-----|:---------|:----------|
| 1 | Criar conta com email único | POST /api/createAccount | Status 200, responseCode 201 |
| 2 | Consultar detalhes por email | GET /api/getUserDetailByEmail?email= | Status 200, responseCode 200 |
| 3 | Validar propriedade user | body.user | Existe, não é null |
| 4 | Validar propriedades do usuário | body.user | Possui name e email |
| 5 | Excluir conta (cleanup) | DELETE /api/deleteAccount (via http.del) | Status 200, "Account deleted!" |

---

### 4.11 Grupo: Busca de Produtos (TC_PF_013)

---

#### TC_PF_013 - Carga no endpoint POST /api/searchProduct

**Objetivo:** Validar a busca de produtos com múltiplos termos sob carga.<br>
**Tipo:** Carga (Load)<br>
**Criticidade:** Alta<br>
**Configuração:** 30 VUs, ramp-up 20s, hold 2min, 5 termos de busca alternados via `__ITER % 5`<br>
**Dados:** Termos de busca: 'top', 'winter', 'dress', 'shirt', 'blue'<br>
**Thresholds:** `http_req_duration p(95) < 5000`, `http_req_failed rate < 0,05`

**Script:** [`TC_PF_013_carga_pesquisar_produto.js`](../Cypress/cypress/e2e/performance/TC_PF_013_carga_pesquisar_produto.js)

**Cobre:** TC_API_003 (Pesquisar produto por termo via API) + TC_WEB_009 (Pesquisar produto - E2E)

**Observação:** A API retorna `Content-Type: text/html` mesmo quando o body é JSON válido. O script usa `JSON.parse()` diretamente para contornar essa limitação.

### 4.12 Grupo: Páginas Web (TC_PF_014)

---

#### TC_PF_014 - Carga na página de produtos

**Objetivo:** Validar tempo de carregamento da página de listagem de produtos (/products).<br>
**Tipo:** Carga (Load)<br>
**Criticidade:** Média<br>
**Configuração:** Ramp-up 30s para 30 VUs, sustentar 2min, ramp-down 10s<br>
**Thresholds:** `http_req_duration p(95) < 5000`, `http_req_failed rate < 0,05`

**Script:** [`TC_PF_014_carga_pagina_produtos.js`](../Cypress/cypress/e2e/performance/TC_PF_014_carga_pagina_produtos.js)

**Stages:**
```javascript
[
  { duration: '30s', target: 30 },
  { duration: '2m', target: 30 },
  { duration: '10s', target: 0 },
]
```

**Passos de Validação:**

| Passo | Ação | Endpoint | Validação |
|:----:|:-----|:---------|:----------|
| 1 | 30 VUs GET | GET /products | Status 200 |
| 2 | Validar HTML | body | Contém conteúdo HTML |

---

### 4.13 Limitações do k6 — Cenários que são apenas funcionais (não carga)

> **Nota:** Todos os cenários marcados como "Teste funcional" já possuem testes Cypress automatizados no projeto (seção `cypress/e2e/web/`). Esta seção apenas documenta por que NÃO são testados sob carga com k6 — não porque não são testados.

| Cenário Funcional | Testável com k6? | Coberto por teste funcional? | Alternativa |
|:------------------|:----------------:|:----------------------------:|:------------|
| **Homepage (/)** | ✅ HTTP response time | — | k6 HTTP GET |
| **Produtos (/products)** | ✅ HTTP response time | — | k6 HTTP GET |
| **Detalhe Produto (/product_details/1)** | ✅ HTTP response time | — | k6 HTTP GET |
| **Login via API (/api/verifyLogin)** | ✅ Sim | — | k6 HTTP POST |
| **CRUD de contas via API** | ✅ Sim | — | k6 HTTP POST/PUT/DELETE |
| **Carrinho (adicionar/remover)** | ❌ Browser-only | ✅ TC_WEB_012, TC_WEB_017, TC_WEB_020 | Cypress E2E |
| **Checkout visual** | ❌ Browser-only | ✅ TC_WEB_014, TC_WEB_015, TC_WEB_016 | Cypress E2E |
| **Formulário de Contato** | ❌ Browser-only | ✅ TC_WEB_006 | Cypress E2E |
| **Scroll / UX** | ❌ Não é carga | ✅ TC_WEB_025, TC_WEB_026 | Cypress E2E |
| **LCP, FCP, CLS** | ❌ Requer browser | ✅ TC_PF_008 | Cypress + Lighthouse |

> **Prática de mercado:** k6 testa **carga e volume** (APIs + HTTP response time). Fluxos que dependem de JavaScript no browser (localStorage, DOM, modais) são testados funcionalmente com Cypress. Ambos se complementam.

---

## 5. Mapeamento com os Testes Funcionais Existentes

### 5.1 Cobertura dos Cenários E2E (TC_WEB_001 - TC_WEB_026)

| Grupo Funcional | TCs E2E | Coberto por Performance | Status |
|:----------------|:--------|:------------------------|:------:|
| **Identidade** (Registro, Login, Logout) | TC_WEB_001 - TC_WEB_005 | TC_PF_004 (login), TC_PF_009 (createAccount) | ⚠️ Parcial |
| **Catálogo** (Busca, Detalhes, Categorias, Marcas) | TC_WEB_008, TC_WEB_009, TC_WEB_018, TC_WEB_019, TC_WEB_021 | TC_PF_003 (productsList), TC_PF_006 (mix) | ⚠️ Parcial |
| **Carrinho** (Adição, Remoção, Quantidade) | TC_WEB_012, TC_WEB_013, TC_WEB_017, TC_WEB_020, TC_WEB_022 | ❌ Não coberto¹ | ❌ |
| **Transacional** (Checkout, Fatura) | TC_WEB_014, TC_WEB_015, TC_WEB_016, TC_WEB_023, TC_WEB_024 | TC_PF_009 (createAccount) | ⚠️ Parcial² |
| **Comunicação e UX** (Contato, Newsletter, Scroll) | TC_WEB_006, TC_WEB_007, TC_WEB_010, TC_WEB_011, TC_WEB_025, TC_WEB_026 | ❌ Não coberto³ | ❌ |
| **UX/UI** | TC_WEB_025, TC_WEB_026 | ❌ Não coberto³ | ❌ |

> ¹ **Carrinho:** Funcionalidade browser-only (localStorage + JavaScript). k6 é protocol-level HTTP — não executa JavaScript de página. Para testar o carrinho com itens, usar **Cypress** (teste funcional) para adicionar produtos e medir performance.
>
> ² **Checkout completo:** O fluxo de checkout envolve interações JavaScript no browser (modal, overlay, atualização de DOM). A API de criação de conta é coberta, mas o fluxo visual completo não.
>
> ³ **Comunicação e UX / UX/UI:** São testes de interação visual (formulário de contato, newsletter, scroll). Não há endpoints HTTP que justifiquem teste de carga específico.

### 5.2 Cobertura dos Cenários API (TC_API_001 - TC_API_014)

| Grupo Funcional | TCs API | Coberto por Performance | Status |
|:----------------|:--------|:------------------------|:------:|
| **Catálogo** (Listar produtos, Listar marcas, Pesquisar) | TC_API_001 - TC_API_004 | TC_PF_003, TC_PF_005, TC_PF_006 | ✅ Coberto |
| **Autenticação** (Login válido, sem email, inválido) | TC_API_005 - TC_API_007 | TC_PF_004 | ⚠️ Parcial⁴ |
| **Gestão de Usuários** (Criar, Excluir, Atualizar, Obter) | TC_API_008 - TC_API_011 | TC_PF_009 | ⚠️ Parcial⁵ |
| **Métodos HTTP** (POST, PUT, DELETE não suportados) | TC_API_012 - TC_API_014 | ❌ Não coberto⁶ | ❌ |

> ⁴ **Autenticação:** Apenas o fluxo de login com credenciais válidas é testado sob carga. Login inválido e sem email não são relevantes para performance (são validações funcionais rápidas).
>
> ⁵ **Gestão de Usuários:** Criação e exclusão são cobertas. **Atualização (PUT) e consulta (GET por email)** ainda não possuem scripts de carga específicos.
>
> ⁶ **Métodos HTTP:** Testes de métodos não suportados (405) não são relevantes para performance — são validações funcionais de API.

### 5.3 Mapa Detalhado: Performance TC → Funcional TC

| Performance TC | TCs Funcionais Cobertos | Endpoints |
|:---------------|:------------------------|:----------|
| TC_PF_001 - Smoke | TC_API_001, TC_API_002, TC_API_005 | GET productsList, GET brandsList, POST verifyLogin |
| TC_PF_002 - Carga Homepage | - | GET / |
| TC_PF_003 - Carga API Produtos | TC_API_001 | GET productsList |
| TC_PF_004 - Carga API Login | TC_WEB_002, TC_WEB_016, TC_API_005 | POST verifyLogin |
| TC_PF_005 - Estresse API Produtos | TC_API_001 | GET productsList |
| TC_PF_006 - Resistência (Soak) | TC_API_001, TC_API_002, TC_API_003, TC_API_005 | Mix de 4 endpoints |
| TC_PF_007 - Pico (Spike) | TC_API_001 | GET productsList |
| TC_PF_008 - Core Web Vitals | TC_WEB_008, TC_WEB_009, TC_WEB_010 | Homepage (Lighthouse) |
| TC_PF_009 - Fluxo Checkout | TC_WEB_001, TC_WEB_014, TC_WEB_015, TC_API_008, TC_API_009 | POST createAccount + verifyLogin + GET productsList + DELETE deleteAccount |
| TC_PF_010 - Análise de Imagens | TC_WEB_008, TC_API_001 | GET productsList + GET product pictures |
| TC_PF_011 - Carga Update Account | **TC_API_010** | PUT /api/updateAccount |
| TC_PF_012 - Carga User Details | **TC_API_011** | GET /api/getUserDetailByEmail |
| TC_PF_013 - Carga Search Product | **TC_WEB_009, TC_API_003** | POST /api/searchProduct |
| TC_PF_014 - Carga Pagina Produtos | **TC_WEB_008, TC_WEB_009** | GET /products |

---

## 6. Estrutura de Arquivos

### 6.1 Estrutura Completa

```
automationexercise/
├── docs/                                 # Documentacao viva do projeto
│   ├── Especificacao_Tecnica_Performance.md  # Especificacao tecnica de performance
│   ├── Relatorio_Resultados_Performance.md   # Metricas e resultados k6 + Lighthouse
│   └── ...
├── templates/                            # Templates para novos TCs
│   ├── Especificacao_Tecnica_Performance_TEMPLATE.md
│   ├── Relatorio_Resultados_Performance_TEMPLATE.md
│   ├── Sumario_Executivo_TEMPLATE.md
│   ├── Especificacao_Tecnica_Web_TEMPLATE.md
│   ├── Especificacao_Tecnica_API_TEMPLATE.md
│   └── Suite_BDD_TEMPLATE.md

└── Cypress/
    └── cypress/
        ├── e2e/
        │   ├── web/              # Testes E2E
        │   ├── api/              # Testes de API
        │   └── performance/      # Scripts k6 + Cypress (TC_PF_008)
        │       ├── TC_PF_001_smoke_test.js
        │       ├── TC_PF_002_carga_homepage.js
        │       ├── TC_PF_003_carga_api_produtos.js
        │       ├── TC_PF_004_carga_api_login.js
        │       ├── TC_PF_005_estresse_api_produtos.js
        │       ├── TC_PF_006_resistencia_soak.js
        │       ├── TC_PF_007_pico_spike.js
        │       ├── TC_PF_008_core_web_vitals.cy.js
        │       ├── TC_PF_009_carga_checkout.js
        │       ├── TC_PF_010_auditoria_imagens.js
        │       ├── TC_PF_011_carga_atualizar_conta.js
        │       ├── TC_PF_012_carga_detalhes_usuario.js
        │       ├── TC_PF_013_carga_pesquisar_produto.js
        │       └── TC_PF_014_carga_pagina_produtos.js
        ├── fixtures/             # Dados estaticos
        │   ├── users.json        # Credenciais e dados de pagamento
        │   ├── products.json     # Produtos, categorias, marcas
        │   ├── contact.json      # Mensagens e assuntos
        │   ├── ui_texts.json     # Labels, headers, erros, botoes
        │   └── test_file.txt     # Arquivo de teste para upload
        ├── support/              # Comandos customizados
        │   └── e2e.js            # beforeEach centralizado + cy.captura()
        ├── allure/               # Relatorios Allure (dark mode + pt-BR)
        │   ├── package.json      # allure-commandline
        │   ├── allure.properties # Tema escuro + idioma pt-BR
        │   ├── allure-results/   # Resultados das execucoes
        │   ├── allure-report/    # Relatorio HTML estatico
        │   └── scripts/          # Conversores k6 → Allure
        ├── reports/              # Relatorios de execucao
        │   └── k6/               # JSONs do k6 --summary-export
        ├── screenshots/          # Evidencias visuais
        │   ├── performance/      # Screenshots TC_PF_008
        │   └── ...
        └── videos/               # Videos das execucoes
```

### 6.2 Arquivos de Script e suas Configurações

| Arquivo | TC | Tipo | VUs | Duração |
|:--------|:---|:----:|:---:|:--------|
| `TC_PF_001_smoke_test.js` | TC_PF_001 | Smoke | 1 | ~1s |
| `TC_PF_002_carga_homepage.js` | TC_PF_002 | Carga | 50 | ~3,5min |
| `TC_PF_003_carga_api_produtos.js` | TC_PF_003 | Carga | 50→100 | ~3,5min |
| `TC_PF_004_carga_api_login.js` | TC_PF_004 | Carga | 30 | ~2,5min |
| `TC_PF_005_estresse_api_produtos.js` | TC_PF_005 | Estresse | 25→300 | ~5,5min |
| `TC_PF_006_resistencia_soak.js` | TC_PF_006 | Resistência | 50 | ~5,5min |
| `TC_PF_007_pico_spike.js` | TC_PF_007 | Pico | 10→200 | ~3,5min |
| `TC_PF_008_core_web_vitals.cy.js` | TC_PF_008 | Front-end | 1 | ~5min |
| `TC_PF_009_carga_checkout.js` | TC_PF_009 | Carga | 20 | ~2,5min |
| `TC_PF_010_auditoria_imagens.js` | TC_PF_010 | Auditoria | 1 | ~1min |
| `TC_PF_011_carga_atualizar_conta.js` | TC_PF_011 | Carga | 20 | ~2,5min |
| `TC_PF_012_carga_detalhes_usuario.js` | TC_PF_012 | Carga | 20 | ~2,5min |
| `TC_PF_013_carga_pesquisar_produto.js` | TC_PF_013 | Carga | 30 | ~2,5min |
| `TC_PF_014_carga_pagina_produtos.js` | TC_PF_014 | Carga | 30 | ~2,5min |

---

## 7. Glossário de Performance

| Termo | Definição |
|:------|:----------|
| **VU (Virtual User)** | Usuário virtual — executa a função `default()` em loop |
| **Ramp-up** | Aumento gradual de VUs até o target |
| **Stage** | Fase do teste com duração e target de VUs |
| **Hold** | Período mantendo carga constante |
| **p95 / p99** | 95º / 99º percentil da distribuição de latência |
| **TTFB (http_req_waiting)** | Tempo entre envio do request e primeiro byte |
| **http_req_duration** | Tempo total: request → resposta completa |
| **http_req_failed** | Taxa de requisições com status ≥ 400 |
| **http_reqs** | Throughput — requisições por segundo |
| **Check** | Asserção booleana (passou/falhou) sobre a resposta |
| **Threshold** | Limite de performance — se violado, teste é reprovado |
| **LCP (Largest Contentful Paint)** | Marca o tempo em que o **maior elemento visível** (imagem, texto, vídeo) é renderizado na tela. Objetivo: < 2,5s. |
| **CLS (Cumulative Layout Shift)** | Mede a **estabilidade visual** — quanto os elementos da página "pulam" de lugar durante o carregamento. Causado por imagens sem dimensão, fontes carregando tarde, anúncios injetados. Objetivo: < 0,1. |
| **TTFB (Time to First Byte)** | Tempo entre o navegador fazer a requisição HTTP e receber o **primeiro byte** de resposta do servidor. Reflete latência de rede + processamento do servidor. Objetivo: < 500ms (k6 `http_req_waiting`). |
| **FCP (First Contentful Paint)** | Primeiro conteúdo renderizado (texto, imagem, canvas). Objetivo: < 1,5s. |
| **INP (Interaction to Next Paint)** | Mede a **responsividade** — tempo entre o usuário interagir (clique, toque) e a página responder. Objetivo: < 200ms. |

---

## 8. Comportamento por Tipo de Teste

| Tipo | Quando usar | Exemplo no Projeto |
|:----|:------------|:-------------------|
| **Smoke** | Primeira execução, validação de ambiente | TC_PF_001 |
| **Carga (Load)** | Tráfego esperado (50-100 usuários) | TC_PF_002, TC_PF_003, TC_PF_004 |
| **Estresse (Stress)** | Encontrar limite do servidor | TC_PF_005 |
| **Resistência (Soak)** | Detectar memory leak | TC_PF_006 |
| **Pico (Spike)** | Pico repentino de tráfego | TC_PF_007 |
| **Front-end** | Métricas de experiência do usuário | TC_PF_008 |
| **Fluxo de Negócio** | Funil de conversão completo | TC_PF_009 |
| **Auditoria** | Análise de recursos estáticos | TC_PF_010 |

---

**Documento gerado em:** 2026-05-24
