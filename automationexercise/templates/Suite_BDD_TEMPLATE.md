# Automation Exercise - Suite de Testes BDD
**Versão:** X.X.X
**Metodologia:** BDD (Behavior Driven Development) - Gherkin
**Responsável:** Rafael Barelli

---

## 1. Meta e Escopo

| Item | Descrição |
|------|-----------|
| **Projeto** | Automation Exercise - Plataforma E-commerce |
| **Total de Cenários** | 61 (26 E2E + 14 API + 13 Performance k6 + 8 Core Web Vitals) |
| **E2E** | 26 cenários |
| **API** | 14 cenários |
| **Performance** | 21 cenários (13 k6 + 8 checks) |

> **Nota:** Performance tests (k6) e Core Web Vitals são cenários técnicos (carga, estresse, pico, auditoria) não representáveis em Gherkin. Estão contabilizados aqui para totalização, mas detalhados apenas nos documentos de performance. No contexto BDD, 40 cenários (26 E2E + 14 API) são os descritíveis em Gherkin.

---

## 2. Estrutura de Funcionalidades

### 2.1 E2E - Funcionalidades

| ID | Funcionalidade | Descrição |
|----|---------------|-----------|
| F01 | Gestão de Identidade e Acesso | Registro, Login e Logout de usuários |
| F02 | Catálogo de Produtos | Navegação, busca, detalhes e avaliação de produtos |
| F03 | Gestão de Carrinho | Adição, remoção e manipulação de itens |
| F04 | Fluxo de Checkout e Pedidos | Processo completo de compra e geração de fatura |
| F05 | Comunicação e UX | Formulário de contato, newsletter e navegação de página |

### 2.2 API - Funcionalidades

| ID | Funcionalidade | Descrição |
|----|---------------|-----------|
| F06 | API Catálogo de Produtos e Marcas | Listagem e pesquisa de produtos via endpoints |
| F07 | API Autenticação | Verificação de credenciais via endpoints |
| F08 | API Gestão de Usuários | CRUD completo de usuários via endpoints |
| F09 | API Validação de Métodos HTTP | Verificação de métodos não suportados |

---

## 3. Cenários E2E

> **Regra Obrigatória — Campo Dado:** Todos os cenários DEVEM ter o campo `Dado` preenchido com contexto natural (dados de entrada, pré-condições ou recursos necessários). Nunca utilizar "Nenhum" quando houver contexto aplicável — descrever o recurso ou condição necessária.

### F01 - Gestão de Identidade e Acesso

---

**F01.01** - [Título do cenário]
- **Tipo:** Sucesso/Erro
- **Criticidade:** Crítica/Alta/Média/Baixa
- **Objetivo:** [Descrição do objetivo]
- **TC:** TC###
- **Dado:** [Obrigatório — contexto do cenário: dados de entrada, pré-condições, recursos necessários]
- **Pós-condição:** [O que permanece ou é alterado após o teste]

**Cenário:**
```
Dado que [pré-condição]
Quando [ação agrupada 1 - intenção de negócio]
E [ação agrupada 2 - se necessário]
Então [validação agrupada 1]
E [validação agrupada 2 - se necessário]
```
> Máximo de 7 blocos por cenário. Agrupar ações relacionadas por intenção de negócio.

**Exemplos do documento completo:**

<!--
**F01.01** - Registrar usuário
- **Tipo:** Sucesso
- **Criticidade:** Crítica
- **Objetivo:** Validar o ciclo completo de criação e exclusão de conta com dados únicos por execução
- **TC:** TC_WEB_001
- **Dado:** Que existem dados de registro disponíveis
- **Pós-condição:** Conta criada e excluída ao final do teste

**Cenário:**
```
Dado que o navegador está aberto e a página inicial carrega
Quando clico em "Signup / Login"
E preencho nome e email válidos
E clico em "Signup"
Então o header "Enter Account Information" deve estar visível
Quando preencho todos os dados do formulário de registro
E clico em "Create Account"
Então o header "Account Created!" deve estar visível
Quando clico em "Continue"
Então o texto "Logged in as [username]" deve estar visível no topo da página
Quando clico em "Delete Account"
Então o header "Account Deleted!" deve estar visível
```

