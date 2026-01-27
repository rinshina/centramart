// Common admin authentication check
function checkAdminAuth() {
    if (localStorage.getItem('userType') !== 'admin') {
        alert('Access denied. Please login as admin.');
        window.location.href = '../user/index.html';
        return false;
    }
    return true;
}

// Load sidebar with authentication check
function loadAdminSidebar(activePage) {
    if (!checkAdminAuth()) return;
    
    fetch('partials/admin-sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-placeholder').innerHTML = data;
            if (activePage) {
                const activeElement = document.querySelector(`[data-page="${activePage}"]`);
                if (activeElement) activeElement.classList.add('active');
            }
        });
}

// Initialize admin page
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAuth();
});