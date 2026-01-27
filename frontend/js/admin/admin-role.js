// Admin Role functionality
document.addEventListener('DOMContentLoaded', function() {
    // Permission checkboxes
    const permissionCheckboxes = document.querySelectorAll('.permission-item input[type="checkbox"]');
    permissionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log(`Permission ${this.id} ${this.checked ? 'granted' : 'revoked'}`);
        });
    });
    
    // Password form validation
    const passwordForm = document.querySelector('.password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newPassword = this.querySelector('input[placeholder*="new password"]').value;
            const confirmPassword = this.querySelector('input[placeholder*="repeat"]').value;
            
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            alert('Password changed successfully!');
        });
    }
    
    // Edit profile toggle
    const editBtn = document.querySelector('.edit-btn');
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            const inputs = document.querySelectorAll('.profile-form input');
            inputs.forEach(input => {
                input.disabled = !input.disabled;
            });
            this.textContent = this.textContent === 'Edit' ? 'Save' : 'Edit';
        });
    }
});