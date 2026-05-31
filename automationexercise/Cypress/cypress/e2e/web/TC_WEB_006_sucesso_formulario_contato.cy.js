/**
 * TC_WEB_006 - Formulário de contato
 * @description Testa envio do formulário de contato
 * @tags @sucesso @TC_WEB_006
 * @author Rafael Barelli
 */

import { HomePage, ContactUsPage } from '../../pages'
import { UserFactory } from '../../data/userFactory'
import contactData from '../../fixtures/contact.json'
import uiData from '../../fixtures/ui_texts.json'

describe('TC_WEB_006 - Formulário de contato', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve enviar formulário de contato com sucesso', () => {
    const testData = UserFactory.generate()

    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar no botão 'Contact Us'
    HomePage.clickContactUs()
    takeScreenshot('04_clicou_contate-nos')

    // 5. Verificar 'GET IN TOUCH' está visível
    ContactUsPage.verifyGetInTouchHeader()
    takeScreenshot('05_entrar_em_contato_visivel')

    // 6. Inserir nome, email, assunto e mensagem
    ContactUsPage.fillContactForm(
      testData.username,
      testData.email,
      contactData.contactForm.subject,
      contactData.contactForm.message
    )
    takeScreenshot('06_formulario_contato_preenchido')

    // 7. Fazer upload de arquivo
    cy.writeFile(uiData.filenames.testFile, contactData.fixtures.testFileContent)
    ContactUsPage.uploadFile(uiData.filenames.testFile)
    takeScreenshot('07_arquivo_enviado')

    // 8. Clicar no botão 'Submit'
    ContactUsPage.clickSubmit()
    takeScreenshot('08_clicou_enviar')

    // 9. Clicar no botão OK
    cy.on('window:confirm', () => true)
    takeScreenshot('09_confirmou_envio')

    // 10. Verificar mensagem de sucesso 'Success! Your details have been submitted successfully.' está visível
    ContactUsPage.verifySuccessMessage()
    takeScreenshot('10_mensagem_sucesso_visivel')

    // 11. Clicar no botão 'Home' e verificar que redirecionou para a página inicial com sucesso
    ContactUsPage.clickHome()
    takeScreenshot('11_voltou_para_inicio')
  })
})






