# Especificação Técnica Web - Automation Exercise
**Versão:** 1.0.0<br>
**Responsável:** Rafael Barelli

---

## 1. Introdução Técnica
Este documento fornece o detalhamento operacional para a execução e manutenção da suíte de testes do **Automation Exercise**. Ele serve como o guia definitivo para engenheiros de QA, descrevendo o comportamento esperado do sistema e os pontos críticos de validação para cada cenário.
### 1.1 Premissas de Execução
- **Clean Slate:** Cada teste deve ser capaz de criar e excluir seus próprios dados quando aplicável.
- **Design Pattern:** Uso obrigatório de **Page Object Model (POM)** para abstração de seletores, mensagens, validações e métodos de interação.
- **Dados Dinâmicos:** Uso de `UserFactory` para dados únicos por execução.
---
## 2. Padrões de Validação
| Elemento | Padrão Técnico |
| :--- | :--- |
| **Geração de Dados** | Uso de `UserFactory.js` para contas únicas e `fixtures/` para dados estáticos. |
| **Asserções** | Devem ser explícitas (`should('be.visible')`, `should('have.text')`). |
| **Resiliência** | Uso de esperas inteligentes e validação de estado de UI antes da interação. |
| **Evidências** | Screenshots prefixados com `TC_WEB_###_XX_descricao` via `cy.captura()`. Relatório unificado no **Allure Report**. |
---
## 3. Catálogo Resumido de Cenários (TC_WEB_001 - TC_WEB_026)
| ID | Título | Área Funcional | Criticidade | Tipo |
| :--- | :--- | :--- | :--- | :--- |
| TC_WEB_001 | Registrar usuário | Identidade | Crítica | Sucesso |
| TC_WEB_002 | Login de usuário com email e senha corretos | Identidade | Crítica | Sucesso |
| TC_WEB_003 | Login de usuário com email e senha incorretos | Identidade | Alta | Erro |
| TC_WEB_004 | Logout de usuário | Identidade | Alta | Sucesso |
| TC_WEB_005 | Registrar usuário com email existente | Identidade | Alta | Erro |
| TC_WEB_006 | Formulário de contato | Comunicação e UX | Média | Sucesso |
| TC_WEB_007 | Verificar página de casos de teste | Comunicação e UX | Baixa | Sucesso |
| TC_WEB_008 | Verificar todos os produtos e página de detalhes do produto | Catálogo | Alta | Sucesso |
| TC_WEB_009 | Pesquisar produto | Catálogo | Alta | Sucesso |
| TC_WEB_010 | Verificar assinatura na página inicial | Comunicação e UX | Média | Sucesso |
| TC_WEB_011 | Verificar assinatura na página do carrinho | Comunicação e UX | Média | Sucesso |
| TC_WEB_012 | Adicionar produtos ao carrinho | Carrinho | Crítica | Sucesso |
| TC_WEB_013 | Verificar quantidade de produto no carrinho | Carrinho | Alta | Sucesso |
| TC_WEB_014 | Fazer pedido registrando durante o checkout | Transacional | Crítica | Sucesso |
| TC_WEB_015 | Fazer pedido registrando antes do checkout | Transacional | Crítica | Sucesso |
| TC_WEB_016 | Fazer pedido fazendo login antes do checkout | Transacional | Crítica | Sucesso |
| TC_WEB_017 | Remover produtos do carrinho | Carrinho | Alta | Sucesso |
| TC_WEB_018 | Visualizar produtos por categoria | Catálogo | Média | Sucesso |
| TC_WEB_019 | Visualizar e adicionar ao carrinho produtos de marcas | Catálogo | Média | Sucesso |
| TC_WEB_020 | Pesquisar produtos e verificar carrinho após login | Carrinho | Crítica | Sucesso |
| TC_WEB_021 | Adicionar avaliação em produto | Catálogo | Média | Sucesso |
| TC_WEB_022 | Adicionar ao carrinho itens recomendados | Carrinho | Média | Sucesso |
| TC_WEB_023 | Verificar detalhes do endereço na página de checkout | Transacional | Crítica | Sucesso |
| TC_WEB_024 | Baixar fatura após pedido | Transacional | Alta | Sucesso |
| TC_WEB_025 | Verificar scroll up usando botão de seta e funcionalidade scroll down | UX/UI | Baixa | Sucesso |
| TC_WEB_026 | Verificar scroll up sem botão de seta e funcionalidade scroll down | UX/UI | Baixa | Sucesso |
---
## 4. Detalhamento Exaustivo de Cenários (E2E)
Esta seção fornece a especificação técnica passo a passo para cada cenário de teste, permitindo que qualquer QA reproduza o teste manualmente.

---
### 4.1 Grupo: Gestão de Identidade e Acesso (TC_WEB_001 - TC_WEB_005)
---
#### TC_WEB_001 - Registrar usuário
**Objetivo:** Validar o ciclo de vida completo de criação e exclusão de conta.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Crítica<br>
**Dados:** `UserFactory.generate()` - dados dinâmicos únicos por execução<br>
**Pós-condição:** Conta criada e excluída ao final do teste<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar em "Signup / Login" | `HomePage.clickSignupLogin()` → `a[href="/login"]` | Redireciona para login |
| 5 | Validar header "New User Signup!" | `LoginPage.newUserSignupHeader` → `h2:contains('New User Signup!')` | Header visível |
| 6 | Preencher nome e email (dinâmico) | `LoginPage.nameInput` + `LoginPage.emailInput` | Dados inseridos |
| 7 | Clicar em "Signup" | `LoginPage.signupButton` → `button[data-qa="signup-button"]` | Redireciona para formulário |
| 8 | Validar header "ENTER ACCOUNT INFORMATION" | `SignupPage.accountInfoHeader` → `h2:contains('Enter Account Information')` | Header visível |
| 9 | Selecionar gênero | `SignupPage.genderMale/genderFemale` → `#id_gender1/#id_gender2` | Gênero selecionado |
| 10 | Preencher senha | `SignupPage.password` → `#password` | Senha inserida |
| 11 | Preencher data de nascimento | `SignupPage.days/months/years` → `#days/#months/#years` | Data selecionada |
| 12 | Marcar "Sign up for our newsletter!" (se aplicável) | `SignupPage.newsletterCheckbox` → `#newsletter` | Checkbox marcado |
| 13 | Marcar "Receive special offers!" (se aplicável) | `SignupPage.specialOffersCheckbox` → `#optin` | Checkbox marcado |
| 14 | Preencher informações de endereço | `SignupPage.fillAddress()` | Endereço completo |
| 15 | Clicar em "Create Account" | `SignupPage.createAccountButton` → `button[data-qa="create-account"]` | Conta criada |
| 16 | Validar "ACCOUNT CREATED!" | `AccountPage.accountCreatedHeader` → `h2:contains('Account Created!')` | Header visível |
| 17 | Clicar em "Continue" | `AccountPage.continueButton` → `a[data-qa="continue-button"]` | Retorna à home |
| 18 | Validar "Logged in as [username]" | `HomePage.verifyLoggedInAs()` → `li:contains('Logged in as')` | Nome do usuário visível |
| 19 | Clicar em "Delete Account" | `HomePage.deleteAccountLink` → `a[href="/delete_account"]` | Conta excluída |
| 20 | Validar "ACCOUNT DELETED!" | `AccountPage.accountDeletedHeader` → `h2:contains('Account Deleted!')` | Header visível |
| 21 | Clicar em "Continue" | `AccountPage.continueButton` | Retorna à home |

**Asserção Chave:** Texto "Logged in as [username]" visível no topo da página após registro.<br>
**Resultado esperado:** Usuário consegue se registrar, acessar o sistema e excluir sua conta<br>

**Evidência em GIF:** ![TC_WEB_001](../Cypress/cypress/screenshots/web/TC_WEB_001_sucesso_registrar_usuario.cy.js/TC_WEB_001_sucesso_registrar_usuario.gif)

---
#### TC_WEB_002 - Login de usuário com email e senha corretos
**Objetivo:** Garantir o acesso à área restrita para usuários cadastrados.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Crítica<br>
**Dados:** `cypress/fixtures/users.json` → `testUser` (credenciais pré-cadastradas)<br>
**Pós-condição:** Nenhuma (fixture reutilizável)<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar em "Signup / Login" | `HomePage.clickSignupLogin()` → `a[href="/login"]` | Redireciona para login |
| 5 | Validar header "Login to your account" | `LoginPage.loginToYourAccountHeader` → `h2:contains('Login to your account')` | Header visível |
| 6 | Inserir email e senha válidos | `LoginPage.loginEmail` + `LoginPage.loginPassword` → `input[data-qa="login-email/password"]` | Credenciais inseridas |
| 7 | Clicar em "Login" | `LoginPage.loginButton` → `button[data-qa="login-button"]` | Login realizado |
| 8 | Validar "Logged in as [username]" | `HomePage.verifyLoggedInAs()` → `li:contains('Logged in as')` | Nome do usuário visível |
| 9 | Clicar em "Logout" | `HomePage.clickLogout()` → `a[href="/logout"]` | Usuário deslogado |
| 10 | Validar header "Login to your account" | `LoginPage.loginToYourAccountHeader` | Redirecionamento para /login |

