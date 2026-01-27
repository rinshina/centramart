// Coupons functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab filtering
    const tabs = document.querySelectorAll('.coupon-tab');
    const rows = document.querySelectorAll('.table-row');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            rows.forEach(row => {
                if (filter === 'all' || row.dataset.status === filter) {
                    row.style.display = 'grid';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.coupon-search input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            rows.forEach(row => {
                const couponCode = row.querySelector('.col-coupon-code').textContent.toLowerCase();
                if (couponCode.includes(searchTerm)) {
                    row.style.display = 'grid';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.toLowerCase();
            const couponCode = this.closest('.table-row').querySelector('.col-coupon-code').textContent;
            alert(`${action} action for coupon: ${couponCode}`);
        });
    });
});