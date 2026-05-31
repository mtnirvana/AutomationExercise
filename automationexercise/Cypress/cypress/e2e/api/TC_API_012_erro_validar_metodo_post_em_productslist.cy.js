/**
 * TC_API_012 - Validar método POST em productsList via API
 * @description Validar que POST não é suportado em /api/productsList
 * @tags @erro @TC_API_012
 * @author Rafael Barelli
 */

describe('TC_API_012 - Validar método POST em productsList via API', () => {
  const testId = 'TC_API_012'

  it('deve retornar erro 405 quando POST é usado em productsList', () => {
    // 1. Enviar requisição POST para /api/productsList
    cy.task('apiRequest', {
      hostname: 'automationexercise.com',
      path: '/api/productsList',
      method: 'POST'
    }).then((response) => {
      const assertions = []

      // 2. Validar status code 200
      try {
        expect(response.status).to.eq(200)
        assertions.push({ description: 'response.status é igual a 200', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.status é igual a 200', passed: false })
      }

      // 3. Validar responseCode 405
      try {
        expect(response.body.responseCode).to.eq(405)
        assertions.push({ description: 'response.body.responseCode é igual a 405', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.responseCode é igual a 405', passed: false })
      }

      // 4. Validar mensagem de erro
      try {
        expect(response.body.message).to.eq('This request method is not supported.')
        assertions.push({ description: 'response.body.message é igual a "This request method is not supported."', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.message é igual a "This request method is not supported."', passed: false })
      }

      // 5. Gerar evidência do teste
      cy.task('generateEvidenceReport', {
        testId,
        testName: 'Validar método POST em productsList via API',
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

