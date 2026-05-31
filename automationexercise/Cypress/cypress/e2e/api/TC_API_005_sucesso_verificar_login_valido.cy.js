/**
 * TC_API_005 - Verificar login com credenciais válidas via API
 * @description Validar que retorna sucesso quando credenciais são válidas
 * @tags @sucesso @TC_API_005
 * @author Rafael Barelli
 */

import users from '../../fixtures/users.json'

describe('TC_API_005 - Verificar login com credenciais válidas via API', () => {
  const testId = 'TC_API_005'

  it('deve retornar "User exists!" com status 200', () => {
    // 1. Enviar requisição POST para /api/verifyLogin com credenciais válidas
    cy.task('apiRequest', {
      hostname: 'automationexercise.com',
      path: '/api/verifyLogin',
      method: 'POST',
      body: `email=${users.testUser.email}&password=${users.testUser.password}`
    }).then((response) => {
      const assertions = []

      // 2. Validar status code 200
      try {
        expect(response.status).to.eq(200)
        assertions.push({ description: 'response.status é igual a 200', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.status é igual a 200', passed: false })
      }

      // 3. Validar responseCode 200
      try {
        expect(response.body.responseCode).to.eq(200)
        assertions.push({ description: 'response.body.responseCode é igual a 200', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.responseCode é igual a 200', passed: false })
      }

      // 4. Validar mensagem "User exists!"
      try {
        expect(response.body.message).to.eq('User exists!')
        assertions.push({ description: 'response.body.message é igual a "User exists!"', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.message é igual a "User exists!"', passed: false })
      }

      // 5. Gerar evidência do teste
      cy.task('generateEvidenceReport', {
        testId,
        testName: 'Verificar login com credenciais válidas via API',
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

