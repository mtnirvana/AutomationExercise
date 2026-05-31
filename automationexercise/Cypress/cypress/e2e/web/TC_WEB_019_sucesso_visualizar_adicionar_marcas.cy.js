/**
 * TC_WEB_019 - Visualizar e adicionar ao carrinho produtos de marcas
 * @description Visualiza e adiciona ao carrinho produtos de marcas
 * @tags @sucesso @TC_WEB_019
 * @author Rafael Barelli
 */

import { HomePage, ProductsPage } from '../../pages'
import productsData from '../../fixtures/products.json'

describe('TC_WEB_019 - Visualizar e adicionar ao carrinho produtos de marcas', () => {

  const takeScreenshot = (stepName) => {
    cy.captura(`${stepName}`)
  }

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  it('deve visualizar e adicionar produtos de marcas', () => {
    // 1. Abrir navegador (via beforeEach cy.visit('/'))
    // 2. Navegar para url 'http://automationexercise.com' (via beforeEach)
    // 3. Verificar que página inicial está visível (via beforeEach)
    // 4. Clicar no botão 'Products'
    HomePage.clickProducts()
    takeScreenshot('04_clicou_produtos')

    // 5. Verificar que as Marcas estão visíveis na barra lateral esquerda
    ProductsPage.verifyBrandsHeaderVisible()
    ProductsPage.brandsContainer.should('be.visible')
    takeScreenshot('05_marcas_visiveis')

    // 6. Clicar em qualquer nome de marca
    ProductsPage.clickBrand(productsData.brands.polo)
    takeScreenshot('06_clicou_marca_polo')

    // 7. Verificar que o usuário foi redirecionado para a página da marca e os produtos da marca são exibidos
    ProductsPage.verifyBrandPageHeader(productsData.brands.polo)
    ProductsPage.productsItems.should('be.visible')
    takeScreenshot('07_produtos_da_marca_exibidos')

    // 8. Na barra lateral esquerda, clicar em qualquer outro link de marca
    ProductsPage.clickBrand(productsData.brands["h&m"])
    takeScreenshot('08_clicou_marca_hm')

    // 9. Verificar que o usuário foi redirecionado para essa página de marca e pode ver os produtos
    ProductsPage.verifyBrandPageHeader(productsData.brands["h&m"])
    ProductsPage.productsItems.should('be.visible')
    takeScreenshot('09_outros_produtos_da_marca_exibidos')
  })
})






