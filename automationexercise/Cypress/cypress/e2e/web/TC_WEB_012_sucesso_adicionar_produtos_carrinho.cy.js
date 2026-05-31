/**
 * TC_WEB_012 - Adicionar produtos ao carrinho
 * @description Adiciona produtos ao carrinho
 * @tags @sucesso @TC_WEB_012
 * @author Rafael Barelli
 */

import { HomePage, CheckoutPage, ProductsPage } from '../../pages'

describe('TC_WEB_012 - Adicionar produtos ao carrinho', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve adicionar produtos ao carrinho', () => {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar no botão 'Products'
    HomePage.clickProducts()
    takeScreenshot('04_clicou_produtos')

    // 5. Passar o mouse sobre o primeiro produto
    ProductsPage.productsItems.first().scrollIntoView().trigger('mouseover')
    takeScreenshot('05_passou_mouse_primeiro_produto')

    // 6. Clicar em 'Add to cart' no primeiro produto
    ProductsPage.productOverlay.first().find('.btn').click({ force: true })
    takeScreenshot('06_clicou_adicionar_ao_carrinho_primeiro')

    // 7. Clicar no botão 'Continue Shopping'
    CheckoutPage.clickContinueShopping()
    takeScreenshot('07_clicou_continuar_comprando')

    // 8. Passar o mouse sobre o segundo produto
    ProductsPage.productsItems.eq(1).scrollIntoView().trigger('mouseover')
    takeScreenshot('08_passou_mouse_segundo_produto')

    // 9. Clicar em 'Add to cart' no segundo produto
    ProductsPage.productOverlay.eq(1).find('.btn').click({ force: true })
    takeScreenshot('09_clicou_adicionar_ao_carrinho_segundo')

    // 10. Clicar no botão 'View Cart'
    CheckoutPage.clickViewCart()
    takeScreenshot('10_clicou_ver_carrinho')

    // 11. Verificar que ambos os produtos foram adicionados ao Carrinho
    CheckoutPage.cartTableRows.should('have.length', 2)
    takeScreenshot('11_produtos_no_carrinho')

    // 12. Verificar preços, quantidade e preço total
    CheckoutPage.cartTableRows.each(() => {
      CheckoutPage.cartPrice.should('be.visible')
      CheckoutPage.cartQuantity.should('be.visible')
      CheckoutPage.cartTotal.should('be.visible')
    })
    takeScreenshot('12_precos_quantidade_total_verificados')
  })
})






