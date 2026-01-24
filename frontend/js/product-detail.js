document.addEventListener('DOMContentLoaded', function() {
    // Thumbnail image switching
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            this.classList.add('active');
            // Update main image
            mainImage.src = this.src;
        });
    });
    
    // Quantity selector
    const qtyInput = document.querySelector('.qty-input');
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    
    minusBtn.addEventListener('click', function() {
        let currentValue = parseInt(qtyInput.value);
        if (currentValue > 1) {
            qtyInput.value = String(currentValue - 1).padStart(2, '0');
        }
    });
    
    plusBtn.addEventListener('click', function() {
        let currentValue = parseInt(qtyInput.value);
        qtyInput.value = String(currentValue + 1).padStart(2, '0');
    });
    
    // Thumbnail navigation
    const prevThumb = document.querySelector('.prev-thumb');
    const nextThumb = document.querySelector('.next-thumb');
    const thumbnailsContainer = document.querySelector('.thumbnails');
    
    prevThumb.addEventListener('click', function() {
        thumbnailsContainer.scrollBy({ left: -120, behavior: 'smooth' });
    });
    
    nextThumb.addEventListener('click', function() {
        thumbnailsContainer.scrollBy({ left: 120, behavior: 'smooth' });
    });
    
    // Add to cart functionality
    const addToCartBtn = document.querySelector('.btn-add-cart');
    addToCartBtn.addEventListener('click', function() {
        console.log('Added to cart');
        // Add cart functionality here
    });
    
    // Buy now functionality
    const buyNowBtn = document.querySelector('.btn-buy-now');
    buyNowBtn.addEventListener('click', function() {
        console.log('Buy now clicked');
        // Add buy now functionality here
    });
    
    // Wishlist functionality
    const wishlistBtn = document.querySelector('.wishlist-btn');
    wishlistBtn.addEventListener('click', function() {
        console.log('Added to wishlist');
        // Toggle wishlist state
        if (this.textContent.includes('♡')) {
            this.innerHTML = '♥ Added to Wishlist';
            this.style.color = '#a01010';
        } else {
            this.innerHTML = '♡ Add to Wishlist';
            this.style.color = '#666';
        }
    });
});