**Asserção Chave:** Sistema redireciona para `/login` ao finalizar a sessão.<br>
**Resultado esperado:** Usuário cadastrado consegue acessar sua conta<br>

**Evidência em GIF:** ![TC_WEB_002](../Cypress/cypress/screenshots/web/TC_WEB_002_sucesso_login_usuario_email_senha_corretos.cy.js/TC_WEB_002_sucesso_login_usuario_email_senha_corretos.gif)

---
#### TC_WEB_003 - Login de usuário com email e senha incorretos
**Objetivo:** Validar o tratamento de erro em tentativas de acesso inválidas.<br>
**Tipo:** Erro<br>
**Criticidade:** Alta<br>
**Dados:** `cypress/fixtures/users.json` → `invalidUser` (credenciais inexistentes)<br>
**Pós-condição:** Nenhuma<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar em "Signup / Login" | `HomePage.clickSignupLogin()` → `a[href="/login"]` | Redireciona para login |
| 5 | Validar header "Login to your account" | `LoginPage.loginToYourAccountHeader` | Header visível |
| 6 | Inserir email e senha incorretos | `LoginPage.loginEmail` + `LoginPage.loginPassword` | Credenciais inválidas inseridas |
| 7 | Clicar em "Login" | `LoginPage.loginButton` | Tentativa de login |
| 8 | Validar mensagem de erro | `cy.contains('Your email or password is incorrect!')` | Mensagem de erro visível |

**Asserção Chave:** Mensagem "Your email or password is incorrect!" visível após tentativa.<br>
**Resultado esperado:** Sistema impede acesso com credenciais inválidas<br>

**Evidência em GIF:** ![TC_WEB_003](../Cypress/cypress/screenshots/web/TC_WEB_003_erro_login_usuario_email_senha_incorretos.cy.js/TC_WEB_003_erro_login_usuario_email_senha_incorretos.gif)

---
#### TC_WEB_004 - Logout de usuário
**Objetivo:** Validar o encerramento seguro da sessão.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Alta<br>
**Dados:** `cypress/fixtures/users.json` → `testUser`<br>
**Pós-condição:** Sessão encerrada<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar em "Signup / Login" | `HomePage.clickSignupLogin()` → `a[href="/login"]` | Redireciona para login |
| 5 | Validar header "Login to your account" | `LoginPage.loginToYourAccountHeader` | Header visível |
| 6 | Inserir email e senha | `LoginPage.loginEmail` + `LoginPage.loginPassword` | Credenciais inseridas |
| 7 | Clicar em "Login" | `LoginPage.loginButton` | Login realizado |
| 8 | Validar "Logged in as [username]" | `HomePage.verifyLoggedInAs()` | Nome do usuário visível |
| 9 | Clicar em "Logout" | `HomePage.clickLogout()` → `a[href="/logout"]` | Sessão encerrada |
| 10 | Validar header "Login to your account" | `LoginPage.loginToYourAccountHeader` | Header visível (indica retorno ao login) |

**Asserção Chave:** Sistema redireciona para página de login após logout.<br>
**Resultado esperado:** Usuário consegue encerrar a sessão com segurança<br>

**Evidência em GIF:** ![TC_WEB_004](../Cypress/cypress/screenshots/web/TC_WEB_004_sucesso_logout_usuario.cy.js/TC_WEB_004_sucesso_logout_usuario.gif)

---
#### TC_WEB_005 - Registrar usuário com email existente
**Objetivo:** Prevenir a duplicidade de contas no sistema.<br>
**Tipo:** Erro<br>
**Criticidade:** Alta<br>
**Dados:** `cypress/fixtures/users.json` → `existingEmail`<br>
**Pós-condição:** Nenhuma (validação de erro)<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar em "Signup / Login" | `HomePage.clickSignupLogin()` → `a[href="/login"]` | Redireciona para login |
| 5 | Validar header "New User Signup!" | `LoginPage.newUserSignupHeader` | Header visível |
| 6 | Inserir nome e email já existente | `LoginPage.nameInput` + `LoginPage.emailInput` | Dados inseridos |
| 7 | Clicar em "Signup" | `LoginPage.signupButton` | Tentativa de registro |
| 8 | Validar mensagem de erro | `cy.contains('Email Address already exist!')` | Mensagem de erro visível |

**Asserção Chave:** Sistema exibe mensagem "Email Address already exist!" e não redireciona para formulário.<br>
**Resultado esperado:** Sistema impede duplicidade de cadastro<br>

**Evidência em GIF:** ![TC_WEB_005](../Cypress/cypress/screenshots/web/TC_WEB_005_erro_registrar_usuario_email_existente.cy.js/TC_WEB_005_erro_registrar_usuario_email_existente.gif)

---
### 4.2 Grupo: Comunicação e UX (TC_WEB_006 - TC_WEB_007, TC_WEB_010 - TC_WEB_011)
---
#### TC_WEB_006 - Formulário de contato
**Objetivo:** Validar o envio do formulário de contato com upload de arquivo.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Média<br>
**Dados:** `cypress/fixtures/contact.json` → contato + `ui_texts.json`<br>
**Pós-condição:** Nenhuma<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar em "Contact Us" | `HomePage.clickContactUs()` → `a[href="/contact_us"]` | Redireciona para contato |
| 5 | Validar header "GET IN TOUCH" | `ContactUsPage.getInTouchHeader` → `h2:contains('Get In Touch')` | Header visível |
| 6 | Preencher nome, email, assunto e mensagem | `ContactUsPage.fillContactForm()` → `input[data-qa="name/email/subject"]` + `textarea[data-qa="message"]` | Formulário preenchido |
| 7 | Upload de arquivo | `ContactUsPage.uploadFile()` → `input[type="file"]` | Arquivo anexado |
| 8 | Clicar em "Submit" | `ContactUsPage.submitButton` → `input[data-qa="submit-button"]` | Formulário enviado |
| 9 | Aceitar confirmação do navegador | `cy.on('window:confirm')` | Confirmação aceita |
| 10 | Validar mensagem de sucesso | `cy.contains('Success! Your details have been submitted successfully.')` | Mensagem visível |
| 11 | Clicar em "Home" e validar página inicial | `ContactUsPage.homeButton` + `HomePage.logo` | Retorna à home e página carregada |

**Asserção Chave:** Mensagem "Success! Your details have been submitted successfully." visível após envio.<br>
**Resultado esperado:** Usuário consegue enviar mensagem com arquivo anexado<br>

**Evidência em GIF:** ![TC_WEB_006](../Cypress/cypress/screenshots/web/TC_WEB_006_sucesso_formulario_contato.cy.js/TC_WEB_006_sucesso_formulario_contato.gif)

---
#### TC_WEB_007 - Verificar página de casos de teste
**Objetivo:** Validar a navegação para a página de Casos de Teste.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Baixa<br>
**Dados:** Nenhum<br>
**Pós-condição:** Nenhuma<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar em "Test Cases" | `HomePage.clickTestCases()` → `a[href="/test_cases"]` | Redireciona para test cases |
| 5 | Validar página de casos de teste | `TestCasesPage.verifyPageTitle()` → `h2:contains('Test Cases')` | Header visível |

**Asserção Chave:** Header "Test Cases" visível na página de casos de teste.<br>
**Resultado esperado:** Navegação para página de casos de teste funciona<br>

**Evidência em GIF:** ![TC_WEB_007](../Cypress/cypress/screenshots/web/TC_WEB_007_sucesso_verificar_pagina_casos_teste.cy.js/TC_WEB_007_sucesso_verificar_pagina_casos_teste.gif)

---
#### TC_WEB_010 - Verificar assinatura na página inicial
**Objetivo:** Validar a funcionalidade de assinatura na página inicial.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Média<br>
**Dados:** `cypress/fixtures/contact.json` → `subscribe.email` + `ui_texts.json`<br>
**Pós-condição:** Nenhuma<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Rolar para o rodapé | `cy.scrollTo('bottom')` | Scroll executado |
| 5 | Validar texto "SUBSCRIPTION" | `.single-widget h2:contains('SUBSCRIPTION')` | Rodapé visível |
| 6 | Inserir email no campo de assinatura | `#susbscribe_email` | Email inserido |
| 7 | Clicar no botão de seta | `#subscribe` | Assinatura enviada |
| 8 | Validar mensagem de sucesso | `#success-subscribe:contains('You have been successfully subscribed!')` | Confirmação visível |

**Asserção Chave:** Mensagem "You have been successfully subscribed!" visível após assinatura.<br>
**Resultado esperado:** Usuário consegue assinar newsletter na home<br>

