document.addEventListener('DOMContentLoaded', function() {
    const ORDERS_PER_PAGE = 4;
    let currentPage = 1;
    const orderRows = document.querySelectorAll('.order-row');
    const totalOrders = orderRows.length;
    const totalPages = Math.ceil(totalOrders / ORDERS_PER_PAGE);
    
    // Show orders for current page
    function showOrdersForPage(page) {
        const startIndex = (page - 1) * ORDERS_PER_PAGE;
        const endIndex = startIndex + ORDERS_PER_PAGE;
        
        orderRows.forEach((row, index) => {
            if (index >= startIndex && index < endIndex) {
                row.style.display = 'grid';
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    // Update pagination buttons
    function updatePagination() {
        const pageButtons = document.querySelectorAll('.page-btn');
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        
        pageButtons.forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.page) === currentPage) {
                btn.classList.add('active');
            }
        });
        
        prevBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
        prevBtn.style.cursor = currentPage === 1 ? 'not-allowed' : 'pointer';
        nextBtn.style.opacity = currentPage === totalPages ? '0.5' : '1';
        nextBtn.style.cursor = currentPage === totalPages ? 'not-allowed' : 'pointer';
    }
    
    // Initialize pagination
    showOrdersForPage(currentPage);
    updatePagination();
    
    // Page button clicks
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            currentPage = parseInt(this.dataset.page);
            showOrdersForPage(currentPage);
            updatePagination();
        });
    });
    
    // Previous/Next buttons
    document.getElementById('prevPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            showOrdersForPage(currentPage);
            updatePagination();
        }
    });
    
    document.getElementById('nextPage').addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            showOrdersForPage(currentPage);
            updatePagination();
        }
    });
    
    // Filter tabs functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filterStatus = this.dataset.status;
            
            orderRows.forEach(row => {
                const statusBadge = row.querySelector('.status-badge');
                const status = statusBadge.textContent.toLowerCase().trim();
                
                if (filterStatus === 'all' || status === filterStatus) {
                    row.classList.remove('filtered-out');
                } else {
                    row.classList.add('filtered-out');
                }
            });
            
            // Reset to page 1 after filtering
            currentPage = 1;
            showOrdersForPage(currentPage);
            updatePagination();
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        orderRows.forEach(row => {
            const orderId = row.querySelector('.order-id').textContent.toLowerCase();
            
            if (orderId.includes(searchTerm) || searchTerm === '') {
                row.classList.remove('search-hidden');
            } else {
                row.classList.add('search-hidden');
            }
        });
        
        currentPage = 1;
        showOrdersForPage(currentPage);
        updatePagination();
    }
    
    searchInput.addEventListener('input', performSearch);
    searchBtn.addEventListener('click', performSearch);
});