/**
 * ContactUsPage - Page Object para a pagina de contato do site
 * @version 1.0.0
 * @author Rafael Barelli
 */
import uiData from '../fixtures/ui_texts.json'

export class ContactUsPage {

  // ============================================
  // SELETORES
  // ============================================

  static get getInTouchHeader() {
    // h2 + texto "Get In Touch"
    return cy.get('h2').contains(uiData.headers.getInTouch)
  }

  static get nameInput() {
    // data-qa="name"
    return cy.get('input[data-qa="name"]')
  }

  static get emailInput() {
    // data-qa="email"
    return cy.get('input[data-qa="email"]')
  }

  static get subjectInput() {
    // data-qa="subject"
    return cy.get('input[data-qa="subject"]')
  }

  static get messageInput() {
    // data-qa="message"
    return cy.get('textarea[data-qa="message"]')
  }

  static get fileInput() {
    // [MEDIO] unico input[type="file"] na pagina - sem data-qa disponivel
    return cy.get('input[type="file"]')
  }

  static get submitButton() {
    // data-qa="submit-button"
    return cy.get('input[data-qa="submit-button"]')
  }

  static get homeButton() {
    // [MEDIO] a.btn-success[href="/"] - sem data-qa, unico apos envio do formulario
    return cy.get('a.btn-success[href="/"]')
  }

  static get successMessage() {
    // status OK div.status.alert.alert-success
    return cy.get('.status.alert.alert-success')
  }

  // ============================================

  // METODOS
  // ============================================

  // Verifica se o cabecalho "Get In Touch" esta visivel
  static verifyGetInTouchHeader() {
    this.getInTouchHeader.should('be.visible')
  }

  // Verifica se a mensagem de sucesso esta visivel após o envio do formulario
  static verifySuccessMessage() {
    this.successMessage.should('be.visible').and('contain.text', uiData.contact.successMessage)
  }

  // Preenche todos os campos do formulario de contato
  // @param {string} name - Nome do contato
  // @param {string} email - Email do contato
  // @param {string} subject - Assunto da mensagem
  // @param {string} message - Conteudo da mensagem
  static fillContactForm(name, email, subject, message) {
    this.nameInput.type(name)
    this.emailInput.type(email)
    this.subjectInput.type(subject)
    this.messageInput.type(message)
  }

  // Faz o upload de um arquivo para o formulario
  // @param {string} filePath - Caminho do arquivo para upload
  static uploadFile(filePath) {
    this.fileInput.selectFile(filePath)
  }

  // Clica no botao de enviar formulario
  static clickSubmit() {
    this.submitButton.click()
  }

  // Clica no botao de home apos a submissao com sucesso
  static clickHome() {
    this.homeButton.click()
  }
}