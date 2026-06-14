# Especificação Técnica Performance - Automation Exercise
**Versão:** 1.0.0<br>
**Ferramenta:** k6 (Grafana Labs) v2.0.0<br>
**Metodologia:** ISTQB (CTFL) - Testes de Performance<br>
**Responsável:** Rafael Barelli

---

## 1. Introdução Técnica

Este documento fornece o detalhamento operacional para a execução e manutenção dos testes de performance do **Automation Exercise**. Ele serve como guia para engenheiros de QA, descrevendo a configuração técnica de cada cenário, os thresholds estabelecidos e as validações aplicadas.

### 1.1 Premissas de Execução
- **Clean Slate:** Cada teste é independente — dados de criação de conta usam timestamp único para evitar conflitos.
- **Design Pattern:** Scripts em JavaScript com uso de `stages`, `thresholds` e `check()` do k6.
- **Dados Dinâmicos:** Uso de `Date.now()` para emails únicos em cenários de criação de conta (TC_PF_009).
- **Headless:** Execução via CLI (sem GUI), modo non-interactive. 
- **CI/CD:** Integração Contínua via GitHub Actions — scripts k6 executados no job `k6-performance` (sequencial após Cypress), convertidos para Allure e publicados no GitHub Pages.

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
    { duration: '20s', target: NNN },  // ramp-up
    { duration: 'Xm', target: NNN },   // hold
    { duration: '10s', target: 0 },    // ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<XXXX'],
    http_req_failed: ['rate<0.XX'],
  },
}

