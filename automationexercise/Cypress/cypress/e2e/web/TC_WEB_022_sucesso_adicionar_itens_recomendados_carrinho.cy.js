/**
 * TC_WEB_022 - Adicionar ao carrinho itens recomendados
 * @description Adiciona ao carrinho itens recomendados
 * @tags @sucesso @TC_WEB_022
 * @author Rafael Barelli
 */

import { HomePage, ProductsPage, CheckoutPage } from '../../pages'

describe('TC_WEB_022 - Adicionar ao carrinho itens recomendados', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve adicionar ao carrinho itens recomendados', () => {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Rolar para o final da página
    cy.scrollTo('bottom')
    takeScreenshot('04_rolou_para_baixo')

    // 5. Verificar que 'RECOMMENDED ITEMS' está visível
    ProductsPage.recommendedItems.should('be.visible')
    ProductsPage.recommendedProductInfo.should('be.visible')
    takeScreenshot('05_itens_recomendados_visivel')

    // 6. Clicar em 'Add To Cart' no produto recomendado
    ProductsPage.recommendedAddToCart.first().click({ force: true })
    takeScreenshot('06_clicou_adicionar_ao_carrinho')

    // 7. Clicar no botão 'View Cart'
    CheckoutPage.clickViewCart()
    takeScreenshot('07_clicou_ver_carrinho')

    // 8. Verificar que o produto está exibido na página do carrinho
    HomePage.cartLink.should('be.visible')
    CheckoutPage.cartDescription.should('be.visible')
    takeScreenshot('08_produto_no_carrinho')
  })
})