**Evidência em GIF:** ![TC_WEB_010](../Cypress/cypress/screenshots/web/TC_WEB_010_sucesso_verificar_assinatura_pagina_inicial.cy.js/TC_WEB_010_sucesso_verificar_assinatura_pagina_inicial.gif)

---
#### TC_WEB_011 - Verificar assinatura na página do carrinho
**Objetivo:** Validar a funcionalidade de assinatura na página do carrinho.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Média<br>
**Dados:** `cypress/fixtures/contact.json` → `subscribe.email` + `ui_texts.json`<br>
**Pós-condição:** Nenhuma<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar no botão "Cart" | `HomePage.clickCart()` → `a[href="/view_cart"]` | Abre carrinho |
| 5 | Rolar para o rodapé | `cy.scrollTo('bottom')` | Scroll executado |
| 6 | Validar texto "SUBSCRIPTION" | `.single-widget h2:contains('SUBSCRIPTION')` | Rodapé visível |
| 7 | Inserir email no campo de assinatura | `#susbscribe_email` | Email inserido |
| 8 | Clicar no botão de seta | `#subscribe` | Assinatura enviada |
| 9 | Validar mensagem de sucesso | `#success-subscribe:contains('You have been successfully subscribed!')` | Confirmação visível |

**Asserção Chave:** Mensagem "You have been successfully subscribed!" visível após assinatura.<br>
**Resultado esperado:** Usuário consegue assinar newsletter no carrinho<br>

**Evidência em GIF:** ![TC_WEB_011](../Cypress/cypress/screenshots/web/TC_WEB_011_sucesso_verificar_assinatura_pagina_carrinho.cy.js/TC_WEB_011_sucesso_verificar_assinatura_pagina_carrinho.gif)

---
### 4.3 Grupo: Catálogo e Exploração de Produtos (TC_WEB_008 - TC_WEB_009)
---
#### TC_WEB_008 - Verificar todos os produtos e página de detalhes do produto
**Objetivo:** Validar a integridade das informações exibidas na ficha técnica do produto.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Alta<br>
**Dados:** Nenhum<br>
**Pós-condição:** Nenhuma<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar em "Products" | `HomePage.clickProducts()` → `a[href="/products"]` | Redireciona para produtos |
| 5 | Validar página "ALL PRODUCTS" | `ProductsPage.verifyAllProductsPage()` → `h2:contains('All Products')` | Header visível |
| 6 | Validar lista de produtos | `ProductsPage.verifyProductsList()` → `.features_items` | Lista visível |
| 7 | Clicar em "View Product" do primeiro | `ProductsPage.clickViewProduct()` → `.choose a[href*="/product_details/"]` | Abre detalhes |
| 8 | Validar página de detalhes | `ProductsPage.verifyProductDetailPage()` → `.product-information h2` | Detalhes visíveis |
| 9 | Validar informações do produto | `ProductsPage.verifyProductDetails()` | Nome, categoria, preço, disponibilidade, condição, marca |

**Asserção Chave:** Todos os detalhes do produto visíveis: Nome, Categoria, Preço, Disponibilidade, Condição e Marca.<br>
**Resultado esperado:** Catálogo de produtos exibe informações completas<br>

**Evidência em GIF:** ![TC_WEB_008](../Cypress/cypress/screenshots/web/TC_WEB_008_sucesso_verificar_todos_produtos_detalhes_produto.cy.js/TC_WEB_008_sucesso_verificar_todos_produtos_detalhes_produto.gif)

---
#### TC_WEB_009 - Pesquisar produto
**Objetivo:** Validar o motor de busca do sistema.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Alta<br>
**Dados:** `cypress/fixtures/products.json` → `searchTerms.winter`<br>
**Pós-condição:** Nenhuma<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar em "Products" | `HomePage.clickProducts()` → `a[href="/products"]` | Redireciona para produtos |
| 5 | Validar página "ALL PRODUCTS" | `ProductsPage.verifyAllProductsPage()` | Header visível |
| 6 | Inserir termo de busca e pesquisar | `ProductsPage.searchProduct()` → `#search_product` + `#submit_search` | Pesquisa realizada |
| 7 | Validar "SEARCHED PRODUCTS" | `ProductsPage.verifySearchedProducts()` → `h2:contains('Searched Products')` | Header visível |
| 8 | Validar resultados da busca | `ProductsPage.verifyProductsList()` → `.features_items` | Produtos relacionados visíveis |
| 9 | Verificar que resultados contêm o termo buscado | `ProductsPage.productsItems.first()` → `.single-products` | Termo de busca presente |

**Asserção Chave:** Header "SEARCHED PRODUCTS" visível com produtos relacionados ao termo pesquisado.<br>
**Resultado esperado:** Busca retorna produtos relacionados ao termo<br>

**Evidência em GIF:** ![TC_WEB_009](../Cypress/cypress/screenshots/web/TC_WEB_009_sucesso_pesquisar_produto.cy.js/TC_WEB_009_sucesso_pesquisar_produto.gif)

---
### 4.4 Grupo: Experiência de Compra e Carrinho (TC_WEB_012 - TC_WEB_013, TC_WEB_017)
---
#### TC_WEB_012 - Adicionar produtos ao carrinho
**Objetivo:** Validar a funcionalidade de adicionar múltiplos itens ao carrinho.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Crítica<br>
**Dados:** `cypress/fixtures/ui_texts.json` → `buttons` (via Page Objects)<br>
**Pós-condição:** Nenhuma<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar em "Products" | `HomePage.clickProducts()` → `a[href="/products"]` | Redireciona para produtos |
| 5 | Passar mouse sobre primeiro produto | `cy.get('.single-products').first().trigger('mouseover')` | Overlay aparece |
| 6 | Clicar em "Add to cart" | `.product-overlay:first .btn` | Produto adicionado |
| 7 | Clicar em "Continue Shopping" | `cy.contains('button', 'Continue Shopping')` | Modal fechado |
| 8 | Passar mouse sobre segundo produto | `cy.get('.single-products').eq(1).trigger('mouseover')` | Overlay aparece |
| 9 | Clicar em "Add to cart" | `.product-overlay:eq(1) .btn` | Produto adicionado |
| 10 | Clicar em "View Cart" | `cy.contains('a', 'View Cart')` | Abre carrinho |
| 11 | Validar produtos no carrinho | `cy.get('tbody tr').should('have.length.gte', 1)` | Produtos listados |
| 12 | Validar preços, quantidade e total | `.cart_price`, `.cart_quantity`, `.cart_total` | Detalhes visíveis |

**Asserção Chave:** Ambos os produtos listados com preços, quantidades e totais visíveis no carrinho.<br>
**Resultado esperado:** Carrinho aceita múltiplos produtos com preços e quantidades<br>

**Evidência em GIF:** ![TC_WEB_012](../Cypress/cypress/screenshots/web/TC_WEB_012_sucesso_adicionar_produtos_carrinho.cy.js/TC_WEB_012_sucesso_adicionar_produtos_carrinho.gif)

---
#### TC_WEB_013 - Verificar quantidade de produto no carrinho
**Objetivo:** Validar o seletor de quantidade na página de detalhes do produto.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Alta<br>
**Dados:** `cypress/fixtures/products.json` → `quantities.default` (4)<br>
**Pós-condição:** Nenhuma<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar em "View Product" | `cy.get('.product-image-wrapper a[href="/product_details/1"]').click()` | Abre detalhes |
| 5 | Validar detalhes do produto | `.product-information h2` | Nome do produto visível |
| 6 | Alterar quantidade para 4 | `cy.get('#quantity').clear().type(4)` | Quantidade alterada |
| 7 | Clicar em "Add to cart" | `cy.contains('button', 'Add To Cart')` | Produto adicionado |
| 8 | Clicar em "View Cart" | `cy.contains('a', 'View Cart')` | Abre carrinho |
| 9 | Validar quantidade no carrinho | `.cart_quantity:contains('4')` | Quantidade exata |

**Asserção Chave:** Carrinho exibe quantidade exatamente como selecionada (4).<br>
**Resultado esperado:** Seletor de quantidade reflete valor escolhido no carrinho<br>

**Evidência em GIF:** ![TC_WEB_013](../Cypress/cypress/screenshots/web/TC_WEB_013_sucesso_verificar_quantidade_produto_carrinho.cy.js/TC_WEB_013_sucesso_verificar_quantidade_produto_carrinho.gif)

