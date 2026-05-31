/**
 * TC_WEB_021 - Adicionar avaliação em produto
 * @description Adiciona avaliação em produto
 * @tags @sucesso @TC_WEB_021
 * @author Rafael Barelli
 */

import { HomePage, ProductsPage } from '../../pages'
import { UserFactory } from '../../data/userFactory'
import contactData from '../../fixtures/contact.json'

describe('TC_WEB_021 - Adicionar avaliação em produto', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve adicionar avaliação em produto', () => {
    const userData = UserFactory.generate()

    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar no botão 'Products'
    HomePage.clickProducts()
    takeScreenshot('04_clicou_produtos')

    // 5. Verificar que o usuário navegou para a página ALL PRODUCTS com sucesso
    ProductsPage.verifyAllProductsPage()
    takeScreenshot('05_pagina_todos_produtos_visivel')

    // 6. Clicar no botão 'View Product'
    ProductsPage.clickViewProduct()
    takeScreenshot('06_clicou_ver_produto')

    // 7. Verificar que 'Write Your Review' está visível
    ProductsPage.verifyReviewSectionVisible()
    takeScreenshot('07_escreva_sua_avaliacao_visivel')

    // 8. Inserir nome, email e avaliação
    ProductsPage.fillReview(userData.username, userData.email, contactData.review.text)
    takeScreenshot('08_avaliacao_inserida')

    // 9. Clicar no botão 'Submit'
    ProductsPage.submitReview()
    takeScreenshot('09_clicou_enviar')

    // 10. Verificar mensagem de sucesso 'Thank you for your review.'
    ProductsPage.verifyReviewSuccess()
    cy.scrollTo('center')
    takeScreenshot('10_mensagem_sucesso_visivel')
  })
})
