/**
 * TC_WEB_020 - Pesquisar produtos e verificar carrinho após login
 * @description Pesquisa produtos, adiciona ao carrinho e verifica após login
 * @tags @sucesso @TC_WEB_020
 * @author Rafael Barelli
 */

import { HomePage, ProductsPage, LoginPage, CheckoutPage } from '../../pages'
import productsData from '../../fixtures/products.json'

describe('TC_WEB_020 - Pesquisar produtos e verificar carrinho após login', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve pesquisar produtos e verificar carrinho após login', () => {
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

    // 7. Verificar que 'SEARCHED PRODUCTS' está visível
    ProductsPage.verifySearchedProducts()
    takeScreenshot('07_header_produtos_pesquisados_visivel')

    // 8. Verificar que todos os produtos relacionados à busca estão visíveis
    ProductsPage.verifyProductsList()
    takeScreenshot('08_produtos_pesquisados_visivel')

    // 9. Adicionar esses produtos ao carrinho
    ProductsPage.productsItems.first().scrollIntoView().trigger('mouseover')
    ProductsPage.productOverlay.first().find('.btn').click({ force: true })
    CheckoutPage.clickContinueShopping()
    takeScreenshot('09_produto_adicionado_ao_carrinho')

    // 10. Clicar no botão 'Cart' e verificar que os produtos estão visíveis no carrinho
    cy.get('body').type('{esc}')
    HomePage.cartLink.eq(0).should('be.visible').click({ force: true })
    takeScreenshot('10_clicou_carrinho')

    // 11. Validar que produtos estão no carrinho
    cy.url().should('include', '/view_cart')
    cy.get('h2').should('be.visible')
    takeScreenshot('11_produtos_no_carrinho')

    // 12. Clicar no botão 'Signup / Login'
    HomePage.signupLoginLink.first().should('be.visible').click({ force: true })
    takeScreenshot('12_clicou_signup_login')

    // 13. Inserir credenciais e clicar em 'Login'
    cy.get('@usersData').then((usersData) => {
      LoginPage.login(usersData.testUser.email, usersData.testUser.password)
    })
    takeScreenshot('13_clicou_login')

    // 14. Ir para a página do Carrinho
    HomePage.cartLink.eq(0).should('be.visible').click({ force: true })
    takeScreenshot('14_clicou_carrinho_novamente')

    // 15. Verificar que produtos estão visíveis no carrinho após login
    cy.url().should('include', '/view_cart')
    CheckoutPage.cartTableRows.should('have.length.gte', 1)
    takeScreenshot('15_produtos_visiveis_apos_login')
  })
})






