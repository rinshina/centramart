document.addEventListener('DOMContentLoaded', function() {
    // Quantity controls
    const minusButtons = document.querySelectorAll('.qty-btn.minus');
    const plusButtons = document.querySelectorAll('.qty-btn.plus');
    
    minusButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const qtyDisplay = this.parentElement.querySelector('.qty-display');
            let currentQty = parseInt(qtyDisplay.textContent);
            if (currentQty > 1) {
                currentQty--;
                qtyDisplay.textContent = String(currentQty).padStart(2, '0');
                updateCartTotals();
            }
        });
    });
    
    plusButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const qtyDisplay = this.parentElement.querySelector('.qty-display');
            let currentQty = parseInt(qtyDisplay.textContent);
            currentQty++;
            qtyDisplay.textContent = String(currentQty).padStart(2, '0');
            updateCartTotals();
        });
    });
    
    // Checkbox functionality
    const checkboxes = document.querySelectorAll('.item-checkbox input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateCartTotals);
    });
    
    // Update cart totals
    function updateCartTotals() {
        // This would calculate totals based on selected items and quantities
        console.log('Updating cart totals...');
    }
    
    // Return to shop button
    const returnBtn = document.querySelector('.cart-actions .btn:first-child');
    if (returnBtn) {
        returnBtn.addEventListener('click', function() {
            window.location.href = 'products.html';
        });
    }
    
    // Update cart button
    const updateBtn = document.querySelector('.cart-actions .btn:last-child');
    if (updateBtn) {
        updateBtn.addEventListener('click', function() {
            console.log('Cart updated');
            // Add update cart functionality
        });
    }
    
    // Proceed to checkout
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            window.location.href = 'checkout.html';
        });
    }
    
    // Apply coupon
    const applyBtn = document.querySelector('.btn-apply');
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            const couponInput = document.querySelector('.coupon-input input');
            const couponCode = couponInput.value.trim();
            
            if (couponCode) {
                console.log('Applying coupon:', couponCode);
                // Add coupon application logic
                couponInput.value = '';
            }
        });
    }
});