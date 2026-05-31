@echo off
cd /d "%~dp0"
echo.
echo ============================================
echo   Allure Report - AutomationExercise
echo ============================================
echo.
if not exist "allure-report\index.html" (
  echo Gerando relatorio Allure...
  call npm run generate
)
echo Iniciando servidor em http://localhost:8765 ...
echo.
start "Allure Server" /MIN cmd /c "npm run open"
timeout /t 4 /nobreak >nul
start http://localhost:8765
echo.
echo Servidor rodando em http://localhost:8765
echo Feche esta janela para parar o servidor.
echo ============================================
echo.
pause >nul
taskkill /f /fi "WINDOWTITLE eq Allure Server" >nul 2>&1
