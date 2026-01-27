// Payments functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const statusFilter = document.getElementById('statusFilter');
    const methodFilter = document.getElementById('methodFilter');
    const rows = document.querySelectorAll('.table-row');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterPayments();
        });
    }
    
    if (methodFilter) {
        methodFilter.addEventListener('change', function() {
            filterPayments();
        });
    }
    
    // View payment buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const paymentId = this.closest('.table-row').querySelector('.col-payment-id').textContent;
            alert(`Viewing payment details for: ${paymentId}`);
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

function filterPayments() {
    const statusFilter = document.getElementById('statusFilter')?.value || 'all';
    const methodFilter = document.getElementById('methodFilter')?.value || 'all';
    const rows = document.querySelectorAll('.table-row');
    
    rows.forEach(row => {
        const status = row.dataset.status;
        const method = row.querySelector('.col-method').textContent.toLowerCase();
        
        const statusMatch = statusFilter === 'all' || status === statusFilter;
        const methodMatch = methodFilter === 'all' || method === methodFilter.toLowerCase();
        
        if (statusMatch && methodMatch) {
            row.style.display = 'grid';
        } else {
            row.style.display = 'none';
        }
    });
}