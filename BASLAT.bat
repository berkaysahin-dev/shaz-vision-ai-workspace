@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
title Shaz Vision AI Workspace - Masaustu Calisma Alani (by Shaz Vision)
color 0b
cls

cd /d "%~dp0"

echo ================================================================
echo           SHAZ VISION AI WORKSPACE - MASAUSTU AI ALANI
echo                     by Shaz Vision (shazvision.com)
echo ================================================================
echo.
if not exist ".env" (
    if exist ".env.example" (
        echo [INFO] .env dosyasi olusturuluyor...
        copy /Y .env.example .env >nul
    )
)

if not exist "node_modules" (
    echo [1/3] Paketler yukleniyor (npm install)...
    call npm.cmd install
    if errorlevel 1 (
        echo [HATA] npm install basarisiz oldu!
        pause
        exit /b %errorlevel%
    )
)

echo [2/3] Tarayici otomatik acilisi hazirlaniyor...
start /b cmd /c "powershell -Command ""$i=0; while($i -lt 35){ try { if((Invoke-WebRequest -Uri 'http://localhost:5173' -UseBasicParsing -TimeoutSec 1).StatusCode -eq 200){ Start-Process 'http://localhost:5173'; break } } catch {}; Start-Sleep -Milliseconds 800; $i++ }"""

echo [3/3] Shaz Vision AI Workspace - Masaustu Calisma Alani Baslatiliyor...
echo.
echo ----------------------------------------------------------------
echo   Uygulama Adresi: http://localhost:5173
echo   Durdurmak icin bu konsol penceresini kapatabilirsiniz.
echo ----------------------------------------------------------------
echo.
call npm.cmd run dev

if errorlevel 1 (
    echo.
    echo [HATA] Uygulama beklenmedik sekilde kapandi.
    pause
)
