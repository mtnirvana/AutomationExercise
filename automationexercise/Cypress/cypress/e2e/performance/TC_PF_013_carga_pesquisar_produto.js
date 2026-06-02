/**
 * TC_PF_013 - Carga no endpoint POST /api/searchProduct
 * @description Validar busca de produtos com multiplos termos sob carga
 * @tags @carga @TC_PF_013
 * @author Rafael Barelli
 */

import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = 'https://www.automationexercise.com'

export const options = {
  stages: [
    { duration: '20s', target: 30 },
    { duration: '2m', target: 30 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed: ['rate<0.05'],
  },
}

export default function () {
  const searchTerms = ['top', 'winter', 'dress', 'shirt', 'blue']
  const term = searchTerms[__ITER % searchTerms.length]

  // 1. Enviar requisição POST para /api/searchProduct com termo alternado
  const res = http.post(`${BASE_URL}/api/searchProduct`, `search_product=${term}`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })

  check(res, {
    'search status 200': (r) => r.status === 200,
    'resposta contem produtos': (r) => {
      try {
        const body = r.json()
        return body.responseCode === 200 && Array.isArray(body.products)
      } catch { return false }
    },
  })

  sleep(0.5)
}
