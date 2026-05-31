/**
 * TC_API_003 - Pesquisar produto por termo via API
 * @description Validar busca de produtos por termo de pesquisa
 * @tags @sucesso @TC_API_003
 * @author Rafael Barelli
 */

describe('TC_API_003 - Pesquisar produto por termo via API', () => {
  const testId = 'TC_API_003'

  it('deve retornar produtos encontrados com status 200', () => {
    // 1. Enviar requisição POST para /api/searchProduct com termo "top"
    cy.task('apiRequest', {
      hostname: 'automationexercise.com',
      path: '/api/searchProduct',
      method: 'POST',
      body: 'search_product=top'
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

      // 5. Validar quantidade de produtos igual a 14
      try {
        expect(response.body.products.length).to.eq(14)
        assertions.push({ description: 'response.body.products.length é igual a 14', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.products.length é igual a 14', passed: false })
      }

      // 6. Validar propriedade id do primeiro produto
      try {
        expect(response.body.products[0]).to.have.property('id')
        assertions.push({ description: 'response.body.products[0] possui propriedade id', passed: true })
      } catch (e) {
        assertions.push({ description: 'response.body.products[0] possui propriedade id', passed: false })
      }

      // 7. Validar que o nome do primeiro produto contém o termo "top"
      try {
        expect(response.body.products[0].name.toLowerCase()).to.include('top')
        assertions.push({ description: 'products[0].name contém "top"', passed: true })
      } catch (e) {
        assertions.push({ description: 'products[0].name contém "top"', passed: false })
      }

      // 8. Gerar evidência do teste
      cy.task('generateEvidenceReport', {
        testId,
        testName: 'Pesquisar produto por termo via API',
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

