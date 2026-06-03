# Especificação Técnica API - Automation Exercise
**Versão:** 1.0.0<br>
**Metodologia:** API Testing (Cypress)<br>
**Responsável:** Rafael Barelli

---

## 1. Introdução Técnica

Este documento fornece o detalhamento operacional para a execução e manutenção da suíte de testes de API do **Automation Exercise**. Ele serve como o guia definitivo para engenheiros de QA, descrevendo o comportamento esperado da API e os pontos críticos de validação para cada cenário.

### 1.1 Premissas de Execução
- **Clean Slate:** Cada teste deve ser capaz de criar e excluir seus próprios dados quando aplicável.
- **Design Pattern:** Uso de `cy.task()` para requisições HTTP via Node.js, evitando dependência de browser.
- **Dados Dinâmicos:** Uso de `UserFactory.generate()` para criação de usuários únicos por execução.

---

## 2. Padrões de Validação

| Elemento | Padrão Técnico |
|:--- |:---|
| **Requisições** | Via `cy.task('apiRequest', { hostname, path, method })` |
| **Asserções** | Explícitas (`expect(response.status).to.eq(200)`) em **PORTUGUÊS** conforme padrão: `é igual a 200`, `é um array`, `possui propriedade id` |
| **Validação de Body** | Verificação de `responseCode`, `products`, `brands`, `message` |
| **Cleanup** | afterEach com DELETE para usuários criados |
| **Evidências** | HTML report gerado via `cy.task('generateEvidenceReport')`:<br>- Folder: [`cypress/screenshots/api/`](../Cypress/cypress/screenshots/api/)<br>- HTML Report: `{testId}_api_result.html` (request, response, assertions, sobrescrito a cada execução)<br>- Relatório unificado no **Allure Report** |
| **Asserções em PT-BR** | Descrições em **PORTUGUÊS (BRASIL)** conforme padrão do projeto (ex: 'é igual a 200', 'é um array', 'possui propriedade id') |

---

## 3. Catálogo Resumido de Cenários (TC_API_001 - TC_API_014)

| ID | Título | Área Funcional | Criticidade | Tipo |
| :--- | :--- | :--- | :--- | :--- |
| **TC_API_001** | Listar todos os produtos via API | Catálogo | Alta | Sucesso |
| **TC_API_002** | Listar todas as marcas via API | Catálogo | Alta | Sucesso |
| **TC_API_003** | Pesquisar produto por termo via API | Catálogo | Alta | Sucesso |
| **TC_API_004** | Pesquisar produto sem parâmetro via API | Catálogo | Média | Erro |
| **TC_API_005** | Verificar login com credenciais válidas via API | Autenticação | Crítica | Sucesso |
| **TC_API_006** | Verificar login sem email via API | Autenticação | Média | Erro |
| **TC_API_007** | Verificar login com credenciais inválidas via API | Autenticação | Alta | Erro |
| **TC_API_008** | Criar conta de usuário via API | Gestão de Usuários | Crítica | Sucesso |
| **TC_API_009** | Excluir conta de usuário via API | Gestão de Usuários | Crítica | Sucesso |
| **TC_API_010** | Atualizar conta de usuário via API | Gestão de Usuários | Alta | Sucesso |
| **TC_API_011** | Obter detalhes do usuário por email via API | Gestão de Usuários | Alta | Sucesso |
| **TC_API_012** | Validar método POST em productsList via API | Validação de Métodos HTTP | Média | Erro |
| **TC_API_013** | Validar método PUT em brandsList via API | Validação de Métodos HTTP | Média | Erro |
| **TC_API_014** | Validar método DELETE em verifyLogin via API | Validação de Métodos HTTP | Média | Erro |

---

## 4. Detalhamento Exaustivo de Cenários (API)

Esta seção fornece a especificação técnica passo a passo para cada cenário de teste de API, permitindo que qualquer QA reproduza o teste manualmente. Cada novo TC adicionado deve ser inserido abaixo, seguindo a estrutura de grupo funcional.

---

### 4.1 Grupo: Catálogo de Produtos e Marcas (TC_API_001 - TC_API_004)

---

#### TC_API_001 - Listar todos os produtos via API

**Objetivo:** Validar o retorno da lista completa de produtos do catálogo.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Alta<br>
**Dados:** Nenhum (endpoint público)<br>
**Pós-condição:** Nenhuma alteração

**Passos Detalhados:**

