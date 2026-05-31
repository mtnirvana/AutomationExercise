/**
 * TC_PF_003 - Carga no endpoint /api/productsList
 * @description Validar throughput e latencia da API de listagem de produtos
 * @tags @carga @TC_PF_003
 * @author Rafael Barelli
 */

import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = 'https://www.automationexercise.com'

// Nota: O servidor utiliza Cloudflare que aplica rate limiting a partir de ~50 VUs.
// Este teste documenta esse comportamento — nao e um falso positivo.
// Thresholds foram ajustados para accommodar o rate limit esperado.
export const options = {
  stages: [
    { duration: '20s', target: 50 },  // 50 VUs — ponto onde Cloudflare comeca a limitar
    { duration: '1m', target: 50 },   // sustentar 50 VUs para medir baseline
    { duration: '20s', target: 100 }, // subir para 100 VUs — rate limit esperado
    { duration: '1m', target: 100 },  // sustentar 100 VUs para medir taxa de erro
    { duration: '10s', target: 0 },   // ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<8000'],
    http_req_failed: ['rate<0.40'],
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
        return body.responseCode === 200 && Array.isArray(body.products) && body.products.length > 0
      } catch { return false }
    },
  })
  sleep(0.5)
}
