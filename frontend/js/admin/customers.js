// Customers functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter tabs
    const tabs = document.querySelectorAll('.filter-tab');
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
    
    // View customer buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const customerId = this.closest('.table-row').querySelector('.col-customer-id').textContent;
            window.location.href = `customer-detail.html?id=${customerId}`;
        });
    });
    
    // Pagination
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
});