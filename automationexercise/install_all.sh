#!/bin/bash
# =============================================
#  Install ALL dependencies for Automation Exercise
#  Usage: bash install_all.sh
# =============================================
set -e

echo "=== Instalando dependencias Node.js ==="
cd "$(dirname "$0")/Cypress"
npm install

echo ""
echo "=== Verificando/Instalando k6 ==="
if command -v k6 &> /dev/null; then
  echo "k6 ja instalado: $(k6 version)"
else
  echo "Instale k6 manualmente: https://grafana.com/docs/k6/latest/set-up/install/"
fi

echo ""
echo "=== Instalando Playwright CLI (para self-healing) ==="
npx playwright-cli --version 2>/dev/null || npx playwright-cli --help > /dev/null 2>&1
echo "Playwright CLI disponivel via npx"

echo ""
echo "=== Instalando Allure (relatorios interativos) ==="
cd "$(dirname "$0")/Cypress/cypress/allure"
npm install
echo "Allure instalado em Cypress/cypress/allure/"
echo "Para ver o relatorio: cd Cypress/cypress/allure && npm run serve"

echo ""
echo "=== Instalacao concluida ==="
echo "Execute os testes com: cd Cypress && run_all.bat"
echo "Veja o relatorio Allure: cd Cypress/cypress/allure && npm run serve (http://localhost:8765)"
