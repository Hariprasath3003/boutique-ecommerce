# Backend Setup Instructions

## Prerequisites
- Python 3.9 or higher
- pip (Python package manager)

## Installation Steps

### 1. Create Virtual Environment
```bash
cd backend/boutique_store
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r ../requirements.txt
```

### 3. Database Setup
```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

### 4. Create Superuser (Admin)
```bash
python manage.py createsuperuser
# Follow prompts to create admin account
```

### 5. Run Development Server
```bash
python manage.py runserver
```

Server will start at: `http://localhost:8000`

## Admin Panel
Access Django admin panel at: `http://localhost:8000/admin/`
Login with superuser credentials created in step 4.

## API Documentation

All API endpoints are available at: `http://localhost:8000/api/`

Authentication uses Token-based auth. Include `Authorization: Token <token>` header in requests.

## Media Files
Product images are stored in `media/products/` directory.
Ensure proper permissions for file uploads.

## Static Files (Production)
Run this command before deploying:
```bash
python manage.py collectstatic
```
