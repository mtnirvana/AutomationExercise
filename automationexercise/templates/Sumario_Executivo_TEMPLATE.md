# Sumário Executivo - Automation Exercise
**Versão:** 1.0.0<br>
**Metodologia:** ISTQB (CTFL)<br>
**Responsável:** Rafael Barelli

---

## 1. Visão Geral e Escopo
O **Automation Exercise** é uma plataforma de e-commerce de alta fidelidade para prática de automação. Este plano detalha a estratégia para validar a integridade funcional total e a experiência do usuário através de testes E2E (Ponta a Ponta) e testes de API REST, abrangendo fluxos críticos, secundários e de exceção.

### 1.1 Abrangência do Escopo

#### E2E Tests (Web)
- **Em Escopo:** Funcionalidades de Identidade, Catálogo de Produtos, Gestão de Carrinho, Fluxo de Checkout Completo, Pagamento, Geração de faturas e Experiência de Uso (Rolagem de Página).
- **Fora de Escopo:** Segurança de Penetração, Acessibilidade e Compatibilidade com Navegadores Legados (Ex: IE11).

#### API Tests (REST)
- **Em Escopo:** Endpoints REST (GET, POST, PUT, DELETE), Validação de Status Codes, Validação de Response Body, Autenticação, CRUD de Usuários, Validação de Métodos HTTP.
- **Fora de Escopo:** Segurança de Penetração.

#### Performance Tests (Carga e Estresse)
- **Em Escopo:** Endpoints REST (GET, POST, DELETE) sob carga, Páginas Web (Homepage, Produtos, Login), Fluxos de Negócio (Criar Conta → Login → Listar → Excluir), Validação de Latência e Throughput, Core Web Vitals (LCP, CLS, TTFB).
- **Fora de Escopo:** Testes Mobile, Testes de Usabilidade, Testes Cross-Browser, Testes de Carga Distribuída.

---

## 2. Objetivos e Indicadores de Qualidade
A estratégia visa garantir a confiabilidade das entregas e mitigar riscos de regressão no ciclo de vida do software.

### 2.1 Objetivos Estratégicos

#### E2E Tests
- **Integridade Funcional:** Garantir a prontidão operacional de 100% dos fluxos de negócio através de validações de Ponta a Ponta.
- **Segurança Transacional:** Garantir a funcionalidade de componentes críticos como Login, Checkout e Pagamento.
- **Consistência de Dados:** Assegurar a persistência de informações sensíveis, como a retenção dos itens no carrinho após o login.
- **Rastreabilidade:** Garantir a cobertura integral de todos os requisitos funcionais estabelecidos na documentação do projeto.

#### API Tests
- **Integridade de Endpoints:** Garantir que todos os endpoints retornam o comportamento esperado.
- **Validação de Dados:** Garantir que os dados retornados estão no formato correto.
- **Tratamento de Erros:** Validar que erros são retornados corretamente para requisições inválidas.
- **Rastreabilidade:** Garantir a cobertura integral de todos os endpoints documentados.

#### Performance Tests
- **Integridade de Endpoints sob Carga:** Garantir que os endpoints mantêm o comportamento esperado mesmo com múltiplos usuários simultâneos.
- **Validação de Latência:** Assegurar que o TTFB e o tempo de resposta permanecem dentro dos SLAs estabelecidos.
- **Tratamento de Erros:** Identificar pontos de rate limiting, timeout e falha sob condições extremas.
- **Core Web Vitals:** Coletar LCP, CLS, FCP e TTFB das páginas críticas para garantir boa experiência do usuário.

### 2.2 Indicadores de Sucesso (KPIs)
- **Taxa de Passagem (Pass Rate):** Alvo de 100% dos cenários planejados aprovados.
- **Estabilidade da Suíte (Flakiness Index):** Alvo de menos de 1% de falhas intermitentes.
- **Latência p95 - API:** < 2.000ms para 95% das requisições sob carga normal.
- **Core Web Vitals:** LCP < 2.500ms, CLS < 0,1, TTFB < 500ms.

