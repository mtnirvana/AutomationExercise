/**
 * TC_PF_007 - Pico repentino de trafego
 * @description Validar recuperacao do sistema apos pico de 200 VUs
 * @tags @pico @TC_PF_007
 * @author Rafael Barelli
 */

import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = 'https://www.automationexercise.com'

// Teste de pico: simula um aumento repentino de trafego (ex: promocao relampago).
// O Cloudflare provavelmente vai rate limitar no pico — isso e esperado.
// O importante e validar que o sistema se recupera apos o pico.
export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Baseline
    { duration: '5s', target: 200 },  // Pico repentino (reduzido de 500 para evitar bloqueio total)
    { duration: '30s', target: 200 }, // Sustentar pico
    { duration: '30s', target: 10 },  // Recuperacao
    { duration: '30s', target: 10 },  // Validar recuperacao
  ],
  thresholds: {
    http_req_duration: ['p(95)<8000'],
    http_req_failed: ['rate<0.90'],
  },
}

export default function () {
  // 1. Enviar requisição GET para /api/productsList
  const res = http.get(`${BASE_URL}/api/productsList`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  check(res, {
    'status 200 e resposta valida': (r) => {
      if (r.status !== 200) return false
      try {
        const body = r.json()
        return body.responseCode !== undefined
      } catch { return false }
    },
  })
  sleep(0.2)
}
