@echo off
REM ============================================
REM  Install ALL dependencies for Automation Exercise
REM  Usage: install_all.bat
REM  Windows (CMD / PowerShell)
REM ============================================
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo ============================================
echo  Instalando dependencias Node.js
echo ============================================
npm install

echo.
echo ============================================
echo  Verificando/Instalando k6
echo ============================================
where k6 >nul 2>&1
if %errorlevel% equ 0 (
    echo k6 ja instalado:
    k6 version
) else (
    echo k6 NAO encontrado no PATH.
    echo Instale manualmente: https://grafana.com/docs/k6/latest/set-up/install/
    echo Opcoes Windows:
    echo   winget install Grafana.k6
    echo   choco install k6
    echo   scoop install k6
)

echo.
echo ============================================
echo  Instalando Playwright CLI (para self-healing)
echo ============================================
npx playwright-cli --version >nul 2>&1 || npx playwright-cli --help >nul 2>&1
echo Playwright CLI disponivel via npx
echo Para instalar browsers: npx playwright-cli install-browser

echo.
echo ============================================
echo  Instalando Allure (relatorios interativos)
echo ============================================
cd cypress\allure
npm install
cd ..\..
echo Allure instalado em Cypress\cypress\allure\
echo Para ver o relatorio: cd cypress\allure && npx allure serve allure-results --lang br --name "AutomationExercise"

echo.
echo ============================================
echo  Instalacao concluida
echo ============================================
echo Execute os testes com: run_all.bat
echo Veja o relatorio Allure: cd cypress\allure && npx allure serve allure-results --lang br --name "AutomationExercise" (http://localhost:8765)
pause