#!/bin/bash
# Quick start script for Unix/Linux/macOS

echo "=== Boutique Store - Quick Start ==="
echo ""

# Backend setup
echo "Starting backend setup..."
cd backend/boutique_store

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install requirements
echo "Installing dependencies..."
pip install -q -r ../../requirements.txt

# Run migrations
echo "Running migrations..."
python manage.py migrate --noinput

# Start backend
echo "Starting Django server..."
python manage.py runserver &
BACKEND_PID=$!

# Change to frontend directory
cd ../../frontend

# Install node modules
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Start frontend
echo "Starting React development server..."
npm start &
FRONTEND_PID=$!

echo ""
echo "=== Services Started ==="
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "Admin:    http://localhost:8000/admin"
echo ""
echo "Press Ctrl+C to stop services"
echo ""

# Keep script running
wait $BACKEND_PID $FRONTEND_PID
