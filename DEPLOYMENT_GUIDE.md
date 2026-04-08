# Boutique E-Commerce Deployment Guide

## Overview
This guide will help you deploy your boutique e-commerce application (Django backend + React frontend) for free using cloud platforms.

## Prerequisites
- GitHub account
- Git installed locally
- Project code pushed to GitHub repository

## Option 1: Recommended Free Stack (Vercel + Render)

### 1. Backend Deployment (Render)

#### Step 1: Prepare Backend for Deployment
1. Create a `requirements.txt` file in your backend directory if it doesn't exist:
```
Django==4.2.7
djangorestframework==3.14.0
django-cors-headers==4.3.1
Pillow==10.1.0
djangorestframework-simplejwt==5.3.0
```

2. Create a `render.yaml` file in your backend root:
```yaml
services:
  - type: web
    name: boutique-backend
    runtime: python3
    buildCommand: "pip install -r requirements.txt"
    startCommand: "python boutique_store/manage.py runserver 0.0.0.0:$PORT"
    envVars:
      - key: DJANGO_SETTINGS_MODULE
        value: boutique_store.settings
      - key: SECRET_KEY
        value: your-secret-key-here
      - key: DEBUG
        value: False
      - key: DATABASE_URL
        value: sqlite:///db.sqlite3
```

#### Step 2: Deploy to Render
1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: boutique-backend
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `cd boutique_store && python manage.py migrate && python manage.py runserver 0.0.0.0:$PORT`
5. Add environment variables:
   - `DJANGO_SETTINGS_MODULE=boutique_store.settings`
   - `SECRET_KEY=your-super-secret-key-here`
   - `DEBUG=False`
   - `ALLOWED_HOSTS=*`
6. Click "Create Web Service"

### 2. Frontend Deployment (Vercel)

#### Step 1: Prepare Frontend for Deployment
1. Update your API calls to use the Render backend URL:
   - In `frontend/src/services/api.js`, change the baseURL to your Render backend URL

2. Create a `vercel.json` file in your frontend root:
```json
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
```

#### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: build
5. Add environment variables:
   - `REACT_APP_API_BASE_URL=https://boutique-ecommerce-ydch.onrender.com/api`
   - Or use `REACT_APP_API_URL=https://boutique-ecommerce-ydch.onrender.com/api` for compatibility
6. Click "Deploy"

## Option 2: Alternative Free Stack (Netlify + Railway)

### Backend Deployment (Railway)

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect it's a Python/Django app
5. Add environment variables:
   - `DJANGO_SETTINGS_MODULE=boutique_store.settings`
   - `SECRET_KEY=your-secret-key`
   - `DEBUG=False`
   - `ALLOWED_HOSTS=*`
6. The app will deploy automatically

### Frontend Deployment (Netlify)

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - **Base directory**: frontend
   - **Build command**: `npm run build`
   - **Publish directory**: build
5. Add environment variables:
   - `REACT_APP_API_BASE_URL=https://your-railway-backend-url.up.railway.app/api`
   - Or use `REACT_APP_API_URL` for compatibility
6. Click "Deploy site"

## Environment Variables Setup

### Backend Environment Variables
```
DJANGO_SETTINGS_MODULE=boutique_store.settings
SECRET_KEY=your-super-long-random-secret-key-here
DEBUG=False
ALLOWED_HOSTS=*
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
DATABASE_URL=sqlite:///db.sqlite3
```

### Frontend Environment Variables
```
REACT_APP_API_BASE_URL=https://your-backend-domain.com/api
# OR for compatibility:
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## Post-Deployment Steps

1. **Update CORS settings** in Django:
   - Add your frontend domain to `CORS_ALLOWED_ORIGINS` in settings.py

2. **Run database migrations** on your deployed backend:
   - For Render: Use the service shell to run `python manage.py migrate`
   - For Railway: Use the Railway CLI or web shell

3. **Test the application**:
   - Frontend should load and be able to communicate with backend
   - User registration/login should work
   - Product browsing and cart functionality should work

## Troubleshooting

### Common Issues:

1. **CORS errors**: Make sure `CORS_ALLOWED_ORIGINS` includes your frontend URL
2. **Static files not loading**: Ensure `DEBUG=False` and proper static file configuration
3. **Database connection**: For free tiers, SQLite should work fine
4. **API calls failing**: Check that `REACT_APP_API_URL` is set correctly

### Free Tier Limitations:
- **Render**: 750 hours/month, sleeps after 15 minutes of inactivity
- **Railway**: $5/month credit, then pay-as-you-go
- **Vercel**: Unlimited bandwidth, generous free tier
- **Netlify**: 100GB bandwidth/month, unlimited sites

## Security Notes

1. **Change the SECRET_KEY** to a long, random string
2. **Set DEBUG=False** in production
3. **Use HTTPS** (automatically provided by these platforms)
4. **Configure proper CORS** settings
5. **Consider adding authentication** for admin routes

## Cost Optimization

- Monitor usage to stay within free tiers
- Consider upgrading to paid plans when your app grows
- Use CDN for static assets if needed

## Support

If you encounter issues:
1. Check the deployment platform's logs
2. Verify environment variables are set correctly
3. Test API endpoints directly
4. Check browser console for frontend errors

Happy deploying! 🚀</content>
<parameter name="filePath">e:\shopy procx\DEPLOYMENT_GUIDE.txt