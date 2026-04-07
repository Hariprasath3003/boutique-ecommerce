#!/bin/bash

echo "========================================"
echo "BOUTIQUE E-COMMERCE DEPLOYMENT HELPER"
echo "========================================"
echo
echo "This script will help you prepare your project for deployment."
echo
echo "Step 1: Make sure your code is pushed to GitHub"
echo "Step 2: Follow the deployment guide in DEPLOYMENT_GUIDE.txt"
echo
read -p "Press Enter to continue..."

echo
echo "Checking project structure..."
if [ -f "backend/boutique_store/manage.py" ]; then
    echo "✓ Backend structure looks good"
else
    echo "✗ Backend structure issue - check boutique_store directory"
fi

if [ -f "frontend/package.json" ]; then
    echo "✓ Frontend structure looks good"
else
    echo "✗ Frontend structure issue - check package.json"
fi

echo
echo "Creating deployment-ready files..."

# Create render.yaml for backend
cat > backend/render.yaml << 'EOF'
services:
  - type: web
    name: boutique-backend
    runtime: python3
    buildCommand: "pip install -r requirements.txt"
    startCommand: "cd boutique_store && python manage.py runserver 0.0.0.0:$PORT"
    envVars:
      - key: DJANGO_SETTINGS_MODULE
        value: boutique_store.settings
      - key: SECRET_KEY
        value: change-this-to-your-actual-secret-key
      - key: DEBUG
        value: False
      - key: DATABASE_URL
        value: sqlite:///db.sqlite3
EOF
echo "✓ Created backend/render.yaml"

# Create vercel.json for frontend
cat > frontend/vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
EOF
echo "✓ Created frontend/vercel.json"

echo
echo "IMPORTANT: Before deploying, you need to:"
echo "1. Replace 'change-this-to-your-actual-secret-key' in render.yaml with a real secret key"
echo "2. Update CORS_ALLOWED_ORIGINS in Django settings.py with your frontend URL"
echo "3. Push these changes to GitHub"
echo
echo "Ready to deploy! Check DEPLOYMENT_GUIDE.txt for detailed instructions."
echo
read -p "Press Enter to exit..."</content>
<parameter name="filePath">e:\shopy procx\prepare_deployment.sh