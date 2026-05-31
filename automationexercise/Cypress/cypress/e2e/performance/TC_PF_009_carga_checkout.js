/**
 * TC_PF_009 - Carga no fluxo completo de checkout
 * @description Validar funil de conversao completo (criar, logar, listar, excluir)
 * @tags @carga @TC_PF_009
 * @author Rafael Barelli
 */

import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = 'https://www.automationexercise.com'

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '2m', target: 20 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<4000'],
    http_req_failed: ['rate<0.05'],
  },
}

export default function () {
  // 1. Gerar email único com timestamp
  const timestamp = Date.now()
  const email = `user${timestamp}@test.com`

  // 2. Enviar requisição POST para /api/createAccount
  const createRes = http.post(`${BASE_URL}/api/createAccount`, {
    name: 'Test User',
    email: email,
    password: 'Test123456',
    title: 'Mr',
    birth_date: '15',
    birth_month: '05',
    birth_year: '1990',
    firstname: 'Test',
    lastname: 'User',
    company: 'Test Co',
    address1: '123 Test St',
    address2: 'Apt 1',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobile_number: '1234567890',
  }, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  check(createRes, {
    'createAccount status 200': (r) => r.status === 200,
    'createAccount responseCode 201': (r) => r.json().responseCode === 201,
  })

  // 3. Enviar requisição POST para /api/verifyLogin com a conta criada
  const loginRes = http.post(`${BASE_URL}/api/verifyLogin`, {
    email: email,
    password: 'Test123456',
  }, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  check(loginRes, {
    'login status 200': (r) => r.status === 200,
    'login message User exists!': (r) => r.json().message === 'User exists!',
  })

  // 4. Enviar requisição GET para /api/productsList
  const listRes = http.get(`${BASE_URL}/api/productsList`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  check(listRes, {
    'listProducts status 200': (r) => r.status === 200,
    'listProducts responseCode 200': (r) => r.json().responseCode === 200,
  })

  // 5. Cleanup: excluir conta criada via DELETE
  const delRes = http.del(`${BASE_URL}/api/deleteAccount`, `email=${email}&password=Test123456`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  check(delRes, {
    'deleteAccount status 200': (r) => r.status === 200,
    'deleteAccount message Account deleted!': (r) => r.json().message === 'Account deleted!',
  })

  sleep(1)
}
