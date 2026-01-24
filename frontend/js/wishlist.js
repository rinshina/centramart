document.addEventListener('DOMContentLoaded', function() {
    // Filter tabs functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    const wishlistItems = document.querySelectorAll('.wishlist-item');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.dataset.filter;
            
            // Filter items (for now, just show all items)
            // In a real implementation, you would filter based on categories
            wishlistItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    // Add filtering logic here based on your data structure
                    item.style.display = 'block';
                }
            });
        });
    });
    
    // Product card click functionality
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            // Navigate to product detail page
            // In a real implementation, you would get the product ID and navigate
            console.log('Navigate to product detail');
            // window.location.href = 'product-detail.html?id=' + productId;
        });
    });
    
    // Remove from wishlist functionality (if remove buttons are added)
    const removeButtons = document.querySelectorAll('.remove-btn');
    
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click
            
            const wishlistItem = this.closest('.wishlist-item');
            
            // Add fade out animation
            wishlistItem.style.opacity = '0';
            wishlistItem.style.transform = 'scale(0.8)';
            
            // Remove item after animation
            setTimeout(() => {
                wishlistItem.remove();
            }, 300);
        });
    });
});