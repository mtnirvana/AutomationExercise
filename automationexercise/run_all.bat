@echo off
REM ============================================
REM  RUN ALL - Automation Exercise Test Suite
REM  Executa todos os testes, gera GIFs e
REM  relatorios (Allure + k6)
REM  Uso: run_all.bat (da pasta automationexercise/)
REM ============================================
setlocal enabledelayedexpansion

cd /d "%~dp0\Cypress"

echo ============================================
echo    EXECUTANDO TODOS OS TESTES
echo    %date% - %time%
echo ============================================
echo.

if not exist "cypress\allure\allure-results" mkdir "cypress\allure\allure-results"
if not exist "cypress\reports\k6" mkdir "cypress\reports\k6"

REM === 1. Cypress ===
echo [1/5] Cypress (E2E + API + Performance)...
call npx cypress run --browser edge
echo.

REM === 2. GIFs animados ===
echo [2/5] Gerando GIFs animados a partir das screenshots...
node scripts\gerar_gifs.js
echo.

REM === 3. k6 (carga, estresse, pico - ~25min total) ===
echo [3/5] Limpando reports anteriores e executando k6 Performance...
if exist "cypress\reports\k6" rmdir /s /q "cypress\reports\k6"
mkdir "cypress\reports\k6"
echo NOTA: Os testes de carga levam varios minutos cada um.
echo       Se um teste parecer travado, aguarde - ele esta gerando
echo       requisicoes simultaneas para medir a performance.
echo.
set K6_REPORT=cypress\reports\k6
set PASS=0
set FAIL=0
for %%f in (cypress\e2e\performance\TC_PF_*.js) do (
  echo %%f | findstr /v /c:".cy.js" >nul
  if not errorlevel 1 (
    echo [k6] Rodando: %%~nf...
    k6 run "%%f" --quiet --summary-export="%K6_REPORT%\%%~nf.json"
    if !errorlevel! equ 0 ( set /a PASS+=1 ) else ( set /a FAIL+=1 )
    echo [k6] %%~nf concluido.
  )
)
echo k6: %PASS% pass, %FAIL% fail
echo.

REM === 4. k6 para Allure ===
echo [4/5] Convertendo k6 para Allure...
cd cypress\allure
call node scripts\convert_k6_to_allure.js
cd ..\..\
echo.

REM === 5. Allure Generate ===
echo [5/5] Gerando relatorio Allure completo...
cd cypress\allure
if not exist "allure-results" mkdir "allure-results"
copy /y allure.properties allure-results\allure.properties >nul 2>&1
copy /y categories.json allure-results\categories.json >nul 2>&1
if exist "allure-report\history" (
  if not exist "allure-results\history" mkdir "allure-results\history"
  copy /y "allure-report\history\*.json" "allure-results\history\" >nul 2>&1
)
call allure.cmd generate --clean -o allure-report allure-results --lang br --name "AutomationExercise"
cd ..\..\
echo.

echo ============================================
echo   CONCLUIDO
echo   Relatorio Allure: allure-report\ (ou atalho em docs\Relatorio_Testes.lnk)
echo   Abra: http://localhost:8765 (ou sirva com: cd cypress\allure ^&^& allure.cmd serve allure-results -p 8765 --lang br --name "AutomationExercise")
echo ============================================
pause