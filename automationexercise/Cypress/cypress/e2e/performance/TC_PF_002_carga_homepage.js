/**
 * TC_PF_002 - Carga concorrente na pagina inicial
 * @description Validar performance da homepage com usuarios simultaneos
 * @tags @carga @TC_PF_002
 * @author Rafael Barelli
 */

import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = 'https://www.automationexercise.com'

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '3m', target: 50 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.05'],
  },
}

export default function () {
  // 1. Acessar pagina inicial
  const res = http.get(`${BASE_URL}/`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  check(res, {
    'GET / status 200': (r) => r.status === 200,
    'pagina carregada em menos de 5s': (r) => r.timings.duration < 5000,
  })
  sleep(1)
}
