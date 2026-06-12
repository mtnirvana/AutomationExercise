@echo off
cd /d "%~dp0"
echo ============================================
echo   Allure Report - AutomationExercise
echo ============================================
echo.
where allure >nul 2>&1
if %errorlevel% equ 0 (
  allure open . -p 8765
) else (
  where npx >nul 2>&1
  if %errorlevel% equ 0 (
    npx -y allure-commandline allure open . -p 8765
  ) else (
    echo Instale Node.js ou Allure CLI.
    pause
    exit /b 1
  )
)
