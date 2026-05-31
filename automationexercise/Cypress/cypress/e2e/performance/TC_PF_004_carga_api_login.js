/**
 * TC_PF_004 - Carga no endpoint /api/verifyLogin
 * @description Validar tempo de resposta da autenticacao sob carga
 * @tags @carga @TC_PF_004
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
    { duration: '15s', target: 30 },
    { duration: '2m', target: 30 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed: ['rate<0.10'],
  },
}

export default function () {
  // 1. Enviar requisição POST para /api/verifyLogin com credenciais válidas
  const res = http.post(`${BASE_URL}/api/verifyLogin`, {
    email: testUser.email,
    password: testUser.password,
  }, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  // 2. Validar status code e mensagem de sucesso
  check(res, {
    'status 200 e login valido': (r) => {
      if (r.status !== 200) return false
      try {
        const body = r.json()
        return body.message === 'User exists!'
      } catch { return false }
    },
  })
  sleep(1)
}
