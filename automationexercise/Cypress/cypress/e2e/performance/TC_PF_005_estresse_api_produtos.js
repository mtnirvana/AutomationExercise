/**
 * TC_PF_005 - Estresse progressivo no /api/productsList
 * @description Encontrar o ponto de ruptura da API aumentando a carga
 * @tags @estresse @TC_PF_005
 * @author Rafael Barelli
 */

import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = 'https://www.automationexercise.com'

// Teste de estresse progressivo para encontrar o ponto de ruptura da API.
// Observacao: Cloudflare comeca rate limiting a ~50 VUs.
// A 300+ VUs a maioria das requests e bloqueada — isso e o ponto de ruptura.
// Thresholds propositalmente largos para documentar o comportamento real.
export const options = {
  stages: [
    { duration: '30s', target: 25 },  // Baseline: carga leve
    { duration: '30s', target: 50 },  // Limite esperado do Cloudflare
    { duration: '1m', target: 100 },  // Rate limit esperado
    { duration: '1m', target: 200 },  // Degradacao severa
    { duration: '1m', target: 300 },  // Ponto de ruptura
    { duration: '30s', target: 0 },   // Recuperacao
  ],
  thresholds: {
    http_req_duration: ['p(95)<10000'],
    http_req_failed: ['rate<0.60'],
  },
}

export default function () {
  // 1. Enviar requisição GET para /api/productsList
  const res = http.get(`${BASE_URL}/api/productsList`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  // 2. Validar status code e conteudo da resposta
  check(res, {
    'status 200 e JSON valido': (r) => {
      if (r.status !== 200) return false
      try {
        const body = r.json()
        return body.responseCode === 200 && Array.isArray(body.products)
      } catch { return false }
    },
  })
  sleep(0.3)
}
