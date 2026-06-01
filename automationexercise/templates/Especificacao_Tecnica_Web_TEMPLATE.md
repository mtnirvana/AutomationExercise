# Especificação Técnica Web - Automation Exercise
**Versão:** 1.0.0<br>
**Metodologia:** POM (Page Object Model)<br>
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
| TC... | ... | ... | ... | ... |
| TC_WEB_026 | Verificar scroll up sem botão de seta | UX/UI | Baixa | Sucesso |

---

## 4. Detalhamento Exaustivo de Cenários (E2E)
Esta seção fornece a especificação técnica passo a passo para cada cenário de teste, permitindo que qualquer QA reproduza o teste manualmente. Cada novo TC adicionado deve ser inserido abaixo, seguindo a estrutura de grupo funcional.

<!--

### 4.1 Grupo: Gestão de Identidade e Acesso (TC_WEB_001 - TC_WEB_005)

---

#### TC_WEB_001 - Registrar usuário

**Objetivo:** Validar o ciclo de vida completo de criação e exclusão de conta.<br>
**Tipo:** Sucesso<br>
**Criticidade:** Crítica<br>
**Dados:** `UserFactory.generate()` - dados dinâmicos únicos por execução<br>
**Pós-condição:** Conta criada e excluída ao final do teste

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
| ... | ... | ... | ... |
| N | Validar "ACCOUNT DELETED!" e clicar em "Continue" | `AccountPage.accountDeletedHeader` + `AccountPage.continueButton` | Header visível |

**Asserção Chave:**<br>
**Resultado esperado:** [Resultado esperado do teste] Texto "Logged in as [username]" visível no topo da página após registro.<br>
**Script:** [TCXXX_nome_do_teste.cy.js](../Cypress/cypress/e2e/web/TCXXX_nome_do_teste.cy.js)<br>

**Evidência em GIF:** ![TC00X](../Cypress/cypress/screenshots/web/TC00X_titulo_do_teste.cy.js/TC00X_titulo_do_teste.gif)

---

### 4.2 Grupo: Comunicação e UX (TC_WEB_006 - TC_WEB_007, TC_WEB_010 - TC_WEB_011)

---

### 4.3 Grupo: Catálogo e Exploração de Produtos (TC_WEB_008 - TC_WEB_009)

---

### 4.4 Grupo: Experiência de Compra e Carrinho (TC_WEB_012 - TC_WEB_013, TC_WEB_017)

---

### 4.5 Grupo: Transacional e Financeiro (TC_WEB_014 - TC_WEB_016)

---

### 4.6 Grupo: Catálogo, Carrinho e UX/UI (TC_WEB_018 - TC_WEB_026)

---

Para adicionar um novo TC, insira-o abaixo do grupo funcional correspondente, seguindo o formato do template acima.

-->

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
| `.left-sidebar` | classe | Barra lateral categorias | Médio |
| `.product-overlay` | classe | Overlay produto (hover) | Médio |
| `.panel-heading` | classe | Header categoria | Médio |
| `.panel-body a` | seletor | Links de subcategorias | Médio |
| `.brands-name` | classe | Container de marcas | Médio |
| `.brands-name a` | seletor | Links de marcas | Médio |
| `.recommended_items` | classe | Seção itens recomendados | Médio |
| `.recommended_items .btn-default.add-to-cart` | seletor | Botão add to cart (recomendados) | Médio |

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
├── Cypress/
│   ├── cypress.config.js                # Configuracao: allure, videos, screenshots, reporters
│   ├── run_all.bat                      # Script unico: Cypress + k6 + GIFs + relatorio
│   ├── package.json                     # Dependencias Node (Cypress, Allure, etc.)
│   ├── scripts/                         # Utilitarios
│   │   └── gerar_gifs.js                # Gera GIFs animados

│   └── cypress/
│       ├── e2e/
│       │   ├── web/                     # 26 testes E2E Web (TC_WEB_001-TC_WEB_026)
│       │   ├── api/                     # Testes de API
│       │   └── performance/             # Testes de performance
│       ├── pages/                       # Page Objects
│       │   └── ...
│       ├── data/                        # Factories
│       ├── fixtures/                    # Dados estaticos
│       │   ├── users.json               # Credenciais e dados de pagamento
│       │   ├── products.json            # Produtos, categorias, marcas
│       │   ├── contact.json             # Mensagens e assuntos
│       │   ├── ui_texts.json            # Labels, headers, erros, botoes
│       │   └── test_file.txt            # Arquivo de teste para upload
│       ├── support/                     # Comandos customizados
│       │   └── e2e.js                   # beforeEach centralizado + cy.captura()
│       ├── reports/                     # Relatorios de execucao
│       ├── screenshots/                 # Evidencias visuais
│       ├── allure/                      # Relatorios Allure
│       └── videos/                      # Videos das execucoes
```

> **Exemplo de preenchimento:** No documento completo, a pasta `web/` deve listar todos os 26 scripts de teste E2E com seus nomes completos, conforme [`Especificacao_Tecnica_Web.md`](Especificacao_Tecnica_Web.md).

---

**Documento gerado em:** AAAA-MM-DD
