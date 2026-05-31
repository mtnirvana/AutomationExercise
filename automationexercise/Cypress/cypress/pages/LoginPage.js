/**
 * LoginPage - Page Object para funcionalidade de login/signup
 * @version 1.0.0
 * @author Rafael Barelli
 */
import uiData from '../fixtures/ui_texts.json'

export class LoginPage {

  // ============================================
  // SELETORES
  // ============================================

  static get newUserSignupHeader() {
    // tag h2 + texto visivel - confirma que chegou na tela certa
    return cy.get('h2').contains(uiData.headers.newUserSignup)
  }

  static get loginToYourAccountHeader() {
    // tag h2 + texto visivel - confirma que chegou na tela certa
    return cy.get('h2').contains(uiData.headers.loginToAccount)
  }

  static get nameInput() {
    // data-qa="signup-name"
    return cy.get('input[data-qa="signup-name"]')
  }

  static get emailInput() {
    // data-qa="signup-email"
    return cy.get('input[data-qa="signup-email"]')
  }

  static get signupButton() {
    // data-qa="signup-button"
    return cy.get('button[data-qa="signup-button"]')
  }

  static get loginEmail() {
    // data-qa="login-email"
    return cy.get('input[data-qa="login-email"]')
  }

  static get loginPassword() {
    // data-qa="login-password"
    return cy.get('input[data-qa="login-password"]')
  }

  static get loginButton() {
    // data-qa="login-button"
    return cy.get('button[data-qa="login-button"]')
  }

  // ============================================
  // METODOS
  // ============================================

  // Verifica se o cabecalho "New User Signup!" esta visivel
  static verifyNewUserSignupHeader() {
    this.newUserSignupHeader.should('be.visible')
  }

  // Verifica se o cabecalho "Login to your account" esta visivel
  static verifyLoginHeader() {
    this.loginToYourAccountHeader.should('be.visible')
  }

  // Clica no botao de Signup
  static clickSignup() {
    this.signupButton.click()
  }

  // Realiza login com email e senha
  // @param {string} email - Endereco de email do usuario
  // @param {string} password - Senha do usuario
  static login(email, password) {
    this.loginEmail.type(email)
    this.loginPassword.type(password)
    this.loginButton.click()
  }

  // Preenche apenas o email (sem clicar em login)
  // @param {string} email - Endereco de email do usuario
  static fillEmail(email) {
    this.loginEmail.type(email)
  }

  // Preenche apenas a senha (sem clicar em login)
  // @param {string} password - Senha do usuario
  static fillPassword(password) {
    this.loginPassword.type(password)
  }

  // Clica no botao de Login (passo separado para rastreabilidade)
  static clickLogin() {
    this.loginButton.click()
  }

  // Verifica se a mensagem de erro de login esta visivel
  static verifyLoginErrorMessage() {
    cy.contains(uiData.errors.login).should('be.visible')
  }

  // Verifica se a mensagem de email ja existente esta visivel
  static verifyEmailExistError() {
    cy.contains(uiData.errors.emailExist).should('be.visible')
  }
}