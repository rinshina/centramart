// Order Detail functionality
document.addEventListener('DOMContentLoaded', function() {
    // Back button
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.history.back();
        });
    }
    
    // Get order ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    
    if (orderId) {
        // Load order details
        loadOrderDetails(orderId);
    }
    
    // Print functionality
    const printBtn = document.createElement('button');
    printBtn.textContent = 'Print Order';
    printBtn.className = 'btn btn-outline-secondary';
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    const detailHeader = document.querySelector('.detail-header');
    if (detailHeader) {
        detailHeader.appendChild(printBtn);
    }
});

function loadOrderDetails(orderId) {
    // Simulate loading order details
    document.getElementById('order-id').textContent = orderId;
    
    // Update page title
    document.title = `Order ${orderId} - CentraMart Admin`;
    
    // Simulate order status updates
    setTimeout(() => {
        const statusBadge = document.getElementById('order-status');
        if (statusBadge && statusBadge.textContent.includes('Shipped')) {
            // Update to delivered after 5 seconds (simulation)
            statusBadge.innerHTML = '📦 Delivered';
            statusBadge.className = 'status-badge delivered';
        }
    }, 5000);
}