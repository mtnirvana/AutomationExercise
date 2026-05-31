/**
 * TC_PF_010 - Analise de tamanho e formato de imagens
 * @description Identificar imagens que excedem thresholds de performance
 * @tags @auditoria @TC_PF_010
 * @author Rafael Barelli
 */

import http from 'k6/http'
import { check, sleep } from 'k6'

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
  let totalSize = 0
  let largeImages = []
  let totalImages = 0

  // 1. Listar todos os produtos
  const listRes = http.get(`${BASE_URL}/api/productsList`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  check(listRes, {
    'GET /api/productsList status 200': (r) => r.status === 200,
  })

  let productIds = []
  try {
    const body = listRes.json()
    if (Array.isArray(body.products)) {
      productIds = body.products.map((p) => p.id).filter((id) => id)
    }
  } catch {}

  // 2. Para cada produto, verificar imagem
  for (const id of productIds) {
    const imgRes = http.get(`${BASE_URL}/get_product_picture/${id}`)
    const size = parseInt(imgRes.headers['Content-Length'] || '0')
    const type = imgRes.headers['Content-Type'] || 'unknown'

    totalImages++
    totalSize += size

    if (size > 200 * 1024) {
      largeImages.push({ id, sizeKB: Math.round(size / 1024), type })
    }

    // 3. Reportar tamanho da imagem (auditoria, sem falha)
    check(imgRes, {
      [`imagem ${id} carregada`]: () => size > 0,
    })
  }

  // 4. Relatorio final
  check({}, {
    [`total ${totalImages} imagens analisadas`]: () => totalImages > 0,
    [`${largeImages.length} imagens > 200KB`]: () => largeImages.length >= 0,
  })

  if (largeImages.length > 0) {
    console.log('⚠️ IMAGENS ACIMA DE 200 KB:')
    for (const img of largeImages) {
      console.log(`  ID ${img.id}: ${img.sizeKB} KB (${img.type})`)
    }
  }

  console.log(`📊 Total: ${totalImages} imagens, ${Math.round(totalSize / 1024)} KB total`)

  sleep(0.1)
}
