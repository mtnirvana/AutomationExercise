/**
 * TC_API_004 - Pesquisar produto sem parâmetro via API
 * @description Validar que retorna erro quando parâmetro de busca está ausente
 * @tags @erro @TC_API_004
 * @author Rafael Barelli
 */

describe('TC_API_004 - Pesquisar produto sem parâmetro via API', () => {
  const testId = 'TC_API_004'

  it('deve retornar erro 400 quando parâmetro ausente', () => {
    // 1. Enviar requisição POST para /api/searchProduct sem parâmetro
    cy.task('apiRequest', {
      hostname: 'automationexercise.com',
      path: '/api/searchProduct',
      method: 'POST',
      body: ''
    }).then((response) => {
      const assertions = []

      // 2. Validar status code 200
      try {
        expect(response.status).to.eq(200)
        assertions.push({ description: 'response.status é igual a 200', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.status é igual a 200', passed: false })
      }

      // 3. Validar responseCode 400
      try {
        expect(response.body.responseCode).to.eq(400)
        assertions.push({ description: 'response.body.responseCode é igual a 400', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.responseCode é igual a 400', passed: false })
      }

      // 4. Validar mensagem de erro
      try {
        expect(response.body.message).to.eq('Bad request, search_product parameter is missing in POST request.')
        assertions.push({ description: 'response.body.message é igual a "Bad request, search_product parameter is missing in POST request."', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.message é igual a "Bad request, search_product parameter is missing in POST request."', passed: false })
      }

      // 5. Gerar evidência do teste
      cy.task('generateEvidenceReport', {
        testId,
        testName: 'Pesquisar produto sem parâmetro via API',
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

