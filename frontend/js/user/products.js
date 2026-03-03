const BASE_URL = "http://localhost:5000/api";
const ITEMS_PER_PAGE = 12;

let currentPage = 1;
let totalPages = 1;

//initial load
document.addEventListener("DOMContentLoaded", () => {
    loadBrands();
    loadProducts();
    setupEvents();
});
//load categories
async function loadCategories() {
    try {
        const response = await fetch(`${BASE_URL}/category`);
        const categories = await response.json();

        const container = document.querySelector(".filter-section .checkbox-group");

        container.innerHTML = "";

        categories.forEach(category => {
            container.innerHTML += `
                <label>
                    <input type="checkbox" value="${category._id}">
                    ${category.name}
                </label>
            `;
        });

    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

//loading brands
async function loadBrands() {
    const response = await fetch(`${BASE_URL}/brand`);
    const data = await response.json();

    const container = document.querySelector(".brand-filter .row");
    container.innerHTML = "";

    data.forEach(brand => {
        container.innerHTML += `
            <div class="col-6">
                <div class="form-check">
                    <input class="form-check-input"
                        type="checkbox"
                        value="${brand._id}">
                    <label class="form-check-label">
                        ${brand.name}
                    </label>
                </div>
            </div>
        `;
    });
}


//fetch products from backend
async function loadProducts(page=1){
    try {
        const search=document.getElementById('searchInput').value || ''
        const sort=document.getElementById('sortSelect').value || ''
        const minPrice=document.getElementById('mobileMinPrice').value || ''
        const maxPrice=document.getElementById('mobileMaxPrice').value || ''

        const selectedBrands=Array.from(
            document.querySelectorAll(".brand-filter input:checked")
        ).map(cb=>cb.value)

        const query = new URLSearchParams({
            page,
            limit: ITEMS_PER_PAGE,
            search,
            sort,
            minPrice,
            maxPrice,
            brand: selectedBrands.join(","),
        });

        const response=await fetch(`${BASE_URL}/product?${query}`)
        const data=await response.json()
        if (!response.ok) throw new Error(data.message);

        currentPage = data.currentPage;
        totalPages = data.totalPages;
        renderProducts(data.products);
        renderPagination();
        document.getElementById('resultsCount').textContent=`${data.totalProducts} products found`
    } catch (error) {
        console.error("Error loading products:", error.message);
    }

}



//rendering products
function renderProducts(products){
    const grid = document.getElementById("productsGrid");
    if (!products.length) {
        grid.innerHTML = "<h5>No products found</h5>";
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="goToProduct('${product._id}')">
            <div class="product-img">
                <img src="${product.images?.[0] || '../../../backend/public/assets/placeholder.png'}" 
                     alt="${product.name}">
            </div>
            <div class="product-body">
                <span class="product-category">${product.category?.name || ""}</span>
                <h6 class="product-title">${product.name}</h6>
                <div class="product-price">
                    ${product.discountedPrice < product.price
                        ? `<span class="old">$${product.price}</span>`
                        : ""
                    }
                    <span class="new">$${product.discountedPrice}</span>
                </div>
                <button class="btn add-cart-btn dark"
                    onclick="event.stopPropagation(); addToCart('${product._id}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join("");
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

//events
function setupEvents() {
    document.getElementById("sortSelect")
        ?.addEventListener("change", () => loadProducts(1));

    document.getElementById("searchInput")
        ?.addEventListener("input", () => loadProducts(1));

    document.querySelectorAll(".brand-filter input")
        .forEach(cb => cb.addEventListener("change", () => loadProducts(1)));

    document.getElementById("minPrice")
        ?.addEventListener("input", () => loadProducts(1));

    document.getElementById("maxPrice")
        ?.addEventListener("input", () => loadProducts(1));
}

function goToProduct(id) {
    window.location.href = `product-details.html?id=${id}`;
}

function addToCart(id) {
    console.log("Add to cart:", id);
}