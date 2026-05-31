const fs = require('fs')
const path = require('path')
const GIFEncoder = require('gifencoder')
const { createCanvas, loadImage } = require('canvas')

const ROOT = path.resolve(__dirname, '..')
const SCREENSHOTS_DIR = path.join(ROOT, 'cypress', 'screenshots')

function waitForFiles(dir, pattern, maxWait = 30000) {
  const start = Date.now()
  while (Date.now() - start < maxWait) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith(pattern))
    if (files.length >= 2) return files.sort()
  }
  return []
}

async function generateGif(pngFiles, outputPath) {
  if (pngFiles.length < 2) return false
  const images = []
  for (const f of pngFiles) {
    try {
      const img = await loadImage(f)
      images.push(img)
    } catch (e) {
      console.log(`  Erro carregando ${f}: ${e.message}`)
    }
  }
  if (images.length < 2) return false
  const width = images[0].width
  const height = images[0].height
  const encoder = new GIFEncoder(width, height)
  const stream = encoder.createReadStream()
  const writeStream = fs.createWriteStream(outputPath)
  stream.pipe(writeStream)
  encoder.start()
  encoder.setRepeat(0)
  encoder.setDelay(800)
  encoder.setQuality(10)
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')
  for (const img of images) {
    ctx.drawImage(img, 0, 0, width, height)
    encoder.addFrame(ctx)
  }
  encoder.finish()
  return new Promise((resolve) => {
    writeStream.on('finish', () => resolve(true))
    writeStream.on('error', () => resolve(false))
  })
}

async function main() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    console.log('Pasta screenshots/ nao encontrada. Execute os testes primeiro.')
    return
  }

  let totalGifs = 0

  const entries = fs.readdirSync(SCREENSHOTS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())

  if (entries.length === 0) {
    console.log('Nenhuma pasta de screenshots encontrada em', SCREENSHOTS_DIR)
    return
  }

  for (const entry of entries) {
    const entryPath = path.join(SCREENSHOTS_DIR, entry.name)
    const subs = fs.readdirSync(entryPath, { withFileTypes: true }).filter(d => d.isDirectory())

    if (subs.length > 0) {
      for (const sub of subs) {
        const specPath = path.join(entryPath, sub.name)
        const pngFiles = fs.readdirSync(specPath).filter(f => f.endsWith('.png')).sort().map(f => path.join(specPath, f))
        if (pngFiles.length >= 2) {
          const gifName = `${sub.name.replace('.cy.js', '')}.gif`
          const gifPath = path.join(specPath, gifName)
          const result = await generateGif(pngFiles, gifPath)
          if (result) { totalGifs++; console.log(`  GIF: ${entry.name}/${gifName} (${pngFiles.length} frames)`) }
        }
      }
    } else {
      const pngFiles = waitForFiles(entryPath, '.png')
      if (pngFiles.length >= 2) {
        const gifName = `${entry.name.replace('.cy.js', '')}.gif`
        const gifPath = path.join(entryPath, gifName)
        const result = await generateGif(pngFiles.map(f => path.join(entryPath, f)), gifPath)
        if (result) { totalGifs++; console.log(`  GIF: ${gifName} (${pngFiles.length} frames)`) }
      }
    }
  }

  console.log(`\nTotal: ${totalGifs} GIFs gerados`)
  if (totalGifs === 0) {
    console.log('Nenhum GIF foi gerado. Verifique se ha screenshots PNG nas pastas:')
    console.log(`  ${SCREENSHOTS_DIR}`)
    console.log('Necessario no minimo 2 screenshots por spec para gerar um GIF.')
  }
}

main().catch(console.error)
