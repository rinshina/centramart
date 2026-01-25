const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let filteredProducts = [...products];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setupFilters();
    renderProducts();
    updatePaginationForProducts();
});

// Setup filter event listeners
function setupFilters() {
    // Category filters
    document.querySelectorAll('.category-filter input').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Brand filters
    document.querySelectorAll('.brand-filter input').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
}

// Apply all filters
function applyFilters() {
    let filtered = [...products];
    
    // Category filter
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter input:checked'))
        .map(cb => cb.value);
    if (selectedCategories.length > 0) {
        filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    
    // Brand filter
    const selectedBrands = Array.from(document.querySelectorAll('.brand-filter input:checked'))
        .map(cb => cb.value);
    if (selectedBrands.length > 0) {
        filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Price filter
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
    
    filteredProducts = filtered;
    currentPage = 1;
    renderProducts();
    updatePaginationForProducts();
}

// Apply price filter
function applyPriceFilter() {
    applyFilters();
}

// Apply sorting
function applySorting() {
    const sortValue = document.getElementById('sortSelect').value;
    
    switch(sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            filteredProducts = [...products];
            applyFilters();
            return;
    }
    
    currentPage = 1;
    renderProducts();
    renderPagination();
}

// Get products for current page
function getPage(page) {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProducts.slice(start, end);
}

// Render products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const pageProducts = getPage(currentPage);
    
    // Update results count
    document.getElementById('resultsCount').textContent = `${filteredProducts.length} products found`;
    
    if (pageProducts.length === 0) {
        productsGrid.innerHTML = '<div class="col-12 text-center py-5"><h5>No products found</h5></div>';
        return;
    }
    
    productsGrid.innerHTML = pageProducts.map(product => `
        <div class="product-card" onclick="goToProduct(${product.id})">
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}" onerror="this.src='assets/products/placeholder.png'">
            </div>
            <div class="product-body">
                <span class="product-category">${product.category}</span>
                <h6 class="product-title">${product.title}</h6>
                <div class="product-rating">
                    ${'★'.repeat(product.rating)}${'☆'.repeat(5-product.rating)} <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    ${product.oldPrice ? `<span class="old">$${product.oldPrice}</span>` : ''}
                    <span class="new">$${product.price}</span>
                </div>
                <button class="btn add-cart-btn dark" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Render pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
        </li>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
    }
    
    // Next button
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
        </li>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderProducts();
    renderPagination();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Go to product detail page
function goToProduct(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}

// Add to cart (placeholder)
function addToCart(productId) {
    console.log('Added product to cart:', productId);
    // Add cart functionality here
}

// Pagination functionality
let paginationCurrentPage = 1;
let paginationTotalPages = 1;

function initializePagination() {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageNumbers = document.querySelectorAll('.page-number');
    
    // Calculate total pages based on filtered products
    paginationTotalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    
    function updatePagination() {
        // Hide/show page numbers based on actual total pages
        pageNumbers.forEach((btn, index) => {
            const pageNum = index + 1;
            if (pageNum <= paginationTotalPages) {
                btn.style.display = 'block';
                btn.classList.remove('active');
                if (pageNum === paginationCurrentPage) {
                    btn.classList.add('active');
                }
            } else {
                btn.style.display = 'none';
            }
        });
        
        prevBtn.disabled = paginationCurrentPage === 1;
        nextBtn.disabled = paginationCurrentPage === paginationTotalPages;
    }
    
    pageNumbers.forEach(btn => {
        btn.addEventListener('click', function() {
            const pageNum = parseInt(this.dataset.page);
            if (pageNum <= paginationTotalPages) {
                paginationCurrentPage = pageNum;
                currentPage = pageNum;
                renderProducts();
                updatePagination();
            }
        });
    });
    
    prevBtn.addEventListener('click', function() {
        if (paginationCurrentPage > 1) {
            paginationCurrentPage--;
            currentPage = paginationCurrentPage;
            renderProducts();
            updatePagination();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (paginationCurrentPage < paginationTotalPages) {
            paginationCurrentPage++;
            currentPage = paginationCurrentPage;
            renderProducts();
            updatePagination();
        }
    });
    
    updatePagination();
}

// Update pagination when products change
function updatePaginationForProducts() {
    paginationTotalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    paginationCurrentPage = Math.min(paginationCurrentPage, paginationTotalPages || 1);
    currentPage = paginationCurrentPage;
    
    if (document.getElementById('prevPage')) {
        initializePagination();
    }
}

// Initialize pagination when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializePagination, 100); // Small delay to ensure pagination HTML is loaded
});