// Products functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const categoryFilter = document.querySelector('.filter-select:nth-child(2)');
    const brandFilter = document.querySelector('.filter-select:nth-child(3)');
    const statusFilter = document.querySelector('.filter-select:nth-child(4)');
    const rows = document.querySelectorAll('.table-row');
    
    [categoryFilter, brandFilter, statusFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', function() {
                filterProducts();
            });
        }
    });
    
    // Tab filtering
    const tabs = document.querySelectorAll('.product-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            filterByTab(filter);
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.product-search input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            rows.forEach(row => {
                const productName = row.querySelector('.col-product span').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    row.style.display = 'grid';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Action buttons
    document.querySelectorAll('.action-icon').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.closest('.table-row').querySelector('.col-product span').textContent;
            const action = this.textContent;
            
            if (action === '👁') {
                window.location.href = 'add-product.html';
            } else if (action === '🗑') {
                if (confirm(`Delete product: ${productName}?`)) {
                    this.closest('.table-row').remove();
                }
            }
        });
    });
});

function filterProducts() {
    const category = document.querySelector('.filter-select:nth-child(2)')?.value || 'all';
    const brand = document.querySelector('.filter-select:nth-child(3)')?.value || 'all';
    const status = document.querySelector('.filter-select:nth-child(4)')?.value || 'all';
    const rows = document.querySelectorAll('.table-row');
    
    rows.forEach(row => {
        const rowCategory = row.dataset.category;
        const rowStatus = row.dataset.status;
        
        const categoryMatch = category === 'all' || rowCategory === category;
        const statusMatch = status === 'all' || rowStatus === status;
        
        if (categoryMatch && statusMatch) {
            row.style.display = 'grid';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterByTab(filter) {
    const rows = document.querySelectorAll('.table-row');
    rows.forEach(row => {
        if (filter.includes('all') || 
            (filter.includes('featured') && row.dataset.featured) ||
            (filter.includes('sale') && row.dataset.sale) ||
            (filter.includes('stock') && row.querySelector('.stock-badge').textContent.includes('Out'))) {
            row.style.display = 'grid';
        } else {
            row.style.display = 'none';
        }
    });
}