---
### 4.5 Grupo: Transacional e Financeiro (TC_WEB_014 - TC_WEB_016)
---
#### TC_WEB_014 - Fazer pedido registrando durante o checkout
**Objetivo:** Validar fluxo de compra com registro durante o checkout.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Crítica<br>
**Dados:** `UserFactory` + `cypress/fixtures/users.json` → `paymentData`<br>
**Pós-condição:** Conta criada e excluída ao final<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar em "Products" | `HomePage.clickProducts()` | Redireciona para produtos |
| 5 | Adicionar primeiro produto ao carrinho | Hover + `.product-overlay .btn` | Produto adicionado |
| 6 | Adicionar segundo produto ao carrinho | Hover + `.product-overlay .btn` | Produto adicionado |
| 7 | Clicar em "View Cart" | `cy.contains('a', 'View Cart')` | Abre carrinho |
| 8 | Validar página do carrinho | URL contém `/view_cart` | Carrinho visível |
| 9 | Clicar em "Proceed To Checkout" | `cy.contains('a', 'Proceed To Checkout')` | Avança para checkout |
| 10 | Clicar em "Register / Login" | `cy.contains('a', 'Register / Login')` | Abre modal de registro |
| 11 | Preencher email no formulário de signup | `LoginPage.nameInput` + `LoginPage.emailInput` | Dados inseridos |
| 12 | Selecionar gênero e preencher senha | `SignupPage.selectGender()` + `SignupPage.password` | Dados preenchidos |
| 13 | Preencher data de nascimento | `SignupPage.fillDateOfBirth()` | Data selecionada |
| 14 | Preencher endereço | `SignupPage.fillAddress()` | Endereço preenchido |
| 15 | Clicar em "Create Account" | `SignupPage.createAccountButton` | Conta criada |
| 16 | Validar "ACCOUNT CREATED!" e clicar "Continue" | `AccountPage.accountCreatedHeader` + `AccountPage.continueButton` | Retorna à home |
| 17 | Validar "Logged in as [username]" | `HomePage.verifyLoggedInAs()` | Nome do usuário visível |
| 18 | Clicar em "Cart" | `HomePage.clickCart()` | Abre carrinho |
| 19 | Clicar em "Proceed To Checkout" | `cy.contains('a', 'Proceed To Checkout')` | Avança checkout |
| 20 | Validar detalhes de endereço | `.step-one h2:contains('Address Details')` + `.step-one h2:contains('Review Your Order')` | Dados visíveis |
| 21 | Inserir comentário na área de texto de comentários | `textarea[name="message"]` | Comentário inserido |
| 22 | Clicar em "Place Order" | `cy.contains('a', 'Place Order')` | Order initiated |
| 23 | Inserir dados de pagamento | `[name="name_on_card"]`, `[name="card_number"]`, `[name="cvc"]`, `[name="expiry_month"]`, `[name="expiry_year"]` | Dados inseridos |
| 24 | Clicar em "Pay and Confirm Order" | `cy.contains('button', 'Pay and Confirm Order')` | Pagamento processado |
| 25 | Validar sucesso | `h2:contains('Order Placed!')` | Pedido confirmado |
| 26 | Clicar em "Delete Account" | `HomePage.deleteAccountLink` | Conta excluída |
| 27 | Validar "ACCOUNT DELETED!" e clicar em "Continue" | `AccountPage.accountDeletedHeader` + `AccountPage.continueButton` | Conta removida |

**Asserção Chave:** Mensagem "Order Placed!" visível.<br>
**Resultado esperado:** Fluxo completo de compra com registro no checkout<br>

**Evidência em GIF:** ![TC_WEB_014](../Cypress/cypress/screenshots/web/TC_WEB_014_sucesso_fazer_pedido_registrar_checkout.cy.js/TC_WEB_014_sucesso_fazer_pedido_registrar_checkout.gif)

---
#### TC_WEB_015 - Fazer pedido registrando antes do checkout
**Objetivo:** Validar fluxo de compra com registro prévio ao checkout.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Crítica<br>
**Dados:** `UserFactory` + `cypress/fixtures/users.json` → `paymentData`<br>
**Pós-condição:** Conta criada e excluída ao final<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar em "Signup / Login" | `HomePage.clickSignupLogin()` | Abre login |
| 5 | Preencher nome e email e clicar em "Signup" | `LoginPage.nameInput` + `LoginPage.emailInput` + `LoginPage.signupButton` | Dados inseridos |
| 6 | Selecionar gênero e preencher senha | `SignupPage.selectGender()` + `SignupPage.password` | Dados preenchidos |
| 7 | Preencher data de nascimento e endereço | `SignupPage.fillDateOfBirth()` + `SignupPage.fillAddress()` | Dados preenchidos |
| 8 | Clicar em "Create Account" | `SignupPage.createAccountButton` | Conta criada |
| 9 | Validar "ACCOUNT CREATED!" e clicar "Continue" | `AccountPage.accountCreatedHeader` + `AccountPage.continueButton` | Usuário logado |
| 10 | Validar "Logged in as [username]" | `HomePage.verifyLoggedInAs()` | Nome visível |
| 11 | Clicar em "Products" e adicionar produtos ao carrinho | `HomePage.clickProducts()` + hover + add to cart | Produtos adicionados |
| 12 | Clicar em "Cart" | `a[href="/view_cart"]` | Abre carrinho |
| 13 | Validar página do carrinho | URL contém `/view_cart` | Carrinho visível |
| 14 | Clicar em "Proceed To Checkout" | `cy.contains('a', 'Proceed To Checkout')` | Avança checkout |
| 15 | Validar detalhes de endereço e revisão do pedido | `.step-one h2:contains('Address Details')` + `.step-one h2:contains('Review Your Order')` | Dados visíveis |
| 16 | Inserir descrição na área de texto de comentários | `textarea[name="message"]` | Comentário inserido |
| 17 | Clicar em "Place Order" | `cy.contains('a', 'Place Order')` | Order initiated |
| 18 | Inserir dados de pagamento | `[name="name_on_card"]`, `[name="card_number"]`, `[name="cvc"]`, `[name="expiry_month"]`, `[name="expiry_year"]` | Dados inseridos |
| 19 | Clicar em "Pay and Confirm Order" | `cy.contains('button', 'Pay and Confirm Order')` | Pagamento processado |
| 20 | Validar mensagem de sucesso | `h2:contains('Order Placed!')` | Pedido confirmado |
| 21 | Clicar em "Delete Account" | `HomePage.deleteAccountLink` | Conta excluída |
| 22 | Validar "ACCOUNT DELETED!" e clicar em "Continue" | `AccountPage.accountDeletedHeader` + `AccountPage.continueButton` | Conta removida |

**Asserção Chave:** Mensagem "Order Placed!" visível.<br>
**Resultado esperado:** Fluxo completo de compra com registro prévio<br>

**Evidência em GIF:** ![TC_WEB_015](../Cypress/cypress/screenshots/web/TC_WEB_015_sucesso_fazer_pedido_registrar_antes_checkout.cy.js/TC_WEB_015_sucesso_fazer_pedido_registrar_antes_checkout.gif)

---
#### TC_WEB_016 - Fazer pedido fazendo login antes do checkout
**Objetivo:** Validar fluxo de compra com login antes do checkout usando usuário existente.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Crítica<br>
**Dados:** `cypress/fixtures/users.json` → `testUser` + `paymentData`<br>
**Pós-condição:** Sessão permanece ativa (sem delete account)<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar em "Signup / Login" | `HomePage.clickSignupLogin()` | Abre login |
| 5 | Preencher email, senha e clicar em "Login" | `LoginPage.loginEmail` + `LoginPage.loginPassword` + `LoginPage.loginButton` | Usuário logado |
| 6 | Verificar "Logged in as username" no topo | `HomePage.verifyLoggedInAs()` | Nome visível |
| 7 | Clicar em "Products" e adicionar produtos ao carrinho | `HomePage.clickProducts()` + hover + `.btn` | Produtos adicionados |
| 8 | Adicionar primeiro produto ao carrinho | Hover + `.product-overlay .btn` | Produto adicionado |
| 9 | Clicar em "Continue Shopping" | `cy.contains('button', 'Continue Shopping')` | Modal fechado |
| 10 | Adicionar segundo produto ao carrinho | Hover + `.product-overlay .btn` | Produto adicionado |
| 11 | Clicar no botão "Cart" | `a[href="/view_cart"]` | Abre carrinho |
| 12 | Validar página do carrinho | URL contém `/view_cart` + `h2` | Carrinho visível |
| 13 | Clicar em "Proceed To Checkout" | `cy.contains('a', 'Proceed To Checkout')` | Avança checkout |
| 14 | Verificar Detalhes do Endereço e Revisão do Pedido | `.step-one h2:contains('Address Details')` + `.step-one h2:contains('Review Your Order')` | Dados visíveis |
| 15 | Inserir descrição na área de texto de comentários | `textarea[name="message"]` | Comentário inserido |
| 16 | Clicar em "Place Order" | `cy.contains('a', 'Place Order')` | Order initiated |
| 17 | Inserir detalhes do pagamento | `[name="name_on_card"]`, `[name="card_number"]`, `[name="cvc"]`, `[name="expiry_month"]`, `[name="expiry_year"]` | Dados inseridos |
| 18 | Clicar no botão "Pay and Confirm Order" | `cy.contains('button', 'Pay and Confirm Order')` | Pagamento processado |
| 19 | Verificar mensagem de sucesso | `h2:contains('Order Placed!')` | Pedido confirmado |

