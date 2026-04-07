@echo off
echo ========================================
echo BOUTIQUE E-COMMERCE DEPLOYMENT HELPER
echo ========================================
echo.
echo This script will help you prepare your project for deployment.
echo.
echo Step 1: Make sure your code is pushed to GitHub
echo Step 2: Follow the deployment guide in DEPLOYMENT_GUIDE.txt
echo.
echo Press any key to continue...
pause > nul

echo.
echo Checking project structure...
if exist "backend\boutique_store\manage.py" (
    echo ✓ Backend structure looks good
) else (
    echo ✗ Backend structure issue - check boutique_store directory
)

if exist "frontend\package.json" (
    echo ✓ Frontend structure looks good
) else (
    echo ✗ Frontend structure issue - check package.json
)

echo.
echo Creating deployment-ready files...

REM Create render.yaml for backend
echo services: > backend\render.yaml
echo   - type: web >> backend\render.yaml
echo     name: boutique-backend >> backend\render.yaml
echo     runtime: python3 >> backend\render.yaml
echo     buildCommand: "pip install -r requirements.txt" >> backend\render.yaml
echo     startCommand: "cd boutique_store && python manage.py runserver 0.0.0.0:$PORT" >> backend\render.yaml
echo     envVars: >> backend\render.yaml
echo       - key: DJANGO_SETTINGS_MODULE >> backend\render.yaml
echo         value: boutique_store.settings >> backend\render.yaml
echo       - key: SECRET_KEY >> backend\render.yaml
echo         value: change-this-to-your-actual-secret-key >> backend\render.yaml
echo       - key: DEBUG >> backend\render.yaml
echo         value: False >> backend\render.yaml
echo       - key: DATABASE_URL >> backend\render.yaml
echo         value: sqlite:///db.sqlite3 >> backend\render.yaml
echo ✓ Created backend/render.yaml

REM Create vercel.json for frontend
echo { > frontend\vercel.json
echo   "version": 2, >> frontend\vercel.json
echo   "builds": [ >> frontend\vercel.json
echo     { >> frontend\vercel.json
echo       "src": "package.json", >> frontend\vercel.json
echo       "use": "@vercel/static-build", >> frontend\vercel.json
echo       "config": { >> frontend\vercel.json
echo         "distDir": "build" >> frontend\vercel.json
echo       } >> frontend\vercel.json
echo     } >> frontend\vercel.json
echo   ], >> frontend\vercel.json
echo   "routes": [ >> frontend\vercel.json
echo     { >> frontend\vercel.json
echo       "src": "/(.*)", >> frontend\vercel.json
echo       "dest": "/index.html" >> frontend\vercel.json
echo     } >> frontend\vercel.json
echo   ] >> frontend\vercel.json
echo } >> frontend\vercel.json
echo ✓ Created frontend/vercel.json

echo.
echo IMPORTANT: Before deploying, you need to:
echo 1. Replace 'change-this-to-your-actual-secret-key' in render.yaml with a real secret key
echo 2. Update CORS_ALLOWED_ORIGINS in Django settings.py with your frontend URL
echo 3. Push these changes to GitHub
echo.
echo Ready to deploy! Check DEPLOYMENT_GUIDE.txt for detailed instructions.
echo.
pause</content>
<parameter name="filePath">e:\shopy procx\prepare_deployment.bat