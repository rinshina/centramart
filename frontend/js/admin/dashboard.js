// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Chart controls
    const chartBtns = document.querySelectorAll('.chart-btn');
    chartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            chartBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart data based on selection
            const period = this.textContent.toLowerCase();
            updateChartData(period);
        });
    });
    
    // Stat card navigation
    document.querySelectorAll('.stat-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const href = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            window.location.href = href;
        });
    });
    
    // Real-time updates simulation
    setInterval(updateStats, 30000); // Update every 30 seconds
});

function updateChartData(period) {
    // Simulate chart data update
    const chartStats = document.querySelectorAll('.chart-stat .stat-value');
    chartStats.forEach(stat => {
        const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
        const variation = Math.floor(Math.random() * 100) - 50;
        stat.textContent = (currentValue + variation).toLocaleString();
    });
}

function updateStats() {
    // Simulate real-time stat updates
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
        const variation = Math.floor(Math.random() * 10) - 5;
        stat.textContent = (currentValue + variation).toLocaleString();
    });
}