/**
 * TC_WEB_003 - Login de usuário com email e senha incorretos
 * @description Testa login com email e senha incorretos
 * @tags @erro @TC_WEB_003
 * @author Rafael Barelli
 */

import { HomePage, LoginPage } from '../../pages'
import users from '../../fixtures/users.json'

describe('TC_WEB_003 - Login de usuário com email e senha incorretos', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve mostrar erro com credenciais incorretas', () => {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar no botão 'Signup / Login'
    HomePage.clickSignupLogin()
    takeScreenshot('04_clicou_signup_login')

    // 5. Verificar que 'Login to your account' está visível
    LoginPage.verifyLoginHeader()
    takeScreenshot('05_header_login_visivel')

    // 6. Inserir endereço de email e senha incorretos
    LoginPage.fillEmail(users.invalidUser.email)
    LoginPage.fillPassword(users.invalidUser.password)
    takeScreenshot('06_preencheu_credenciais_incorretas')

    // 7. Clicar no botão 'Login'
    LoginPage.clickLogin()
    takeScreenshot('07_clicou_login')

    // 8. Verificar que erro 'Your email or password is incorrect!' está visível
    LoginPage.verifyLoginErrorMessage()
    takeScreenshot('08_mensagem_erro_visivel')
  })
})


