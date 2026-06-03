/**
 * TC_WEB_011 - Verificar assinatura na página do carrinho
 * @description Verifica assinatura de newsletter na página do carrinho
 * @tags @sucesso @TC_WEB_011
 * @author Rafael Barelli
 */

import { HomePage } from '../../pages'
import { UserFactory } from '../../data/UserFactory'
import uiData from '../../fixtures/ui_texts.json'

describe('TC_WEB_011 - Verificar assinatura na página do carrinho', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve verificar assinatura de newsletter na página do carrinho', () => {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar no botão 'Cart'
    HomePage.clickCart()
    takeScreenshot('04_clicou_carrinho')

    // 5. Rolar para o rodapé
    cy.scrollTo('bottom', { ensureScrollable: false })
    takeScreenshot('05_rolou_para_rodape')

    // 6. Verificar texto 'SUBSCRIPTION'
    HomePage.subscriptionWidget.should('be.visible').and('contain.text', uiData.subscription.header)
    takeScreenshot('06_assinatura_visivel')

    // 7. Inserir endereço de email no campo de newsletter
    const userData = UserFactory.generate()
    HomePage.subscribeEmail.type(userData.email)
    takeScreenshot('07_email_inserido')

    // 8. Clicar no botão de inscrição
    HomePage.subscribeButton.click()
    takeScreenshot('08_clicou_botao_inscricao')

    // 9. Verificar mensagem de sucesso 'You have been successfully subscribed!' está visível
    HomePage.subscribeSuccess.should('be.visible').and('contain.text', uiData.subscription.successMessage)
    takeScreenshot('09_mensagem_sucesso_inscricao')
  })
})


