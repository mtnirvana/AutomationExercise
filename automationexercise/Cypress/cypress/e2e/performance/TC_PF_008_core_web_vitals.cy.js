/**
 * TC_PF_008 - Core Web Vitals - Metricas de Frontend
 * @description Coletar LCP, CLS, FCP, TTFB das paginas criticas via Performance API
 * @tags @sucesso @TC_PF_008
 * @author Rafael Barelli
 */

describe('TC_PF_008 - Core Web Vitals - Metricas de Frontend', () => {
  const pages = [
    { name: 'Homepage', url: '/' },
    { name: 'Produtos', url: '/products' },
    { name: 'Login', url: '/login' },
    { name: 'Detalhe Produto', url: '/product_details/1' },
    { name: 'Carrinho', url: '/view_cart' },
    { name: 'Checkout', url: '/checkout' },
    { name: 'Contato', url: '/contact_us' },
    { name: 'Casos de Teste', url: '/test_cases' },
  ];

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`ERROR_${this.currentTest.title}`, { capture: 'runner' })
    }
  })

  pages.forEach((page) => {
    it(`deve validar ${page.name} com LCP < 2500ms e CLS < 0,1`, () => {
      // 1. Visitar pagina com observers de performance
      cy.visit(page.url, {
        onBeforeLoad(win) {
          // Inicializar objeto de metricas
          win.__perfMetrics = { lcp: null, cls: 0, fcp: null }

          // Observer para LCP (Largest Contentful Paint)
          try {
            new PerformanceObserver((list) => {
              const entries = list.getEntries()
              if (entries.length > 0) {
                win.__perfMetrics.lcp = entries[entries.length - 1].startTime
              }
            }).observe({ type: 'largest-contentful-paint', buffered: true })
          } catch (e) { win.__perfMetrics._lcpError = e.message }

          // Observer para CLS (Cumulative Layout Shift)
          try {
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) win.__perfMetrics.cls += entry.value
              }
            }).observe({ type: 'layout-shift', buffered: true })
          } catch (e) { win.__perfMetrics._clsError = e.message }
        }
      })

      // 2. Aguardar carregamento completo e observers coletarem
      cy.get('body', { timeout: 15000 }).should('be.visible')
      cy.wait(2000)

      // 3. Coletar metricas da pagina
      cy.window().then((win) => {
        const nav = win.performance.getEntriesByType('navigation')[0]
        const paint = win.performance.getEntriesByType('paint')
        const fcpEntry = paint.find(e => e.name === 'first-contentful-paint')

        const metrics = {
          lcp: win.__perfMetrics?.lcp ? Math.round(win.__perfMetrics.lcp) : null,
          cls: win.__perfMetrics?.cls !== undefined ? Math.round(win.__perfMetrics.cls * 100) / 100 : null,
          fcp: fcpEntry ? Math.round(fcpEntry.startTime) : null,
          ttfb: nav ? Math.round(nav.responseStart - nav.requestStart) : null,
          domComplete: nav ? Math.round(nav.domComplete) : null,
        }

        // 4. Salvar metricas no contexto do teste para evidencia
        win.__collectedMetrics = metrics

        // 5. Validar metricas contra SLAs
        // 6. LCP deve ser menor que 2500ms
        if (metrics.lcp !== null) {
          expect(metrics.lcp, `LCP (${metrics.lcp}ms) deve ser < 2500ms`).to.be.lessThan(2500)
        }

        // 7. CLS deve ser menor que 0,1
        if (metrics.cls !== null) {
          expect(metrics.cls, `CLS (${metrics.cls}) deve ser < 0,1`).to.be.lessThan(0.1)
        }

        // 8. TTFB deve ser menor que 1000ms (ajustado para Cloudflare)
        if (metrics.ttfb !== null) {
          expect(metrics.ttfb, `TTFB (${metrics.ttfb}ms) deve ser < 1000ms`).to.be.lessThan(1000)
        }

        // Registrar metricas no console para debug
        cy.log(`📊 ${page.name}: LCP=${metrics.lcp}ms | CLS=${metrics.cls} | FCP=${metrics.fcp}ms | TTFB=${metrics.ttfb}ms | DOM=${metrics.domComplete}ms`)
      })

      // 9. Screenshot de evidencia
      cy.captura(`metricas_${page.name.toLowerCase().replace(/\s+/g, '_')}`)
    })
  })
})

