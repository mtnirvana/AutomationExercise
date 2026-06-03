/**
 * HomePage - Page Object para a pagina inicial do automationexercise.com
 * @version 1.0.0
 * @author Rafael Barelli
 */
import uiData from '../fixtures/ui_texts.json'

export class HomePage {

  // ============================================
  // SELETORES
  // ============================================

  static get logo() {
    // img alt="Website for automation practice"
    return cy.get(`img[alt="${uiData.homepage.logoAlt}"]`)
  }

  static get signupLoginLink() {
    // [MEDIO] href da rota - estavel para esta aplicacao de pratica
    return cy.get('a[href="/login"]').first()
  }

  static get deleteAccountLink() {
    // [MEDIO] href da rota - estavel para esta aplicacao de pratica
    return cy.get('a[href="/delete_account"]')
  }

  static get logoutLink() {
    // [MEDIO] href da rota - estavel para esta aplicacao de pratica
    return cy.get('a[href="/logout"]')
  }

  static get contactUsLink() {
    // [MEDIO] href da rota - estavel para esta aplicacao de pratica
    return cy.get('a[href="/contact_us"]')
  }

  static get testCasesLink() {
    // [MEDIO] href da rota - estavel para esta aplicacao de pratica
    return cy.get('a[href="/test_cases"]').first()
  }

  static get productsLink() {
    // [MEDIO] href da rota - estavel para esta aplicacao de pratica
    return cy.get('a[href="/products"]')
  }

  static get cartLink() {
    // [MEDIO] href da rota - estavel para esta aplicacao de pratica
    return cy.get('a[href="/view_cart"]').first()
  }

  static get loggedInIndicator() {
    // [MEDIO] li contendo 'Logged in as' - sem data-qa disponivel
    return cy.contains('li', `${uiData.headers.loggedInAs}`)
  }

  static get subscribeEmail() {
    // id="#susbscribe_email"
    return cy.get('#susbscribe_email')
  }

  static get subscribeButton() {
    // id="#subscribe"
    return cy.get('#subscribe')
  }

  static get subscribeSuccess() {
    // id="#success-subscribe"
    return cy.get('#success-subscribe')
  }

  static get subscriptionWidget() {
    // classe .single-widget
    return cy.get('.single-widget')
  }

  static get subscriptionHeader() {
    // [MEDIO] header dentro do widget de subscription
    return cy.get('.single-widget h2')
  }

  static get scrollUpIcon() {
    // [MEDIO] i[class*="angle-up"] - seta de scroll up
    return cy.get('i[class*="angle-up"]')
  }

  // ============================================
  // METODOS
  // ============================================

  // Clica no link de Signup / Login
  static clickSignupLogin() {
    this.signupLoginLink.click()
  }

  // Verifica se o usuario esta logado com o nome correto na navbar
  // @param {string} username - Nome de usuario esperado
  static verifyLoggedInAs(username) {
    this.loggedInIndicator.should('contain.text', username)
  }

  // Clica no link de deletar conta
  static clickDeleteAccount() {
    this.deleteAccountLink.click()
  }

  // Clica no link de logout
  static clickLogout() {
    this.logoutLink.click()
  }

  // Clica no link de Contact Us
  static clickContactUs() {
    this.contactUsLink.click()
  }

  // Clica no link de Test Cases
  static clickTestCases() {
    this.testCasesLink.click()
  }

  // Clica no link de Products
  static clickProducts() {
    this.productsLink.click()
  }

  // Clica no link de Cart
  static clickCart() {
    this.cartLink.click()
  }

  // Verifica se o titulo da homepage (hero) esta visivel
  static verifyHomePageTitle() {
    cy.get('h2').contains(uiData.homepage.title).should('be.visible')
  }

}