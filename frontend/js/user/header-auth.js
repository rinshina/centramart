// Header authentication logic
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let userName = localStorage.getItem('userName');

// Initialize UI state on page load
function initializeAuthState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');
    
    const loginBtn = document.querySelector('.login-btn');
    const userGreeting = document.querySelector('.user-greeting');
    
    if (!loginBtn || !userGreeting) return;
    
    if (isLoggedIn && userName) {
        loginBtn.classList.add('d-none');
        userGreeting.classList.remove('d-none');
        userGreeting.textContent = `Hi, ${userName}!`;
    } else {
        loginBtn.classList.remove('d-none');
        userGreeting.classList.add('d-none');
    }
}

// Check login status and redirect or show modal
function checkLoginAndRedirect(url) {
    if (isLoggedIn) {
        window.location.href = url;
    } else {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    }
}

// Handle login success for users
function handleLoginSuccess() {
    isLoggedIn = true;
    const userName = localStorage.getItem('userName') || 'User';
    localStorage.setItem('isLoggedIn', 'true');
    
    const loginBtn = document.querySelector('.login-btn');
    const userGreeting = document.querySelector('.user-greeting');
    
    if (loginBtn) loginBtn.classList.add('d-none');
    if (userGreeting) {
        userGreeting.classList.remove('d-none');
        const button = userGreeting.querySelector('button');
        if (button) button.textContent = `Hi, ${userName}!`;
    }
    
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (loginModal) loginModal.hide();
}

// Handle logout
function logout() {
    isLoggedIn = false;
    userName = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    
    const loginBtn = document.querySelector('.login-btn');
    const userGreeting = document.querySelector('.user-greeting');
    
    if (loginBtn) loginBtn.classList.remove('d-none');
    if (userGreeting) userGreeting.classList.add('d-none');
    
    window.location.href = 'index.html';
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAuthState();
    
    document.addEventListener('submit', function(e) {
        if (e.target && e.target.id === 'loginForm') {
            e.preventDefault();
            
            const email = e.target.querySelector('#loginEmail').value;
            const password = e.target.querySelector('#loginPassword').value;
            
            // Admin credentials - redirect to admin dashboard
            if (email === 'admin@centramart.com' && password === 'admin123') {
                localStorage.setItem('userType', 'admin');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', 'Admin');
                alert('Admin login successful! Redirecting to admin dashboard...');
                setTimeout(() => {
                    window.location.href = '../admin/dashboard.html';
                }, 1000);
            }
            // User credentials - stay on user side
            else if (email === 'user@centramart.com' && password === 'user123') {
                localStorage.setItem('userType', 'user');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', 'Rinshina');
                handleLoginSuccess();
            } else {
                alert('Invalid credentials!\n\nUser Login:\nEmail: user@centramart.com\nPassword: user123\n\nAdmin Login:\nEmail: admin@centramart.com\nPassword: admin123');
            }
        }
    });
    
    document.addEventListener('submit', function(e) {
        if (e.target && e.target.id === 'signupForm') {
            e.preventDefault();
            handleLoginSuccess();
        }
    });
    

});