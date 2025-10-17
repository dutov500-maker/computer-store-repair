@echo off
echo ========================================
echo   Запуск локального сервера разработки
echo ========================================
echo.

REM Проверка установки Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ОШИБКА] Node.js не установлен!
    echo Скачайте с https://nodejs.org/
    pause
    exit /b 1
)

REM Проверка установки зависимостей локального сервера
if not exist "local-server\node_modules" (
    echo [1/4] Установка зависимостей локального сервера...
    cd local-server
    call npm install
    cd ..
    echo.
) else (
    echo [1/4] Зависимости локального сервера уже установлены
    echo.
)

REM Переключение на локальную базу
echo [2/4] Переключение на локальную базу данных...
node scripts/switch-api.js local
echo.

REM Запуск локального сервера в новом окне
echo [3/4] Запуск локального API сервера...
start "API Server" cmd /k "cd local-server && npm start"
timeout /t 3 /nobreak >nul
echo.

REM Запуск frontend
echo [4/4] Запуск frontend...
echo.
echo ========================================
echo   Готово! Сервер запускается...
echo ========================================
echo.
echo Локальный сервер: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Для остановки закройте оба окна терминала
echo.
npm run dev

pause
