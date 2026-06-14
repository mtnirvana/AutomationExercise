const fs = require('fs')
const path = require('path')

const outputDir = process.env.ALLURE_OUTPUT_DIR
  ? path.resolve(process.env.ALLURE_OUTPUT_DIR)
  : path.join(__dirname, '..', 'allure-report')
const indexPath = path.join(outputDir, 'index.html')
if (!fs.existsSync(indexPath)) {
  console.log(`index.html not found at ${indexPath}, skipping dark mode injection`)
  process.exit(0)
}

let html = fs.readFileSync(indexPath, 'utf-8')

const script = '<script>localStorage.setItem("allure-theme","dark")</script>'

if (html.includes('allure-theme')) {
  console.log('Dark mode already injected')
  process.exit(0)
}

html = html.replace('<script', script + '\n<script')

fs.writeFileSync(indexPath, html)
console.log('Dark mode script injected into index.html')
