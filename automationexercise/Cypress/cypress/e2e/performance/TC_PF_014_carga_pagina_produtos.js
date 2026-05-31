/**
 * TC_PF_014 - Carga na pagina de produtos (/products)
 * @description Validar tempo de resposta da pagina de listagem de produtos
 * @tags @carga @TC_PF_014
 * @author Rafael Barelli
 */

import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = 'https://www.automationexercise.com'

export const options = {
  stages: [
    { duration: '30s', target: 30 },
    { duration: '2m', target: 30 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed: ['rate<0.05'],
  },
}

export default function () {
  // 1. Acessar pagina de produtos
  const res = http.get(`${BASE_URL}/products`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  check(res, {
    'GET /products status 200': (r) => r.status === 200,
    'pagina produtos carregada': (r) => r.body.includes('All Products') || r.body.includes('products'),
  })
  sleep(1)
}
