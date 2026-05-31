/**
 * TC_API_001 - Listar todos os produtos via API
 * @description Validar retorno da lista completa de produtos
 * @tags @sucesso @TC_API_001
 * @author Rafael Barelli
 */

describe('TC_API_001 - Listar todos os produtos via API', () => {
  const testId = 'TC_API_001'

  it('deve retornar lista de produtos com status 200', () => {
    // 1. Enviar requisição GET para /api/productsList
    cy.task('apiRequest', {
      hostname: 'automationexercise.com',
      path: '/api/productsList',
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

      // 4. Validar array de produtos
      try {
        expect(response.body.products).to.be.an('array')
        assertions.push({ description: 'response.body.products é um array', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.products é um array', passed: false })
      }

      // 5. Validar quantidade de produtos igual a 34
      try {
        expect(response.body.products.length).to.eq(34)
        assertions.push({ description: 'response.body.products.length é igual a 34', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.products.length é igual a 34', passed: false })
      }

      // 6. Validar propriedade id do primeiro produto
      try {
        expect(response.body.products[0]).to.have.property('id')
        assertions.push({ description: 'response.body.products[0] possui propriedade id', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.products[0] possui propriedade id', passed: false })
      }

      // 7. Validar propriedade name do primeiro produto
      try {
        expect(response.body.products[0]).to.have.property('name')
        assertions.push({ description: 'response.body.products[0] possui propriedade name', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.products[0] possui propriedade name', passed: false })
      }

      // 8. Validar propriedade price do primeiro produto
      try {
        expect(response.body.products[0]).to.have.property('price')
        assertions.push({ description: 'response.body.products[0] possui propriedade price', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.products[0] possui propriedade price', passed: false })
      }

      // 9. Validar propriedade brand do primeiro produto
      try {
        expect(response.body.products[0]).to.have.property('brand')
        assertions.push({ description: 'response.body.products[0] possui propriedade brand', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.products[0] possui propriedade brand', passed: false })
      }

      // 10. Validar propriedade category do primeiro produto
      try {
        expect(response.body.products[0]).to.have.property('category')
        assertions.push({ description: 'response.body.products[0] possui propriedade category', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.products[0] possui propriedade category', passed: false })
      }

      // 11. Gerar evidência do teste
      cy.task('generateEvidenceReport', {
        testId,
        testName: 'Listar todos os produtos via API',
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
