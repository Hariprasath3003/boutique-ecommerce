@echo off
REM Quick start script for Windows

echo === Boutique Store - Quick Start ===
echo.

REM Backend setup
echo Starting backend setup...
cd backend\boutique_store

REM Create virtual environment
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install requirements
echo Installing dependencies...
pip install -q -r ..\..\requirements.txt

REM Run migrations
echo Running migrations...
python manage.py migrate --noinput

REM Start backend in new window
echo Starting Django server...
start cmd /k "python manage.py runserver"

timeout /t 2 /nobreak

REM Change to frontend directory
cd ..\..\frontend

REM Install node modules
if not exist "node_modules" (
    echo Installing frontend dependencies...
    npm install
)

REM Start frontend in new window
echo Starting React development server...
start cmd /k "npm start"

echo.
echo === Services Started ===
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo Admin:    http://localhost:8000/admin
echo.
echo Close command windows to stop services
echo.
