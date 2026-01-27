// Customer Detail functionality
document.addEventListener('DOMContentLoaded', function() {
    // Action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            const customerName = document.querySelector('.customer-name').textContent;
            
            if (action === 'Send Email') {
                const modal = new bootstrap.Modal(document.getElementById('sendEmailModal'));
                modal.show();
            } else if (action === 'Edit Customer') {
                const modal = new bootstrap.Modal(document.getElementById('editCustomerModal'));
                modal.show();
            } else if (action === 'Suspend Account') {
                const modal = new bootstrap.Modal(document.getElementById('suspendAccountModal'));
                modal.show();
            }
        });
    });
    
    // View order buttons
    document.querySelectorAll('.view-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.closest('.table-row').querySelector('.col-order-id').textContent;
            window.location.href = `order-detail.html?id=${orderId}`;
        });
    });
    
    // Back button
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.history.back();
        });
    }
});