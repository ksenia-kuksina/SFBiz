# 🔐 SFBiz Authentication System Guide

## Overview
The SFBiz application now has a complete authentication system that allows users to register, login, and manage their accounts.

## 🚀 Features

### ✅ What's Working
- **User Registration**: Create new accounts with email and password
- **User Login**: Sign in with existing credentials
- **JWT Tokens**: Secure authentication using JSON Web Tokens
- **Password Hashing**: Secure password storage using bcrypt
- **Session Management**: Automatic token storage and retrieval
- **Database Storage**: User data is saved in SQLite database
- **Frontend Integration**: Full React/Next.js integration

### 🔧 Technical Details
- **Backend**: Flask API with SQLite database
- **Frontend**: Next.js with React Context for state management
- **Security**: bcrypt password hashing, JWT tokens
- **Ports**: Backend on 5001, Frontend on 3000

## 📱 How to Use

### 1. **Registration**
- Navigate to `/register` page
- Enter your email and password (minimum 8 characters)
- Click "Register"
- You'll be automatically logged in and redirected to home

### 2. **Login**
- Navigate to `/login` page
- Enter your email and password
- Click "Login"
- You'll be redirected to home page

### 3. **Logout**
- Click the logout button in the navbar
- Your session will be cleared

## 🧪 Testing

### Backend API Tests
Run the Python test script to verify backend functionality:
```bash
python3 test_registration.py
```

### Frontend Testing
Open the test page in your browser:
```bash
open test_auth.html
```

### Manual Testing
1. **Register a new user**:
   ```bash
   curl -X POST http://localhost:5001/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

2. **Login with existing user**:
   ```bash
   curl -X POST http://localhost:5001/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Get current user info**:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:5001/auth/me
   ```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sample Data
```sql
SELECT id, email, created_at FROM users;
```

## 🔒 Security Features

- **Password Requirements**: Minimum 8 characters
- **Duplicate Prevention**: Cannot register with existing email
- **Secure Hashing**: bcrypt with salt
- **Token Expiration**: JWT tokens expire after 24 hours
- **Input Validation**: Server-side validation of all inputs

## 🚨 Error Handling

### Common Error Codes
- **400**: Bad Request (missing email/password, short password)
- **401**: Unauthorized (invalid credentials)
- **409**: Conflict (email already exists)
- **500**: Internal Server Error

### Frontend Error Display
- All errors are displayed to users in a user-friendly format
- Success messages confirm successful operations
- Loading states prevent multiple submissions

## 🔧 Troubleshooting

### Backend Not Starting
```bash
# Check if port 5001 is available
lsof -i :5001

# Kill existing processes
pkill -f "python3 app.py"

# Restart backend
python3 app.py
```

### Frontend Issues
```bash
# Check if port 3000 is available
lsof -i :3000

# Restart frontend
npm run dev
```

### Database Issues
```bash
# Check database
sqlite3 businesses.db ".tables"
sqlite3 businesses.db "SELECT * FROM users;"

# Reset database (WARNING: deletes all data)
rm businesses.db
python3 -c "from db import init_db; init_db()"
```

## 📁 File Structure

```
SFBizzz/
├── app/
│   ├── register/page.tsx          # Registration page
│   ├── login/page.tsx             # Login page
│   └── layout.tsx                 # Root layout with AuthProvider
├── components/
│   ├── AuthContext.tsx            # Authentication context
│   └── Navbar.tsx                 # Navigation with auth state
├── routes.py                      # Backend API endpoints
├── db.py                          # Database initialization
├── test_registration.py           # Backend tests
└── test_auth.html                 # Frontend test page
```

## 🎯 Next Steps

### Potential Improvements
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Social login (Google, Facebook)
- [ ] Two-factor authentication
- [ ] User profile management
- [ ] Admin user roles

### Integration Points
- [ ] Business ownership verification
- [ ] Review submission authentication
- [ ] User-specific business listings
- [ ] Personalized recommendations

## ✅ Current Status

**FULLY FUNCTIONAL** ✅
- Registration: ✅ Working
- Login: ✅ Working  
- Logout: ✅ Working
- Database: ✅ Working
- Frontend: ✅ Working
- Backend: ✅ Working
- Security: ✅ Working

The authentication system is now complete and ready for production use! 