---

## 3. Gestão de Riscos e Estratégia de Dados
A estratégia técnica detalha as abordagens adotadas para neutralizar riscos que possam comprometer a estabilidade do ambiente e a confiabilidade dos resultados, garantindo que cada validação seja executada de forma isolada e segura.

| Risco Identificado | Estratégia de Mitigação |
| :--- | :--- |
| **Instabilidade de Ambiente** | Uso de esperas automáticas e re-execução em caso de falhas momentâneas do sistema. Requisições API via Node.js (cy.task) para evitar conflitos de browser. |
| **Mudanças na Interface (UI)** | Utilização do Modelo de Objetos de Página (POM) para manutenção centralizada e ágil. |
| **Integridade de Dados** | Geração dinâmica de dados cadastrais únicos para garantir a atomicidade de cada cenário. Uso de `UserFactory.generate()` para criação de usuários únicos por execução. |
| **Persistência Indesejada** | Execução de rotinas de limpeza e exclusão de contas ao final dos fluxos para manter a sanidade do ambiente. afterEach com DELETE para remover dados criados nos testes. |
| **Rate Limiting (Cloudflare)** | Uso de ramp-up gradual em testes de carga para evitar bloqueio abrupto. Documentação do limite observado. |
| **Instabilidade de Ambiente** | Execução em horário de baixo tráfego. Múltiplas repetições para validar consistência. |
| **Dados de Terceiros (Anúncios)** | Foco em métricas first-party. Ignorar recursos de terceiros nas análises de performance. |

---

## 4. Planejamento de Cenários de Teste
Os cenários validam o fluxo esperado de funcionamento da aplicação de forma integrada e exaustiva, organizados por áreas funcionais de negócio.

### 4.1 Grupos Funcionais

#### E2E Tests
- **Identidade:** Registro, Login e Logout.
- **Catálogo:** Busca, Detalhes de Produtos, Categorias, Marcas e Avaliações.
- **Carrinho:** Adição, Remoção e Gestão de Quantidades.
- **Transacional:** Checkout Completo e Geração de Faturas.
- **Comunicação e UX:** Formulário de Contato, Casos de Teste, Newsletter e Suporte.
- **UX/UI:** Rolagem de Página e Navegação.

#### API Tests
- **Catálogo:** Listar produtos, Listar marcas, Pesquisar produto.
- **Autenticação:** Verificar login com credenciais válidas e inválidas.
- **Gestão de Usuários:** Criar, Atualizar, Excluir conta e obter detalhes.
- **Validação de Métodos HTTP:** Verificar que métodos não suportados retornam 405.

#### Performance Tests
- **Smoke:** Validação de pipeline e ambiente (1 VU).
- **Carga (Load):** Comportamento sob tráfego esperado (50-100 VUs).
- **Estresse (Stress):** Comportamento sob tráfego extremo (até 500 VUs).
- **Resistência (Soak):** Degradação ao longo do tempo (5-30min hold).
- **Pico (Spike):** Resposta a pico repentino de tráfego.
- **Front-end:** Core Web Vitals via Cypress + Lighthouse.

### 4.2 Catálogo de Casos de Teste

Os cenários estão organizados em:

| Tipo | Total | Documento de Referência |
|:-----|:-----:|:------------------------|
| Testes E2E Web | 26 | `Suite_BDD.md` / `Especificacao_Tecnica_Web.md` |
| Testes de API | 14 | `Suite_BDD.md` / `Especificacao_Tecnica_API.md` |
| Testes de Performance | 21 | `Suite_BDD.md` / `Especificacao_Tecnica_Performance.md` |

> **Total:** 40 cenários funcionais (BDD) · 61 casos individuais no Allure (26 E2E + 14 API + 13 k6 + 8 Core Web Vitals)

---

## 5. Gestão de Defeitos e Divergências
O projeto adota uma postura rigorosa na detecção de desvios operacionais:

