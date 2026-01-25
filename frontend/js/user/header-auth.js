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

// Handle login success
function handleLoginSuccess() {
    isLoggedIn = true;
    userName = 'Rinshina';
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', 'Rinshina');
    
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
            handleLoginSuccess();
        }
    });
    
    document.addEventListener('submit', function(e) {
        if (e.target && e.target.id === 'signupForm') {
            e.preventDefault();
            handleLoginSuccess();
        }
    });
    

});