**F01.02** - Login de usuário com email e senha corretos
- **Tipo:** Sucesso
- **Criticidade:** Crítica
- **Objetivo:** Garantir o acesso à área restrita para usuários cadastrados
- **TC:** TC_WEB_002
- **Dado:** Que existem credenciais pré-cadastradas no sistema
- **Pós-condição:** Nenhuma

**Cenário:**
```
Dado que o navegador está aberto e a página inicial carrega
Quando clico em "Signup / Login"
E preencho email e senha válidos
E clico em "Login"
Então o texto "Logged in as [username]" deve estar visível no topo da página
Quando clico em "Logout"
Então o sistema redireciona para a página de login
E o header "Login to your account" deve estar visível
```
-->

[Adicionar F01.03 a F01.05 seguindo o mesmo formato]

---

### F02 - Catálogo de Produtos

<!--
**F02.01** - Verificar todos os produtos e página de detalhes do produto
- **Tipo:** Sucesso
- **Criticidade:** Alta
- **Objetivo:** Validar a integridade das informações exibidas na ficha técnica do produto
- **TC:** TC_WEB_008
- **Dado:** Que existem produtos disponíveis no catálogo
- **Pós-condição:** Nenhuma

**Cenário:**
```
Dado que o navegador está aberto e a página inicial carrega
Quando clico em "Products"
Então o header "ALL PRODUCTS" e a lista de produtos devem estar visíveis
Quando clico em "View Product" do primeiro produto
Então a página de detalhes do produto deve estar visível
E as informações do produto devem estar visíveis (nome, categoria, preço, disponibilidade, condição, marca)
```
-->

[Adicionar F02.02 a F02.05 seguindo o mesmo formato]

---

### F03 - Gestão de Carrinho

<!--
**F03.01** - Adicionar produtos ao carrinho
- **Tipo:** Sucesso
- **Criticidade:** Crítica
- **Objetivo:** Validar a funcionalidade de adicionar múltiplos itens ao carrinho
- **TC:** TC_WEB_012
- **Dado:** Que existem produtos disponíveis no catálogo
- **Pós-condição:** Nenhuma

**Cenário:**
```
Dado que o navegador está aberto e a página inicial carrega
Quando clico em "Products"
E adiciono dois produtos ao carrinho
E clico em "View Cart"
Então ambos os produtos devem estar listados no carrinho
E os preços, quantidades e totais devem estar corretos
```
-->

[Adicionar F03.02 e F03.03 seguindo o mesmo formato]

---

### F04 - Fluxo de Checkout e Pedidos

<!--
**F04.01** - Fazer pedido registrando durante o checkout
- **Tipo:** Sucesso
- **Criticidade:** Crítica
- **Objetivo:** Validar fluxo de compra com registro durante o checkout
- **TC:** TC_WEB_014
- **Dado:** Que existem dados de registro e dados de pagamento disponíveis
- **Pós-condição:** Conta criada e excluída ao final

**Cenário:**
```
Dado que o navegador está aberto e a página inicial carrega
Quando adiciono produtos ao carrinho
E clico em "Proceed To Checkout"
E clico em "Register / Login"
E preencho os dados de registro
Então o header "Account Created!" deve estar visível
Quando faço login e prossigo com o checkout
E preencho os dados de pagamento
E clico em "Pay and Confirm Order"
Então a mensagem "Congratulations! Your order has been placed successfully!" deve estar visível
```
-->

[Adicionar F04.02 a F04.04 seguindo o mesmo formato]

> **Nota:** Para cenários de F04 que compartilham o mesmo fluxo base mas possuem foco diferente, pode-se incluir um campo opcional `**Diferencial:**` após o campo `Dado` para destacar a particularidade do cenário.

---

### F05 - Comunicação e UX

<!--
**F05.01** - Formulário de contato
- **Tipo:** Sucesso
- **Criticidade:** Média
- **Objetivo:** Validar o envio do formulário de contato com upload de arquivo
- **TC:** TC_WEB_006
- **Dado:** Que existem dados de contato disponíveis
- **Pós-condição:** Nenhuma

**Cenário:**
```
Dado que o navegador está aberto e a página inicial carrega
Quando clico em "Contact Us"
E preencho o formulário de contato
E anexo um arquivo
E clico em "Submit"
Então a mensagem "Success! Your details have been submitted successfully." deve estar visível
```
-->

