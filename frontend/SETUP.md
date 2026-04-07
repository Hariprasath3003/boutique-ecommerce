# Frontend Setup Instructions

## Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation Steps

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm start
```

Frontend will start at: `http://localhost:3000`

## Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Environment Configuration

If needs be, you can modify the API base URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

## Important: Running Both Services

Make sure to run both backend and frontend:

**Terminal 1 (Backend)**:
```bash
cd backend/boutique_store
python manage.py runserver
```

**Terminal 2 (Frontend)**:
```bash
cd frontend
npm start
```

## Features

✅ User Registration & Login
✅ Product Browsing
✅ Shopping Cart
✅ Order Checkout
✅ Order History
✅ Admin Dashboard (for sellers)
✅ Product Management
✅ Responsive Design

## Troubleshooting

### npm ERR! missing script: "start"
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

### CORS Error
- Ensure backend is running on `http://localhost:8000`
- Check that frontend sends requests to correct API URL

### Images Not Loading
- Ensure backend is serving media files correctly
- Check browser console for 404 errors

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Works on mobile browsers too!
