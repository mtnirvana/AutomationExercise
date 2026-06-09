/**
 * TC_WEB_MOCK_smoke_homepage.cy.js
 * Teste SIMPLES que sempre PASSA
 * Serve para validar que o pipeline CI/CD está funcionando
 */
describe('TC_WEB_MOCK - Smoke test da homepage', () => {
  it('deve carregar a homepage e exibir o logo', () => {
    cy.visit('/')
    cy.get('img[alt="Website for automation practice"]', { timeout: 15000 }).should('be.visible')
    cy.captura('01_homepage_carregada')
  })
})
