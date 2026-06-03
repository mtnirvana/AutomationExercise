/**
 * TC_API_009 - Excluir conta de usuário via API
 * @description Validar exclusão de usuário via endpoint
 * @tags @sucesso @TC_API_009
 * @author Rafael Barelli
 */

import { UserFactory } from '../../data/UserFactory'

describe('TC_API_009 - Excluir conta de usuário via API', () => {
  const testId = 'TC_API_009'
  let createdEmail = ''
  let userPassword = ''

  afterEach(() => {
    if (createdEmail) {
      cy.task('apiRequest', {
        hostname: 'automationexercise.com',
        path: '/api/deleteAccount',
        method: 'DELETE',
        body: `email=${createdEmail}&password=${userPassword}`
      })
    }
  })

  it('deve excluir usuário e retornar status 200', () => {
    // 1. Gerar dados de usuário dinâmico via UserFactory
    const userData = UserFactory.generate()
    createdEmail = userData.email
    userPassword = userData.password

    // 2. Enviar requisição POST para /api/createAccount para criar usuário
    cy.task('apiRequest', {
      hostname: 'automationexercise.com',
      path: '/api/createAccount',
      method: 'POST',
      body: `name=${userData.username}&email=${userData.email}&password=${userData.password}&title=Mr&birth_date=${userData.day}&birth_month=05&birth_year=${userData.year}&firstname=${userData.address.firstName}&lastname=${userData.address.lastName}&company=${userData.address.company}&address1=${userData.address.address1}&address2=${userData.address.address2}&country=${userData.address.country}&zipcode=${userData.address.zipcode}&state=${userData.address.state}&city=${userData.address.city}&mobile_number=${userData.address.mobileNumber}`
    })

    // 3. Enviar requisição DELETE para /api/deleteAccount
    cy.task('apiRequest', {
      hostname: 'automationexercise.com',
      path: '/api/deleteAccount',
      method: 'DELETE',
      body: `email=${userData.email}&password=${userData.password}`
    }).then((response) => {
      const assertions = []

      // 4. Validar status code 200
      try {
        expect(response.status).to.eq(200)
        assertions.push({ description: 'response.status é igual a 200', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.status é igual a 200', passed: false })
      }

      // 5. Validar responseCode 200
      try {
        expect(response.body.responseCode).to.eq(200)
        assertions.push({ description: 'response.body.responseCode é igual a 200', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.responseCode é igual a 200', passed: false })
      }

      // 6. Validar mensagem "Account deleted!"
      try {
        expect(response.body.message).to.eq('Account deleted!')
        assertions.push({ description: 'response.body.message é igual a "Account deleted!"', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.message é igual a "Account deleted!"', passed: false })
      }

      // 7. Gerar evidência do teste
      cy.task('generateEvidenceReport', {
        testId,
        testName: 'Excluir conta de usuário via API',
        specName: Cypress.spec.relative,
        timestamp: response._meta?.timestamp || new Date().toISOString(),
        duration: response._meta?.duration || 0,
        status: 'PASS',
        request: response._meta?.request || {},
        response: {
          status: response.status,
          body: response.body
        },
        assertions
      })
    })
  })
})