[Adicionar F05.02 a F05.06 seguindo o mesmo formato]

---

## 4. Cenários API

> **Regra Obrigatória — Campo Dado:** Todos os cenários DEVEM ter o campo `Dado` preenchido com contexto natural (dados de entrada, pré-condições ou recursos necessários). Nunca utilizar "Nenhum" quando houver contexto aplicável — descrever o recurso ou condição necessária.

### F06 - API Catálogo de Produtos e Marcas

---

**F06.01** - [Título do cenário]
- **Tipo:** Sucesso/Erro
- **Criticidade:** Crítica/Alta/Média/Baixa
- **Objetivo:** [Descrição do objetivo]
- **TC:** TC_API_###
- **Dado:** [Obrigatório — contexto do cenário: dados de entrada, pré-condições, recursos necessários]
- **Pós-condição:** [O que permanece ou é alterado após o teste]

**Cenário:**
```
Dado que a API do Automation Exercise está disponível
Quando [ação: método HTTP + endpoint]
Então [resultado esperado 1]
E [resultado esperado 2]
```
Máximo de 7 blocos por cenário. Agrupar ações relacionadas por intenção de negócio.

**Exemplos do documento completo:**

<!--
**F06.01** - Listar todos os produtos via API
- **Tipo:** Sucesso
- **Criticidade:** Alta
- **Objetivo:** Validar o retorno da lista completa de produtos do catálogo
- **TC:** TC_API_001
- **Dado:** Que a API de catálogo de produtos está disponível
- **Pós-condição:** Nenhuma alteração

**Cenário:**
```
Dado que a API do Automation Exercise está disponível
Quando envio uma requisição GET para /api/productsList
Então o status code deve ser 200
E o responseCode deve ser 200
E a resposta deve conter um array de produtos com 34 itens
E cada produto deve possuir id, name, price, brand e category
```

**F06.02** - Pesquisar produto sem parâmetro via API
- **Tipo:** Erro
- **Criticidade:** Média
- **Objetivo:** Validar que a API retorna erro quando parâmetro de busca está ausente
- **TC:** TC_API_004
- **Dado:** Que a API de busca de produtos está disponível
- **Pós-condição:** Nenhuma alteração

**Cenário:**
```
Dado que a API do Automation Exercise está disponível
Quando envio uma requisição POST para /api/searchProduct sem parâmetro
Então o status code deve ser 200
E o responseCode deve ser 400
E a mensagem de erro deve conter "Bad request, search_product parameter is missing"
```
-->

[Adicionar F06.03 e F06.04 seguindo o mesmo formato]

---

### F07 - API Autenticação

<!--
**F07.01** - Verificar login com credenciais válidas via API
- **Tipo:** Sucesso
- **Criticidade:** Crítica
- **Objetivo:** Garantir que a API retorna sucesso quando credenciais válidas são fornecidas
- **TC:** TC_API_005
- **Dado:** Que existem credenciais pré-cadastradas no sistema
- **Pós-condição:** Nenhuma

**Cenário:**
```
Dado que a API do Automation Exercise está disponível
Quando envio uma requisição POST para /api/verifyLogin com credenciais válidas
Então o status code deve ser 200
E o responseCode deve ser 200
E a mensagem deve ser "User exists!"
```
-->

[Adicionar F07.02 e F07.03 seguindo o mesmo formato]

---

### F08 - API Gestão de Usuários

<!--
**F08.01** - Criar conta de usuário via API
- **Tipo:** Sucesso
- **Criticidade:** Crítica
- **Objetivo:** Validar a criação de novo usuário via endpoint
- **TC:** TC_API_008
- **Dado:** Que existem dados de registro e a API de criação de conta está disponível
- **Pós-condição:** Usuário criado deve ser excluído no afterEach

**Cenário:**
```
Dado que a API do Automation Exercise está disponível
Quando envio uma requisição POST para /api/createAccount com dados únicos
Então o status code deve ser 200
E o responseCode deve ser 201
E a mensagem deve ser "User created!"
```
-->

[Adicionar F08.02 a F08.04 seguindo o mesmo formato]

---

### F09 - API Validação de Métodos HTTP

