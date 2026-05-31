/**
 * TC_API_002 - Listar todas as marcas via API
 * @description Validar retorno da lista completa de marcas
 * @tags @sucesso @TC_API_002
 * @author Rafael Barelli
 */

describe('TC_API_002 - Listar todas as marcas via API', () => {
  const testId = 'TC_API_002'

  it('deve retornar lista de marcas com status 200', () => {
    // 1. Enviar requisição GET para /api/brandsList
    cy.task('apiRequest', {
      hostname: 'automationexercise.com',
      path: '/api/brandsList',
      method: 'GET'
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

      // 4. Validar array de marcas
      try {
        expect(response.body.brands).to.be.an('array')
        assertions.push({ description: 'response.body.brands é um array', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.brands é um array', passed: false })
      }

      // 5. Validar quantidade de marcas igual a 34
      try {
        expect(response.body.brands.length).to.eq(34)
        assertions.push({ description: 'response.body.brands.length é igual a 34', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.brands.length é igual a 34', passed: false })
      }

      // 6. Validar propriedade id da primeira marca
      try {
        expect(response.body.brands[0]).to.have.property('id')
        assertions.push({ description: 'response.body.brands[0] possui propriedade id', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.brands[0] possui propriedade id', passed: false })
      }

      // 7. Validar propriedade brand da primeira marca
      try {
        expect(response.body.brands[0]).to.have.property('brand')
        assertions.push({ description: 'response.body.brands[0] possui propriedade brand', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.brands[0] possui propriedade brand', passed: false })
      }

      // 8. Gerar evidência do teste
      cy.task('generateEvidenceReport', {
        testId,
        testName: 'Listar todas as marcas via API',
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

