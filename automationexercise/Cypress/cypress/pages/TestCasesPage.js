/**
 * TestCasesPage - Page Object para a pagina de casos de teste
 * @version 1.0.0
 * @author Rafael Barelli
 */
import uiData from '../fixtures/ui_texts.json'

export class TestCasesPage {

  // ============================================
  // SELETORES
  // ============================================

  static get pageTitle() {
    // tag h2 + texto visivel - confirma que chegou na tela certa
    return cy.get('h2').contains(uiData.headers.testCases)
  }

  // ============================================
  // METODOS
  // ============================================

  // Verifica se o titulo da pagina de Test Cases esta visivel
  static verifyPageTitle() {
    this.pageTitle.should('be.visible')
  }

}