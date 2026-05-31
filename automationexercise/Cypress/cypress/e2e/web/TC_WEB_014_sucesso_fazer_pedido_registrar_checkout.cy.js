/**
 * TC_WEB_014 - Fazer pedido registrando durante o checkout
 * @description Realiza pedido com registro durante checkout
 * @tags @sucesso @TC_WEB_014
 * @author Rafael Barelli
 */

import { HomePage, LoginPage, SignupPage, AccountPage, CheckoutPage, ProductsPage } from '../../pages'
import { UserFactory } from '../../data/userFactory'
import contactData from '../../fixtures/contact.json'
import uiData from '../../fixtures/ui_texts.json'

describe('TC_WEB_014 - Fazer pedido registrando durante o checkout', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve realizar pedido com registro durante checkout', () => {
    const userData = UserFactory.generate()

    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar em "Products"
    HomePage.clickProducts()
    takeScreenshot('04_clicou_produtos')

    // 5. Adicionar primeiro produto ao carrinho
    ProductsPage.productsItems.first().scrollIntoView().trigger('mouseover')
    ProductsPage.productsItems.first().scrollIntoView().trigger('mouseover')
    ProductsPage.productOverlay.first().find('.btn').click({ force: true })
    CheckoutPage.clickContinueShopping()
    takeScreenshot('05_adicionou_primeiro_produto')

    // 6. Adicionar segundo produto ao carrinho
    ProductsPage.productsItems.eq(1).scrollIntoView().trigger('mouseover')
    ProductsPage.productsItems.eq(1).scrollIntoView().trigger('mouseover')
    ProductsPage.productOverlay.eq(1).find('.btn').click({ force: true })
    takeScreenshot('06_adicionou_segundo_produto')

    // 7. Clicar em 'View Cart'
    CheckoutPage.clickViewCart()
    takeScreenshot('07_clicou_ver_carrinho')

    // 8. Verificar que a página do carrinho está visível
    cy.url().should('include', '/view_cart')
    takeScreenshot('08_pagina_carrinho_visivel')

    // 9. Clicar em 'Proceed To Checkout'
    CheckoutPage.clickProceedToCheckout()
    takeScreenshot('09_clicou_proceder_checkout')

    // 10. Clicar no botão 'Register / Login'
    HomePage.signupLoginLink.click({ force: true })
    takeScreenshot('10_clicou_registrar_login')

    // 11. Preencher email no formulário de signup
    LoginPage.nameInput.type(userData.username)
    LoginPage.emailInput.type(userData.email)
    LoginPage.clickSignup()
    takeScreenshot('11_preencheu_email_signup')

    // 12. Selecionar gênero e preencher senha
    SignupPage.selectGender(userData.gender)
    SignupPage.password.type(userData.password)
    takeScreenshot('12_selecionou_genero_e_senha')

    // 13. Preencher data de nascimento
    SignupPage.fillDateOfBirth(userData.day, userData.month, userData.year)
    takeScreenshot('13_preencheu_data_nascimento')

    // 14. Preencher endereço
    SignupPage.fillAddress(userData.address)
    takeScreenshot('14_preencheu_endereco')

    // 15. Clicar em 'Create Account'
    SignupPage.clickCreateAccount()
    takeScreenshot('15_criou_conta')

    // 16. Verificar 'ACCOUNT CREATED!' e clicar no botão 'Continue'
    AccountPage.verifyAccountCreated()
    AccountPage.clickContinue()
    takeScreenshot('16_conta_criada_clicou_continuar')

    // 17. Verificar 'Logged in as username' no topo
    HomePage.verifyLoggedInAs(userData.username)
    takeScreenshot('17_logado_como_visivel')

    // 18. Clicar no botão 'Cart'
    HomePage.clickCart()
    cy.url().should('include', '/view_cart')
    takeScreenshot('18_clicou_carrinho')

    // 19. Clicar no botão 'Proceed To Checkout'
    CheckoutPage.clickProceedToCheckout()
    takeScreenshot('19_clicou_proceder_checkout')

    // 20. Verificar Detalhes do Endereço e Revisão do Pedido
    CheckoutPage.checkoutStepHeaders.contains(uiData.checkout.addressDetails).should('be.visible')
    CheckoutPage.checkoutStepHeaders.contains(uiData.checkout.reviewOrder).should('be.visible')
    takeScreenshot('20_detalhes_endereco_revisao_visivel')

    // 21. Inserir descrição na área de texto de comentários
    CheckoutPage.commentInput.type(contactData.checkout.message)
    takeScreenshot('21_comentario_inserido')

    // 22. Clicar em 'Place Order'
    CheckoutPage.clickPlaceOrder()
    takeScreenshot('22_clicou_place_order')

    // 23. Inserir detalhes do pagamento: Nome no Cartão, Número do Cartão, CVC, Data de Validade
    cy.get('@usersData').then((usersData) => {
      CheckoutPage.fillPaymentDetails(usersData.paymentData)
    })
    cy.scrollTo('top')
    takeScreenshot('23_detalhes_pagamento_inseridos')

    // 24. Clicar no botão 'Pay and Confirm Order'
    CheckoutPage.clickPayAndConfirm()
    takeScreenshot('24_clicou_pagar_confirmar')

    // 25. Verificar mensagem de sucesso
    cy.contains('h2', uiData.checkout.orderPlaced).should('be.visible')
    takeScreenshot('25_pedido_colocado_sucesso')

    // 26. Clicar no botão 'Delete Account'
    HomePage.clickDeleteAccount()
    takeScreenshot('26_clicou_excluir_conta')

    // 27. Verificar 'ACCOUNT DELETED!' e clicar no botão 'Continue'
    AccountPage.verifyAccountDeleted()
    AccountPage.clickContinue()
    takeScreenshot('27_conta_excluida_teste_concluido')
  })
})






