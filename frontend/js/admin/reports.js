// Reports functionality
document.addEventListener('DOMContentLoaded', function() {
    // Report type buttons
    const reportBtns = document.querySelectorAll('.report-type-btn');
    reportBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            reportBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const reportType = this.textContent;
            updateReportData(reportType);
        });
    });
    
    // Generate report button
    const generateBtn = document.querySelector('.generate-report-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            const fromDate = document.querySelector('input[type="date"]:first-of-type').value;
            const toDate = document.querySelector('input[type="date"]:last-of-type').value;
            
            if (!fromDate || !toDate) {
                alert('Please select both from and to dates');
                return;
            }
            
            generateReport(fromDate, toDate);
        });
    }
    
    // Export buttons
    document.querySelectorAll('.export-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.classList.contains('csv') ? 'CSV' : 'PDF';
            exportReport(format);
        });
    });
});

function updateReportData(reportType) {
    // Simulate updating report data based on type
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const baseValue = parseInt(stat.textContent.replace(/[$,]/g, ''));
        const variation = Math.floor(Math.random() * 1000);
        
        if (stat.textContent.includes('$')) {
            stat.textContent = '$' + (baseValue + variation).toLocaleString();
        } else {
            stat.textContent = (baseValue + variation).toString();
        }
    });
    
    console.log(`Updated report data for: ${reportType}`);
}

function generateReport(fromDate, toDate) {
    // Simulate report generation
    const loadingMsg = document.createElement('div');
    loadingMsg.textContent = 'Generating report...';
    loadingMsg.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid #ccc; border-radius: 8px; z-index: 1000;';
    
    document.body.appendChild(loadingMsg);
    
    setTimeout(() => {
        loadingMsg.remove();
        alert(`Report generated for period: ${fromDate} to ${toDate}`);
    }, 2000);
}

function exportReport(format) {
    // Simulate export functionality
    alert(`Exporting report as ${format}...`);
    
    // In a real application, this would trigger a download
    setTimeout(() => {
        alert(`Report exported successfully as ${format}`);
    }, 1000);
}