<!--
**F09.01** - Validar método POST em productsList via API
- **Tipo:** Erro
- **Criticidade:** Média
- **Objetivo:** Garantir que POST não é suportado em /api/productsList
- **TC:** TC_API_012
- **Dado:** Que a API de catálogo de produtos está disponível
- **Pós-condição:** Nenhuma alteração

**Cenário:**
```
Dado que a API do Automation Exercise está disponível
Quando envio uma requisição POST para /api/productsList
Então o status code deve ser 200
E o responseCode deve ser 405
E a mensagem deve ser "This request method is not supported."
```
-->

[Adicionar F09.02 e F09.03 seguindo o mesmo formato]

---

## 5. Cobertura de Testes

Este projeto abrange um total de **61 casos de teste individuais no Allure**, organizados para garantir cobertura integral dos requisitos funcionais, de API e de performance.

| Categoria | Total | Sucesso | Erro |
|-----------|-------|---------|------|
| **E2E Tests** | 26 | 24 (92,3%) | 2 (7,7%) |
| **API Tests** | 14 | 8 (57,1%) | 6 (42,9%) |
| **Performance Tests** | 21 | 18 (85,7%) | 3 (14,3%) ⚠️¹ |
| **Total Consolidado** | **61** | **50 (82,0%)** | **11 (18,0%)** |

> **Nota:** Performance tests (k6 + TC_PF_008) são cenários técnicos sem classificação Sucesso/Erro tradicional. A divisão acima reflete a última execução. Os 8 checks do TC_PF_008 são contados individualmente, elevando o total para 61 casos no Allure. Em termos BDD (cenários descritíveis em Gherkin), o total é de 40 cenários (26 E2E + 14 API).
>
> ¹ Os cenários classificados como "Erro" na performance (TC_PF_003, TC_PF_005 e TC_PF_007) são Limitação de Rate Limiting do Cloudflare, não erros funcionais. Os scripts executam corretamente e os thresholds foram ajustados para tolerar a degradação esperada sob carga.

### 5.1 Cobertura por Área Funcional - E2E

| Área Funcional | Cenários | Descrição |
|----------------|----------|-----------|
| **F01 - Identidade** | N cenários | Registro, login e logout |
| **F02 - Catálogo** | N cenários | Produtos, busca, categorias, marcas, avaliações |
| **F03 - Carrinho** | N cenários | Adição, remoção, quantidades |
| **F04 - Checkout** | N cenários | Pedidos, pagamento, faturas |
| **F05 - Comunicação e UX** | N cenários | Contato, assinatura, scroll |

### 5.2 Cobertura por Área Funcional - API

| Área Funcional | Cenários | Descrição |
|----------------|----------|-----------|
| **F06 - Catálogo API** | N cenários | Produtos, marcas, busca |
| **F07 - Autenticação API** | N cenários | Login válido e inválido |
| **F08 - Gestão de Usuários API** | N cenários | CRUD de usuários |
| **F09 - Métodos HTTP API** | N cenários | Métodos não suportados |

### 5.3 Critérios de Cobertura
- **E2E:** Cobertura das 5 áreas funcionais do e-commerce
- **API:** Cobertura dos 8 endpoints documentados
- **Performance:** 21 cenários de carga, estresse, resistência, pico e auditoria (k6 + Lighthouse)
- **Falhas Esperadas:** Cenários de exceção (login inválido, email duplicado, métodos não suportados)

---

## 6. Critérios de Aceite

Um cenário é considerado **CONCLUÍDO** quando:
1. Todas as validações passam
2. Evidências são geradas corretamente
3. Rotina de cleanup executada quando aplicável
4. Documentação atualizada com os resultados.

---

## 7. Glossário de Termos BDD

| Termo | Definição |
|-------|-----------|
| **Funcionalidade** | Agrupamento de cenários relacionados a uma área de negócio |
| **Cenário** | Descrição de um caso de teste em linguagem de negócio |
| **Dado (Given)** | Pré-condição ou contexto inicial do cenário |
| **Quando (When)** | Ação ou evento que desencadeia o cenário |
| **Então (Then)** | Resultado esperado ou asserção |
| **E (And)** | Conector para encadear condições ou ações |
| **Tag** | Marcador para categorização de cenários |