**Asserção Chave:** Mensagem "Order Placed!" visível.<br>
**Resultado esperado:** Usuário logado consegue finalizar compra<br>

**Evidência em GIF:** ![TC_WEB_016](../Cypress/cypress/screenshots/web/TC_WEB_016_sucesso_fazer_pedido_login_antes_checkout.cy.js/TC_WEB_016_sucesso_fazer_pedido_login_antes_checkout.gif)

---
#### TC_WEB_017 - Remover produtos do carrinho
**Objetivo:** Validar que usuário consegue remover produtos do carrinho.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Alta<br>
**Dados:** `cypress/fixtures/products.json` → `products.firstProd`, `quantities.default` + `ui_texts.json`<br>
**Pós-condição:** Carrinho vazio ou produto removido<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar em "Products" | `HomePage.clickProducts()` | Redireciona para produtos |
| 5 | Clicar em "View Product" do primeiro produto | `.product-image-wrapper` + `a[href*="/product_details/"]` | Abre detalhes |
| 6 | Alterar quantidade para 4 | `#quantity` | Quantidade alterada |
| 7 | Clicar em "Add to Cart" | `cy.contains('button', 'Add to Cart')` | Produto adicionado |
| 8 | Validar que mensagem "Added!" está visível | `body` contém "Added!" | Confirmação visível |
| 9 | Clicar em "View Cart" | `.modal-body a[href="/view_cart"]` | Abre carrinho |
| 10 | Validar página do carrinho | URL contém `/view_cart` + `h2` | Carrinho visível |
| 11 | Clicar no botão "X" do produto | `.cart_quantity_delete` | Produto marcado |
| 12 | Validar que o produto foi removido | `.table-responsive` | Carrinho atualizado |

**Asserção Chave:** Mensagem "Added!" visível após adicionar, produto removido ao clicar "X".<br>
**Resultado esperado:** Usuário consegue remover itens do carrinho<br>

**Evidência em GIF:** ![TC_WEB_017](../Cypress/cypress/screenshots/web/TC_WEB_017_sucesso_remover_produtos_carrinho.cy.js/TC_WEB_017_sucesso_remover_produtos_carrinho.gif)

---
### 4.6 Grupo: Catálogo, Carrinho e UX/UI (TC_WEB_018 - TC_WEB_026)
---
#### TC_WEB_018 - Visualizar produtos por categoria
**Objetivo:** Validar que categorias e subcategorias de produtos são exibidas corretamente.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Média<br>
**Dados:** `cypress/fixtures/products.json` → `categories` + `ui_texts.json`<br>
**Pós-condição:** Nenhuma (não altera dados)<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Verificar que as categorias estão visíveis na barra lateral esquerda | `ProductsPage.leftSidebar` → `.left-sidebar h2` + `.left-sidebar` | Categorias visíveis |
| 5 | Clicar na categoria "Women" | `ProductsPage.clickCategory('Women')` → `.panel-heading` | Abre subcategorias |
| 6 | Clicar em qualquer link de categoria dentro de "Women", por exemplo: Dress | `ProductsPage.clickSubcategory('Dress')` → `.panel-body a` | Navega para subcategoria |
| 7 | Verificar que a página da categoria é exibida e confirmar o texto "Women - Dress Products" | `ProductsPage.verifyCategoryPageHeader()` → `h2:contains(...)` | Página correta |
| 8 | Na barra lateral esquerda, clicar em qualquer link de subcategoria da categoria "Men" | `ProductsPage.clickCategory('Men')` → `.panel-heading` | Abre subcategorias |
| 9 | Clicar em "Tshirts" na subcategoria de Men | `ProductsPage.clickSubcategory('Tshirts')` → `.panel-body a` | Navega para subcategoria |
| 10 | Verificar que a página "Men - Tshirts Products" é exibida | `ProductsPage.verifyCategoryPageHeader()` → `h2:contains(...)` | Página correta |

**Asserção Chave:** Categorias Women e Men exibem produtos nas subcategorias corretas.<br>
**Resultado esperado:** Categorias e subcategorias exibem produtos corretamente<br>

**Evidência em GIF:** ![TC_WEB_018](../Cypress/cypress/screenshots/web/TC_WEB_018_sucesso_visualizar_produtos_categoria.cy.js/TC_WEB_018_sucesso_visualizar_produtos_categoria.gif)

---
#### TC_WEB_019 - Visualizar e adicionar ao carrinho produtos de marcas
**Objetivo:** Validar que usuário pode visualizar e adicionar produtos de diferentes marcas ao carrinho.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Média<br>
**Dados:** `cypress/fixtures/products.json` → `brands` + `ui_texts.json`<br>
**Pós-condição:** Nenhuma (não altera dados)<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar no botão "Products" | `HomePage.clickProducts()` | Redireciona para produtos |
| 5 | Verificar que as Marcas estão visíveis na barra lateral esquerda | `ProductsPage.verifyBrandsHeaderVisible()` → `h2:contains('Brands')` + `.brands-name` | Marcas visíveis |
| 6 | Clicar em qualquer nome de marca | `ProductsPage.clickBrand('Polo')` → `.brands-name a` | Navega para marca |
| 7 | Verificar que o usuário foi redirecionado para a página da marca e os produtos da marca são exibidos | `ProductsPage.verifyBrandPageHeader()` → `.features_items` | Produtos da marca visíveis |
| 8 | Na barra lateral esquerda, clicar em qualquer outro link de marca | `ProductsPage.clickBrand('H&M')` → `.brands-name a` | Navega para outra marca |
| 9 | Verificar que o usuário foi redirecionado para essa página de marca e pode ver os produtos | `ProductsPage.verifyBrandPageHeader()` → `.features_items` | Produtos da marca visíveis |

**Asserção Chave:** Produtos de diferentes marcas são exibidos corretamente após clicar nos links.<br>
**Resultado esperado:** Marcas exibem produtos corretamente<br>

**Evidência em GIF:** ![TC_WEB_019](../Cypress/cypress/screenshots/web/TC_WEB_019_sucesso_visualizar_adicionar_marcas.cy.js/TC_WEB_019_sucesso_visualizar_adicionar_marcas.gif)

---
#### TC_WEB_020 - Pesquisar produtos e verificar carrinho após login
**Objetivo:** Validar busca de produtos e persistência do carrinho após login.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Alta<br>
**Dados:** `cypress/fixtures/products.json` → `searchTerms.winter` + `users.json` → `testUser` + `ui_texts.json`<br>
**Pós-condição:** Carrinho persiste após login<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar no botão "Products" | `HomePage.clickProducts()` | Redireciona para produtos |
| 5 | Verificar que o usuário foi redirecionado para a página ALL PRODUCTS com sucesso | `ProductsPage.verifyAllProductsPage()` | Página correta |
| 6 | Inserir nome do produto no campo de busca e clicar no botão de busca | `ProductsPage.searchProduct()` | Resultados exibidos |
| 7 | Verificar que "SEARCHED PRODUCTS" está visível | `ProductsPage.verifySearchedProducts()` | Header correto |
| 8 | Verificar que todos os produtos relacionados à busca estão visíveis | `ProductsPage.verifyProductsList()` | Lista preenchida |
| 9 | Adicionar esses produtos ao carrinho | Hover + `.product-overlay .btn` + `.modal-footer button` | Produto adicionado |
| 10 | Clicar no botão "Cart" e verificar que os produtos estão visíveis no carrinho | `a[href="/view_cart"]` | Abre carrinho |
| 11 | Validar que produtos estão no carrinho | URL contém `/view_cart` + `h2` | Carrinho com itens |
| 12 | Clicar no botão "Signup / Login" | `a[href="/login"]` | Abre login |
| 13 | Inserir credenciais e clicar em "Login" | `LoginPage.loginEmail` + `LoginPage.loginPassword` + `LoginPage.loginButton` | Usuário logado |
| 14 | Ir para a página do Carrinho | `a[href="/view_cart"]` | Abre carrinho |
| 15 | Verificar que produtos estão visíveis no carrinho após login | URL contém `/view_cart` + `h2` | Carrinho persistido |

**Asserção Chave:** Carrinho mantém produtos após login (persistência verificada).<br>
**Resultado esperado:** Carrinho persiste itens após autenticação<br>

**Evidência em GIF:** ![TC_WEB_020](../Cypress/cypress/screenshots/web/TC_WEB_020_sucesso_pesquisar_produtos_verificar_carrinho_login.cy.js/TC_WEB_020_sucesso_pesquisar_produtos_verificar_carrinho_login.gif)

