document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.settings-tab');
    const panels = document.querySelectorAll('.settings-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetPanel = this.dataset.tab;
            
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(targetPanel).classList.add('active');
        });
    });

    // Save settings
    document.querySelector('.btn-save').addEventListener('click', function() {
        // Collect all form data
        const formData = new FormData();
        
        // Get all input values
        document.querySelectorAll('input, select, textarea').forEach(input => {
            if (input.type === 'checkbox') {
                formData.append(input.name || input.id, input.checked);
            } else {
                formData.append(input.name || input.id, input.value);
            }
        });

        // Simulate API call
        console.log('Saving settings...', Object.fromEntries(formData));
        
        // Show success message
        showNotification('Settings saved successfully!', 'success');
    });

    // Reset to default
    document.querySelector('.btn-reset').addEventListener('click', function() {
        if (confirm('Are you sure you want to reset all settings to default values?')) {
            // Reset form values to defaults
            resetToDefaults();
            showNotification('Settings reset to default values', 'info');
        }
    });

    // Toggle shipping method details
    document.querySelectorAll('.shipping-method .toggle-switch input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const methodDetails = this.closest('.shipping-method').querySelector('.method-details');
            if (methodDetails) {
                methodDetails.style.display = this.checked ? 'grid' : 'none';
            }
        });
    });
});

function resetToDefaults() {
    // Store default values
    const defaults = {
        'store-name': 'CentraMart',
        'store-description': 'Your one-stop destination for electronics and home appliances',
        'store-email': 'admin@centramart.com',
        'store-phone': '+1 (555) 123-4567',
        'currency': 'USD',
        'timezone': 'UTC',
        'date-format': 'MM/DD/YYYY',
        'session-timeout': '30',
        'max-login-attempts': '5',
        'backup-frequency': 'weekly'
    };

    // Reset input values
    Object.keys(defaults).forEach(key => {
        const input = document.querySelector(`[name="${key}"], #${key}`);
        if (input) {
            input.value = defaults[key];
        }
    });

    // Reset checkboxes to default states
    const defaultChecked = [
        'credit-cards',
        'paypal',
        'cod',
        'standard-shipping',
        'express-shipping',
        'order-confirmation',
        'shipping-notification',
        'two-factor-auth',
        'ssl-enabled'
    ];

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = defaultChecked.includes(checkbox.name || checkbox.id);
    });
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}