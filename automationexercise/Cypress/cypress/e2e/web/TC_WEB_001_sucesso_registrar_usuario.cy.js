/**
 * TC_WEB_001 - Registrar usuário
 * @description Fluxo completo de registro de novo usuário
 * @tags @sucesso @TC_WEB_001
 * @author Rafael Barelli
 */

import { HomePage, LoginPage, SignupPage, AccountPage } from '../../pages'
import { UserFactory } from '../../data/UserFactory'

describe('TC_WEB_001 - Registrar usuário', () => {

  const takeScreenshot = (stepName) => {

    cy.captura(`${stepName}`)

  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve registrar um novo usuário e excluí-lo', () => {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar no botão 'Signup / Login'
    HomePage.clickSignupLogin()
    takeScreenshot('04_clicou_signup_login')

    // 5. Verificar que 'New User Signup!' está visível
    LoginPage.verifyNewUserSignupHeader()
    takeScreenshot('05_novo_usuario_signup_visivel')

    // 6. Inserir nome e endereço de email
    const userData = UserFactory.generate()
    LoginPage.nameInput.type(userData.username)
    LoginPage.emailInput.type(userData.email)
    takeScreenshot('06_preencheu_nome_email')

    // 7. Clicar no botão 'Signup'
    LoginPage.clickSignup()
    takeScreenshot('07_clicou_botao_signup')

    // 8. Verificar que 'ENTER ACCOUNT INFORMATION' está visível
    SignupPage.verifyAccountInfoHeader()
    takeScreenshot('08_enter_account_info_visivel')

    // 9. Selecionar gênero
    SignupPage.selectGender(userData.gender)
    takeScreenshot('09_selecionou_genero')

    // 10. Preencher senha
    SignupPage.password.type(userData.password)
    takeScreenshot('10_preencheu_senha')

    // 11. Preencher data de nascimento
    SignupPage.fillDateOfBirth(userData.day, userData.month, userData.year)
    takeScreenshot('11_preencheu_data_nascimento')

    // 12. Selecionar checkbox 'Sign up for our newsletter!'
    if (userData.newsletter) {
      SignupPage.newsletterCheckbox.check()
      takeScreenshot('12_newsletter_marcado')
    }

    // 13. Selecionar checkbox 'Receive special offers from our partners!'
    if (userData.specialOffers) {
      SignupPage.specialOffersCheckbox.check()
      takeScreenshot('13_ofertas_especiais_marcado')
    }

    // 14. Preencher detalhes de endereço
    SignupPage.fillAddress(userData.address)
    cy.scrollTo('center')
    takeScreenshot('14_preencheu_informacoes_endereco')

    // 15. Clicar no botão 'Create Account'
    SignupPage.clickCreateAccount()
    takeScreenshot('15_clicou_criar_conta')

    // 16. Verificar que 'ACCOUNT CREATED!' está visível
    AccountPage.verifyAccountCreated()
    takeScreenshot('16_conta_criada_visivel')

    // 17. Clicar no botão 'Continue'
    AccountPage.clickContinue()
    takeScreenshot('17_clicou_continuar')

    // 18. Verificar que 'Logged in as username' está visível
    HomePage.verifyLoggedInAs(userData.username)
    takeScreenshot('18_logado_como_visivel')

    // 19. Clicar no botão 'Delete Account'
    HomePage.clickDeleteAccount()
    takeScreenshot('19_clicou_excluir_conta')

    // 20. Verificar que 'ACCOUNT DELETED!' está visível
    AccountPage.verifyAccountDeleted()
    takeScreenshot('20_conta_excluida_visivel')

    // 21. Clicar no botão 'Continue'
    AccountPage.clickContinue()
    takeScreenshot('21_teste_concluido_sucesso')
  })
})