---
#### TC_WEB_021 - Adicionar avaliação em produto
**Objetivo:** Validar que o usuário pode adicionar avaliação em produto.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Média<br>
**Dados:** `UserFactory` → usuário dinâmico + `cypress/fixtures/contact.json` → `review.text` + `ui_texts.json`<br>
**Pós-condição:** Nenhuma (não altera dados persistidos)<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar no botão "Products" | `HomePage.clickProducts()` | Redireciona para produtos |
| 5 | Verificar que o usuário navegou para a página ALL PRODUCTS com sucesso | `ProductsPage.verifyAllProductsPage()` | Página correta |
| 6 | Clicar no botão "View Product" | `ProductsPage.clickViewProduct()` | Abre detalhes |
| 7 | Verificar que "Write Your Review" está visível | `ProductsPage.verifyReviewSectionVisible()` → `a[href="#reviews"]` | Seção visível |
| 8 | Inserir nome, email e avaliação | `ProductsPage.fillReview()` → `#name` + `#email` + `#review` | Dados inseridos |
| 9 | Clicar no botão "Submit" | `ProductsPage.submitReview()` → `button:contains('Submit')` | Avaliação enviada |
| 10 | Verificar mensagem de sucesso "Thank you for your review." | `ProductsPage.verifyReviewSuccess()` → `span:contains(...)` | Confirmação visível |

**Asserção Chave:** Mensagem "Thank you for your review." visível após envio.<br>
**Resultado esperado:** Usuário consegue avaliar produto<br>

**Evidência em GIF:** ![TC_WEB_021](../Cypress/cypress/screenshots/web/TC_WEB_021_sucesso_adicionar_avaliacao_produto.cy.js/TC_WEB_021_sucesso_adicionar_avaliacao_produto.gif)

---
#### TC_WEB_022 - Adicionar ao carrinho itens recomendados
**Objetivo:** Validar que itens recomendados podem ser adicionados ao carrinho.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Baixa<br>
**Dados:** `cypress/fixtures/ui_texts.json` → `buttons.viewCart`<br>
**Pós-condição:** Nenhuma (não altera dados)<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Rolar para o final da página | `cy.scrollTo('bottom')` | Scroll executado |
| 5 | Verificar que "RECOMMENDED ITEMS" está visível | `.recommended_items` + `.recommended_items .productinfo` | Seção visível |
| 6 | Clicar em "Add To Cart" no produto recomendado | `.recommended_items .btn-default.add-to-cart` | Produto adicionado |
| 7 | Clicar no botão "View Cart" | `a[href="/view_cart"]:contains('View Cart')` | Abre carrinho |
| 8 | Verificar que o produto está exibido na página do carrinho | `a[href="/view_cart"]` + `.cart_description` | Produto no carrinho |

**Asserção Chave:** Produto recomendado aparece no carrinho após adicionar.<br>
**Resultado esperado:** Produtos recomendados são adicionados ao carrinho<br>

**Evidência em GIF:** ![TC_WEB_022](../Cypress/cypress/screenshots/web/TC_WEB_022_sucesso_adicionar_itens_recomendados_carrinho.cy.js/TC_WEB_022_sucesso_adicionar_itens_recomendados_carrinho.gif)

---
#### TC_WEB_023 - Verificar detalhes do endereço na página de checkout
**Objetivo:** Validar que endereços de entrega e cobrança correspondem aos dados registrados.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Crítica<br>
**Dados:** `UserFactory` → usuário dinâmico + `cypress/fixtures/ui_texts.json`<br>
**Pós-condição:** Conta criada e excluída ao final<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Clicar no botão "Signup / Login" | `HomePage.clickSignupLogin()` | Abre login |
| 5 | Preencher email no formulário de signup | `LoginPage.nameInput` + `LoginPage.emailInput` + `LoginPage.signupButton` | Conta criada |
| 6 | Selecionar gênero e preencher senha | `SignupPage.selectGender()` + `SignupPage.password` | Dados preenchidos |
| 7 | Preencher data de nascimento e endereço | `SignupPage.fillDateOfBirth()` + `SignupPage.fillAddress()` | Dados preenchidos |
| 8 | Clicar em "Create Account" | `SignupPage.createAccountButton` | Conta criada |
| 9 | Verificar "ACCOUNT CREATED!" e clicar no botão "Continue" | `AccountPage.accountCreatedHeader` + `AccountPage.continueButton` | Retorna à home |
| 10 | Verificar "Logged in as username" no topo | `HomePage.verifyLoggedInAs()` | Nome visível |
| 11 | Adicionar produtos ao carrinho | Hover + `.btn` em 2 produtos | Carrinho com itens |
| 12 | Clicar no botão "Cart" | `a[href="/view_cart"]` | Abre carrinho |
| 13 | Verificar que a página do carrinho está visível | URL contém `/view_cart` + `h2` | Carrinho visível |
| 14 | Clicar em "Proceed To Checkout" | `cy.contains('a', 'Proceed To Checkout')` | Avança checkout |
| 15 | Verificar que o endereço de entrega é o mesmo preenchido no registro da conta | `h2:contains('Address Details')` + `#address_delivery` | Endereço correto |
| 16 | Verificar que o endereço de cobrança é o mesmo preenchido no registro da conta | `#address_invoice` | Endereço correto |
| 17 | Clicar no botão "Delete Account" | `HomePage.deleteAccountLink` | Conta excluída |
| 18 | Verificar "ACCOUNT DELETED!" e clicar no botão "Continue" | `AccountPage.accountDeletedHeader` + `AccountPage.continueButton` | Conta removida |

**Asserção Chave:** Endereço de entrega e cobrança correspondem aos dados preenchidos no registro.<br>
**Resultado esperado:** Endereços de entrega e cobrança conferem com cadastro<br>

**Evidência em GIF:** ![TC_WEB_023](../Cypress/cypress/screenshots/web/TC_WEB_023_sucesso_verificar_detalhes_endereco_checkout.cy.js/TC_WEB_023_sucesso_verificar_detalhes_endereco_checkout.gif)

---
#### TC_WEB_024 - Baixar fatura após pedido
**Objetivo:** Validar o processo completo de pedido e download de fatura.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Alta<br>
**Dados:** `UserFactory` + `cypress/fixtures/contact.json` + `paymentData`<br>
**Pós-condição:** Conta criada e excluída ao final<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Adicionar produto ao carrinho | Hover + `.btn-default.add-to-cart` | Produto adicionado |
| 5 | Clicar em "Continue Shopping" | `.modal-footer button` | Modal fechado |
| 6 | Clicar em "Cart" | `a[href="/view_cart"]` | Abre carrinho |
| 7 | Validar página do carrinho | URL contém `/view_cart` | Carrinho visível |
| 8 | Clicar em "Proceed To Checkout" | `cy.contains('a', 'Proceed To Checkout')` | Avança checkout |
| 9 | Clicar em "Register / Login" | `cy.contains('a', 'Register / Login')` | Abre registro |
| 10 | Preencher email no formulário de signup | `LoginPage.nameInput` + `LoginPage.emailInput` | Dados inseridos |
| 11 | Selecionar gênero e preencher senha | `SignupPage.selectGender()` + `.password` | Dados preenchidos |
| 12 | Preencher data de nascimento | `SignupPage.fillDateOfBirth()` | Data selecionada |
| 13 | Preencher informações de endereço | `SignupPage.fillAddress()` | Endereço preenchido |
| 14 | Clicar em "Create Account" | `SignupPage.createAccountButton` | Conta criada |
| 15 | Validar "ACCOUNT CREATED!" e clicar "Continue" | `AccountPage.accountCreatedHeader` + `AccountPage.continueButton` | Usuário logado |
| 16 | Validar "Logged in as [username]" | `HomePage.verifyLoggedInAs()` | Nome visível |
| 17 | Clicar em "Cart" | `HomePage.clickCart()` | Abre carrinho |
| 18 | Clicar em "Proceed To Checkout" | `cy.contains('a', 'Proceed To Checkout')` | Avança checkout |
| 19 | Validar detalhes de endereço | `.step-one h2:contains('Address Details')` + `.step-one h2:contains('Review Your Order')` | Dados visíveis |
| 20 | Inserir comentário na área de texto de comentários | `textarea[name="message"]` | Comentário inserido |
| 21 | Clicar em "Place Order" | `cy.contains('a', 'Place Order')` | Order initiated |
| 22 | Inserir dados de pagamento | `[name="name_on_card"]`, `[name="card_number"]`, `[name="cvc"]`, `[name="expiry_month"]`, `[name="expiry_year"]` | Dados inseridos |
| 23 | Clicar em "Pay and Confirm Order" | `cy.contains('button', 'Pay and Confirm Order')` | Pagamento processado |
| 24 | Validar sucesso | `h2:contains('Order Placed!')` | Pedido confirmado |
| 25 | Clicar em "Download Invoice" | `cy.contains('a', 'Download Invoice')` | Fatura baixada |
| 26 | Validar que arquivo foi baixado | `cy.readFile(productsData.filenames.invoice).should('exist')` | Arquivo existe |
| 27 | Clicar em "Continue" | `cy.contains('a', 'Continue')` | Retorna à home |
| 28 | Clicar em "Delete Account" | `HomePage.deleteAccountLink` | Conta excluída |
| 29 | Validar "ACCOUNT DELETED!" e clicar em "Continue" | `AccountPage.accountDeletedHeader` + `AccountPage.continueButton` | Conta removida |

