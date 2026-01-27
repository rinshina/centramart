# CentraMart Authentication System

## Login Credentials

### User Login (Customer Side)
- **Email:** user@centramart.com
- **Password:** user123
- **Access:** User dashboard, shopping features, account management

### Admin Login (Admin Panel)
- **Email:** admin@centramart.com  
- **Password:** admin123
- **Access:** Admin dashboard, order management, product management, system settings

## How It Works

1. **Homepage:** Both users and admins start at `/user/index.html`
2. **Login Modal:** Shows both user and admin credentials
3. **Authentication:** 
   - User credentials → Stay on user side with logged-in state
   - Admin credentials → Redirect to `/admin/dashboard.html`
4. **Protection:** All admin pages check for `userType === 'admin'`
5. **Logout:** Clears localStorage and redirects to homepage

## Files Modified

### User Side
- `/user/modals/login-modal.html` - Added both credentials
- `/js/user/header-auth.js` - Handles both user and admin login

### Admin Side  
- `/admin/partials/admin-sidebar.html` - Updated navigation and logout
- `/js/admin/auth.js` - Common authentication check
- All admin pages - Added authentication protection

## Usage
1. Go to `/user/index.html`
2. Click Login
3. Use either credential set
4. Get redirected to appropriate dashboard