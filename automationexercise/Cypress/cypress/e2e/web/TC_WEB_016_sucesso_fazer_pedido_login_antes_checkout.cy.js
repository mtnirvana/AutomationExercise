/**
 * TC_WEB_016 - Fazer pedido fazendo login antes do checkout
 * @description Realiza pedido com login antes do checkout usando usuário existente
 * @tags @sucesso @TC_WEB_016
 * @author Rafael Barelli
 */

import { HomePage, LoginPage, CheckoutPage, ProductsPage } from '../../pages'
import contactData from '../../fixtures/contact.json'
import uiData from '../../fixtures/ui_texts.json'

describe('TC_WEB_016 - Fazer pedido fazendo login antes do checkout', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve realizar pedido com login antes do checkout', function () {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar no botão 'Signup / Login'
    HomePage.clickSignupLogin()
    takeScreenshot('04_clicou_signup_login')

    // 5. Preencher email, senha e clicar em 'Login'
    cy.get('@usersData').then((usersData) => {
      LoginPage.login(usersData.testUser.email, usersData.testUser.password)
    })
    takeScreenshot('05_preencheu_email_senha')

    // 6. Verificar 'Logged in as username' no topo
    cy.get('@usersData').then((usersData) => {
      HomePage.verifyLoggedInAs(usersData.testUser.name)
    })
    takeScreenshot('06_logado_como_visivel')

    // 7. Clicar em "Products" e adicionar produtos ao carrinho
    HomePage.clickProducts()
    takeScreenshot('07_clicou_produtos')

    // 8. Adicionar primeiro produto ao carrinho
    ProductsPage.addToCartOverlay(0)
    takeScreenshot('08_adicionou_primeiro_produto')

    // 9. Clicar em 'Continue Shopping'
    CheckoutPage.clickContinueShopping()
    takeScreenshot('09_clicou_continue_shopping')

    // 10. Adicionar segundo produto ao carrinho
    ProductsPage.addToCartOverlay(1)
    takeScreenshot('10_adicionou_segundo_produto')

    // 11. Clicar no botão 'Cart'
    cy.get('body').type('{esc}')
    HomePage.cartLink.should('be.visible').click({ force: true })
    takeScreenshot('11_clicou_carrinho')

    // 12. Validar página do carrinho
    CheckoutPage.verifyCartPageVisible()
    takeScreenshot('12_pagina_carrinho_exibida')

    // 13. Clicar em 'Proceed To Checkout'
    CheckoutPage.clickProceedToCheckout()
    takeScreenshot('13_clicou_proceder_checkout')

    // 14. Verificar Detalhes do Endereço e Revisão do Pedido
    CheckoutPage.checkoutStepHeaders.contains(uiData.checkout.addressDetails).should('be.visible')
    CheckoutPage.checkoutStepHeaders.contains(uiData.checkout.reviewOrder).should('be.visible')
    takeScreenshot('14_detalhes_endereco_revisao_visivel')

    // 15. Inserir descrição na área de texto de comentários
    CheckoutPage.commentInput.type(contactData.checkout.message)
    takeScreenshot('15_comentario_inserido')

    // 16. Clicar em 'Place Order'
    CheckoutPage.clickPlaceOrder()
    takeScreenshot('16_clicou_place_order')

    // 17. Inserir detalhes do pagamento: Nome no Cartão, Número do Cartão, CVC, Data de Validade
    cy.get('@usersData').then((usersData) => {
      CheckoutPage.fillPaymentDetails(usersData.paymentData)
    })
    cy.scrollTo('top')
    takeScreenshot('17_detalhes_pagamento_inseridos')

    // 18. Clicar no botão 'Pay and Confirm Order'
    CheckoutPage.clickPayAndConfirm()
    takeScreenshot('18_clicou_pagar_confirmar')

    // 19. Verificar mensagem de sucesso
    CheckoutPage.verifyOrderPlaced()
    takeScreenshot('19_pedido_colocado_sucesso')
  })
})

