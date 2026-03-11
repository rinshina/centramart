document.addEventListener('DOMContentLoaded', function() {
    loadCheckOut()
    loadAddresses()
})
async function loadCheckOut(){
    const cart=getCart()
    const orderSummary=document.getElementById('orderSummary')
    if(!orderSummary) return
    if(!cart.length){
        document.querySelector(".checkout-page").innerHTML=
        `<h6>No Items to checkout</h6>
        <!-- Action Buttons -->
        <div class="cart-actions">
            <button class="btn ">
                <img src="../assets/icons/left-arrow.pheight="15" width="15" alt="left-arrow" srcset="">
                RETURN TO SHOP
            </button>
        </div>`
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
    let lineSubTotal=0
    let lineDiscountedTotal=0
    let total=0
    let discount=0
    let tax=1.65
    let shipping=0
    orderSummary.innerHTML=products.map(product=>{
        const cartItem = cart.find(item => item.id === product._id);
        const qty = cartItem ? cartItem.quantity : 1;
        return `<div class="order-item">
                    <img src="${product.images?.[0]||'http://localhost:5000/assets/placeholder.png'}">
                    <div class="item-info">
                        <h6>${product.name}</h6>
                        <span>${qty} x $${product.price}</span>
                    </div>
                </div>`
    })
    const orderTotals=document.querySelector(".order-totals")
    orderTotals.innerHTML=products.map(product=>{
        const cartItem = cart.find(item => item.id === product._id);
        const qty = cartItem ? cartItem.quantity : 1;
        lineSubTotal += product.price * qty
        lineDiscountedTotal+=product.discountedPrice*qty
        discount=lineSubTotal-lineDiscountedTotal
        tax=lineDiscountedTotal*tax/100
        total=lineDiscountedTotal+tax+shipping
        shipping=lineDiscountedTotal>2000?"Free":30
        return `<div class="total-row">
                    <span>Sub-total</span>
                    <span>${lineSubTotal.toFixed(2)}</span>
                </div>
                <div class="total-row">
                    <span>Shipping</span>
                    <span>${shipping}</span>
                </div>
                <div class="total-row">
                    <span>Discount</span>
                    <span>${discount.toFixed(2)}</span>
                </div>
                <div class="total-row">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div class="total-row final">
                    <span>Total</span>
                    <span>$${total.toFixed(2)} USD</span>
                </div>`
    })
}
document.getElementById('addAddressBtn')?.addEventListener('click', function () {
    window.location.href = 'add-new-address.html';
});
async function loadAddresses(){
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    const addressOptions=document.getElementById("addressOptions")
    if(!addressOptions) return
    if(!addresses.length)
        throw new Error("Failed to load saved addresses")
    addressOptions.innerHTML = addresses.map((address, index) => `
        <div class="address-option">
            <input 
                type="radio" 
                name="address" 
                id="address-${address.id || index}" 
                ${address.isDefault ? 'checked' : ''}
            >
            <label for="address-${address.id || index}">
                <strong>${address.addressType || 'Address'}</strong><br>
                ${address.fullName}<br>
                ${address.addressLine1}<br>
                ${address.addressLine2 ? `${address.addressLine2}<br>` : ''}
                ${address.city}, ${address.state} - ${address.pincode}<br>
                ${address.phoneNumber}
            </label>
            ${address.isDefault ? `<span class="default-badge">Default</span>` : ''}
        </div>
    `).join("");
}