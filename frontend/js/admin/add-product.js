// Add Product functionality
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const form = document.querySelector('.add-product-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Validate required fields
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                alert('Product added successfully!');
            }
        });
    }
    
    // Image upload preview
    const imageUpload = document.querySelector('.upload-area');
    if (imageUpload) {
        imageUpload.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.click();
            
            input.addEventListener('change', function(e) {
                if (e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        imageUpload.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 200px;">`;
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
        });
    }
});