## 8. Mapeamento de Test Cases

### 8.1 E2E

| ID | Funcionalidade | Cenário | Tipo | Documento de Referência |
|----|----------------|---------|------|:-----------------------|
| TC_WEB_001 | F01 | Registrar usuário | Sucesso | `Especificacao_Tecnica_Web.md` |
| TC_WEB_002 | F01 | Login de usuário com email e senha corretos | Sucesso | `Especificacao_Tecnica_Web.md` |
| TC_WEB_003 | F01 | Login de usuário com email e senha incorretos | Erro | `Especificacao_Tecnica_Web.md` |
| TC... | F.. | ... | ... | ... |
| TC_WEB_026 | F05 | Verificar scroll up sem botão de seta | Sucesso | `Especificacao_Tecnica_Web.md` |

### 8.2 API

| ID | Funcionalidade | Cenário | Tipo | Documento de Referência |
|----|----------------|---------|------|:-----------------------|
| TC_API_001 | F06 | Listar todos os produtos via API | Sucesso | `Especificacao_Tecnica_API.md` |
| TC_API_002 | F06 | Listar todas as marcas via API | Sucesso | `Especificacao_Tecnica_API.md` |
| TC_API_... | F.. | ... | ... | ... |
| TC_API_014 | F09 | Validar método DELETE em verifyLogin via API | Erro | `Especificacao_Tecnica_API.md` |

### 8.3 Performance

| ID | Funcionalidade | Cenário | Tipo | Documento de Referência |
|----|----------------|---------|------|:-----------------------|
| TC_PF_001 | Performance | Smoke test | Smoke | `Especificacao_Tecnica_Performance.md` |
| TC_PF_002 | Performance | Carga homepage | Carga | `Especificacao_Tecnica_Performance.md` |
| TC_PF_003 | Performance | Carga API produtos | Carga | `Especificacao_Tecnica_Performance.md` |
| TC_PF_004 | Performance | Carga API login | Carga | `Especificacao_Tecnica_Performance.md` |
| TC_PF_005 | Performance | Estresse API produtos | Estresse | `Especificacao_Tecnica_Performance.md` |
| TC_PF_006 | Performance | Resistência (soak) | Resistência | `Especificacao_Tecnica_Performance.md` |
| TC_PF_007 | Performance | Pico (spike) | Pico | `Especificacao_Tecnica_Performance.md` |
| TC_PF_008 | Performance | Core Web Vitals | Front-end | `Especificacao_Tecnica_Performance.md` |
| TC_PF_009 | Performance | Carga checkout | Carga | `Especificacao_Tecnica_Performance.md` |
| TC_PF_010 | Performance | Auditoria imagens | Auditoria | `Especificacao_Tecnica_Performance.md` |
| TC_PF_011 | Performance | Carga update account | Carga | `Especificacao_Tecnica_Performance.md` |
| TC_PF_012 | Performance | Carga user details | Carga | `Especificacao_Tecnica_Performance.md` |
| TC_PF_013 | Performance | Carga search product | Carga | `Especificacao_Tecnica_Performance.md` |
| TC_PF_014 | Performance | Carga página produtos | Carga | `Especificacao_Tecnica_Performance.md` |

---

## 9. Endpoints API Documentados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/productsList | Lista todos os produtos |
| GET | /api/brandsList | Lista todas as marcas |
| GET | /api/getUserDetailByEmail | Busca detalhes de usuário por email |
| POST | /api/searchProduct | Pesquisa produtos |
| POST | /api/verifyLogin | Verifica credenciais de login |
| POST | /api/createAccount | Cria nova conta de usuário |
| PUT | /api/updateAccount | Atualiza dados do usuário |
| DELETE | /api/deleteAccount | Exclui conta de usuário |

---

## 10. Apêndice: Padrão de Linguagem para Campo Dado

> **Regra Obrigatória:** O campo `Dado` deve seguir os padrões de linguagem definidos abaixo para garantir consistência entre todos os cenários.

### 10.1 Padrões para Cenários E2E

