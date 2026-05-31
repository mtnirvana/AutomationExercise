/**
 * TC_WEB_005 - Registrar usuário com email existente
 * @description Testa registro com email já cadastrado
 * @tags @erro @TC_WEB_005
 * @author Rafael Barelli
 */

import { HomePage, LoginPage } from '../../pages'
import users from '../../fixtures/users.json'

describe('TC_WEB_005 - Registrar usuário com email existente', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve mostrar erro ao registrar com email existente', () => {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar no botão 'Signup / Login'
    HomePage.clickSignupLogin()
    takeScreenshot('04_clicou_signup_login')

    // 5. Verificar 'New User Signup!' está visível
    LoginPage.verifyNewUserSignupHeader()
    takeScreenshot('05_novo_usuario_signup_visivel')

    // 6. Inserir nome e endereço de email já cadastrado
    LoginPage.nameInput.type(users.existingEmail.name)
    LoginPage.emailInput.type(users.existingEmail.email)
    takeScreenshot('06_preencheu_email_existente')

    // 7. Clicar no botão 'Signup'
    LoginPage.clickSignup()
    takeScreenshot('07_clicou_signup')

    // 8. Verificar erro 'Email Address already exist!' está visível
    LoginPage.verifyEmailExistError()
    takeScreenshot('08_verificacao_concluida')
  })
})






