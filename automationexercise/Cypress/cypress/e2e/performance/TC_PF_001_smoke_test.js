/**
 * TC_PF_001 - Smoke test de validacao do pipeline
 * @description Validar que ambiente, scripts e APIs estao funcionando
 * @tags @smoke @TC_PF_001
 * @author Rafael Barelli
 */

import http from 'k6/http'
import { check } from 'k6'
// Carregar dados do usuario do fixture original do projeto (via open() do k6)
const usersData = JSON.parse(open('../../fixtures/users.json'))
const testUser = usersData.testUser

const BASE_URL = 'https://www.automationexercise.com'

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed: ['rate<0.01'],
  },
}

export default function () {
  // 1. Enviar requisição GET para /api/productsList
  const res1 = http.get(`${BASE_URL}/api/productsList`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  check(res1, {
    'GET /api/productsList status 200': (r) => r.status === 200,
    'responseCode igual a 200': (r) => r.json().responseCode === 200,
    'products é um array': (r) => Array.isArray(r.json().products),
    'products.length maior que 0': (r) => r.json().products.length > 0,
  })

  // 2. Enviar requisição GET para /api/brandsList
  const res2 = http.get(`${BASE_URL}/api/brandsList`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  check(res2, {
    'GET /api/brandsList status 200': (r) => r.status === 200,
    'brands responseCode igual a 200': (r) => r.json().responseCode === 200,
    'brands é um array': (r) => Array.isArray(r.json().brands),
  })

  // 3. Enviar requisição POST para /api/verifyLogin com credenciais válidas
  const res3 = http.post(`${BASE_URL}/api/verifyLogin`, {
    email: testUser.email,
    password: testUser.password,
  }, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  check(res3, {
    'POST /api/verifyLogin status 200': (r) => r.status === 200,
    'login message igual a User exists!': (r) => r.json().message === 'User exists!',
  })
}
