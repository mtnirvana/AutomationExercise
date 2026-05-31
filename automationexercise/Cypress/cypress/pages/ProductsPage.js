/**
 * ProductsPage - Page Object para a pagina de produtos
 * @version 1.0.0
 * @author Rafael Barelli
 */
import uiData from '../fixtures/ui_texts.json'

export class ProductsPage {

  // ============================================
  // SELETORES - Lista de produtos e busca
  // ============================================

  static get productsHeader() {
    // tag h2 + texto visivel - confirma que chegou na tela certa
    return cy.get('h2').contains(uiData.headers.allProducts)
  }

  static get productsList() {
    // [MEDIO] container principal da lista - classe funcional, sem data-qa disponivel
    return cy.get('.features_items')
  }

  static get productsItems() {
    // [MEDIO] classe dos cards de produto - funcional e estavel
    return cy.get('.single-products', { timeout: 10000 })
  }

  static get viewProductLinks() {
    // [MEDIO] href parcial dentro do container .choose - sem data-qa disponivel
    return cy.get('.choose a[href*="/product_details/"]')
  }

  static get searchInput() {
    // id="#search_product"
    return cy.get('#search_product')
  }

  static get searchButton() {
    // id="#submit_search"
    return cy.get('#submit_search')
  }

  static get searchedProductsHeader() {
    // tag h2 + texto - confirma resultado da busca
    return cy.get('h2').contains(uiData.headers.searchedProducts)
  }

  // ============================================
  // SELETORES - Pagina de detalhe do produto
  // ============================================

  static get productName() {
    // [MEDIO] .product-information h2 - sem data-qa, estrutura semantica estavel
    return cy.get('.product-information h2')
  }

  static get productCategory() {
    // [MEDIO] texto "Category" dentro do container de produto
    return cy.get('.product-information p').contains(uiData.productInfo.category)
  }

  static get productPrice() {
    // [MEDIO] span aninhado no container de produto - sem data-qa disponivel
    return cy.get('.product-information span span')
  }

  static get productAvailability() {
    // [MEDIO] texto "Availability" dentro do container de produto
    return cy.get('.product-information p').contains(uiData.productInfo.availability)
  }

  static get productCondition() {
    // [MEDIO] texto "Condition" dentro do container de produto
    return cy.get('.product-information p').contains(uiData.productInfo.condition)
  }

  static get productBrand() {
    // [MEDIO] texto "Brand" dentro do container de produto
    return cy.get('.product-information p').contains(uiData.productInfo.brand)
  }

  static get quantityInput() {
    // id="#quantity"
    return cy.get('#quantity')
  }

  // ============================================
  // SELETORES - Overlay, Categorias e Marcas
  // ============================================

  static get productOverlay() {
    // [MEDIO] classe do overlay ao passar mouse
    return cy.get('.product-overlay')
  }

  static get leftSidebar() {
    // [MEDIO] barra lateral de categorias
    return cy.get('.left-sidebar')
  }

  static get categoryPanel() {
    // [MEDIO] header de cada categoria
    return cy.get('.panel-heading')
  }

  static get subcategoryLinks() {
    // [MEDIO] links de subcategorias
    return cy.get('.panel-body a')
  }

  static get brandsContainer() {
    // [MEDIO] container de marcas
    return cy.get('.brands-name')
  }

  static get brandLinks() {
    // [MEDIO] links de marcas
    return cy.get('.brands-name a')
  }

  static get recommendedItems() {
    // [MEDIO] secao de itens recomendados
    return cy.get('.recommended_items')
  }

  static get recommendedAddToCart() {
    // [MEDIO] botao add to cart nos recomendados
    return cy.get('.recommended_items .btn-default.add-to-cart')
  }

  // ============================================
  // SELETORES - Review / Avaliação
  // ============================================

  static get reviewLink() {
    // [MEDIO] link da secao de review na pagina de detalhes do produto
    return cy.get('a[href="#reviews"]')
  }

  static get reviewNameInput() {
    // id="#name"
    return cy.get('#name')
  }

  static get reviewEmailInput() {
    // id="#email"
    return cy.get('#email')
  }

  static get reviewTextInput() {
    // id="#review"
    return cy.get('#review')
  }

