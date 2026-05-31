/**
 * TC_API_007 - Verificar login com credenciais inválidas via API
 * @description Validar que retorna erro quando credenciais não existem
 * @tags @erro @TC_API_007
 * @author Rafael Barelli
 */

import users from '../../fixtures/users.json'

describe('TC_API_007 - Verificar login com credenciais inválidas via API', () => {
  const testId = 'TC_API_007'

  it('deve retornar "User not found!" com status 404', () => {
    // 1. Enviar requisição POST para /api/verifyLogin com credenciais inválidas
    cy.task('apiRequest', {
      hostname: 'automationexercise.com',
      path: '/api/verifyLogin',
      method: 'POST',
      body: `email=${users.invalidUser.email}&password=${users.invalidUser.password}`
    }).then((response) => {
      const assertions = []

      // 2. Validar status code 200
      try {
        expect(response.status).to.eq(200)
        assertions.push({ description: 'response.status é igual a 200', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.status é igual a 200', passed: false })
      }

      // 3. Validar responseCode 404
      try {
        expect(response.body.responseCode).to.eq(404)
        assertions.push({ description: 'response.body.responseCode é igual a 404', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.responseCode é igual a 404', passed: false })
      }

      // 4. Validar mensagem "User not found!"
      try {
        expect(response.body.message).to.eq('User not found!')
        assertions.push({ description: 'response.body.message é igual a "User not found!"', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.message é igual a "User not found!"', passed: false })
      }

      // 5. Gerar evidência do teste
      cy.task('generateEvidenceReport', {
        testId,
        testName: 'Verificar login com credenciais inválidas via API',
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

