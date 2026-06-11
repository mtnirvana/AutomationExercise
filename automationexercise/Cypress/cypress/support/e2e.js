import '@shelex/cypress-allure-plugin'
import { HomePage } from '../pages'
import uiData from '../fixtures/ui_texts.json'

// Screenshot custom - sempre salva dentro da pasta do spec
Cypress.Commands.add('captura', (stepName) => {
  const specName = Cypress.spec.name || ''
  const tcMatch = specName.match(/^(TC_WEB_\d+|TC_API_\d+|TC_PF_\d+|TC\d+)/)
  const tcPrefix = tcMatch ? tcMatch[1] + '_' : ''
  cy.screenshot(`${tcPrefix}${stepName}`, { capture: 'runner', overwrite: true })
})

// beforeEach global - adiciona labels Allure (epic/feature/story/tag)
// para filtros nos tabs Behaviors e Suites do relatorio
beforeEach(function () {
  const specName = Cypress.spec.name
  let epic = 'web'
  if (specName.startsWith('TC_API_')) epic = 'api'
  if (specName.startsWith('TC_PF_')) epic = 'performance'

  const tcMatch = specName.match(/^(TC_WEB_\d+|TC_API_\d+|TC_PF_\d+|TC\d+)/)
  if (tcMatch) {
    const desc = specName.replace(/^TC_WEB_\d+_sucesso_|^TC_WEB_\d+_erro_|^TC_API_\d+_sucesso_|^TC_API_\d+_erro_|^TC_PF_\d+_/,'').replace('.cy.js','').replace(/_/g,' ')
    cy.allure().story(`${tcMatch[1]} - ${desc}`)
    cy.allure().tag(tcMatch[1])
  }

  cy.allure().epic(epic)

  if (specName.includes('_sucesso_')) { cy.allure().feature('sucesso'); cy.allure().tag('sucesso') }
  if (specName.includes('_erro_'))    { cy.allure().feature('erro');    cy.allure().tag('erro') }
  if (specName.includes('smoke'))     { cy.allure().feature('smoke');     cy.allure().tag('smoke') }
  if (specName.includes('carga'))     { cy.allure().feature('carga');     cy.allure().tag('carga') }
  if (specName.includes('estresse'))  { cy.allure().feature('estresse');  cy.allure().tag('estresse') }
  if (specName.includes('resistencia')) { cy.allure().feature('resistencia'); cy.allure().tag('resistencia') }
  if (specName.includes('pico') || specName.includes('spike')) { cy.allure().feature('pico'); cy.allure().tag('pico') }
  if (specName.includes('auditoria')) { cy.allure().feature('auditoria'); cy.allure().tag('auditoria') }
  if (specName.includes('vitals'))    { cy.allure().feature('frontend');  cy.allure().tag('frontend') }

  if (specName.startsWith('TC_API_') || specName.startsWith('TC_PF_')) {
    return
  }
  cy.visit('/', { failOnStatusCode: false })
  cy.fixture('users').as('usersData')
  HomePage.logo.should('be.visible')
  cy.captura(uiData.homepage.loadStep)
})

// Suporte para Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})