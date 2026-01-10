@echo off
echo ========================================
echo Video Streaming Application Setup
echo ========================================
echo.

echo Step 1: Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
cd ..

echo.
echo Step 2: Installing Frontend Dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Set up MongoDB (see SETUP.md)
echo 2. Set up Cloudinary (see SETUP.md)
echo 3. Copy backend/.env.example to backend/.env and configure
echo 4. Copy frontend/.env.example to frontend/.env and configure
echo 5. Run 'start.bat' to start the application
echo.
pause
