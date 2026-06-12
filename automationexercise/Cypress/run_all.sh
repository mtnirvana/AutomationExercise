#!/bin/bash
# ============================================
#  RUN ALL - Automation Exercise Test Suite
#  Executa todos os testes, gera GIFs e
#  relatorios (Allure + k6)
#  Linux / macOS / WSL / Git Bash
# ============================================
set -e

cd "$(dirname "$0")"

echo "============================================"
echo "    EXECUTANDO TODOS OS TESTES"
echo "    $(date)"
echo "============================================"
echo ""

mkdir -p cypress/allure/allure-results
mkdir -p cypress/reports/k6

# === 1. Cypress ===
echo "[1/5] Cypress (E2E + API + Core Web Vitals)..."
npx cypress run --browser chromium
echo ""

# === 2. GIFs animados ===
echo "[2/5] Gerando GIFs animados a partir das screenshots..."
node scripts/gerar_gifs.js
echo ""

# === 3. k6 (carga, estresse, pico - ~25min total) ===
echo "[3/5] Limpando reports anteriores e executando k6 Performance..."
rm -rf cypress/reports/k6
mkdir -p cypress/reports/k6
echo "NOTA: Os testes de carga levam varios minutos cada um."
echo "      Se um teste parecer travado, aguarde - ele esta gerando"
echo "      requisicoes simultaneas para medir a performance."
echo ""

PASS=0
FAIL=0
for f in cypress/e2e/performance/TC_PF_*.js; do
  if [[ "$f" != *.cy.js ]]; then
    echo "[k6] Rodando: $(basename "$f" .js)..."
    k6 run "$f" --quiet --summary-export="cypress/reports/k6/$(basename "$f" .js).json"
    if [ $? -eq 0 ]; then
      PASS=$((PASS + 1))
    else
      FAIL=$((FAIL + 1))
    fi
    echo "[k6] $(basename "$f" .js) concluido."
  fi
done
echo "k6: $PASS pass, $FAIL fail"
echo ""

# === 4. k6 para Allure ===
echo "[4/5] Convertendo k6 para Allure..."
cd cypress/allure
node scripts/convert_k6_to_allure.js
cd ../..
echo ""

# === 5. Allure Generate ===
echo "[5/5] Gerando relatorio Allure completo..."
cd cypress/allure
mkdir -p allure-results
cp -f allure.properties allure-results/allure.properties 2>/dev/null || true
if [ -d "allure-report/history" ]; then
  mkdir -p allure-results/history
  cp -f allure-report/history/*.json allure-results/history/ 2>/dev/null || true
fi
npx allure generate --clean -o allure-report allure-results --lang br --name "AutomationExercise"
cd ../..
echo ""

echo "============================================"
echo "   CONCLUIDO"
echo "   Relatorio Allure: allure-report/ (ou atalho em docs/Relatorio_Testes.lnk)"
echo "   Abra: http://localhost:8765 (ou sirva com: cd cypress/allure && npx allure serve allure-results -p 8765 --lang br --name \"AutomationExercise\")"
echo "============================================"
read -p "Pressione Enter para continuar..."