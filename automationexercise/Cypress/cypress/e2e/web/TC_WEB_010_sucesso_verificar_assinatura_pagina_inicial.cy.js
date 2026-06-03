/**
 * TC_WEB_010 - Verificar assinatura na página inicial
 * @description Verifica assinatura de newsletter na página inicial
 * @tags @sucesso @TC_WEB_010
 * @author Rafael Barelli
 */

import { HomePage } from '../../pages'
import { UserFactory } from '../../data/UserFactory'
import uiData from '../../fixtures/ui_texts.json'

describe('TC_WEB_010 - Verificar assinatura na página inicial', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve verificar assinatura de newsletter na home page', () => {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Rolar para o rodapé
    cy.scrollTo('bottom')
    takeScreenshot('04_rolou_para_rodape')

    // 5. Verificar texto 'SUBSCRIPTION'
    HomePage.subscriptionWidget.should('be.visible').and('contain.text', uiData.subscription.header)
    takeScreenshot('05_assinatura_visivel')

    // 6. Inserir endereço de email no campo de newsletter
    const userData = UserFactory.generate()
    HomePage.subscribeEmail.type(userData.email)
    takeScreenshot('06_email_inserido')

    // 7. Clicar no botão de inscrição
    HomePage.subscribeButton.click()
    takeScreenshot('07_clicou_botao_inscricao')

    // 8. Verificar mensagem de sucesso 'You have been successfully subscribed!' está visível
    HomePage.subscribeSuccess.should('be.visible').and('contain.text', uiData.subscription.successMessage)
    takeScreenshot('08_mensagem_sucesso_inscricao')
  })
})