**Asserção Chave:** Mensagem "Order Placed!" e fatura baixada com sucesso.<br>
**Resultado esperado:** Fatura é gerada e disponível para download<br>

**Evidência em GIF:** ![TC_WEB_024](../Cypress/cypress/screenshots/web/TC_WEB_024_sucesso_baixar_fatura_pedido.cy.js/TC_WEB_024_sucesso_baixar_fatura_pedido.gif)

---
#### TC_WEB_025 - Verificar scroll up usando botão de seta e funcionalidade scroll down
**Objetivo:** Validar a funcionalidade de scroll usando o botão de seta.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Baixa<br>
**Dados:** `cypress/fixtures/ui_texts.json`<br>
**Pós-condição:** Nenhuma<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Rolar a página para baixo | `cy.scrollTo('bottom')` | Scroll down |
| 5 | Validar "SUBSCRIPTION" | `.single-widget h2:contains('SUBSCRIPTION')` | Rodapé visível |
| 6 | Clicar na seta para cima | `i[class*="angle-up"]` | Scroll up acionado |
| 7 | Validar texto do cabeçalho | `h2:contains('Full-Fledged practice website for Automation Engineers')` | Topo visível |

**Asserção Chave:** Texto do cabeçalho visível após clicar no botão de scroll up.<br>
**Resultado esperado:** Botão de scroll up retorna ao topo da página<br>

**Evidência em GIF:** ![TC_WEB_025](../Cypress/cypress/screenshots/web/TC_WEB_025_sucesso_verificar_scroll_seta.cy.js/TC_WEB_025_sucesso_verificar_scroll_seta.gif)

---
#### TC_WEB_026 - Verificar scroll up sem botão de seta e funcionalidade scroll down
**Objetivo:** Validar funcionalidade de scroll manual (sem botão de seta).<br>
**Tipo:** Sucesso<br>
**Criticidade:** Baixa<br>
**Dados:** `cypress/fixtures/ui_texts.json` → `homepage.title`<br>
**Pós-condição:** Nenhuma<br>
**Passos Detalhados:**
| Passo | Ação | Elemento/Localizador | Validação |
|:---:|:---|:---|:---|
| 1 | Abrir navegador (beforeEach) | `cy.visit('/')` | Página inicial carrega |
| 2 | Navegar para URL (beforeEach) | `cy.visit('/')` | URL correta |
| 3 | Verificar página inicial visível (beforeEach) | `HomePage.logo` | Logo visível |
| 4 | Rolar para o rodapé | `cy.scrollTo('bottom')` | Scroll down |
| 5 | Validar "SUBSCRIPTION" | `.single-widget h2:contains('SUBSCRIPTION')` | Rodapé visível |
| 6 | Rolar para o topo | `cy.scrollTo('top')` | Scroll up manual |
| 7 | Validar texto do cabeçalho | `h2:contains('Full-Fledged practice website for Automation Engineers')` | Topo visível |

**Asserção Chave:** Texto do cabeçalho visível após scroll up manual.<br>
**Resultado esperado:** Scroll manual retorna ao topo da página<br>

**Evidência em GIF:** ![TC_WEB_026](../Cypress/cypress/screenshots/web/TC_WEB_026_sucesso_verificar_scroll_sem_seta.cy.js/TC_WEB_026_sucesso_verificar_scroll_sem_seta.gif)

