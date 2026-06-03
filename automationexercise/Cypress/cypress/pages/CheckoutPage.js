/**
 * CheckoutPage - Page Object para fluxo de checkout e pagamento
 * @version 1.0.0
 * @author Rafael Barelli
 */
import uiData from '../fixtures/ui_texts.json'

export class CheckoutPage {

  // ============================================
  // SELETORES - Comentario
  // ============================================

  static get commentInput() {
    // name="message"
    return cy.get('textarea[name="message"]')
  }

  // ============================================
  // SELETORES - Pagamento
  // ============================================

  static get nameOnCard() {
    // name="name_on_card"
    return cy.get('[name="name_on_card"]')
  }

  static get cardNumber() {
    // name="card_number"
    return cy.get('[name="card_number"]')
  }

  static get cardCvc() {
    // name="cvc"
    return cy.get('[name="cvc"]')
  }

  static get cardExpiryMonth() {
    // name="expiry_month"
    return cy.get('[name="expiry_month"]')
  }

  static get cardExpiryYear() {
    // name="expiry_year"
    return cy.get('[name="expiry_year"]')
  }

  // ============================================
  // SELETORES - Botoes e links
  // ============================================

  static get proceedToCheckoutButton() {
    // [MEDIO] texto do link
    return cy.contains('a', uiData.buttons.proceedToCheckout)
  }

  static get placeOrderButton() {
    // [MEDIO] texto do link
    return cy.contains('a', uiData.buttons.placeOrder)
  }

  static get payAndConfirmButton() {
    // [MEDIO] texto do botao
    return cy.contains('button', uiData.buttons.payAndConfirm)
  }

  static get downloadInvoiceLink() {
    // [MEDIO] texto do link
    return cy.contains('a', uiData.buttons.downloadInvoice)
  }

  static get viewCartLink() {
    // [MEDIO] link com texto 'View Cart' (especifico do modal)
    return cy.contains('a', uiData.buttons.viewCart)
  }

  static get continueShoppingButton() {
    // [MEDIO] texto do botao
    return cy.contains('button', uiData.buttons.continueShopping)
  }

  static get addToCartButton() {
    // [MEDIO] texto do botao
    return cy.contains('button', uiData.buttons.addToCart)
  }

  // ============================================
  // SELETORES - Carrinho e Endereco
  // ============================================

  static get cartPrice() {
    // [MEDIO] preco no carrinho
    return cy.get('.cart_price')
  }

  static get cartQuantity() {
    // [MEDIO] quantidade no carrinho
    return cy.get('.cart_quantity')
  }

  static get cartTotal() {
    // [MEDIO] total no carrinho
    return cy.get('.cart_total')
  }

  static get cartDescription() {
    // [MEDIO] descricao item carrinho
    return cy.get('.cart_description')
  }

  static get cartTableRows() {
    // [MEDIO] linhas da tabela carrinho
    return cy.get('tbody tr')
  }

  static get cartDeleteButton() {
    // [MEDIO] botao X remover item
    return cy.get('.cart_quantity_delete')
  }

  static get deliveryAddress() {
    // id="#address_delivery"
    return cy.get('#address_delivery')
  }

  static get invoiceAddress() {
    // id="#address_invoice"
    return cy.get('#address_invoice')
  }

  static get checkoutStepHeaders() {
    // [MEDIO] headers da pagina de checkout
    return cy.get('.step-one h2')
  }

  // ============================================
  // METODOS
  // ============================================

  // Preenche dados de pagamento
  // @param {object} paymentData - { nameOnCard, cardNumber, cvc, expiryMonth, expiryYear }
  static fillPaymentDetails(paymentData) {
    this.nameOnCard.type(paymentData.nameOnCard)
    this.cardNumber.type(paymentData.cardNumber)
    this.cardCvc.type(paymentData.cvc)
    this.cardExpiryMonth.type(paymentData.expiryMonth)
    this.cardExpiryYear.type(paymentData.expiryYear)
  }

  // Clica em Proceed To Checkout
  static clickProceedToCheckout() {
    this.proceedToCheckoutButton.click()
  }

  // Clica em Place Order
  static clickPlaceOrder() {
    this.placeOrderButton.click()
  }

  // Clica em Pay and Confirm Order
  static clickPayAndConfirm() {
    this.payAndConfirmButton.click()
  }

  // Clica em Download Invoice
  static clickDownloadInvoice() {
    this.downloadInvoiceLink.click()
  }

  // Clica em View Cart
  static clickViewCart() {
    this.viewCartLink.click()
  }

  // Clica em Continue Shopping
  static clickContinueShopping() {
    this.continueShoppingButton.click()
  }

  // Verifica se a pagina do carrinho esta visivel
  static verifyCartPageVisible() {
    cy.url().should('include', '/view_cart')
    cy.get('h2').should('be.visible')
  }

  // Verifica se o cabecalho "Order Placed!" esta visivel
  static verifyOrderPlaced() {
    cy.contains('h2', uiData.checkout.orderPlaced).should('be.visible')
  }

  // Verifica se o cabecalho "Address Details" esta visivel
  static verifyAddressDetailsHeader() {
    this.checkoutStepHeaders.contains(uiData.checkout.addressDetails).should('be.visible')
  }

  // Clica no link "Continue" apos pedido finalizado
  static clickContinueAfterOrder() {
    cy.contains('a', uiData.buttons.continue).click()
  }

  // Clica no botao "Add to cart"
  static clickAddToCart() {
    this.addToCartButton.click()
  }
}