  static get reviewSubmitButton() {
    // [MEDIO] botao submit no formulario de review
    return cy.get('button').contains('Submit')
  }

  static get reviewSuccessMessage() {
    // [MEDIO] span com mensagem de sucesso do review
    return cy.contains('span', uiData.review.successMessage)
  }

  // ============================================
  // METODOS - Review / Avaliação
  // ============================================

  // Verifica se a secao "Write Your Review" esta visivel
  static verifyReviewSectionVisible() {
    this.reviewLink.should('be.visible')
  }

  // Preenche o formulario de review com nome, email e texto
  // @param {string} name - Nome do avaliador
  // @param {string} email - Email do avaliador
  // @param {string} text - Texto da avaliacao
  static fillReview(name, email, text) {
    this.reviewNameInput.type(name)
    this.reviewEmailInput.type(email)
    this.reviewTextInput.type(text)
  }

  // Clica no botao de submit do review
  static submitReview() {
    this.reviewSubmitButton.click()
  }

  // Verifica se a mensagem de sucesso do review esta visivel
  static verifyReviewSuccess() {
    this.reviewSuccessMessage.should('be.visible')
  }

  // ============================================
  // METODOS - Categorias e Marcas
  // ============================================

  // Clica em uma categoria na barra lateral
  // @param {string} categoryName - Nome da categoria (ex: 'Women')
  static clickCategory(categoryName) {
    this.categoryPanel.contains(categoryName).click()
  }

  // Clica em uma subcategoria
  // @param {string} subcategoryName - Nome da subcategoria (ex: 'Dress')
  static clickSubcategory(subcategoryName) {
    this.subcategoryLinks.contains(subcategoryName).click()
  }

  // Verifica se o header da pagina de categoria esta visivel
  // @param {string} category - Nome da categoria
  // @param {string} subcategory - Nome da subcategoria
  static verifyCategoryPageHeader(category, subcategory) {
    cy.get('h2').contains(`${category} - ${subcategory} ${uiData.headers.productsSuffix}`).should('be.visible')
  }

  // Verifica se o header de marcas esta visivel na barra lateral
  static verifyBrandsHeaderVisible() {
    cy.get('h2').contains(uiData.headers.brandsHeader).should('be.visible')
  }

  // Verifica se o header da pagina de marca esta visivel
  // @param {string} brandName - Nome da marca
  static verifyBrandPageHeader(brandName) {
    this.productsList.should('contain', `${uiData.headers.brandPrefix}${brandName} ${uiData.headers.productsSuffix}`).should('be.visible')
  }

  // Clica em uma marca na barra lateral
  // @param {string} brandName - Nome da marca
  static clickBrand(brandName) {
    this.brandLinks.contains(brandName).click()
  }

  // ============================================
  // METODOS - Lista e Busca
  // ============================================

  // Verifica se o cabecalho de All Products esta visivel
  static verifyAllProductsPage() {
    this.productsHeader.should('be.visible')
  }

  // Verifica se os itens da lista de produtos estao visiveis
  static verifyProductsList() {
    this.productsItems.should('be.visible')
  }

  // Clica no link View Product do primeiro item da lista
  static clickViewProduct() {
    this.viewProductLinks.first().click()
  }

  // ============================================
  // METODOS - Detalhes do Produto
  // ============================================

  // Verifica se o nome do produto na pagina de detalhes esta visivel
  static verifyProductDetailPage() {
    this.productName.should('be.visible')
  }

  // Valida todos os detalhes do produto (nome, categoria, preco, etc)
  static verifyProductDetails() {
    this.productName.should('be.visible')
    this.productCategory.should('be.visible')
    this.productPrice.should('be.visible')
    this.productAvailability.should('be.visible')
    this.productCondition.should('be.visible')
    this.productBrand.should('be.visible')
  }

  // Digita no campo de busca e clica no botao de pesquisar
  // @param {string} searchTerm - Termo a ser pesquisado
  static searchProduct(searchTerm) {
    this.searchInput.type(searchTerm)
    this.searchButton.click()
  }

  // Verifica se o cabecalho de produtos pesquisados esta visivel
  static verifySearchedProducts() {
    this.searchedProductsHeader.should('be.visible')
  }

}