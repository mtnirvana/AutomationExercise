/**
 * TC_WEB_024 - Baixar fatura após pedido
 * @description Baixa fatura após pedido
 * @tags @sucesso @TC_WEB_024
 * @author Rafael Barelli
 */

import { HomePage, LoginPage, SignupPage, AccountPage, CheckoutPage, ProductsPage } from '../../pages'
import { UserFactory } from '../../data/userFactory'
import productsData from '../../fixtures/products.json'
import contactData from '../../fixtures/contact.json'
import uiData from '../../fixtures/ui_texts.json'

describe('TC_WEB_024 - Baixar fatura após pedido', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve baixar fatura após pedido', () => {
    const userData = UserFactory.generate()

    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Adicionar primeiro produto ao carrinho
    HomePage.clickProducts()
    ProductsPage.productsItems.first().scrollIntoView().trigger('mouseover')
    cy.get('.btn.btn-default.add-to-cart').first().scrollIntoView().should('be.visible').click({ force: true })
    takeScreenshot('04_produto_adicionado_ao_carrinho')

    // 5. Clicar em 'Continue Shopping'
    CheckoutPage.clickContinueShopping()
    takeScreenshot('05_clicou_continuar_comprando')

    // 6. Clicar no botão 'Cart'
    HomePage.cartLink.should('be.visible').click({ force: true })
    takeScreenshot('06_clicou_carrinho')

    // 7. Verificar que a página do carrinho está visível
    cy.url().should('include', '/view_cart')
    cy.get('h2').should('be.visible')
    takeScreenshot('07_pagina_carrinho_exibida')

    // 8. Clicar em 'Proceed To Checkout'
    CheckoutPage.clickProceedToCheckout()
    takeScreenshot('08_clicou_proceder_checkout')

    // 9. Clicar no botão 'Register / Login'
    HomePage.signupLoginLink.click({ force: true })
    takeScreenshot('09_clicou_registrar_login')

    // 10. Preencher email no formulário de signup
    LoginPage.nameInput.type(userData.username)
    LoginPage.emailInput.type(userData.email)
    LoginPage.clickSignup()
    takeScreenshot('10_preencheu_email_signup')

    // 11. Selecionar gênero e preencher senha
    SignupPage.selectGender(userData.gender)
    SignupPage.password.type(userData.password)
    takeScreenshot('11_selecionou_genero_e_senha')

    // 12. Preencher data de nascimento
    SignupPage.fillDateOfBirth(userData.day, userData.month, userData.year)
    takeScreenshot('12_preencheu_data_nascimento')

    // 13. Preencher endereço
    SignupPage.fillAddress(userData.address)
    cy.scrollTo('center')
    takeScreenshot('13_preencheu_endereco')

    // 14. Clicar em 'Create Account'
    SignupPage.clickCreateAccount()
    takeScreenshot('14_criou_conta')

    // 15. Verificar 'ACCOUNT CREATED!' e clicar no botão 'Continue'
    AccountPage.verifyAccountCreated()
    AccountPage.clickContinue()
    takeScreenshot('15_conta_criada_clicou_continuar')

    // 16. Verificar 'Logged in as username' no topo
    HomePage.verifyLoggedInAs(userData.username)
    takeScreenshot('16_logado_como_visivel')

    // 17. Clicar no botão 'Cart'
    HomePage.clickCart()
    cy.contains('a', uiData.buttons.proceedToCheckout).should('be.visible')
    takeScreenshot('17_clicou_carrinho')

    // 18. Clicar no botão 'Proceed To Checkout'
    CheckoutPage.clickProceedToCheckout()
    takeScreenshot('18_clicou_proceder_checkout')

    // 19. Verificar Detalhes do Endereço e Revisar Seu Pedido
    CheckoutPage.checkoutStepHeaders.contains(uiData.checkout.addressDetails).should('be.visible')
    CheckoutPage.checkoutStepHeaders.contains(uiData.checkout.reviewOrder).should('be.visible')
    takeScreenshot('19_detalhes_endereco_revisao_visivel')

    // 20. Inserir descrição na área de texto de comentário
    CheckoutPage.commentInput.type(contactData.checkout.invoiceMessage)
    CheckoutPage.commentInput.scrollIntoView({ block: 'center' })
    takeScreenshot('20_comentario_inserido')

    // 21. Clicar em 'Place Order'
    CheckoutPage.clickPlaceOrder()
    takeScreenshot('21_clicou_place_order')

    // 22. Inserir detalhes do pagamento: Nome no Cartão, Número do Cartão, CVC, Data de Expiração
    cy.get('@usersData').then((usersData) => {
      CheckoutPage.fillPaymentDetails(usersData.paymentData)
    })
    cy.scrollTo('top')
    takeScreenshot('22_detalhes_pagamento_inseridos')

    // 23. Clicar no botão 'Pay and Confirm Order'
    CheckoutPage.clickPayAndConfirm()
    takeScreenshot('23_clicou_pagar_confirmar')

    // 24. Verificar mensagem de sucesso
    cy.contains('h2', uiData.checkout.orderPlaced).should('be.visible')
    takeScreenshot('24_pedido_colocado_sucesso')

    // 25. Clicar no botão 'Download Invoice' e verificar que a fatura foi baixada com sucesso
    CheckoutPage.clickDownloadInvoice()
    takeScreenshot('25_clicou_baixar_fatura')

    // 26. Verificar que arquivo da fatura existe
    cy.readFile(productsData.filenames.invoice).should('exist')
    takeScreenshot('26_fatura_baixada_sucesso')

    // 27. Clicar no botão 'Continue'
    cy.contains('a', uiData.buttons.continue).click()
    takeScreenshot('27_clicou_continuar')

    // 28. Clicar em 'Delete Account'
    HomePage.clickDeleteAccount()
    takeScreenshot('28_clicou_excluir_conta')

    // 29. Verificar 'ACCOUNT DELETED!' e clicar em 'Continue'
    cy.get('h2').contains(uiData.checkout.accountDeleted).should('be.visible')
    AccountPage.clickContinue()
    takeScreenshot('29_conta_excluida_teste_concluido')
  })
})


