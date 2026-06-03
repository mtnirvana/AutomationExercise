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

    // 5. Passar o mouse sobre o primeiro produto e clicar em Add to cart
    ProductsPage.addToCartOverlay(0)
    takeScreenshot('05_clicou_adicionar_ao_carrinho_primeiro')

    // 7. Clicar no botão 'Continue Shopping'
    CheckoutPage.clickContinueShopping()
    takeScreenshot('07_clicou_continuar_comprando')

    // 8. Passar o mouse sobre o segundo produto e clicar em Add to cart
    ProductsPage.addToCartOverlay(1)
    takeScreenshot('08_clicou_adicionar_ao_carrinho_segundo')

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






