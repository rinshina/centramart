const BASE_URL = "http://localhost:5000/api";
function getCart(){
    return JSON.parse(localStorage.getItem("cart")) || []
}

function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart))
}
function updateCartBadge(){

    const cart = JSON.parse(localStorage.getItem("cart")) || []

    const total = cart.reduce((sum,item)=>sum+item.quantity,0)

    const badge = document.querySelector(".cart-badge")
    if(!badge) return;
    badge.textContent = total

    if(total > 0){
        badge.style.display = total > 0 ? "flex" : "none"
    }else{
        badge.style.display = "none"
    }

}

async function renderCartDropdown() {
    const cart=getCart()
    const cartMenu = document.querySelector(".cart-menu");
    if (!cartMenu) return;
    if(!cart.length){
        cartMenu.innerHTML=`
            <h6>Shopping Cart (0)</h6>
            <p class="mb-3">Your cart is empty.</p>
            <div class="cart-actions">
                <button class="btn btn-outline-danger w-100" onclick="checkLoginAndRedirect('shopping-cart.html')">
                    VIEW CART
                </button>
            </div>`
            return
            
    }
    const ids=cart.map(item=>item.id)
    const query=new URLSearchParams({_id:ids.join(",")})
    const response=await fetch(`${BASE_URL}/product?${query}`)
    const data=await response.json()
    if(!response.ok){
        throw new Error("Failed to load cart dropdown products")
        return
    }
    const products = data.products || [];
    const cartDropDownGrid=cartMenu.querySelector(".cartDropDownGrid")
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let subTotal=0
    cartDropDownGrid.innerHTML = products.map(product => {
        const cartItem = cart.find(item => item.id === product._id);
        const qty = cartItem ? cartItem.quantity : 1;
        const price = product.discountedPrice || product.price;

        subTotal += price * qty; 
        return `<!-- Item -->
                <div class="cart-item">
                    <img src="${product.images?.[0]|| 'http://localhost:5000/assets/placeholder.png'}" class="cart-img">
                    <div class="cart-info">
                        <p class="cart-title">
                            ${product.name}
                        </p>
                        <div class="cart-meta">
                            <span>${qty} ×</span>
                            <span class="price">$${price}</span>
                        </div>
                    </div>
                </div>`
    }).join("");

    cartMenu.querySelector('.cart-summary').innerHTML = `
            <span>Sub-Total:</span>
            <span>$${subTotal.toFixed(2)} USD</span>
    `;
}
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    renderCartDropdown();
}