| Passo | Ação | Endpoint | Validação |
|:---:|:---|:---|:---|
| 1 | Enviar requisição GET para /api/productsList | GET /api/productsList | Status 200 |
| 2 | Validar status code 200 | response.status | Igual a 200 |
| 3 | Validar responseCode | body.responseCode | Igual a 200 |
| 4 | Validar array de produtos | body.products | É um array |
| 5 | Validar quantidade de produtos | body.products.length | Igual a 34 |
| 6 | Validar propriedade id do primeiro produto | body.products[0] | Possui propriedade id |
| 7 | Validar propriedade name do primeiro produto | body.products[0] | Possui propriedade name |
| 8 | Validar propriedade price do primeiro produto | body.products[0] | Possui propriedade price |
| 9 | Validar propriedade brand do primeiro produto | body.products[0] | Possui propriedade brand |
| 10 | Validar propriedade category do primeiro produto | body.products[0] | Possui propriedade category |
| 11 | Gerar evidência do teste | cy.task('generateEvidenceReport') | HTML salvo em screenshots/api/ |

**Asserção Chave:** Response status 200 com responseCode 200 e body contendo array de 34 produtos<br>
**Resultado esperado:** API retorna catálogo completo com 34 produtos<br>
**Script:** [`TC_API_001_sucesso_listar_todos_produtos.cy.js`](../Cypress/cypress/e2e/api/TC_API_001_sucesso_listar_todos_produtos.cy.js)<br>
```javascript
expect(response.status).to.eq(200)
expect(response.body.responseCode).to.eq(200)
expect(response.body.products).to.be.an('array')
expect(response.body.products.length).to.eq(34)
expect(response.body.products[0]).to.have.property('id')
expect(response.body.products[0]).to.have.property('name')
expect(response.body.products[0]).to.have.property('price')
expect(response.body.products[0]).to.have.property('brand')
expect(response.body.products[0]).to.have.property('category')
```

