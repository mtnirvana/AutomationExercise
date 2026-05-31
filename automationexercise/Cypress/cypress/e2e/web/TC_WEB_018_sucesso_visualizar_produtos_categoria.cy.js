/**
 * TC_WEB_018 - Visualizar produtos por categoria
 * @description Visualiza produtos por categoria
 * @tags @sucesso @TC_WEB_018
 * @author Rafael Barelli
 */

import { HomePage, ProductsPage } from '../../pages'
import productsData from '../../fixtures/products.json'
import uiData from '../../fixtures/ui_texts.json'

describe('TC_WEB_018 - Visualizar produtos por categoria', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve visualizar produtos por categoria', () => {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Verificar que as categorias estão visíveis na barra lateral esquerda
    ProductsPage.leftSidebar.find('h2').contains(uiData.headers.categoryHeader).should('be.visible')
    ProductsPage.leftSidebar.should('be.visible')
    takeScreenshot('04_categorias_visiveis')

    // 5. Clicar na categoria 'Women'
    ProductsPage.clickCategory(productsData.categories.women)
    takeScreenshot('05_clicou_categoria_mulher')

    // 6. Clicar em qualquer link de categoria dentro de 'Women', por exemplo: Dress
    ProductsPage.clickSubcategory(productsData.categories.dress)
    takeScreenshot('06_clicou_categoria_vestido')

    // 7. Verificar que a página da categoria é exibida e confirmar o texto 'Women - Dress Products'
    ProductsPage.verifyCategoryPageHeader(productsData.categories.women, productsData.categories.dress.trim())
    takeScreenshot('07_pagina_categoria_exibida')

    // 8. Na barra lateral esquerda, clicar em qualquer link de subcategoria da categoria 'Men'
    ProductsPage.clickCategory(productsData.categories.men)
    takeScreenshot('08_clicou_categoria_homem')

    // 9. Clicar em 'Tshirts' na subcategoria de Men
    ProductsPage.clickSubcategory(productsData.categories.tshirts)
    takeScreenshot('09_clicou_categoria_camisetas')

    // 10. Verificar que a página 'Men - Tshirts Products' é exibida
    ProductsPage.verifyCategoryPageHeader(productsData.categories.men, productsData.categories.tshirts.trim())
    takeScreenshot('10_pagina_categoria_homem_exibida')
  })
})






