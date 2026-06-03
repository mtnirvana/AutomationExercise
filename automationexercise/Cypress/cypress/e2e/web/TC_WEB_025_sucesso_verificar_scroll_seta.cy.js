/**
 * TC_WEB_025 - Verificar scroll up usando botão de seta e funcionalidade scroll down
 * @description Verifica scroll up com botão de seta e scroll down
 * @tags @sucesso @TC_WEB_025
 * @author Rafael Barelli
 */

import { HomePage } from '../../pages'
import uiData from '../../fixtures/ui_texts.json'

describe('TC_WEB_025 - Verificar scroll up usando botão de seta e funcionalidade scroll down', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve verificar scroll up com botão de seta e scroll down', () => {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Rolar a página para baixo
    cy.scrollTo('bottom')
    takeScreenshot('04_rolou_para_baixo')

    // 5. Verificar que 'SUBSCRIPTION' está visível
    HomePage.subscriptionWidget.should('be.visible')
    HomePage.subscriptionHeader.should('contain.text', uiData.subscription.header)
    takeScreenshot('05_assinatura_visivel')

    // 6. Clicar na seta no lado direito inferior para mover para cima
    HomePage.scrollUpIcon.should('be.visible').click()
    takeScreenshot('06_clicou_seta_para_cima')

    // 7. Verificar que a página rolou para cima e o texto 'Full-Fledged practice website for Automation Engineers' está visível na tela
    HomePage.verifyHomePageTitle()
    takeScreenshot('07_texto_visivel_no_topo')
  })
})