**Evidência:**
[`TC_API_001_api_result.html`](https://htmlpreview.github.io/?https://github.com/mtnirvana/AutomationExercise/blob/main/automationexercise/Cypress/cypress/screenshots/api/TC_API_001_api_result.html)

---

#### TC_API_002 - Listar todas as marcas via API

**Objetivo:** Validar o retorno da lista completa de marcas do catálogo.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Alta<br>
**Dados:** Nenhum (endpoint público)<br>
**Pós-condição:** Nenhuma alteração

**Passos Detalhados:**

| Passo | Ação | Endpoint | Validação |
|:---:|:---|:---|:---|
| 1 | Enviar requisição GET para /api/brandsList | GET /api/brandsList | Status 200 |
| 2 | Validar status code 200 | response.status | Igual a 200 |
| 3 | Validar responseCode | body.responseCode | Igual a 200 |
| 4 | Validar array de marcas | body.brands | É um array |
| 5 | Validar quantidade de marcas | body.brands.length | Igual a 34 |
| 6 | Validar propriedade id da primeira marca | body.brands[0] | Possui propriedade id |
| 7 | Validar propriedade brand da primeira marca | body.brands[0] | Possui propriedade brand |
| 8 | Gerar evidência do teste | cy.task('generateEvidenceReport') | HTML salvo em screenshots/api/ |

**Asserção Chave:** Response status 200 com responseCode 200 e array de marcas no body<br>
**Resultado esperado:** API retorna lista de marcas disponíveis<br>
**Script:** [`TC_API_002_sucesso_listar_todas_marcas.cy.js`](../Cypress/cypress/e2e/api/TC_API_002_sucesso_listar_todas_marcas.cy.js)<br>
```javascript
expect(response.status).to.eq(200)
expect(response.body.responseCode).to.eq(200)
expect(response.body.brands).to.be.an('array')
expect(response.body.brands.length).to.eq(34)
expect(response.body.brands[0]).to.have.property('id')
expect(response.body.brands[0]).to.have.property('brand')
```

**Evidência:**
[`TC_API_002_api_result.html`](https://htmlpreview.github.io/?https://github.com/mtnirvana/AutomationExercise/blob/main/automationexercise/Cypress/cypress/screenshots/api/TC_API_002_api_result.html)

---

#### TC_API_003 - Pesquisar produto por termo via API

**Objetivo:** Validar a busca de produtos por termo de pesquisa.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Alta<br>
**Dados:** Termo de busca 'top' via fixture ou string literal<br>
**Pós-condição:** Nenhuma alteração

**Passos Detalhados:**

| Passo | Ação | Endpoint | Validação |
|:---:|:---|:---|:---|
| 1 | Enviar requisição POST para /api/searchProduct com termo 'top' | POST /api/searchProduct | Status 200 |
| 2 | Validar status code 200 | response.status | Igual a 200 |
| 3 | Validar responseCode | body.responseCode | Igual a 200 |
| 4 | Validar array de produtos | body.products | É um array |
| 5 | Validar quantidade de produtos encontrados | body.products.length | Igual a 14 |
| 6 | Validar propriedade id do primeiro produto | body.products[0] | Possui propriedade id |
| 7 | Validar que o nome do primeiro produto contém o termo de busca | body.products[0].name | Contém "top" |
| 8 | Gerar evidência do teste | cy.task('generateEvidenceReport') | HTML salvo em screenshots/api/ |

**Asserção Chave:** Response status 200 com produtos filtrados contendo o termo "top" no name<br>
**Resultado esperado:** API retorna produtos filtrados pelo termo buscado<br>
**Script:** [`TC_API_003_sucesso_pesquisar_produto.cy.js`](../Cypress/cypress/e2e/api/TC_API_003_sucesso_pesquisar_produto.cy.js)<br>
```javascript
expect(response.status).to.eq(200)
expect(response.body.responseCode).to.eq(200)
expect(response.body.products).to.be.an('array')
expect(response.body.products.length).to.eq(14)
expect(response.body.products[0]).to.have.property('id')
expect(response.body.products[0].name.toLowerCase()).to.include('top')
```

**Evidência:**
[`TC_API_003_api_result.html`](https://htmlpreview.github.io/?https://github.com/mtnirvana/AutomationExercise/blob/main/automationexercise/Cypress/cypress/screenshots/api/TC_API_003_api_result.html)

---

#### TC_API_004 - Pesquisar produto sem parâmetro via API

**Objetivo:** Validar que a API retorna erro quando parâmetro de busca está ausente.<br>
**Tipo:** Erro<br>
**Criticidade:** Média<br>
**Dados:** Nenhum (requisição sem parâmetro)<br>
**Pós-condição:** Nenhuma alteração

**Passos Detalhados:**

| Passo | Ação | Endpoint | Validação |
|:---:|:---|:---|:---|
| 1 | Enviar requisição POST para /api/searchProduct sem parâmetro | POST /api/searchProduct | Status 200 |
| 2 | Validar status code 200 | response.status | Igual a 200 |
| 3 | Validar responseCode de erro | body.responseCode | Igual a 400 |
| 4 | Validar mensagem de erro | body.message | Contém 'Bad request, search_product parameter is missing' |
| 5 | Gerar evidência do teste | cy.task('generateEvidenceReport') | HTML salvo em screenshots/api/ |

**Asserção Chave:** Response code 400 com mensagem de parâmetro ausente no body<br>
**Resultado esperado:** API retorna erro quando parâmetro obrigatório está ausente<br>
**Script:** [`TC_API_004_erro_pesquisar_produto_sem_parametro.cy.js`](../Cypress/cypress/e2e/api/TC_API_004_erro_pesquisar_produto_sem_parametro.cy.js)<br>
```javascript
expect(response.status).to.eq(200)
expect(response.body.responseCode).to.eq(400)
expect(response.body.message).to.eq('Bad request, search_product parameter is missing in POST request.')
```

**Evidência:**
[`TC_API_004_api_result.html`](https://htmlpreview.github.io/?https://github.com/mtnirvana/AutomationExercise/blob/main/automationexercise/Cypress/cypress/screenshots/api/TC_API_004_api_result.html)

---

### 4.2 Grupo: Autenticação e Validação de Credenciais (TC_API_005 - TC_API_007)

---

#### TC_API_005 - Verificar login com credenciais válidas via API

**Objetivo:** Garantir que a API retorna sucesso quando credenciais válidas são fornecidas.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Crítica<br>
**Dados:** `cypress/fixtures/users.json` → `testUser` (credenciais pré-cadastradas)<br>
**Pós-condição:** Nenhuma (fixture reutilizável)

**Passos Detalhados:**

| Passo | Ação | Endpoint | Validação |
|:---:|:---|:---|:---|
| 1 | Enviar requisição POST para /api/verifyLogin com credenciais válidas | POST /api/verifyLogin | Status 200 |
| 2 | Validar status code 200 | response.status | Igual a 200 |
| 3 | Validar responseCode | body.responseCode | Igual a 200 |
| 4 | Validar mensagem de sucesso | body.message | Igual a 'User exists!' |
| 5 | Gerar evidência do teste | cy.task('generateEvidenceReport') | HTML salvo em screenshots/api/ |

**Asserção Chave:** Response status 200 com responseCode 200 e message "User exists!"<br>
**Resultado esperado:** API autentica usuário com credenciais corretas<br>
**Script:** [`TC_API_005_sucesso_verificar_login_valido.cy.js`](../Cypress/cypress/e2e/api/TC_API_005_sucesso_verificar_login_valido.cy.js)<br>
```javascript
expect(response.status).to.eq(200)
expect(response.body.responseCode).to.eq(200)
expect(response.body.message).to.eq('User exists!')
```

**Evidência:**
[`TC_API_005_api_result.html`](https://htmlpreview.github.io/?https://github.com/mtnirvana/AutomationExercise/blob/main/automationexercise/Cypress/cypress/screenshots/api/TC_API_005_api_result.html)

---

#### TC_API_006 - Verificar login sem email via API

**Objetivo:** Validar que a API retorna erro quando email está ausente.<br>
**Tipo:** Erro<br>
**Criticidade:** Média<br>
**Dados:** Nenhum (requisição sem email)<br>
**Pós-condição:** Nenhuma alteração

**Passos Detalhados:**

| Passo | Ação | Endpoint | Validação |
|:---:|:---|:---|:---|
| 1 | Enviar requisição POST para /api/verifyLogin sem email | POST /api/verifyLogin | Status 200 |
| 2 | Validar status code 200 | response.status | Igual a 200 |
| 3 | Validar responseCode de erro | body.responseCode | Igual a 400 |
| 4 | Validar mensagem de erro | body.message | Contém 'Bad request, email or password parameter is missing' |
| 5 | Gerar evidência do teste | cy.task('generateEvidenceReport') | HTML salvo em screenshots/api/ |

**Asserção Chave:** Response code 400 com mensagem de parâmetro email ausente<br>
**Resultado esperado:** API retorna erro quando campo obrigatório está ausente<br>
**Script:** [`TC_API_006_erro_verificar_login_sem_email.cy.js`](../Cypress/cypress/e2e/api/TC_API_006_erro_verificar_login_sem_email.cy.js)<br>
```javascript
expect(response.status).to.eq(200)
expect(response.body.responseCode).to.eq(400)
expect(response.body.message).to.eq('Bad request, email or password parameter is missing in POST request.')
```

**Evidência:**
[`TC_API_006_api_result.html`](https://htmlpreview.github.io/?https://github.com/mtnirvana/AutomationExercise/blob/main/automationexercise/Cypress/cypress/screenshots/api/TC_API_006_api_result.html)

---

#### TC_API_007 - Verificar login com credenciais inválidas via API

**Objetivo:** Validar que a API retorna erro quando credenciais não existem.<br>
**Tipo:** Erro<br>
**Criticidade:** Alta<br>
**Dados:** `cypress/fixtures/users.json` → `invalidUser`<br>
**Pós-condição:** Nenhuma alteração

**Passos Detalhados:**

| Passo | Ação | Endpoint | Validação |
|:---:|:---|:---|:---|
| 1 | Enviar requisição POST para /api/verifyLogin com credenciais inválidas | POST /api/verifyLogin | Status 200 |
| 2 | Validar status code 200 | response.status | Igual a 200 |
| 3 | Validar responseCode de erro | body.responseCode | Igual a 404 |
| 4 | Validar mensagem de erro | body.message | Igual a 'User not found!' |
| 5 | Gerar evidência do teste | cy.task('generateEvidenceReport') | HTML salvo em screenshots/api/ |

**Asserção Chave:** Response code 404 com message "User not found!"<br>
**Resultado esperado:** API rejeita autenticação com dados incorretos<br>
**Script:** [`TC_API_007_erro_verificar_login_invalido.cy.js`](../Cypress/cypress/e2e/api/TC_API_007_erro_verificar_login_invalido.cy.js)<br>
```javascript
expect(response.status).to.eq(200)
expect(response.body.responseCode).to.eq(404)
expect(response.body.message).to.eq('User not found!')
```

**Evidência:**
[`TC_API_007_api_result.html`](https://htmlpreview.github.io/?https://github.com/mtnirvana/AutomationExercise/blob/main/automationexercise/Cypress/cypress/screenshots/api/TC_API_007_api_result.html)

---

### 4.3 Grupo: Gestão de Usuários (TC_API_008 - TC_API_011)

---

#### TC_API_008 - Criar conta de usuário via API

**Objetivo:** Validar a criação de novo usuário via endpoint.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Crítica<br>
**Dados:** Dados dinâmicos via UserFactory.generate()<br>
**Pós-condição:** Usuário criado é excluído no afterEach

**Passos Detalhados:**

| Passo | Ação | Endpoint | Validação |
|:---:|:---|:---|:---|
| 1 | Enviar requisição POST para /api/createAccount | POST /api/createAccount | Status 200 |
| 2 | Validar status code 200 | response.status | Igual a 200 |
| 3 | Validar responseCode | body.responseCode | Igual a 201 |
| 4 | Validar mensagem de sucesso | body.message | Igual a 'User created!' |
| 5 | Gerar evidência do teste | cy.task('generateEvidenceReport') | HTML salvo em screenshots/api/ |

**Asserção Chave:** Response status 200 com responseCode 201 e message "User created!"<br>
**Resultado esperado:** API cria nova conta com dados fornecidos<br>
**Script:** [`TC_API_008_sucesso_criar_conta_usuario.cy.js`](../Cypress/cypress/e2e/api/TC_API_008_sucesso_criar_conta_usuario.cy.js)<br>
```javascript
expect(response.status).to.eq(200)
expect(response.body.responseCode).to.eq(201)
expect(response.body.message).to.eq('User created!')
```

**Evidência:**
[`TC_API_008_api_result.html`](https://htmlpreview.github.io/?https://github.com/mtnirvana/AutomationExercise/blob/main/automationexercise/Cypress/cypress/screenshots/api/TC_API_008_api_result.html)

---

#### TC_API_009 - Excluir conta de usuário via API

**Objetivo:** Validar a exclusão de usuário via endpoint.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Crítica<br>
**Dados:** `cypress/data/UserFactory.js` → `UserFactory.generate()` (usuário dinâmico)<br>
**Pós-condição:** Nenhuma (usuário temporário criado e excluído no mesmo teste)

**Passos Detalhados:**

| Passo | Ação | Endpoint | Validação |
|:---:|:---|:---|:---|
| 1 | Gerar dados de usuário dinâmico via UserFactory | UserFactory.generate() | Email único gerado |
| 2 | Enviar requisição POST para /api/createAccount para criar usuário | POST /api/createAccount | Status 200 |
| 3 | Enviar requisição DELETE para /api/deleteAccount | DELETE /api/deleteAccount | Status 200 |
| 4 | Validar status code 200 | response.status | Igual a 200 |
| 5 | Validar responseCode | body.responseCode | Igual a 200 |
| 6 | Validar mensagem de sucesso | body.message | Igual a 'Account deleted!' |
| 7 | Gerar evidência do teste | cy.task('generateEvidenceReport') | HTML salvo em screenshots/api/ |

**Asserção Chave:** Response status 200 com responseCode 200 e message "Account deleted!"<br>
**Resultado esperado:** API remove conta existente do sistema<br>
**Script:** [`TC_API_009_sucesso_excluir_conta_usuario.cy.js`](../Cypress/cypress/e2e/api/TC_API_009_sucesso_excluir_conta_usuario.cy.js)<br>
```javascript
expect(response.status).to.eq(200)
expect(response.body.responseCode).to.eq(200)
expect(response.body.message).to.eq('Account deleted!')
```

**Evidência:**
[`TC_API_009_api_result.html`](https://htmlpreview.github.io/?https://github.com/mtnirvana/AutomationExercise/blob/main/automationexercise/Cypress/cypress/screenshots/api/TC_API_009_api_result.html)

---

#### TC_API_010 - Atualizar conta de usuário via API

**Objetivo:** Validar a atualização de dados do usuário via endpoint PUT.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Alta<br>
**Dados:** Dados dinâmicos via UserFactory.generate()<br>
**Pós-condição:** Usuário criado é excluído no afterEach

**Passos Detalhados:**

| Passo | Ação | Endpoint | Validação |
|:---:|:---|:---|:---|
| 1 | Enviar requisição POST para /api/createAccount | POST /api/createAccount | Status 200 |
| 2 | Enviar requisição PUT para /api/updateAccount | PUT /api/updateAccount | Status 200 |
| 3 | Validar status code 200 | response.status | Igual a 200 |
| 4 | Validar responseCode | body.responseCode | Igual a 200 |
| 5 | Validar mensagem de sucesso | body.message | Igual a 'User updated!' |
| 6 | Consultar usuário via GET e verificar dados atualizados | GET /api/getUserDetailByEmail?email= | Status 200, dados conferidos |
| 7 | Gerar evidência do teste | cy.task('generateEvidenceReport') | HTML salvo em screenshots/api/ |

**Asserção Chave:** Response status 200 com responseCode 200 e message "User updated!"<br>
**Resultado esperado:** API permite alteração de dados cadastrais<br>
**Script:** [`TC_API_010_sucesso_atualizar_conta_usuario.cy.js`](../Cypress/cypress/e2e/api/TC_API_010_sucesso_atualizar_conta_usuario.cy.js)<br>
```javascript
// Validações do PUT
expect(response.status).to.eq(200)
expect(response.body.responseCode).to.eq(200)
expect(response.body.message).to.eq('User updated!')
// Validações de persistência via GET
expect(getResponse.body.responseCode).to.eq(200)
expect(getResponse.body.user.first_name).to.eq('Updated')
expect(getResponse.body.user.last_name).to.eq('Name')
```

**Evidência:**
[`TC_API_010_api_result.html`](https://htmlpreview.github.io/?https://github.com/mtnirvana/AutomationExercise/blob/main/automationexercise/Cypress/cypress/screenshots/api/TC_API_010_api_result.html)

---

#### TC_API_011 - Obter detalhes do usuário por email via API

**Objetivo:** Validar a busca de detalhes de usuário pelo email.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Alta<br>
**Dados:** Dados dinâmicos via UserFactory.generate()<br>
**Pós-condição:** Usuário criado é excluído no afterEach

**Passos Detalhados:**

| Passo | Ação | Endpoint | Validação |
|:---:|:---|:---|:---|
| 1 | Enviar requisição POST para /api/createAccount | POST /api/createAccount | Status 200 |
| 2 | Enviar requisição GET para /api/getUserDetailByEmail | GET /api/getUserDetailByEmail | Status 200 |
| 3 | Validar status code 200 | response.status | Igual a 200 |
| 4 | Validar responseCode | body.responseCode | Igual a 200 |
| 5 | Validar propriedade user | body.user | Existe e não é null |
| 6 | Validar que o nome retornado é "TestUser" | body.user.name | Igual a "TestUser" |
| 7 | Validar que o email retornado é o email consultado | body.user.email | Igual ao email usado no cadastro |
| 8 | Gerar evidência do teste | cy.task('generateEvidenceReport') | HTML salvo em screenshots/api/ |

**Asserção Chave:** Response status 200 com objeto user contendo name e email<br>
**Resultado esperado:** API retorna dados do usuário pelo email<br>
**Script:** [`TC_API_011_sucesso_obter_detalhes_usuario_por_email.cy.js`](../Cypress/cypress/e2e/api/TC_API_011_sucesso_obter_detalhes_usuario_por_email.cy.js)<br>
```javascript
expect(response.status).to.eq(200)
expect(response.body.responseCode).to.eq(200)
expect(response.body).to.have.property('user')
expect(response.body.user.name).to.eq('TestUser')
expect(response.body.user.email).to.eq(testEmail)
```

**Evidência:**
[`TC_API_011_api_result.html`](https://htmlpreview.github.io/?https://github.com/mtnirvana/AutomationExercise/blob/main/automationexercise/Cypress/cypress/screenshots/api/TC_API_011_api_result.html)

---

### 4.4 Grupo: Validação de Métodos HTTP (TC_API_012 - TC_API_014)

---

#### TC_API_012 - Validar método POST em productsList via API

**Objetivo:** Garantir que POST não é suportado em /api/productsList.<br>
**Tipo:** Erro<br>
**Criticidade:** Média<br>
**Dados:** Nenhum<br>
**Pós-condição:** Nenhuma alteração

**Passos Detalhados:**

| Passo | Ação | Endpoint | Validação |
|:---:|:---|:---|:---|
| 1 | Enviar requisição POST para /api/productsList | POST /api/productsList | Status 200 |
| 2 | Validar status code 200 | response.status | Igual a 200 |
| 3 | Validar responseCode de erro | body.responseCode | Igual a 405 |
| 4 | Validar mensagem de erro | body.message | Igual a 'This request method is not supported.' |
| 5 | Gerar evidência do teste | cy.task('generateEvidenceReport') | HTML salvo em screenshots/api/ |

**Asserção Chave:** Response code 405 com message "This request method is not supported."<br>
**Resultado esperado:** API rejeita método não permitido com erro 405<br>
**Script:** [`TC_API_012_erro_validar_metodo_post_em_productslist.cy.js`](../Cypress/cypress/e2e/api/TC_API_012_erro_validar_metodo_post_em_productslist.cy.js)<br>
```javascript
expect(response.status).to.eq(200)
expect(response.body.responseCode).to.eq(405)
expect(response.body.message).to.eq('This request method is not supported.')
```

**Evidência:**
[`TC_API_012_api_result.html`](https://htmlpreview.github.io/?https://github.com/mtnirvana/AutomationExercise/blob/main/automationexercise/Cypress/cypress/screenshots/api/TC_API_012_api_result.html)

---

#### TC_API_013 - Validar método PUT em brandsList via API

**Objetivo:** Garantir que PUT não é suportado em /api/brandsList.<br>
**Tipo:** Erro<br>
**Criticidade:** Média<br>
**Dados:** Nenhum<br>
**Pós-condição:** Nenhuma alteração

**Passos Detalhados:**

| Passo | Ação | Endpoint | Validação |
|:---:|:---|:---|:---|
| 1 | Enviar requisição PUT para /api/brandsList | PUT /api/brandsList | Status 200 |
| 2 | Validar status code 200 | response.status | Igual a 200 |
| 3 | Validar responseCode de erro | body.responseCode | Igual a 405 |
| 4 | Validar mensagem de erro | body.message | Igual a 'This request method is not supported.' |
| 5 | Gerar evidência do teste | cy.task('generateEvidenceReport') | HTML salvo em screenshots/api/ |

**Asserção Chave:** Response code 405 com message "This request method is not supported."<br>
**Resultado esperado:** API rejeita método não permitido com erro 405<br>
**Script:** [`TC_API_013_erro_validar_metodo_put_em_brandslist.cy.js`](../Cypress/cypress/e2e/api/TC_API_013_erro_validar_metodo_put_em_brandslist.cy.js)<br>
```javascript
expect(response.status).to.eq(200)
expect(response.body.responseCode).to.eq(405)
expect(response.body.message).to.eq('This request method is not supported.')
```

**Evidência:**
[`TC_API_013_api_result.html`](https://htmlpreview.github.io/?https://github.com/mtnirvana/AutomationExercise/blob/main/automationexercise/Cypress/cypress/screenshots/api/TC_API_013_api_result.html)

---

#### TC_API_014 - Validar método DELETE em verifyLogin via API

**Objetivo:** Garantir que DELETE não é suportado em /api/verifyLogin.<br>
**Tipo:** Erro<br>
**Criticidade:** Média<br>
**Dados:** Nenhum<br>
**Pós-condição:** Nenhuma alteração

**Passos Detalhados:**

| Passo | Ação | Endpoint | Validação |
|:---:|:---|:---|:---|
| 1 | Enviar requisição DELETE para /api/verifyLogin | DELETE /api/verifyLogin | Status 200 |
| 2 | Validar status code 200 | response.status | Igual a 200 |
| 3 | Validar responseCode de erro | body.responseCode | Igual a 405 |
| 4 | Validar mensagem de erro | body.message | Igual a 'This request method is not supported.' |
| 5 | Gerar evidência do teste | cy.task('generateEvidenceReport') | HTML salvo em screenshots/api/ |

**Asserção Chave:** Response code 405 com message "This request method is not supported."<br>
**Resultado esperado:** API rejeita método não permitido com erro 405<br>
**Script:** [`TC_API_014_erro_validar_metodo_delete_em_verifilogin.cy.js`](../Cypress/cypress/e2e/api/TC_API_014_erro_validar_metodo_delete_em_verifilogin.cy.js)<br>
```javascript
expect(response.status).to.eq(200)
expect(response.body.responseCode).to.eq(405)
expect(response.body.message).to.eq('This request method is not supported.')
```

**Evidência:**
[`TC_API_014_api_result.html`](https://htmlpreview.github.io/?https://github.com/mtnirvana/AutomationExercise/blob/main/automationexercise/Cypress/cypress/screenshots/api/TC_API_014_api_result.html)

---

## 5. Glossário de Endpoints

Este glossário consolida todos os endpoints testados no projeto.

### 5.1 Endpoints GET

| Endpoint | Descrição | Método | Autenticação |
|:---|:---|:---|:---|
| `/api/productsList` | Lista todos os produtos | GET | Não |
| `/api/brandsList` | Lista todas as marcas | GET | Não |
| `/api/getUserDetailByEmail` | Busca detalhes de usuário por email | GET | Sim (via query param) |

### 5.2 Endpoints POST

| Endpoint | Descrição | Método | Autenticação |
|:---|:---|:---|:---|
| `/api/searchProduct` | Pesquisa produtos | POST | Não |
| `/api/verifyLogin` | Verifica credenciais de login | POST | Sim (via body) |
| `/api/createAccount` | Cria nova conta de usuário | POST | Sim (via body) |

### 5.3 Endpoints PUT

| Endpoint | Descrição | Método | Autenticação |
|:---|:---|:---|:---|
| `/api/updateAccount` | Atualiza dados do usuário | PUT | Sim (via body) |

### 5.4 Endpoints DELETE

| Endpoint | Descrição | Método | Autenticação |
|:---|:---|:---|:---|
| `/api/deleteAccount` | Exclui conta de usuário | DELETE | Sim (via body) |

---

## 6. Códigos de Resposta Esperados

| Código | Descrição |
|:---|:---|
| 200 | Sucesso (requisição válida, pode conter responseCode de erro interno) |
| 201 | Recurso criado com sucesso (usuário criado) |
| 400 | Requisição inválida (parâmetros ausentes) |
| 404 | Recurso não encontrado (usuário não existe) |
| 405 | Método HTTP não suportado |

### 6.1 Comportamento por Método HTTP

| Método | Endpoint | Status HTTP | Response Body | Observação |
|:---|:---|:---:|:---|:---|
| POST | `/api/searchProduct` (sem parâmetro) | 200 | `{"responseCode": 400, "message": "..."}` | Erro no body |
| POST | `/api/productsList` | 200 | `{"responseCode": 405, "message": "..."}` | Método não suportado no body |
| PUT | `/api/brandsList` | 200 | `{"responseCode": 405, "message": "..."}` | Método não suportado no body |
| DELETE | `/api/verifyLogin` | 200 | `{"responseCode": 405, "message": "..."}` | Método não suportado no body |
| **HEAD** | `/api/productsList` | **405** | **(vazio)** | HEAD retorna 405 **diretamente** no status HTTP, sem body |
 
 ---

## 7. Estrutura de Arquivos

Estrutura completa do projeto com destaque para os artefatos de teste **API**:

```
automationexercise/
└── Cypress/cypress/
    ├── e2e/
    │   ├── web/                 # Testes E2E
    │   ├── api/                 # Testes de API (TC_API_001-TC_API_014)
    │   │   ├── TC_API_001_sucesso_listar_todos_produtos.cy.js
    │   │   ├── TC_API_002_sucesso_listar_todas_marcas.cy.js
    │   │   ├── TC_API_003_sucesso_pesquisar_produto.cy.js
    │   │   ├── TC_API_004_erro_pesquisar_produto_sem_parametro.cy.js
    │   │   ├── TC_API_005_sucesso_verificar_login_valido.cy.js
    │   │   ├── TC_API_006_erro_verificar_login_sem_email.cy.js
    │   │   ├── TC_API_007_erro_verificar_login_invalido.cy.js
    │   │   ├── TC_API_008_sucesso_criar_conta_usuario.cy.js
    │   │   ├── TC_API_009_sucesso_excluir_conta_usuario.cy.js
    │   │   ├── TC_API_010_sucesso_atualizar_conta_usuario.cy.js
    │   │   ├── TC_API_011_sucesso_obter_detalhes_usuario_por_email.cy.js
    │   │   ├── TC_API_012_erro_validar_metodo_post_em_productslist.cy.js
    │   │   ├── TC_API_013_erro_validar_metodo_put_em_brandslist.cy.js
    │   │   └── TC_API_014_erro_validar_metodo_delete_em_verifilogin.cy.js
    │   └── performance/         # Testes de performance (k6 + Cypress)
    ├── fixtures/                # Dados estaticos
    │   ├── users.json           # Credenciais e dados de pagamento
    │   ├── products.json        # Produtos, categorias, marcas
    │   ├── contact.json         # Mensagens e assuntos
    │   ├── ui_texts.json        # Labels, headers, erros, botoes
    │   └── test_file.txt        # Arquivo de teste para upload
    ├── support/                 # Comandos customizados
    │   └── e2e.js               # beforeEach centralizado + cy.captura()
    ├── reports/                 # Relatorios de execucao
    ├── screenshots/             # Evidencias visuais
    └── videos/                  # Videos das execucoes
```
---

**Documento gerado em:** 2026-06-02