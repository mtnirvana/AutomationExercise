/**
 * TC_PF_012 - Carga no endpoint GET /api/getUserDetailByEmail
 * @description Validar consulta de detalhes de usuario por email sob carga
 * @tags @carga @TC_PF_012
 * @author Rafael Barelli
 */

import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = 'https://www.automationexercise.com'
const PASSWORD = 'TestPass123'

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '2m', target: 20 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed: ['rate<0.15'],
  },
}

export default function () {
  const timestamp = Date.now()
  const email = `detail${timestamp}@test.com`
  const formHeaders = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  const baseFields = `name=TestUser&email=${email}&password=${PASSWORD}&title=Mr&birth_date=15&birth_month=06&birth_year=1995&firstname=Test&lastname=User&company=TestCorp&address1=123%20Test%20St&address2=Suite%201&country=United%20States&zipcode=12345&state=TestState&city=TestCity&mobile_number=1234567890`

  // 1. Enviar requisição POST para /api/createAccount
  const createRes = http.post(`${BASE_URL}/api/createAccount`, baseFields, formHeaders)
  check(createRes, {
    'createAccount status 200': (r) => r.status === 200,
    'createAccount responseCode 201': (r) => { try { return r.json().responseCode === 201 } catch { return false } },
  })

  // 2. Enviar requisição GET para /api/getUserDetailByEmail
  const detailRes = http.get(`${BASE_URL}/api/getUserDetailByEmail?email=${encodeURIComponent(email)}`, formHeaders)
  check(detailRes, {
    'getUserDetail status 200': (r) => r.status === 200,
    'getUserDetail responseCode 200': (r) => { try { return r.json().responseCode === 200 } catch { return false } },
    'getUserDetail possui user': (r) => { try { return r.json().user !== null && r.json().user !== undefined } catch { return false } },
    'getUserDetail user.name existe': (r) => { try { return r.json().user.name !== undefined } catch { return false } },
    'getUserDetail user.email existe': (r) => { try { return r.json().user.email !== undefined } catch { return false } },
  })

  // 3. Cleanup: excluir conta criada via DELETE
  const delRes = http.del(`${BASE_URL}/api/deleteAccount`, `email=${email}&password=${PASSWORD}`, formHeaders)
  check(delRes, {
    'deleteAccount status 200': (r) => r.status === 200,
    'deleteAccount message Account deleted!': (r) => { try { return r.json().message === 'Account deleted!' } catch { return false } },
  })

  sleep(1)
}
