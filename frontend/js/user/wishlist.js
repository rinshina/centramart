const BASE_URL="http://localhost:5000/api";
const ITEMS_PER_PAGE = 12;

let currentPage = 1;
let totalPages = 1;
document.addEventListener('DOMContentLoaded', function() {
    loadProducts()
    const grid=document.getElementById('wishlistGrid')
    grid.addEventListener('click', (e) => {

        const item = e.target.closest('.wishlist-item');
        if (!item) return;

        const id = item.dataset.id;

        window.location.href = `product-details.html?id=${id}`;
    });
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

async function loadProducts(page=1){
    try{
        const wishlist=JSON.parse(localStorage.getItem("wishlist"))
        if (!Array.isArray(wishlist)) wishlist = [];
        const query=new URLSearchParams({
            _id:wishlist.join(","),
        })
        const response=await fetch(`${BASE_URL}/product?${query}`)
        const data=await response.json()
        if(!response.ok) 
            throw new Error(data.message)
        currentPage=data.currentPage
        totalPages=data.totalPages
        renderProducts(data.products)
        renderPagination();
        document.getElementById('resultsCount').textContent=`${data.totalProducts} products found`
    }catch(error){
        console.error("Error loading products:", error.message);
    }

}
function renderProducts(products){
    const grid=document.getElementById('wishlistGrid')
    if(!products.length){
        grid.innerHTML="<h5>No products in wishlist</h5>"
        return
    }
    grid.innerHTML=products.map(product=>{
        const rating = product.rating || 0;
        const stars = "★".repeat(rating)
        const empty = "☆".repeat(5 - rating)
        return ` <!-- Product 1 -->
                <div class="wishlist-item" data-id="${product._id}">
                    <div class="product-card">
                        <div class="product-img">
                            <img src="${product.images?.[0] || 'http://localhost:5000/assets/placeholder.png'}" alt="${product.name}">
                        </div>
                        <div class="product-body">
                            <!-- <span class="product-category">${product.category?.name || ""}</span> -->
                            <div class="rating mb-1">
                                <div class="rating stars">${stars}${empty}</div>
                                <span class="rating-count">${product.numReviews}</span>
                            </div>
                            <h6 class="product-title">${product.name}</h6>
                            <div class="product-price">${product.discountedPrice}</div>
                        </div>
                    </div>
                </div>
        `}).join("")
}
//pagination
function renderPagination() {
    const numbers = document.querySelectorAll(".page-number");

    numbers.forEach((btn, index) => {
        const pageNum = index + 1;

        if (pageNum <= totalPages) {
            btn.style.display = "inline-block";
            btn.classList.toggle("active", pageNum === currentPage);
            btn.onclick = () => loadProducts(pageNum);
        } else {
            btn.style.display = "none";
        }
    });

    document.getElementById("prevPage").onclick = () => {
        if (currentPage > 1) loadProducts(currentPage - 1);
    };

    document.getElementById("nextPage").onclick = () => {
        if (currentPage < totalPages) loadProducts(currentPage + 1);
    };
}