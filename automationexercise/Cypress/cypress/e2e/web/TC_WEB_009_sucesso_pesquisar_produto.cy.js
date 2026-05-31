/**
 * TC_WEB_009 - Pesquisar produto
 * @description Pesquisa produto e verifica resultados
 * @tags @sucesso @TC_WEB_009
 * @author Rafael Barelli
 */

import { HomePage, ProductsPage } from '../../pages'
import productsData from '../../fixtures/products.json'

describe('TC_WEB_009 - Pesquisar produto', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve pesquisar produto e verificar resultados', () => {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar no botão 'Products'
    HomePage.clickProducts()
    takeScreenshot('04_clicou_produtos')

    // 5. Verificar que o usuário foi redirecionado para a página ALL PRODUCTS com sucesso
    ProductsPage.verifyAllProductsPage()
    takeScreenshot('05_pagina_todos_produtos_visivel')

    // 6. Inserir nome do produto no campo de busca e clicar no botão de busca
    ProductsPage.searchProduct(productsData.searchTerms.winter)
    takeScreenshot('06_produto_pesquisado')

    // 7. Verificar 'SEARCHED PRODUCTS' está visível
    ProductsPage.verifySearchedProducts()
    takeScreenshot('07_header_produtos_pesquisados_visivel')

    // 8. Verificar todos os produtos relacionados à busca estão visíveis
    ProductsPage.verifyProductsList()
    takeScreenshot('08_produtos_pesquisados_visivel')

    // 9. Verificar que os resultados contêm o termo buscado
    ProductsPage.productsItems.first().should('contain.text', productsData.searchTerms.winter)
    takeScreenshot('09_produtos_contem_termo_busca')
  })
})






