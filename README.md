# Boutique - E-commerce Fashion Store

A complete e-commerce web application built with Django (backend) and React (frontend) with admin and user authentication, product management, shopping cart, and order placement functionality.

## 🎯 Features

### Admin Panel
- **Authentication**: Secure login and registration
- **Product Management**: Add, edit, and delete products with:
  - Product name
  - Description
  - Price (USD)
  - Available sizes
  - Product image upload
- **Order Management**: View all orders and update order status (Pending, Processing, Shipped, Delivered)
- **Dashboard**: Overview of statistics

### User Panel
- **Authentication**: Register and login
- **Product Browsing**: View all available products from sellers
- **Shopping Cart**: Add/remove products, update quantities
- **Checkout**: Easy checkout process
- **Order Tracking**: View order history and status
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Database
- SQLite (development) / MySQL (production support)
- Secure data storage with proper relationships

## 📁 Project Structure

```
shopy_procx/
├── backend/
│   ├── requirements.txt
│   └── boutique_store/
│       ├── manage.py
│       ├── boutique_store/
│       │   ├── __init__.py
│       │   ├── settings.py
│       │   ├── urls.py
│       │   └── wsgi.py
│       └── store/
│           ├── models.py (Product, User, Cart, Order)
│           ├── views.py (API endpoints)
│           ├── serializers.py
│           ├── urls.py
│           ├── admin.py
│           └── apps.py
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── Navbar.js
        │   ├── ProductCard.js
        │   ├── AddProductModal.js
        │   └── ProtectedRoute.js
        ├── context/
        │   ├── AuthContext.js
        │   └── CartContext.js
        ├── pages/
        │   ├── Home.js
        │   ├── Login.js
        │   ├── Register.js
        │   ├── Shop.js
        │   ├── Cart.js
        │   ├── Checkout.js
        │   ├── OrderSuccess.js
        │   ├── MyOrders.js
        │   └── AdminDashboard.js
        ├── services/
        │   └── api.js
        ├── styles/
        │   └── (CSS files for all pages)
        ├── App.js
        └── index.js
```

## 🚀 Getting Started

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend/boutique_store
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # On Windows
   # or
   source venv/bin/activate      # On macOS/Linux
   ```

3. **Install dependencies**:
   ```bash
   pip install -r ../requirements.txt
   ```

4. **Run migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a superuser** (for Django admin):
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the development server**:
   ```bash
   python manage.py runserver
   ```
   The backend will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## 🔐 Authentication

### User Roles

- **Admin**: Can add/edit/delete products and manage orders
- **User**: Can browse products, add to cart, and place orders

### Login Credentials (Example)

**Test Admin Account**:
- Username: `admin`
- Password: Create using `createsuperuser` command
- Role: Admin

**Test User Account**:
- Create via registration page
- Select "User (Customer)" as role

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register/` - Register user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/logout/` - Logout user

### Products
- `GET /api/products/all_products/` - Get all products (for users)
- `GET /api/products/user_products/` - Get own products (for admin)
- `POST /api/products/` - Create product (admin only)
- `PATCH /api/products/{id}/` - Update product (admin only)
- `DELETE /api/products/{id}/` - Delete product (admin only)

### Cart
- `GET /api/cart/get_cart/` - Get user's cart
- `POST /api/cart/add_item/` - Add item to cart
- `POST /api/cart/update_item/` - Update cart item
- `DELETE /api/cart/remove_item/` - Remove item from cart
- `DELETE /api/cart/clear_cart/` - Clear entire cart

### Orders
- `GET /api/orders/` - Get user's orders
- `GET /api/orders/admin_orders/` - Get all orders (admin only)
- `POST /api/orders/create_order/` - Create order from cart
- `PATCH /api/orders/{id}/update_status/` - Update order status (admin only)

## 🎨 UI Features

- **Modern Design**: Clean, contemporary interface with gradient colors
- **Responsive Layout**: Mobile-first approach for all devices
- **Interactive Components**: Smooth animations and transitions
- **Form Validation**: Client-side validation with error messages
- **Status Indicators**: Visual feedback for order statuses
- **Image Support**: Product image upload and display

## 🔒 Security Features

- Token-based authentication (Django REST Framework)
- CORS configuration
- Protected routes (React)
- Password hashing
- User role-based access control

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- **Desktop**: Full-width layouts with optimized spacing
- **Tablet**: Adjusted grid layouts
- **Mobile**: Single column layouts with touch-friendly buttons

## 🛠 Technologies Used

### Backend
- **Python 3.9+**
- **Django 4.2**
- **Django REST Framework 3.14**
- **Pillow** (Image handling)
- **SQLite** (Development)

### Frontend
- **React 18.2**
- **React Router DOM 6.11**
- **Axios** (API calls)
- **CSS3** (Styling with gradients and animations)

## 📝 Environment Variables

Update `backend/boutique_store/boutique_store/settings.py`:
- `SECRET_KEY`: Change from default (use a secure key in production)
- `DEBUG`: Set to `False` in production
- `ALLOWED_HOSTS`: Add your domain

## 🐛 Troubleshooting

### CORS Issues
If you get CORS errors:
1. Make sure backend runs on `http://localhost:8000`
2. Make sure frontend runs on `http://localhost:3000`
3. Check `CORS_ALLOWED_ORIGINS` in settings.py

### Database Issues
Reset the database:
```bash
# Delete db.sqlite3
# Run migrations again
python manage.py migrate
```

### Image Upload Issues
Ensure `media/` folder exists in backend directory.

## 📞 Support

For issues or questions, check the logs and ensure:
1. Both backend and frontend servers are running
2. Database migrations are complete
3. Static files are properly configured
4. API endpoints are correctly called with proper authentication headers

## 📄 License

This project is open source and available for educational purposes.

---

**Happy Shopping!** 🛍️
