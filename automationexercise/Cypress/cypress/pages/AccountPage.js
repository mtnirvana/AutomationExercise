/**
 * AccountPage - Page Object para paginas pos-registro e exclusao de conta
 * @version 1.0.0
 * @author Rafael Barelli
 */
import uiData from '../fixtures/ui_texts.json'

export class AccountPage {

  // ============================================
  // SELETORES
  // ============================================

  static get accountCreatedHeader() {
    // tag h2 + texto - verifica o resultado real da acao de criar conta
    return cy.get('h2').contains(uiData.headers.accountCreated)
  }

  static get accountDeletedHeader() {
    // tag h2 + texto - verifica o resultado real da acao de excluir conta
    return cy.get('h2').contains(uiData.headers.accountDeleted)
  }

  static get continueButton() {
    // data-qa="continue-button"
    return cy.get('a[data-qa="continue-button"]')
  }

  // ============================================
  // METODOS
  // ============================================

  // Verifica se a mensagem de conta criada esta visivel
  static verifyAccountCreated() {
    this.accountCreatedHeader.should('be.visible')
  }

  // Verifica se a mensagem de conta excluida esta visivel
  static verifyAccountDeleted() {
    this.accountDeletedHeader.should('be.visible')
  }

  // Clica no botao de continuar
  static clickContinue() {
    this.continueButton.click()
  }
}