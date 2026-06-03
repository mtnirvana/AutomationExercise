/**
 * TC_WEB_014 - Fazer pedido registrando durante o checkout
 * @description Realiza pedido com registro durante checkout
 * @tags @sucesso @TC_WEB_014
 * @author Rafael Barelli
 */

import { HomePage, LoginPage, SignupPage, AccountPage, CheckoutPage, ProductsPage } from '../../pages'
import { UserFactory } from '../../data/UserFactory'
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
    ProductsPage.addToCartOverlay(0)
    takeScreenshot('05_adicionou_primeiro_produto')

    // 6. Clicar em 'Continue Shopping'
    CheckoutPage.clickContinueShopping()
    takeScreenshot('06_clicou_continuar_comprando')

    // 7. Adicionar segundo produto ao carrinho
    ProductsPage.addToCartOverlay(1)
    takeScreenshot('06_adicionou_segundo_produto')

    // 8. Clicar em 'View Cart'
    CheckoutPage.clickViewCart()
    takeScreenshot('08_clicou_ver_carrinho')

    // 9. Verificar que a página do carrinho está visível
    CheckoutPage.verifyCartPageVisible()
    takeScreenshot('09_pagina_carrinho_visivel')

    // 10. Clicar em 'Proceed To Checkout'
    CheckoutPage.clickProceedToCheckout()
    takeScreenshot('10_clicou_proceder_checkout')

    // 11. Clicar no botão 'Register / Login'
    HomePage.signupLoginLink.click({ force: true })
    takeScreenshot('11_clicou_registrar_login')

    // 12. Preencher email no formulário de signup
    LoginPage.nameInput.type(userData.username)
    LoginPage.emailInput.type(userData.email)
    LoginPage.clickSignup()
    takeScreenshot('12_preencheu_email_signup')

    // 13. Selecionar gênero e preencher senha
    SignupPage.selectGender(userData.gender)
    SignupPage.password.type(userData.password)
    takeScreenshot('13_selecionou_genero_e_senha')

    // 14. Preencher data de nascimento
    SignupPage.fillDateOfBirth(userData.day, userData.month, userData.year)
    takeScreenshot('14_preencheu_data_nascimento')

    // 15. Preencher endereço
    SignupPage.fillAddress(userData.address)
    takeScreenshot('15_preencheu_endereco')

    // 16. Clicar em 'Create Account'
    SignupPage.clickCreateAccount()
    takeScreenshot('16_criou_conta')

    // 17. Verificar 'ACCOUNT CREATED!' e clicar no botão 'Continue'
    AccountPage.verifyAccountCreated()
    AccountPage.clickContinue()
    takeScreenshot('17_conta_criada_clicou_continuar')

    // 18. Verificar 'Logged in as username' no topo
    HomePage.verifyLoggedInAs(userData.username)
    takeScreenshot('18_logado_como_visivel')

    // 19. Clicar no botão 'Cart'
    HomePage.clickCart()
    CheckoutPage.verifyCartPageVisible()
    takeScreenshot('19_clicou_carrinho')

    // 20. Clicar no botão 'Proceed To Checkout'
    CheckoutPage.clickProceedToCheckout()
    takeScreenshot('20_clicou_proceder_checkout')

    // 21. Verificar Detalhes do Endereço e Revisão do Pedido
    CheckoutPage.checkoutStepHeaders.contains(uiData.checkout.addressDetails).should('be.visible')
    CheckoutPage.checkoutStepHeaders.contains(uiData.checkout.reviewOrder).should('be.visible')
    takeScreenshot('21_detalhes_endereco_revisao_visivel')

    // 22. Inserir descrição na área de texto de comentários
    CheckoutPage.commentInput.type(contactData.checkout.message)
    takeScreenshot('22_comentario_inserido')

    // 23. Clicar em 'Place Order'
    CheckoutPage.clickPlaceOrder()
    takeScreenshot('23_clicou_place_order')

    // 24. Inserir detalhes do pagamento: Nome no Cartão, Número do Cartão, CVC, Data de Validade
    cy.get('@usersData').then((usersData) => {
      CheckoutPage.fillPaymentDetails(usersData.paymentData)
    })
    cy.scrollTo('top')
    takeScreenshot('24_detalhes_pagamento_inseridos')

    // 25. Clicar no botão 'Pay and Confirm Order'
    CheckoutPage.clickPayAndConfirm()
    takeScreenshot('25_clicou_pagar_confirmar')

    // 26. Verificar mensagem de sucesso
    CheckoutPage.verifyOrderPlaced()
    takeScreenshot('26_pedido_colocado_sucesso')

    // 27. Clicar no botão 'Delete Account'
    HomePage.clickDeleteAccount()
    takeScreenshot('27_clicou_excluir_conta')

    // 28. Verificar 'ACCOUNT DELETED!' e clicar no botão 'Continue'
    AccountPage.verifyAccountDeleted()
    AccountPage.clickContinue()
    takeScreenshot('28_conta_excluida_teste_concluido')
  })
})






