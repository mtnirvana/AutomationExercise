/**
 * SignupPage - Page Object para o formulario de registro de conta
 * @version 1.0.0
 * @author Rafael Barelli
 */
import uiData from '../fixtures/ui_texts.json'

export class SignupPage {

  // ============================================
  // SELETORES
  // ============================================

  static get accountInfoHeader() {
    // tag h2 + texto visivel - confirma que chegou na tela certa
    return cy.get('h2').contains(uiData.headers.enterAccountInfo)
  }

  static get genderMale() {
    // id="#id_gender1"
    return cy.get('#id_gender1')
  }

  static get genderFemale() {
    // id="#id_gender2"
    return cy.get('#id_gender2')
  }

  static get password() {
    // id="#password"
    return cy.get('#password')
  }

  static get days() {
    // id="#days"
    return cy.get('#days')
  }

  static get months() {
    // id="#months"
    return cy.get('#months')
  }

  static get years() {
    // id="#years"
    return cy.get('#years')
  }

  static get newsletterCheckbox() {
    // id="#newsletter"
    return cy.get('#newsletter')
  }

  static get specialOffersCheckbox() {
    // id="#optin"
    return cy.get('#optin')
  }

  static get firstName() {
    // id="#first_name"
    return cy.get('#first_name')
  }

  static get lastName() {
    // id="#last_name"
    return cy.get('#last_name')
  }

  static get company() {
    // id="#company"
    return cy.get('#company')
  }

  static get address1() {
    // id="#address1"
    return cy.get('#address1')
  }

  static get address2() {
    // id="#address2"
    return cy.get('#address2')
  }

  static get country() {
    // id="#country"
    return cy.get('#country')
  }

  static get state() {
    // id="#state"
    return cy.get('#state')
  }

  static get city() {
    // id="#city"
    return cy.get('#city')
  }

  static get zipcode() {
    // id="#zipcode"
    return cy.get('#zipcode')
  }

  static get mobileNumber() {
    // id="#mobile_number"
    return cy.get('#mobile_number')
  }

  static get createAccountButton() {
    // data-qa="create-account"
    return cy.get('button[data-qa="create-account"]')
  }

  // ============================================
  // METODOS
  // ============================================

  // Verifica se o cabecalho de informacoes da conta esta visivel
  static verifyAccountInfoHeader() {
    this.accountInfoHeader.should('be.visible')
  }

  // Seleciona o genero (male ou female)
  // @param {string} gender - genero desejado (male/female)
  static selectGender(gender) {
    if (gender.toLowerCase() === 'male') {
      this.genderMale.check()
    } else {
      this.genderFemale.check()
    }
  }

  // Preenche os campos de data de nascimento (dia, mes, ano)
  // @param {string} day - Dia do mes (1-31)
  // @param {string} month - Nome do mes
  // @param {string} year - Ano (ex: '1990')
  static fillDateOfBirth(day, month, year) {
    this.days.select(day)
    this.months.select(month)
    this.years.select(year)
  }

  // Preenche todos os campos de endereco
  // @param {object} address - Objeto contendo detalhes do endereco
  static fillAddress(address) {
    this.firstName.type(address.firstName)
    this.lastName.type(address.lastName)
    this.company.type(address.company)
    this.address1.type(address.address1)
    this.address2.type(address.address2 || '')
    this.country.select(address.country)
    this.state.type(address.state)
    this.city.type(address.city)
    this.zipcode.type(address.zipcode)
    this.mobileNumber.type(address.mobileNumber)
  }

  // Clica no botao de criar conta
  static clickCreateAccount() {
    this.createAccountButton.click()
  }
}