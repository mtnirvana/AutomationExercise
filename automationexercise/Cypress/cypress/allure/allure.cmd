@echo off
setlocal EnableExtensions
set DIRNAME=%~dp0
for %%i in ("%DIRNAME%") do set SHORT_DIR=%%~fsi
set ALLURE_OPTS=-Dallure.report.theme=dark -Dallure.report.language=pt
"%SHORT_DIR%node_modules\.bin\allure" %*
endlocal
