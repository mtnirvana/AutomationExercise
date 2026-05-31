/**
 * TC_PF_006 - Resistencia sustentada com mix de endpoints
 * @description Detectar degradacao gradual com carga constante
 * @tags @resistencia @TC_PF_006
 * @author Rafael Barelli
 */

import http from 'k6/http'
import { check, sleep } from 'k6'
// Carregar dados do usuario do fixture original do projeto (via open() do k6)
const usersData = JSON.parse(open('../../fixtures/users.json'))
const testUser = usersData.testUser

const BASE_URL = 'https://www.automationexercise.com'

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '5m', target: 50 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.01'],
  },
}

export default function () {
  const endpoint = __ITER % 4
  let res

  // 1. Alternar entre endpoints conforme iteracao
  if (endpoint === 0) {
    // 1a. Enviar GET para /api/productsList
    res = http.get(`${BASE_URL}/api/productsList`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    check(res, {
      'GET productsList status 200': (r) => r.status === 200,
    })
  } else if (endpoint === 1) {
    // 1b. Enviar GET para /api/brandsList
    res = http.get(`${BASE_URL}/api/brandsList`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    check(res, {
      'GET brandsList status 200': (r) => r.status === 200,
    })
  } else if (endpoint === 2) {
    // 1c. Enviar POST para /api/verifyLogin
      res = http.post(`${BASE_URL}/api/verifyLogin`, {
        email: testUser.email,
        password: testUser.password,
      }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    check(res, {
      'POST verifyLogin status 200': (r) => r.status === 200,
    })
  } else {
    // 1d. Enviar POST para /api/searchProduct
    res = http.post(`${BASE_URL}/api/searchProduct`, {
      search_product: 'top',
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    check(res, {
      'POST searchProduct status 200': (r) => r.status === 200,
    })
  }
  sleep(0.5)
}
