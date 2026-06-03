/**
 * TC_WEB_013 - Verificar quantidade de produto no carrinho
 * @description Verifica quantidade de produto no carrinho
 * @tags @sucesso @TC_WEB_013
 * @author Rafael Barelli
 */

import { CheckoutPage, ProductsPage } from '../../pages'
import productsData from '../../fixtures/products.json'

describe('TC_WEB_013 - Verificar quantidade de produto no carrinho', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve verificar quantidade de produto no carrinho', () => {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar em 'View Product'
    ProductsPage.clickViewProduct()
    takeScreenshot('04_clicou_ver_produto')

    // 5. Verificar que os detalhes do produto foram abertos
    ProductsPage.productName.should('be.visible')
    takeScreenshot('05_detalhes_produto_aberto')

    // 6. Aumentar a quantidade para 4
    ProductsPage.quantityInput.clear().type(productsData.quantities.default)
    takeScreenshot('06_quantidade_aumentada')

    // 7. Clicar no botão 'Add to cart'
    CheckoutPage.clickAddToCart()
    takeScreenshot('07_clicou_adicionar_ao_carrinho')

    // 8. Clicar no botão 'View Cart'
    CheckoutPage.clickViewCart()
    takeScreenshot('08_clicou_ver_carrinho')

    // 9. Verificar que o produto está sendo exibido na página do carrinho com a quantidade exata
    CheckoutPage.cartQuantity.should('contain', productsData.quantities.default)
    takeScreenshot('09_quantidade_verificada_no_carrinho')
  })
})






