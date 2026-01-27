// Orders functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter tabs
    const tabs = document.querySelectorAll('.filter-tab');
    const rows = document.querySelectorAll('.table-row');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            filterOrders(filter);
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-control input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            rows.forEach(row => {
                const orderId = row.querySelector('.col-order-id').textContent.toLowerCase();
                const customer = row.querySelector('.col-customer').textContent.toLowerCase();
                
                if (orderId.includes(searchTerm) || customer.includes(searchTerm)) {
                    row.style.display = 'grid';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // View order buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.closest('.table-row').querySelector('.col-order-id').textContent;
            window.location.href = `order-detail.html?id=${orderId}`;
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

function filterOrders(filter) {
    const rows = document.querySelectorAll('.table-row');
    rows.forEach(row => {
        const status = row.dataset.status;
        
        if (filter.includes('all') || 
            (filter.includes('processing') && status === 'processing') ||
            (filter.includes('completed') && status === 'delivered') ||
            (filter.includes('attention') && status === 'attention')) {
            row.style.display = 'grid';
        } else {
            row.style.display = 'none';
        }
    });
}