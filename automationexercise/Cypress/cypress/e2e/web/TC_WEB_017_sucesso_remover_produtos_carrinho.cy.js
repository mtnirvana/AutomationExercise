/**
 * TC_WEB_017 - Remover produtos do carrinho
 * @description Remove produtos do carrinho
 * @tags @sucesso @TC_WEB_017
 * @author Rafael Barelli
 */

import { HomePage, ProductsPage, CheckoutPage } from '../../pages'
import productsData from '../../fixtures/products.json'
import uiData from '../../fixtures/ui_texts.json'

describe('TC_WEB_017 - Remover produtos do carrinho', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve remover produtos do carrinho', () => {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar em "Products"
    HomePage.clickProducts()
    takeScreenshot('04_clicou_produtos')

    // 5. Clicar em "View Product" do primeiro produto
    cy.contains('.product-image-wrapper', productsData.products.firstProd).scrollIntoView().find('a[href*="/product_details/"]').first().click()
    takeScreenshot('05_detalhes_produto')

    // 6. Alterar quantidade para 4
    ProductsPage.quantityInput.clear().type(productsData.quantities.default)
    takeScreenshot('06_quantidade_alterada')

    // 7. Clicar em "Add to Cart"
    CheckoutPage.addToCartButton.scrollIntoView().click({ force: true })
    takeScreenshot('07_adicionou_ao_carrinho')

    // 8. Validar que mensagem 'Added!' está visível
    cy.get('body').should('contain.text', uiData.checkout.addedMessage)
    takeScreenshot('08_mensagem_added')

    // 9. Clicar em "View Cart"
    CheckoutPage.viewCartLink.should('be.visible').click({ force: true })
    takeScreenshot('09_ver_carrinho')

    // 10. Validar página do carrinho
    cy.url().should('include', '/view_cart')
    cy.get('h2').should('be.visible')
    takeScreenshot('10_pagina_carrinho_exibida')

    // 11. Clicar no botão 'X' do produto
    CheckoutPage.cartDeleteButton.first().should('be.visible').click({ force: true })
    takeScreenshot('11_clicou_botao_x')

    // 12. Validar que o produto foi removido (carrinho vazio)
    CheckoutPage.cartTableRows.should('not.exist')
    takeScreenshot('12_produto_removido_do_carrinho')
  })
})