---
## 5. Glossário de Seletores
Este glossário consolida todos os seletores extraídos dos Page Objects do projeto, organizados por página.
### 5.1 HomePage
| Seletor | Tipo | Descrição | Nível |
|:---|:---|:---|:---:|
| `img[alt="Website for automation practice"]` | alt | Logo do site | Médio |
| `a[href="/login"]` | href | Link Signup/Login | Médio |
| `a[href="/delete_account"]` | href | Link Delete Account | Médio |
| `a[href="/logout"]` | href | Link Logout | Médio |
| `a[href="/contact_us"]` | href | Link Contact Us | Médio |
| `a[href="/test_cases"]` | href | Link Test Cases | Médio |
| `a[href="/products"]` | href | Link Products | Médio |
| `a[href="/view_cart"]` | href | Link Cart | Médio |
| `li:contains('Logged in as')` | texto | Indicador de usuário logado | Médio |
| `#susbscribe_email` | id | Campo email newsletter | Robusto |
| `#subscribe` | id | Botão newsletter | Robusto |
| `#success-subscribe` | id | Mensagem sucesso newsletter | Robusto |
| `.single-widget` | classe | Container rodapé subscription | Médio |
| `.single-widget h2` | seletor | Header subscription | Médio |
| `i[class*="angle-up"]` | seletor | Ícone scroll up | Médio |
### 5.2 LoginPage
| Seletor | Tipo | Descrição | Nível |
|:---|:---|:---|:---:|
| `h2:contains('New User Signup!')` | h2+texto | Header novo usuário | Robusto |
| `h2:contains('Login to your account')` | h2+texto | Header login | Robusto |
| `input[data-qa="signup-name"]` | data-qa | Campo nome signup | Robusto |
| `input[data-qa="signup-email"]` | data-qa | Campo email signup | Robusto |
| `button[data-qa="signup-button"]` | data-qa | Botão Signup | Robusto |
| `input[data-qa="login-email"]` | data-qa | Campo email login | Robusto |
| `input[data-qa="login-password"]` | data-qa | Campo senha login | Robusto |
| `button[data-qa="login-button"]` | data-qa | Botão Login | Robusto |
### 5.3 SignupPage
| Seletor | Tipo | Descrição | Nível |
|:---|:---|:---|:---:|
| `h2:contains('Enter Account Information')` | h2+texto | Header informações | Robusto |
| `#id_gender1` | id | Mr. (masculino) | Robusto |
| `#id_gender2` | id | Mrs. (feminino) | Robusto |
| `#password` | id | Campo senha | Robusto |
| `#days` | id | Select dia nascimento | Robusto |
| `#months` | id | Select mês nascimento | Robusto |
| `#years` | id | Select ano nascimento | Robusto |
| `#newsletter` | id | Checkbox newsletter | Robusto |
| `#optin` | id | Checkbox ofertas | Robusto |
| `#first_name` | id | Campo primeiro nome | Robusto |
| `#last_name` | id | Campo sobrenome | Robusto |
| `#company` | id | Campo empresa | Robusto |
| `#address1` | id | Campo endereço 1 | Robusto |
| `#address2` | id | Campo endereço 2 | Robusto |
| `#country` | id | Select país | Robusto |
| `#state` | id | Campo estado | Robusto |
| `#city` | id | Campo cidade | Robusto |
| `#zipcode` | id | Campo CEP | Robusto |
| `#mobile_number` | id | Campo celular | Robusto |
| `button[data-qa="create-account"]` | data-qa | Botão Criar Conta | Robusto |
### 5.4 AccountPage
| Seletor | Tipo | Descrição | Nível |
|:---|:---|:---|:---:|
| `h2:contains('Account Created!')` | h2+texto | Header conta criada | Robusto |
| `h2:contains('Account Deleted!')` | h2+texto | Header conta excluída | Robusto |
| `a[data-qa="continue-button"]` | data-qa | Botão Continue | Robusto |
### 5.5 ProductsPage
| Seletor | Tipo | Descrição | Nível |
|:---|:---|:---|:---:|
| `h2:contains('All Products')` | h2+texto | Header lista produtos | Robusto |
| `.features_items` | classe | Container lista produtos | Médio |
| `.single-products` | classe | Card de produto | Médio |
| `.choose a[href*="/product_details/"]` | href parcial | Link Ver Produto | Médio |
| `#search_product` | id | Campo busca | Robusto |
| `#submit_search` | id | Botão buscar | Robusto |
| `h2:contains('Searched Products')` | h2+texto | Header resultados | Robusto |
| `.product-information h2` | seletor | Nome do produto | Médio |
| `.product-information p` (Category) | seletor+texto | Categoria do produto | Médio |
| `.product-information p` (Availability) | seletor+texto | Disponibilidade do produto | Médio |
| `.product-information p` (Condition) | seletor+texto | Condição do produto | Médio |
| `.product-information p` (Brand) | seletor+texto | Marca do produto | Médio |
| `.product-information span span` | seletor | Preço produto | Médio |
| `#quantity` | id | Campo quantidade | Robusto |
| `.product-overlay` | classe | Overlay produto (hover) | Médio |
| `.left-sidebar` | classe | Barra lateral categorias | Médio |
| `.panel-heading` | classe | Header categoria | Médio |
| `.panel-body a` | seletor | Links de subcategorias | Médio |
| `.brands-name` | classe | Container marcas | Médio |
| `.brands-name a` | seletor | Links marcas | Médio |
| `.recommended_items` | classe | Seção recomendados | Médio |
| `.recommended_items .btn-default.add-to-cart` | seletor | Add to cart recomendados | Médio |
| `a[href="#reviews"]` | href | Link seção de avaliação | Médio |
| `#name` | id | Campo nome avaliação | Robusto |
| `#email` | id | Campo email avaliação | Robusto |
| `#review` | id | Campo texto avaliação | Robusto |
| `button:contains('Submit')` | texto | Botão submit avaliação | Médio |
| `span:contains('Thank you for your review.')` | texto | Mensagem sucesso avaliação | Médio |
### 5.6 ContactUsPage
| Seletor | Tipo | Descrição | Nível |
|:---|:---|:---|:---:|
| `h2:contains('Get In Touch')` | h2+texto | Header contato | Robusto |
| `input[data-qa="name"]` | data-qa | Campo nome | Robusto |
| `input[data-qa="email"]` | data-qa | Campo email | Robusto |
| `input[data-qa="subject"]` | data-qa | Campo assunto | Robusto |
| `textarea[data-qa="message"]` | data-qa | Campo mensagem | Robusto |
| `input[type="file"]` | tipo | Input upload arquivo | Médio |
| `input[data-qa="submit-button"]` | data-qa | Botão Submit | Robusto |
| `a.btn-success[href="/"]` | classe+href | Botão Home | Médio |
| `.status.alert.alert-success` | classe | Mensagem sucesso | Médio |
### 5.7 TestCasesPage
| Seletor | Tipo | Descrição | Nível |
|:---|:---|:---|:---:|
| `h2:contains('Test Cases')` | h2+texto | Header página | Robusto |
### 5.8 CheckoutPage
| Seletor | Tipo | Descrição | Nível |
|:---|:---|:---|:---:|
| `textarea[name="message"]` | name | Campo comentário checkout | Robusto |
| `[name="name_on_card"]` | name | Campo nome cartão | Robusto |
| `[name="card_number"]` | name | Campo número cartão | Robusto |
| `[name="cvc"]` | name | Campo CVC | Robusto |
| `[name="expiry_month"]` | name | Campo mês expiração | Robusto |
| `[name="expiry_year"]` | name | Campo ano expiração | Robusto |
| `a:contains('Proceed To Checkout')` | texto | Botão checkout | Médio |
| `a:contains('Place Order')` | texto | Botão place order | Médio |
| `button:contains('Pay and Confirm Order')` | texto | Botão pagar | Médio |
| `a:contains('Download Invoice')` | texto | Link baixar fatura | Médio |
| `a:contains('View Cart')` | texto | Link ver carrinho | Médio |
| `button:contains('Continue Shopping')` | texto | Botão continuar | Médio |
| `button:contains('Add to cart')` | texto | Botão adicionar ao carrinho (modal) | Médio |
| `.cart_quantity_delete` | classe | Botão remover item | Médio |
| `.cart_price` | classe | Preço no carrinho | Médio |
| `.cart_quantity` | classe | Quantidade no carrinho | Médio |
| `.cart_total` | classe | Total no carrinho | Médio |
| `.cart_description` | classe | Descrição item carrinho | Médio |
| `tbody tr` | seletor | Linhas tabela carrinho | Médio |
| `#address_delivery` | id | Endereço entrega | Robusto |
| `#address_invoice` | id | Endereço cobrança | Robusto |
| `.step-one h2` | seletor | Headers checkout | Médio |
### 5.9 Seletores Globais
> Nenhum — todos os seletores estão organizados por página nas seções 5.1 a 5.8.
---
## 6. Gestão de Divergências e Erros
Caso um técnico de QA identifique uma falha durante a execução, deve seguir o protocolo:
1. **Verificação de Sanidade:** Executar o teste manualmente para descartar instabilidade de rede ou ambiente.
2. **Análise de Seletores:** Consultar o glossário na Seção 5 para verificar se o seletor ainda é válido. Se quebrado, marcar como `[QUEBRADO]` e buscar alternativa.
3. **Análise de Requisito:** Comparar o comportamento atual com o especificado neste documento.
4. **Evidência Técnica:** Capturar screenshot da falha e anexar ao relatório de defeito.
---
## 7. Manutenção da Suíte
### 7.1 Atualização de Seletores
Toda alteração de UI no site requer:
- Atualização do seletor correspondente no arquivo em `cypress/pages/`.
- Atualização do glossário na Seção 5 deste documento.
### 7.2 Execução de Regressão
Após qualquer alteração:
- Executar regressão total para garantir que a mudança não impactou outros cenários dependentes.
- Verificar todos os TC_WEB_s que utilizam o elemento alterado.
### 7.3 Critérios de Atualização do Documento
Este documento deve ser atualizado quando:
- Novo TC_WEB_ for adicionado ao projeto.
- Seletor de elemento for alterado nos Page Objects.
- Fluxo de teste for modificado.
- Nova página/funcionalidade for implementada.
---
## 8. Estrutura de Arquivos
Estrutura completa do projeto com destaque para os artefatos de teste **Web (E2E)**:
```
automationexercise/
├── install_all.sh
├── Cypress/
│   ├── cypress.config.js                # Configuracao: allure, videos, screenshots, reporters
│   ├── run_all.bat                      # Script unico: Cypress + k6 + GIFs + relatorio
│   ├── package.json                     # Dependencias Node (Cypress, Allure, etc.)
│   ├── scripts/                         # Utilitarios
│   │   └── gerar_gifs.js                # Gera GIFs animados

│   └── cypress/
│       ├── e2e/
│       │   ├── web/                     # 26 testes E2E Web (TC_WEB_001-TC_WEB_026)
│       │   │   ├── TC_WEB_001_sucesso_registrar_usuario.cy.js
│       │   │   ├── TC_WEB_002_sucesso_login_usuario_email_senha_corretos.cy.js
│       │   │   ├── TC_WEB_003_erro_login_usuario_email_senha_incorretos.cy.js
│       │   │   ├── TC_WEB_004_sucesso_logout_usuario.cy.js
│       │   │   ├── TC_WEB_005_erro_registrar_usuario_email_existente.cy.js
│       │   │   ├── TC_WEB_006_sucesso_formulario_contato.cy.js
│       │   │   ├── TC_WEB_007_sucesso_verificar_pagina_casos_teste.cy.js
│       │   │   ├── TC_WEB_008_sucesso_verificar_todos_produtos_detalhes_produto.cy.js
│       │   │   ├── TC_WEB_009_sucesso_pesquisar_produto.cy.js
│       │   │   ├── TC_WEB_010_sucesso_verificar_assinatura_pagina_inicial.cy.js
│       │   │   ├── TC_WEB_011_sucesso_verificar_assinatura_pagina_carrinho.cy.js
│       │   │   ├── TC_WEB_012_sucesso_adicionar_produtos_carrinho.cy.js
│       │   │   ├── TC_WEB_013_sucesso_verificar_quantidade_produto_carrinho.cy.js
│       │   │   ├── TC_WEB_014_sucesso_fazer_pedido_registrar_checkout.cy.js
│       │   │   ├── TC_WEB_015_sucesso_fazer_pedido_registrar_antes_checkout.cy.js
│       │   │   ├── TC_WEB_016_sucesso_fazer_pedido_login_antes_checkout.cy.js
│       │   │   ├── TC_WEB_017_sucesso_remover_produtos_carrinho.cy.js
│       │   │   ├── TC_WEB_018_sucesso_visualizar_produtos_categoria.cy.js
│       │   │   ├── TC_WEB_019_sucesso_visualizar_adicionar_marcas.cy.js
│       │   │   ├── TC_WEB_020_sucesso_pesquisar_produtos_verificar_carrinho_login.cy.js
│       │   │   ├── TC_WEB_021_sucesso_adicionar_avaliacao_produto.cy.js
│       │   │   ├── TC_WEB_022_sucesso_adicionar_itens_recomendados_carrinho.cy.js
│       │   │   ├── TC_WEB_023_sucesso_verificar_detalhes_endereco_checkout.cy.js
│       │   │   ├── TC_WEB_024_sucesso_baixar_fatura_pedido.cy.js
│       │   │   ├── TC_WEB_025_sucesso_verificar_scroll_seta.cy.js
│       │   │   └── TC_WEB_026_sucesso_verificar_scroll_sem_seta.cy.js
│       │   ├── api/                     # Testes de API
│       │   └── performance/             # Testes de performance
│       ├── pages/                       # Page Objects
│       │   └── ...
│       ├── data/                        # Factories
│       ├── fixtures/                    # Dados estaticos
│       ├── support/                     # Comandos customizados
│       ├── reports/                     # Relatorios de execucao
│       ├── screenshots/                 # Evidencias visuais
│       │   ├── web/                     # PNGs + GIFs por spec
│       │   ├── api/                     # HTML reports das APIs
│       │   └── performance/             # PNGs + GIF do TC_PF_008
│       ├── allure/                      # Relatorios Allure
│       └── videos/                      # Videos das execucoes
```
---
**Documento gerado em:** 2026-05-22

