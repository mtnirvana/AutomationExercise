/**
 * TC_WEB_007 - Verificar página de casos de teste
 * @description Testa navegação para página de casos de teste
 * @tags @sucesso @TC_WEB_007
 * @author Rafael Barelli
 */

import { HomePage, TestCasesPage } from '../../pages'

describe('TC_WEB_007 - Verificar página de casos de teste', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve navegar para página de casos de teste', () => {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar no botão 'Test Cases'
    HomePage.clickTestCases()
    takeScreenshot('04_clicou_casos_de_teste')

    // 5. Verificar que o usuário foi redirecionado para a página de casos de teste com sucesso
    TestCasesPage.verifyPageTitle()
    takeScreenshot('05_pagina_casos_de_teste_visivel')
  })
})






