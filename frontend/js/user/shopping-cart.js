
document.addEventListener('DOMContentLoaded', function() {
    loadProduct()
    
    document.getElementById("cartItemGrid").addEventListener("click", (e) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const row = e.target.closest(".cart-item-row");
        if (!row) return;
        const id = row.dataset.id;
        if (e.target.classList.contains("remove-btn")) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const id = row.dataset.id;
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadProduct();
            updateCartBadge()
            return;
        }
        const qtyDisplay = row.querySelector(".qty-display");
        let qty = parseInt(qtyDisplay.textContent);
        if (e.target.classList.contains("plus")) {
            qty++;
        }
        if (e.target.classList.contains("minus") && qty > 1) {
            qty--;
        }
        if (e.target.classList.contains("minus") && qty === 1) {
            cart=cart.filter((item)=>item.id!==id)
        }
        qtyDisplay.textContent = qty;
        // update localStorage
        
        const item = cart.find(item=>item.id===id);
        if(item){
            item.quantity=qty
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        
        loadProduct();
        updateCartBadge()
    
    });
    
    // Return to shop button
    const returnBtn = document.querySelector('.cart-actions .btn:first-child');
    if (returnBtn) {
        returnBtn.addEventListener('click', function() {
            window.location.href = 'products.html';
        });
    }
    
    
});
async function loadProduct() {
    try {
        const cart=getCart()
        if(cart.length === 0){
            renderProducts([]);
            return;
        }
        const ids=cart.map(item=>item.id)
        const query=new URLSearchParams({
            _id:ids.join(","),
        })
        const response=await fetch(`${BASE_URL}/product?${query}`)
        const data=await response.json()
        if(!response.ok) 
            throw new Error("Failed to load cart products");
        renderProducts(data.products)
    } catch (error) {
        console.error("Error loading cart:", error.message);
    }
}
function renderProducts(products){
    const cart=JSON.parse(localStorage.getItem('cart')) || []
    const cartItemGrid=document.getElementById('cartItemGrid')
    if(!products.length){
        cartItemGrid.innerHTML='<h5>Your Cart is Empty</h5>'
        return
    }
    cartItemGrid.innerHTML=products.map(product=>{
        const cartItem = cart.find(item => item.id === product._id);
        const qty = cartItem ? cartItem.quantity : 1;
        return `<div class="cart-item-row" data-id="${product._id}">
                    <div class="remove-item">
                        <img src="../assets/icons/remove.png" class="bi bi-trash remove-btn"></i>
                    </div>
                    <div class="item-checkbox">
                        <input type="checkbox" class="form-check-input" checked>
                    </div>
                    <div class="item-image">
                        <img src="${product.images?.[0] || 'http://localhost:5000/assets/placeholder.png'}" alt="LG UHD LED Smart TV">
                    </div>
                    <div class="item-details">
                        <h6 class="item-title">${product.name}</h6>
                        <div class="item-actions">
                            <div class="quantity-controls">
                                <button class="qty-btn minus">-</button>
                                <span class="qty-display">${qty}</span>
                                <button class="qty-btn plus">+</button>
                            </div>
                            <span class="item-price">${product.discountedPrice}</span>
                        </div>
                    </div>
                </div>`
    }).join("")
    const cartPriceGrid=document.getElementById('cartPriceGrid')
    let subTotal=0
    let discountedTotal=0
    let discount=0
    products.forEach(product=>{
        const cartItem = cart.find(item => item.id === product._id);
        const qty = cartItem ? cartItem.quantity : 1;
        subTotal=subTotal+(product.price)*qty
        discountedTotal=discountedTotal+(product.discountedPrice)*qty
        discount = parseFloat(subTotal-discountedTotal).toFixed(2);

    })
    cartPriceGrid.innerHTML=`<div class="cart-summary d-flex flex-column">
                    <h5 class="summary-title">Card Totals</h5>
                    <div class="summary-row">
                        <span>Sub-total</span>
                        <span>${subTotal}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div class="summary-row">
                        <span>Discount</span>
                        <span>${discount}</span>
                    </div>
        
                    <div class="summary-row total">
                        <span>Total</span>
                        <span>${discountedTotal} USD</span>
                    </div>
        
                    <button class="btn btn-checkout" onclick="goToCheckout()">
                        PROCEED TO CHECKOUT →
                    </button>
        
                    <!-- Coupon Section -->
                    <div class="coupon-section">
                        <h6>Coupon Code</h6>
                        <div class="coupon-input">
                            <input type="text" class="form-control" placeholder="COUPON CODE...">
                            <button class="btn btn-apply">APPLY COUPON</button>
                        </div>
                    </div>
        
                </div>`
    
    

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
}
function goToCheckout() {
        window.location.href = 'checkout.html';
    }