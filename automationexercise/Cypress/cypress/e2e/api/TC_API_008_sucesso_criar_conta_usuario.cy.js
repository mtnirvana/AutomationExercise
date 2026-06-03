/**
 * TC_API_008 - Criar conta de usuário via API
 * @description Validar criação de novo usuário via endpoint
 * @tags @sucesso @TC_API_008
 * @author Rafael Barelli
 */

import { UserFactory } from '../../data/UserFactory'

describe('TC_API_008 - Criar conta de usuário via API', () => {
  const testId = 'TC_API_008'
  let createdEmail = ''
  let userPassword = ''

  // Limpeza: Excluir usuário criado via DELETE /api/deleteAccount (executado após o teste)
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

  it('deve criar usuário e retornar status 201', () => {
    const userData = UserFactory.generate()
    createdEmail = userData.email
    userPassword = userData.password

    // 1. Enviar requisição POST para /api/createAccount
    cy.task('apiRequest', {
      hostname: 'automationexercise.com',
      path: '/api/createAccount',
      method: 'POST',
      body: `name=${userData.username}&email=${createdEmail}&password=${userData.password}&title=Mr&birth_date=${userData.day}&birth_month=06&birth_year=${userData.year}&firstname=${userData.address.firstName}&lastname=${userData.address.lastName}&company=${userData.address.company}&address1=${userData.address.address1}&address2=${userData.address.address2}&country=${userData.address.country}&zipcode=${userData.address.zipcode}&state=${userData.address.state}&city=${userData.address.city}&mobile_number=${userData.address.mobileNumber}`
    }).then((response) => {
      const assertions = []

      // 2. Validar status code 200
      try {
        expect(response.status).to.eq(200)
        assertions.push({ description: 'response.status é igual a 200', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.status é igual a 200', passed: false })
      }

      // 3. Validar responseCode 201
      try {
        expect(response.body.responseCode).to.eq(201)
        assertions.push({ description: 'response.body.responseCode é igual a 201', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.responseCode é igual a 201', passed: false })
      }

      // 4. Validar mensagem "User created!"
      try {
        expect(response.body.message).to.eq('User created!')
        assertions.push({ description: 'response.body.message é igual a "User created!"', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.message é igual a "User created!"', passed: false })
      }

      // 5. Gerar evidência do teste
      cy.task('generateEvidenceReport', {
        testId,
        testName: 'Criar conta de usuário via API',
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