export default function () {
  // 1. Descricao do passo em portugues
  const res = http.get(`${BASE_URL}/api/productsList`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  check(res, {
    'status 200 e JSON valido': (r) => {
      if (r.status !== 200) return false
      try { const body = r.json(); return condicao } catch { return false }
    },
  })
  sleep(0.5)
}
```

---

## 3. Catálogo Resumido de Cenários (TC_PF_001 - TC_PF_014)

| ID | Título | Tipo | Carga | Duração Total |
|:---|:-------|:----:|:-----:|:-------------:|
| TC_PF_001 | Smoke test de validação do pipeline | Smoke | 1 VU | ~1s |
| TC_PF_002 | Carga concorrente na página inicial | Carga | 50 VUs | ~3,5min |
| TC_PF_003 | Carga no endpoint /api/productsList | Carga | 50→100 VUs | ~3,5min |
| TC_PF_004 | Carga no endpoint /api/verifyLogin | Carga | 30 VUs | ~2,5min |
| TC_PF_005 | Estresse progressivo no /api/productsList | Estresse | 25→300 VUs | ~5,5min |
| TC_PF_006 | Resistência sustentada com mix de endpoints | Resistência | 50 VUs | ~5,5min |
| TC_PF_007 | Pico repentino de tráfego | Pico | 10→200→10 VUs | ~3,5min |
| TC_PF_008 | Métricas Core Web Vitals (Lighthouse) | Front-end | 1 usuário | ~5min |
| TC_PF_009 | Carga no fluxo completo de checkout | Carga | 20 VUs | ~2,5min |
| TC_PF_010 | Análise de tamanho e formato de imagens | Auditoria | 1 VU | ~1min |
| TC_PF_011 | Carga no endpoint PUT /api/updateAccount | Carga | 20 VUs | ~2,5min |
| TC_PF_012 | Carga no endpoint GET /api/getUserDetailByEmail | Carga | 20 VUs | ~2,5min |
| TC_PF_013 | Carga no endpoint POST /api/searchProduct | Carga | 30 VUs | ~2,5min |
| TC_PF_014 | Carga na página de produtos (/products) | Carga | 30 VUs | ~2,5min |

---

## 4. Detalhamento Exaustivo de Cenários

Esta seção fornece a especificação técnica passo a passo para cada cenário de teste de performance. Cada novo TC adicionado deve ser inserido abaixo, seguindo a estrutura de grupo funcional.

<!--

### 4.1 Grupo: Testes de Validação (TC_PF_001)

---

#### TC_PF_001 - Smoke test de validação do pipeline

**Objetivo:** Validar que o ambiente de teste, o script k6 e as APIs estão funcionando corretamente.<br>
**Tipo:** Smoke<br>
**Criticidade:** Alta<br>
**Configuração:** 1 VU, 1 iteração, sem ramp-up<br>
**Thresholds:** `http_req_duration p(95) < 5000`, `http_req_failed rate < 0,01`

**Script:** `Cypress/cypress/e2e/performance/TC_PF_001_smoke_test.js`

**Passos de Validação:**

| Passo | Ação | Endpoint | Validação |
|:----:|:-----|:---------|:----------|
| 1 | Enviar requisição GET | GET /api/productsList | Status 200 |
| 2 | Validar responseCode | body.responseCode | Igual a 200 |
| 3 | Validar array de produtos | body.products | É um array |
| 4 | Validar products.length | body.products.length | Maior que 0 |
| ... | ... | ... | ... |

---

### 4.2 Grupo: Testes de Carga - Web (TC_PF_002)

### 4.3 Grupo: Testes de Carga - API (TC_PF_003 - TC_PF_004)

### 4.4 Grupo: Teste de Estresse (TC_PF_005)

### 4.5 Grupo: Teste de Resistência (TC_PF_006)

### 4.6 Grupo: Teste de Pico (TC_PF_007)

### 4.7 Grupo: Front-end (TC_PF_008)

### 4.8 Grupo: Teste de Fluxo de Negócio (TC_PF_009)

### 4.9 Grupo: Auditoria (TC_PF_010)

### 4.10 Grupo: Gestão de Usuários - API (TC_PF_011 - TC_PF_012)

### 4.11 Grupo: Busca de Produtos (TC_PF_013)

### 4.12 Grupo: Páginas Web (TC_PF_014)

### 4.13 Grupo: Limitações do k6 — Cenários que são apenas funcionais (não carga)

> **Nota:** Todos os cenários marcados como "Teste funcional" já possuem testes Cypress automatizados no projeto. Esta seção apenas documenta por que NÃO são testados sob carga com k6 — não porque não são testados.

| Cenário Funcional | Testável com k6? | Coberto por teste funcional? | Alternativa |
|:------------------|:----------------:|:----------------------------:|:------------|
| **[Endpoint/nome da página]** | ✅ HTTP response time | — | k6 HTTP GET |
| **[Endpoint/nome da página]** | ✅ HTTP response time | — | k6 HTTP GET |
| **[Endpoint/nome da página]** | ❌ Browser-only | ✅ [TC_WEB_###] | Cypress E2E |
| **[Endpoint/nome da página]** | ❌ Browser-only | ✅ [TC_WEB_###] | Cypress E2E |
| **[Métrica]** | ❌ Requer browser | ✅ [TC_PF_###] | Cypress + Lighthouse |

> **Prática de mercado:** k6 testa **carga e volume** (APIs + HTTP response time). Fluxos que dependem de JavaScript no browser (localStorage, DOM, modais) são testados funcionalmente com Cypress. Ambos se complementam.

---

Para adicionar um novo TC, insira-o abaixo do grupo funcional correspondente, seguindo o formato do template acima.

-->

---

## 5. Mapeamento com os Testes Funcionais Existentes

### 5.1 Cobertura dos Cenários E2E (TC_WEB_001 - TC_WEB_026)

| Grupo Funcional | TCs E2E | Coberto por Performance | Status |
|:----------------|:--------|:------------------------|:------:|
| **[Grupo Funcional]** | TC_WEB_### - TC_WEB_### | [TC_PF_###] | ⚠️ Parcial |
| **[Grupo Funcional]** | TC_WEB_### - TC_WEB_### | ❌ Não coberto | ❌ |

> **Nota:** Substituir os placeholders pelos grupos reais conforme o documento [`Especificacao_Tecnica_Performance.md`](Especificacao_Tecnica_Performance.md).

### 5.2 Cobertura dos Cenários API (TC_API_001 - TC_API_014)

| Grupo Funcional | TCs API | Coberto por Performance | Status |
|:----------------|:--------|:------------------------|:------:|
| **[Grupo Funcional]** | TC_API_### - TC_API_### | [TC_PF_###] | ✅ Coberto |
| **[Grupo Funcional]** | TC_API_### - TC_API_### | ❌ Não coberto | ❌ |

> **Nota:** Substituir os placeholders pelos grupos reais conforme o documento [`Especificacao_Tecnica_Performance.md`](Especificacao_Tecnica_Performance.md).

### 5.3 Mapa Detalhado: Performance TC → Funcional TC

| Performance TC | TCs Funcionais Cobertos | Endpoints |
|:---------------|:------------------------|:----------|
| TC_PF_### - [Tipo] | [TC_WEB_###, TC_API_###] | [endpoints] |
| TC_PF_### - [Tipo] | [TC_WEB_###, TC_API_###] | [endpoints] |
| TC_PF_### - [Tipo] | [TC_API_###] | [endpoint] |

> **Nota:** Substituir os placeholders pelos dados reais conforme o documento [`Especificacao_Tecnica_Performance.md`](Especificacao_Tecnica_Performance.md).

---

## 6. Estrutura de Arquivos

### 6.1 Estrutura Completa

```
automationexercise/
├── docs/                                               # Documentacao viva do projeto
│   ├── Especificacao_Tecnica_Performance.md            # Especificacao tecnica de performance
│   ├── Relatorio_Resultados_Performance.md             # Metricas e resultados k6 + Lighthouse
│   └── ...
├── templates/                                          # Templates para novos TCs
│   ├── Especificacao_Tecnica_Performance_TEMPLATE.md   # Template especificacao tecnica de performance
│   ├── Relatorio_Resultados_Performance_TEMPLATE.md    # Template metricas e resultados k6 + Lighthouse
│   └── ...

└── Cypress/
    └── cypress/
        ├── e2e/
        │   ├── web/                                    # Testes E2E
        │   ├── api/                                    # Testes de API
        │   └── performance/                            # Scripts k6 + Cypress (TC_PF_008)
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
        ├── fixtures/                                   # Dados estaticos
        │   ├── users.json                              # Credenciais e dados de pagamento
        │   ├── products.json                           # Produtos, categorias, marcas
        │   ├── contact.json                            # Mensagens e assuntos
        │   ├── ui_texts.json                           # Labels, headers, erros, botoes
        │   └── test_file.txt                           # Arquivo de teste para upload
        ├── support/                                    # Comandos customizados
        │   └── e2e.js                                  # beforeEach centralizado + cy.captura()
        ├── allure/                                     # Relatorios Allure (dark mode + pt-BR)
        │   ├── allure.properties                       # Tema escuro + idioma pt-BR
        │   ├── allure-results/                         # Resultados das execucoes
        │   ├── allure-report/                          # Relatorio HTML estatico
        │   └── scripts/                                # Conversores k6 → Allure
        ├── reports/                                    # Relatorios de execucao
        │   └── k6/                                     # JSONs do k6
        ├── screenshots/                                # Evidencias visuais
        │   ├── performance/                            # Screenshots TC_PF_008
        │   └── ...
        └── videos/                                     # Videos das execucoes
```

### 6.2 Arquivos de Script e suas Configurações

| Arquivo | TC | Tipo | VUs | Duração |
|:--------|:---|:----:|:---:|:--------|
| `TC_PF_###_[tipo].js` | TC_PF_### | [Tipo] | [VUs] | [duração] |
| `TC_PF_###_[tipo].js` | TC_PF_### | [Tipo] | [VUs] | [duração] |
| `TC_PF_###_[tipo].cy.js` | TC_PF_### | [Tipo] | [VUs] | [duração] |

> **Nota:** Substituir os placeholders pelos valores reais conforme o documento [`Especificacao_Tecnica_Performance.md`](Especificacao_Tecnica_Performance.md).

> **Exemplo de preenchimento:** Substituir os placeholders pelos nomes reais dos arquivos conforme o documento completo [`Especificacao_Tecnica_Performance.md`](Especificacao_Tecnica_Performance.md).

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
| **LCP (Largest Contentful Paint)** | Marca o tempo em que o maior elemento visível é renderizado. Objetivo: < 2,5s. |
| **CLS (Cumulative Layout Shift)** | Mede a estabilidade visual — quanto os elementos "pulam". Objetivo: < 0,1. |
| **TTFB (Time to First Byte)** | Tempo entre requisição HTTP e primeiro byte de resposta do servidor. Objetivo: < 500ms. |
| **FCP (First Contentful Paint)** | Primeiro conteúdo renderizado (texto, imagem). Objetivo: < 1,5s. |
| **INP (Interaction to Next Paint)** | Mede a responsividade — tempo entre interagir e a página responder. Objetivo: < 200ms. |
| **Lazy Loading** | Carregamento sob demanda de imagens e recursos conforme o usuário rola a página |
| **Throughput (http_reqs)** | Taxa de transferência — requisições por segundo que o sistema consegue processar |

---

## 8. Comportamento por Tipo de Teste

| Tipo | Quando usar | Exemplo no Projeto |
|:----|:------------|:-------------------|
| **Smoke** | Primeira execução, validação de ambiente | TC_PF_### |
| **Carga (Load)** | Tráfego esperado (50-100 usuários) | TC_PF_###, TC_PF_### |
| **Estresse (Stress)** | Encontrar limite do servidor | TC_PF_### |
| **Resistência (Soak)** | Detectar memory leak | TC_PF_### |
| **Pico (Spike)** | Pico repentino de tráfego | TC_PF_### |
| **Front-end** | Métricas de experiência do usuário | TC_PF_### |
| **Fluxo de Negócio** | Funil de conversão completo | TC_PF_### |
| **Auditoria** | Análise de recursos estáticos | TC_PF_### |

---

**Documento gerado em:** AAAA-MM-DD
