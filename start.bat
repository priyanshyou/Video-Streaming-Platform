@echo off
echo ========================================
echo Starting Video Streaming Application
echo ========================================
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Application Started!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to open the application in your browser...
pause > nul

start http://localhost:5173

echo.
echo Close this window when you're done (servers will keep running in separate windows)
pause
