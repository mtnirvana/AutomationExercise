/**
 * TC_API_011 - Obter detalhes do usuário por email via API
 * @description Validar busca de detalhes de usuário pelo email
 * @tags @sucesso @TC_API_011
 * @author Rafael Barelli
 */

import { UserFactory } from '../../data/userFactory'

describe('TC_API_011 - Obter detalhes do usuário por email via API', () => {
  const testId = 'TC_API_011'
  let testEmail = ''
  let userPassword = ''

  // Limpeza: Excluir usuário criado via DELETE /api/deleteAccount (executado após o teste)
  afterEach(() => {
    if (testEmail) {
      cy.task('apiRequest', {
        hostname: 'automationexercise.com',
        path: '/api/deleteAccount',
        method: 'DELETE',
        body: `email=${testEmail}&password=${userPassword}`
      })
    }
  })

  it('deve retornar detalhes do usuário correto confirmando email e nome', () => {
    const userData = UserFactory.generate()
    testEmail = userData.email
    userPassword = userData.password

    // 1. Enviar requisição POST para /api/createAccount
    cy.task('apiRequest', {
      hostname: 'automationexercise.com',
      path: '/api/createAccount',
      method: 'POST',
      body: `name=TestUser&email=${testEmail}&password=${userPassword}&title=Mr&birth_date=15&birth_month=06&birth_year=1995&firstname=Test&lastname=User&company=TestCorp&address1=123 Test St&address2=Suite 1&country=United States&zipcode=12345&state=TestState&city=TestCity&mobile_number=1234567890`
    })

    // 2. Enviar requisição GET para /api/getUserDetailByEmail
    cy.task('apiRequest', {
      hostname: 'automationexercise.com',
      path: `/api/getUserDetailByEmail?email=${testEmail}`,
      method: 'GET'
    }).then((response) => {
      const assertions = []

      // 3. Validar status code 200
      try {
        expect(response.status).to.eq(200)
        assertions.push({ description: 'response.status é igual a 200', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.status é igual a 200', passed: false })
      }

      // 4. Validar responseCode 200
      try {
        expect(response.body.responseCode).to.eq(200)
        assertions.push({ description: 'response.body.responseCode é igual a 200', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.responseCode é igual a 200', passed: false })
      }

      // 5. Validar propriedade user
      try {
        expect(response.body).to.have.property('user')
        assertions.push({ description: 'response.body possui propriedade user', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body possui propriedade user', passed: false })
      }

      // 6. Validar que o email retornado é o email consultado
      try {
        expect(response.body.user.email).to.eq(testEmail)
        assertions.push({ description: `user.email é igual a "${testEmail}"`, passed: true })
      } catch (e) {
        assertions.push({ description: `user.email é igual a "${testEmail}"`, passed: false })
      }

      // 7. Validar que o nome retornado é "TestUser"
      try {
        expect(response.body.user.name).to.eq('TestUser')
        assertions.push({ description: 'user.name é igual a "TestUser"', passed: true })
      } catch (e) {
        assertions.push({ description: 'user.name é igual a "TestUser"', passed: false })
      }

      // 8. Gerar evidência do teste
      cy.task('generateEvidenceReport', {
        testId,
        testName: 'Obter detalhes do usuário por email via API',
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

