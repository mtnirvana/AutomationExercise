# Relatório de Resultados - Testes de Performance e Carga
**Versão:** 1.0.0
**Responsável:** Rafael Barelli
**Ferramenta:** k6 (Grafana Labs) v2.0.0
**Data da Execução:** AAAA-MM-DD
**Ambiente:** Produção (https://www.automationexercise.com)

---

## 1. Resumo Executivo

### 1.1 Resultado Consolidado

| Indicador | Resultado |
|:----------|:----------|
| **Total de Cenários** | NN (NN executados, NN pendentes) |
| **Aprovados** | NN ✅ |
| **Aprovados com Ressalvas** | NN ⚠️ |
| **Pendentes** | NN ⏳ |
| **Taxa de Passagem Geral** | NN% (NN/NN executados) |

### 1.2 Matriz de Resultados

| ID | Cenário | Status | Checks | p95 | Erro |
|:---|:--------|:------:|:-----:|:---:|:----:|
| TC_PF_001 | Smoke test | ✅ Passou | N/N | XXXms | X% |
| TC_PF_002 | Carga Homepage | ✅ Passou | N/N | XXXms | X% |
| TC_PF_003 | Carga API Produtos | ⚠️ Rate limited | XX% | Xs | XX% |
| TC_PF_004 | Carga API Login | ✅ Passou | N/N | XXXms | X% |
| TC_PF_005 | Estresse API Produtos | ⚠️ Rate limited | - | - | - |
| TC_PF_006 | Resistência (Soak) | ✅ Passou | N/N | XXXms | X% |
| TC_PF_007 | Pico (Spike) | ✅ Passou | N/N | XXXms | X% |
| TC_PF_008 | Core Web Vitals | ✅ Passou | N/N | - | X% |
| TC_PF_009 | Fluxo Checkout | ✅ Passou | N/N | XXXms | X% |
| TC_PF_010 | Análise de Imagens | ✅ Passou | N/N | XXXms | X% |
| TC_PF_011 | Carga Update Account | ✅ Passou | N/N | XXXms | X% |
| TC_PF_012 | Carga User Details | ✅ Passou | N/N | XXXms | X% |
| TC_PF_013 | Carga Search Product | ✅ Passou | N/N | Xs | X% |
| TC_PF_014 | Carga Pagina Produtos | ✅ Passou | N/N | XXXms | X% |

---

## 2. Resultados Detalhados por Cenário

### 2.1 TC_PF_001 - Smoke Test

| Parâmetro | Valor |
|:----------|:------|
| **Script** | `Cypress/cypress/e2e/performance/TC_PF_001_smoke_test.js` |
| **Data/Hora** | AAAA-MM-DD HH:MM |
| **Duração** | Xs |
| **VUs** | N |
| **Iterações** | N |
| **Status** | ✅ **APROVADO** |

#### Métricas de Rede

| Métrica | Valor |
|:--------|:-----:|
| **http_req_duration avg** | XXXms |
| **http_req_duration min** | XXXms |
| **http_req_duration max** | XXXms |
| **http_req_duration p(90)** | XXXms |
| **http_req_duration p(95)** | XXXms |
| **http_req_failed** | X% |
| **http_reqs (throughput)** | X,X req/s |

#### Checks

| Check | Resultado |
|:------|:---------:|
| GET /api/productsList status 200 | ✅ Passou |
| responseCode igual a 200 | ✅ Passou |
| products é um array | ✅ Passou |
| products.length maior que 0 | ✅ Passou |
| ... | ... |

#### Thresholds

| Threshold | Resultado |
|:----------|:---------:|
| `http_req_duration p(95) < XXXX` | ✅ p(95)=XXXms |
| `http_req_failed rate < 0,XX` | ✅ rate=X,XX% |

<!--
### 2.2 TC_PF_002 - Carga Homepage
... (repetir estrutura para cada TC com seus respectivos dados)
-->

---

## 3. Problemas Encontrados

### 3.1 Rate Limiting do Cloudflare

| Item | Detalhe |
|:-----|:---------|
| **Problema** | Cloudflare bloqueia requisições excessivas retornando HTML |
| **Sintoma** | `invalid character '<' looking for beginning of value` ao tentar parsear JSON |
| **Threshold** | ~50 VUs simultâneas para /api/productsList |
| **Impacto** | XX% de erro em N VUs |

### 3.2 Outros Problemas

| # | Problema | Impacto | Severidade |
|:-|:---------|:--------|:-----------|
| 1 | ... | ... | ... |
| 2 | ... | ... | ... |

---

## 4. Recomendações

| Prioridade | Ação | Impacto Esperado |
|:----------:|:-----|:-----------------|
| 1 | ... | ... |
| 2 | ... | ... |
| 3 | ... | ... |

---

## 5. Evidências

| Arquivo | Conteúdo |
|:--------|:---------|
| `cypress/reports/k6/TC_PF_001_smoke_test.json` | Métricas do smoke test em JSON |
| `cypress/screenshots/performance/TC_PF_008_core_web_vitals.cy.js/` | Screenshots do TC_PF_008 (Cypress) |
| `cypress/screenshots/performance/TC_PF_008_core_web_vitals.cy.js/*.gif` | GIF animado (via scripts/gerar_gifs.js) |
| `cypress/videos/` | Vídeos da execução (Cypress) |
| `cypress/screenshots/performance/` | Screenshots Core Web Vitals |
| ... | ... |

**Comando para gerar evidências:**
```bash
k6 run cypress/e2e/performance/TC_PF_001_smoke_test.js --summary-export=cypress/reports/k6/TC_PF_001_smoke_test.json

# ou via run_all.bat (executa todos os 13 scripts k6 automaticamente):
cd Cypress && run_all.bat
```

---

## 6. Glossário

| Termo | Definição |
|:------|:----------|
| **Rate Limiting** | Mecanismo do servidor que limita o número de requisições em um período |
| **Cloudflare** | CDN e proxy reverso que protege o servidor de origem |
| **Mixed Content** | Recurso HTTP carregado em página HTTPS — bloqueado pelo navegador |
| **WebP** | Formato de imagem moderno com compressão superior ao JPEG |
| **TTFB** | Time to First Byte — tempo até o primeiro byte de resposta |
| **Throughput** | Taxa de requisições processadas por segundo |
| **LCP** | Largest Contentful Paint — maior elemento visível |
| **CLS** | Cumulative Layout Shift — estabilidade visual |

---

**Documento gerado em:** AAAA-MM-DD
