# Especificação Técnica API - Automation Exercise
**Versão:** 1.0.0<br>
**Metodologia:** Teste de API REST<br>
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
| **Evidências** | HTML report gerado via `cy.task('generateEvidenceReport')`:<br>- Folder: `cypress/screenshots/api/` (plano)<br>- HTML Report: `{testId}_api_result.html` (request, response, assertions, sobrescrito a cada execução)<br>- Relatório unificado no **Allure Report** |


---

## 3. Catálogo Resumido de Cenários (TC_API_001 - TC_API_014)

| ID | Título | Área Funcional | Criticidade | Tipo |
| :--- | :--- | :--- | :--- | :--- |
| TC_API_001 | Listar todos os produtos via API | Catálogo | Alta | Sucesso |
| TC_API_002 | Listar todas as marcas via API | Catálogo | Alta | Sucesso |
| TC_API_003 | Pesquisar produto por termo via API | Catálogo | Alta | Sucesso |
| TC_API_004 | Pesquisar produto sem parâmetro via API | Catálogo | Média | Erro |
| TC_API_005 | Verificar login com credenciais válidas via API | Autenticação | Crítica | Sucesso |
| TC_API_... | ... | ... | ... | ... |
| TC_API_014 | Validar método DELETE em verifyLogin via API | Validação de Métodos HTTP | Média | Erro |

---

## 4. Detalhamento Exaustivo de Cenários (API)

Esta seção fornece a especificação técnica passo a passo para cada cenário de teste de API, permitindo que qualquer QA reproduza o teste manualmente. Cada novo TC adicionado deve ser inserido abaixo, seguindo a estrutura de grupo funcional.

<!--

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
| 2 | Validar responseCode | body.responseCode | Igual a 200 |
| 3 | Validar array de produtos | body.products | É um array |
| 4 | Validar quantidade de produtos | body.products.length | Igual a N |
| ... | ... | ... | ... |
**Asserção Chave:** [status code esperado] com [responseCode esperado] e [validação chave do body]<br>
**Resultado esperado:** [Resultado esperado do teste - desfecho de negócio]
<br>
**Script:** [TCXXX_nome_do_teste.cy.js](../Cypress/cypress/e2e/api/TCXXX_nome_do_teste.cy.js)<br>
```javascript
expect(response.status).to.eq(200)
expect(response.body.responseCode).to.eq(200)
expect(response.body.products).to.be.an('array')
```

**Evidência:**
[`{testId}_api_result.html`](https://htmlpreview.github.io/?https://github.com/mtnirvana/AutomationExercise/blob/main/automationexercise/Cypress/cypress/screenshots/api/{testId}_api_result.html)

---

### 4.2 Grupo: Autenticação e Validação de Credenciais (TC_API_005 - TC_API_007)

---

### 4.3 Grupo: Gestão de Usuários (TC_API_008 - TC_API_011)

---

### 4.4 Grupo: Validação de Métodos HTTP (TC_API_012 - TC_API_014)

---

Para adicionar um novo TC, insira-o abaixo do grupo funcional correspondente, seguindo o formato do template acima.

-->

---

## 5. Glossário de Endpoints

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
| POST | `/api/searchProduct` (sem parâmetro) | `200` | `{"responseCode": 400, "message": "..."}` | Erro no body |
| POST | `/api/productsList` | `200` | `{"responseCode": 405, "message": "..."}` | Método não suportado retorna 405 no body |
| PUT | `/api/brandsList` | `200` | `{"responseCode": 405, "message": "..."}` | Método não suportado retorna 405 no body |
| DELETE | `/api/verifyLogin` | `200` | `{"responseCode": 405, "message": "..."}` | Método não suportado retorna 405 no body |
| **HEAD** | `/api/productsList` | **405** | **(vazio)** | HEAD retorna 405 **diretamente** no status HTTP, sem body — sem corpo por definição do protocolo |
  
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

> **Exemplo de preenchimento:** No documento completo, a pasta `api/` deve listar todos os 14 scripts de teste API com seus nomes completos, conforme [`Especificacao_Tecnica_API.md`](Especificacao_Tecnica_API.md).

 ---
 
 **Documento gerado em:** AAAA-MM-DD