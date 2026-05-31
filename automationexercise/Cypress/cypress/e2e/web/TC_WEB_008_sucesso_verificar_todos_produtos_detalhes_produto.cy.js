/**
 * TC_WEB_008 - Verificar todos os produtos e página de detalhes do produto
 * @description Verifica a página de todos os produtos e detalhes do produto
 * @tags @sucesso @TC_WEB_008
 * @author Rafael Barelli
 */

import { HomePage, ProductsPage } from '../../pages'

describe('TC_WEB_008 - Verificar todos os produtos e página de detalhes do produto', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve verificar todos os produtos e página de detalhes', () => {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar no botão 'Products'
    HomePage.clickProducts()
    takeScreenshot('04_clicou_produtos')

    // 5. Verificar que o usuário foi redirecionado para a página ALL PRODUCTS com sucesso
    ProductsPage.verifyAllProductsPage()
    takeScreenshot('05_pagina_todos_produtos_visivel')

    // 6. A lista de produtos está visível
    ProductsPage.verifyProductsList()
    takeScreenshot('06_lista_de_produtos_visivel')

    // 7. Clicar em 'View Product' do primeiro produto
    ProductsPage.clickViewProduct()
    takeScreenshot('07_clicou_ver_produto')

    // 8. O usuário acessou a página de detalhes do produto
    ProductsPage.verifyProductDetailPage()
    takeScreenshot('08_pagina_detalhes_produto_visivel')

    // 9. Verificar que os detalhes do produto estão visíveis: nome, categoria, preço, disponibilidade, condição, marca
    ProductsPage.verifyProductDetails()
    takeScreenshot('09_detalhes_produto_verificados')
  })
})




