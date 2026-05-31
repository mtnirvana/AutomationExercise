/**
 * TC_WEB_004 - Logout de usuário
 * @description Testa logout de usuário logado
 * @tags @sucesso @TC_WEB_004
 * @author Rafael Barelli
 */

import { HomePage, LoginPage } from '../../pages'

describe('TC_WEB_004 - Logout de usuário', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve fazer logout e navegar para página de login', function () {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar no botão 'Signup / Login'
    HomePage.clickSignupLogin()
    takeScreenshot('04_clicou_signup_login')

    // 5. Verificar que 'Login to your account' está visível
    LoginPage.verifyLoginHeader()
    takeScreenshot('05_header_login_visivel')

    // 6. Inserir email e senha corretos
    LoginPage.fillEmail(this.usersData.testUser.email)
    LoginPage.fillPassword(this.usersData.testUser.password)
    takeScreenshot('06_preencheu_email_senha')

    // 7. Clicar no botão 'Login'
    LoginPage.clickLogin()
    takeScreenshot('07_clicou_login')

    // 8. Verificar que 'Logged in as username' está visível
    HomePage.verifyLoggedInAs(this.usersData.testUser.name)
    takeScreenshot('08_logado_como_visivel')

    // 9. Clicar no botão 'Logout'
    HomePage.clickLogout()
    takeScreenshot('09_clicou_botao_logout')

    // 10. Verificar que usuário foi direcionado para página de login
    LoginPage.verifyLoginHeader()
    takeScreenshot('10_navegou_para_pagina_login')
  })
})




