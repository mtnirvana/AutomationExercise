/**
 * TC_WEB_023 - Verificar detalhes do endereço na página de checkout
 * @description Verifica detalhes do endereço na página de checkout
 * @tags @sucesso @TC_WEB_023
 * @author Rafael Barelli
 */

import { HomePage, LoginPage, SignupPage, AccountPage, CheckoutPage, ProductsPage } from '../../pages'
import { UserFactory } from '../../data/UserFactory'


describe('TC_WEB_023 - Verificar detalhes do endereço na página de checkout', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve verificar detalhes do endereço no checkout', () => {
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
    ProductsPage.addToCartOverlay(0)
    CheckoutPage.clickContinueShopping()
    ProductsPage.addToCartOverlay(1)
    takeScreenshot('11_produtos_adicionados_ao_carrinho')

    // 12. Clicar no botão 'Cart'
    cy.get('body').type('{esc}')
    HomePage.cartLink.should('be.visible').click({ force: true })
    takeScreenshot('12_clicou_carrinho')

    // 13. Verificar que a página do carrinho está visível
    CheckoutPage.verifyCartPageVisible()
    takeScreenshot('13_pagina_carrinho_exibida')

    // 14. Clicar em 'Proceed To Checkout'
    CheckoutPage.clickProceedToCheckout()
    takeScreenshot('14_clicou_proceder_checkout')

    // 15. Verificar que o endereço de entrega é o mesmo preenchido no registro da conta
    CheckoutPage.verifyAddressDetailsHeader()
    CheckoutPage.deliveryAddress.should('contain', userData.address.address1)
    CheckoutPage.deliveryAddress.should('contain', userData.address.city)
    CheckoutPage.deliveryAddress.should('contain', userData.address.state)
    CheckoutPage.deliveryAddress.should('contain', userData.address.zipcode)
    takeScreenshot('15_endereco_entrega_verificado')

    // 16. Verificar que o endereço de cobrança é o mesmo preenchido no registro da conta
    CheckoutPage.invoiceAddress.should('contain', userData.address.address1)
    CheckoutPage.invoiceAddress.should('contain', userData.address.city)
    takeScreenshot('16_endereco_cobranca_verificado')

    // 17. Clicar no botão 'Delete Account'
    HomePage.clickDeleteAccount()
    takeScreenshot('17_clicou_excluir_conta')

    // 18. Verificar 'ACCOUNT DELETED!' e clicar no botão 'Continue'
    AccountPage.verifyAccountDeleted()
    AccountPage.clickContinue()
    takeScreenshot('18_conta_excluida_teste_concluido')
  })
})






