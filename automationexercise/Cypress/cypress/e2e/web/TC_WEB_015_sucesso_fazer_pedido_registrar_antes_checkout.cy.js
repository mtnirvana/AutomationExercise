/**
 * TC_WEB_015 - Fazer pedido registrando antes do checkout
 * @description Realiza pedido com registro antes do checkout
 * @tags @sucesso @TC_WEB_015
 * @author Rafael Barelli
 */

import { HomePage, LoginPage, SignupPage, AccountPage, CheckoutPage, ProductsPage } from '../../pages'
import { UserFactory } from '../../data/userFactory'
import contactData from '../../fixtures/contact.json'
import uiData from '../../fixtures/ui_texts.json'

describe('TC_WEB_015 - Fazer pedido registrando antes do checkout', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve realizar pedido com registro antes do checkout', () => {
    const userData = UserFactory.generate()

    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar no botão 'Signup / Login'
    HomePage.clickSignupLogin()
    takeScreenshot('04_clicou_signup_login')

    // 5. Preencher email no formulário de signup
    LoginPage.nameInput.type(userData.username)
    LoginPage.emailInput.type(userData.email)
    LoginPage.clickSignup()
    takeScreenshot('05_preencheu_email_signup')

    // 6. Selecionar gênero e preencher senha
    SignupPage.selectGender(userData.gender)
    SignupPage.password.type(userData.password)
    takeScreenshot('06_selecionou_genero_e_senha')

    // 7. Preencher data de nascimento e endereço
    SignupPage.fillDateOfBirth(userData.day, userData.month, userData.year)
    SignupPage.fillAddress(userData.address)
    cy.scrollTo('center')
    takeScreenshot('07_preencheu_dados_restantes')

    // 8. Clicar em 'Create Account'
    SignupPage.clickCreateAccount()
    takeScreenshot('08_criou_conta')

    // 9. Verificar 'ACCOUNT CREATED!' e clicar no botão 'Continue'
    AccountPage.verifyAccountCreated()
    AccountPage.clickContinue()
    takeScreenshot('09_conta_criada_clicou_continuar')

    // 10. Verificar 'Logged in as username' no topo
    HomePage.verifyLoggedInAs(userData.username)
    takeScreenshot('10_logado_como_visivel')

    // 11. Adicionar produtos ao carrinho
    HomePage.clickProducts()
    ProductsPage.productsItems.first().scrollIntoView().trigger('mouseover')
    ProductsPage.productOverlay.first().find('.btn').click({ force: true })
    CheckoutPage.clickContinueShopping()
    ProductsPage.productsItems.eq(1).scrollIntoView().trigger('mouseover')
    ProductsPage.productOverlay.eq(1).find('.btn').click({ force: true })
    takeScreenshot('11_produtos_adicionados_ao_carrinho')

    // 12. Clicar no botão 'Cart'
    cy.get('body').type('{esc}')
    HomePage.cartLink.should('be.visible').click({ force: true })
    takeScreenshot('12_clicou_carrinho')

    // 13. Verificar que a página do carrinho está visível
    cy.url().should('include', '/view_cart')
    cy.get('h2').should('be.visible')
    takeScreenshot('13_pagina_carrinho_exibida')

    // 14. Clicar em 'Proceed To Checkout'
    CheckoutPage.clickProceedToCheckout()
    takeScreenshot('14_clicou_proceder_checkout')

    // 15. Verificar Detalhes do Endereço e Revisão do Pedido
    CheckoutPage.checkoutStepHeaders.contains(uiData.checkout.addressDetails).should('be.visible')
    CheckoutPage.checkoutStepHeaders.contains(uiData.checkout.reviewOrder).should('be.visible')
    takeScreenshot('15_detalhes_endereco_revisao_visivel')

    // 16. Inserir descrição na área de texto de comentários
    CheckoutPage.commentInput.type(contactData.checkout.message)
    takeScreenshot('16_comentario_inserido')

    // 17. Clicar em 'Place Order'
    CheckoutPage.clickPlaceOrder()
    takeScreenshot('17_clicou_place_order')

    // 18. Inserir dados de pagamento: Nome no Cartão, Número do Cartão, CVC, Data de Validade
    cy.get('@usersData').then((usersData) => {
      CheckoutPage.fillPaymentDetails(usersData.paymentData)
    })
    cy.scrollTo('top')
    takeScreenshot('18_detalhes_pagamento_inseridos')

    // 19. Clicar no botão 'Pay and Confirm Order'
    CheckoutPage.clickPayAndConfirm()
    takeScreenshot('19_clicou_pagar_confirmar')

    // 20. Verificar mensagem de sucesso
    cy.contains('h2', uiData.checkout.orderPlaced).should('be.visible')
    takeScreenshot('20_pedido_colocado_sucesso')

    // 21. Clicar no botão 'Delete Account'
    HomePage.clickDeleteAccount()
    takeScreenshot('21_clicou_excluir_conta')

    // 22. Verificar 'ACCOUNT DELETED!' e clicar no botão 'Continue'
    AccountPage.verifyAccountDeleted()
    AccountPage.clickContinue()
    takeScreenshot('22_conta_excluida_teste_concluido')
  })
})