| Cenário | Padrão `Dado` | Usado em |
|---------|---------------|----------|
| Login (usuário existente) | `Que existem credenciais pré-cadastradas no sistema` | TC_WEB_002, TC_WEB_004 |
| Falha de login | `Que existem credenciais inexistentes no sistema` | TC_WEB_003 |
| Registro (criar nova conta) | `Que existem dados de registro disponíveis` | TC_WEB_001 |
| Email já existe | `Que existe um email já cadastrado no sistema` | TC_WEB_005 |
| Checkout com login | `Que existem credenciais pré-cadastradas e dados de pagamento disponíveis` | TC_WEB_016 |
| Produtos / Catálogo | `Que existem produtos disponíveis no catálogo` | TC_WEB_008 |
| Busca | `Que existe um termo de busca válido disponível` | TC_WEB_009 |
| Newsletter | `Que existe um campo de assinatura de newsletter acessível na [página]` | TC_WEB_010, TC_WEB_011 |
| Formulário de contato | `Que existem dados de contato disponíveis` | TC_WEB_006 |
| Checkout registrando | `Que existem dados de registro e dados de pagamento disponíveis` | TC_WEB_014, TC_WEB_015 |
| Checkout (endereço) | `Que existem dados de registro disponíveis` | TC_WEB_023 |
| Download fatura | `Que existem dados de registro, dados de contato e dados de pagamento disponíveis` | TC_WEB_024 |
| Categorias de produto | `Que existem categorias de produto válidas disponíveis` | TC_WEB_018 |
| Marcas de produto | `Que existem marcas de produto válidas disponíveis` | TC_WEB_019 |
| Avaliação de produto | `Que existe um texto de avaliação de produto disponível` | TC_WEB_021 |
| Quantidade no carrinho | `Que existe um produto disponível com campo de quantidade editável` | TC_WEB_013 |
| Remover do carrinho | `Que existe um produto disponível no catálogo com quantidade configurável` | TC_WEB_017 |
| Carrinho + busca + login | `Que existem credenciais pré-cadastradas e termos de busca válidos disponíveis` | TC_WEB_020 |
| Itens recomendados | `Que existem itens recomendados disponíveis na seção inferior da página inicial` | TC_WEB_022 |
| Navegação (links) | `Que existem links de navegação acessíveis na página inicial` | TC_WEB_007 |
| Scroll com seta | `Que existem botões de navegação acessíveis na página` | TC_WEB_025 |
| Scroll sem seta | `Que existe uma área navegável com scroll` | TC_WEB_026 |

### 10.2 Padrões para Cenários API

| Cenário | Padrão `Dado` | Usado em |
|---------|---------------|----------|
| Login via API (válido) | `Que existem credenciais pré-cadastradas no sistema` | TC_API_005 |
| Login via API (inválido) | `Que existem credenciais inexistentes no sistema` | TC_API_007 |
| API sem email | `Que a API de autenticação está disponível` | TC_API_006 |
| Listar produtos | `Que a API de catálogo de produtos está disponível` | TC_API_001, TC_API_012 |
| Listar marcas | `Que a API de catálogo de marcas está disponível` | TC_API_002, TC_API_013 |
| Criar conta API | `Que existem dados de registro e a API de criação de conta está disponível` | TC_API_008 |
| Excluir conta API | `Que existem credenciais pré-cadastradas e a API de exclusão de conta está disponível` | TC_API_009 |
| Atualizar conta API | `Que existem dados de registro e a API de atualização de conta está disponível` | TC_API_010 |
| Consultar conta API | `Que existem dados de registro e a API de consulta de conta está disponível` | TC_API_011 |
| Buscar produto API | `Que existe um termo de busca válido disponível` | TC_API_003 |
| Buscar sem parâmetro API | `Que a API de busca de produtos está disponível` | TC_API_004 |
| Login sem email API | `Que a API de autenticação está disponível` | TC_API_006, TC_API_014 |

### 10.3 Critérios de Uso

| Termo | Quando usar |
|-------|------------|
| **Credenciais pré-cadastradas** | Usuário já existe no sistema — cenários de login, logout, checkout com usuário existente |
| **Credenciais inexistentes** | Falha intencional — testar resposta da API quando credenciais não existem |
| **Dados de registro** | Criar novo usuário — cenários de registro, checkout registrando |
| **API de [função] disponível** | APIs específicas — acompanhar com a função da API (criação, exclusão, consulta, etc.) |

---

**Documento gerado em:** AAAA-MM-DD