1. **Triagem Automática:** Captura de registros visuais (screenshots, vídeos e GIFs animados) e logs de response para cada requisição API.
2. **Rastreamento de Divergências:** Identificação de casos onde o comportamento do sistema diverge da documentação de requisitos funcionais ou da especificação da API.
3. **Documentação de Erros:** Registro técnico detalhando o desvio entre o comportamento observado e o esperado.

---

## 6. Definição de Pronto
O cenário de teste é considerado **Concluído** quando:

#### E2E Tests
1. Cobre integralmente os requisitos de negócio e os critérios de aceitação definidos.
2. Garante a entrega de evidências visuais (capturas de tela, vídeos e GIFs animados) para cada ação relevante.
3. Permite a execução independente e atômica, sem conflitos de massa de dados.
4. Apresenta resultados consistentes e validados em ambiente de teste.
5. Documentação atualizada com os resultados.

#### API Tests
1. Validações de status code passam.
2. Validações de response body passam.
3. Cleanup executado com sucesso (quando aplicável).
4. Documentação atualizada com os resultados.

#### Performance Tests
1. Script k6 criado e executado com sucesso.
2. Métricas coletadas (avg, p95, p99, taxa de erro).
3. Thresholds validados (aprovado/reprovado documentado).
4. Evidências geradas (JSON export + terminal output).
5. Documentação atualizada com os resultados.

---

## 7. Configuração do Ambiente e Tecnologias
Este projeto utiliza uma stack moderna de automação para garantir escalabilidade e manutenção simplificada.

#### E2E Tests
- **Framework de Testes:** Cypress (v15+)
- **Linguagem e Ambiente:** JavaScript (Node.js)
- **Padrão de Design:** Modelo de Objetos de Página (POM)
- **Evidências:** Capturas de Tela (Prefixadas por ID e Etapa), Gravações de Vídeo e GIFs animados
- **Navegadores:** Chrome, Edge, Firefox e Electron (Resolução: 1280x720)
- **Integração:** Preparado para execução em fluxos de Integração Contínua (CI/CD)

#### API Tests
- **Framework de Testes:** Cypress (v15+)
- **Linguagem e Ambiente:** JavaScript (Node.js)
- **Padrão de Design:** API Testing com cy.task() via Node.js HTTPS
- **Evidências:** HTML report contendo requests, responses e assertions
- **Método de Request:** Node.js HTTPS (via cy.task)
- **Integração:** Preparado para execução em fluxos de Integração Contínua (CI/CD)

#### Performance Tests
- **Ferramenta Principal:** k6 (Grafana Labs) v2.0.0
- **Linguagem e Ambiente:** JavaScript (Node.js)
- **Arquitetura:** Go (event-loop), single binary
- **Evidências:** Terminal output + JSON export (--summary-export)
- **Front-end:** Lighthouse (gerado sob demanda via Chrome DevTools)
- **Cypress:** TC_PF_008 via Cypress (PerformanceObservers) em `cypress/e2e/performance/`
- **Navegadores:** Chrome, Edge (para Lighthouse)
- **Site Alvo:** https://www.automationexercise.com
- **Integração:** Preparado para execução em fluxos de Integração Contínua (CI/CD)

### 7.1 Centralização de Evidências (Allure)

Todas as evidências dos 3 tipos de teste (E2E Web, API e Performance) são centralizadas no **Allure Report**:

| Teste | Evidência no Allure |
|:------|:--------------------|
| **E2E Web (NN)** | Screenshots numerados por passo + vídeos + GIFs animados + métricas de execução |
| **API (NN)** | Requisição, resposta e asserções em HTML report |
| **Performance (NN)** | Resultados k6 convertidos (checks, thresholds, métricas) + Core Web Vitals |

> O relatório unificado pode ser acessado via `cypress/allure/allure-report/index.html` ou atalho `docs/Relatorio_Testes.lnk`.

---

**Documento gerado em:** AAAA-MM-DD

