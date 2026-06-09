/**
 * TC_WEB_MOCK_erro_self_heal_test.cy.js
 * Teste que FALHA PROPOSITALMENTE
 * Usa um seletor que NÃO EXISTE para simular "quebra de seletor"
 * Serve para testar o fluxo de self-healing (criação de Issue)
 */
describe('TC_WEB_MOCK - Validar pipeline de self-healing', () => {
  it('deve falhar propositalmente para testar self-heal', () => {
    cy.visit('/login')
    cy.get('[data-qa="seletor_inexistente"]', { timeout: 5000 }).should('be.visible')
  })
})
