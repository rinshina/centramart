

document.addEventListener('DOMContentLoaded', function() {
    loadProduct()
});

async function loadProduct(){
    const params=new URLSearchParams(window.location.search)
    const productId=params.get('id')
    const response= await fetch(`${BASE_URL}/product/${productId}`)
    const data=await response.json()
    if(!response.ok) throw new Error("loading of product failed")
    
    renderProduct(data)
}
function renderProduct(product){
    const container=document.getElementById("product-detail")
    if (!product) {
        container.innerHTML = "<h2>No such product found</h2>";
        return;
    }
    const stars = "★".repeat(product.rating) || 0
    const empty = "☆".repeat(5 - product.rating)
    const discountBadge = Math.ceil(((product.price - product.discountedPrice) / product.price) * 100)
    container.innerHTML=`
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">CentraMart</a></li>
                <li class="breadcrumb-item"><a href="#">${product.category.name}</a></li>
                <li class="breadcrumb-item"><a href="#">${product.name}</a></li>
            </ol>
        </nav>

        <div class="row">
            
            <!-- Product Images -->
            <div class="col-lg-6">
                <div class="product-images">
                    <div class="main-image mb-3">
                        <img id="mainImage" src=${encodeURI(product.images?.[0]) || 'http://localhost:5000/assets/placeholder.png'}>
                    </div>
                    <div class="thumbnail-images d-flex gap-2">
                        <button class="thumb-nav prev-thumb">‹</button>
                        <div class="thumbnails d-flex gap-2">
                            ${(product.images||[]).map((image,index)=>{
                                    const activeClass=index===0?"thumbnail active":"thumbnail"
                                    return `<img src="${image}" alt="${product.name}" class="${activeClass}"></img>`;
                                    
                            }).join("")}
                            
                        </div>
                        <button class="thumb-nav next-thumb">›</button>
                    </div>
                </div>
            </div>

            <!-- Product Details -->
            <div class="col-lg-6">
                <div class="product-info">
                    <div class="brand mb-2">${product.brand.name}</div>
                    <h1 class="product-title mb-3">${product.name}</h1>
                    
                    <div class="rating mb-1">
                        <div class="stars">${stars}${empty}
                        </div>
                        <span class="rating-count">${product.numReviews}</span>
                    </div>

                    <div class="quantity-selector mb-2">
                        <button class="qty-btn minus" data-id="${product._id}">-</button>
                        <input type="number" value="1" min="0" class="qty-input">
                        <button class="qty-btn plus">+</button>
                    </div>

                    <div class="price mb-2">
                        <span class="current-price">${product.discountedPrice}</span>
                        <span class="original-price">${product.price}</span>
                        <span class="discount-badge">${discountBadge}% OFF</span>
                    </div>

                    <div class="product-highlights mb-2">
                        <h5>Product Highlights</h5>
                        <ul>
                            ${(product.highlights||[]).map(li=> `<li>${li}</li>`).join("")} 
                        </ul>
                    </div>

                    <div class="technical-specs mb-4">
                        <h5>Technical Specifications</h5>
                        <div class="specs-grid">
                            <div class="spec-row">
                                <span class="spec-label">Warranty</span>
                                <span class="spec-value">${product.specifications.warranty}</span>
                            </div>
                            <div class="spec-row">
                                <span class="spec-label">Product Dimensions</span>
                                <span class="spec-value">22.5(L) x 36.1(W) 44.5(H) cm</span>
                            </div>
                            <div class="spec-row">
                                <span class="spec-label">Wattage</span>
                                <span class="spec-value">800 watts</span>
                            </div>
                            <div class="spec-row">
                                <span class="spec-label">Speed</span>
                                <span class="spec-value">13 Speeds</span>
                            </div>
                            <div class="spec-row">
                                <span class="spec-label">Capacity</span>
                                <span class="spec-value">${product.specifications.capacity}</span>
                            </div>
                        </div>
                    </div>

                    <div class="action-buttons mb-4">
                        <button class="btn btn-add-cart" onclick="event.stopPropagation(); addToCart('${product._id}')">ADD TO CART</button>
                        <button class="btn btn-buy-now">BUY NOW</button>
                    </div>

                    <div class="product-actions mb-4">
                        <button class="wishlist-btn" data-id="${product._id}">♡ Add to Wishlist</button>
                        <div class="share-buttons">
                            <span>Share product:</span>
                            <a href="#" class="share-btn"><img src="../assets/icons/copy link.png" alt="" srcset="" width="20" height="20"></a>
                            <a href="#" class="share-btn"><img src="../assets/icons/fb.png" alt="" srcset="" width="20" height="20"></a>
                            <a href="#" class="share-btn"><img src="../assets/icons/tweet.png" alt="" srcset="" width="20" height="20"></a>
                            <a href="#" class="share-btn"><img src="../assets/icons/pinterest.png" alt="" srcset="" width="20" height="20"></a>
                            
                        </div>
                    </div>

                    <div class="guarantee mb-4">
                        <div class="guarantee-text">100% Guarantee Safe Checkout</div>
                        <div class="payment-methods">
                            <img src="../assets/payments/visa.png" width="20" height="20" alt="Visa">
                            <img src="../assets/payments/mastercard.png" alt="MasterCard">
                            <img src="../assets/payments/paypal.png" alt="Amex">
                        
                        </div>
                    </div>

                </div>
            </div>
        </div>`
    if(!product.images || product.images.length<=1) container.querySelector(".thumbnail-images").classList.add("d-none")
    initializeProductUI()
    if(product.price===product.discountedPrice){
        container.querySelector(".original-price").classList.add("d-none")
        container.querySelector(".discount-badge").classList.add("d-none")
    } 

            
}
function initializeProductUI(){
    // Thumbnail image switching
    const container = document.getElementById("product-detail")
    const mainImage = document.getElementById('mainImage');
    const thumbnails = container.querySelectorAll('.thumbnail');
    const cart=getCart()
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            this.classList.add('active');
            // Update main image
            mainImage.src = this.src;
        });
    });
    // Quantity selector
    const qtyInput = container.querySelector('.qty-input');
    const minusBtn = container.querySelector('.qty-btn.minus');
    const plusBtn = container.querySelector('.qty-btn.plus');
    
    minusBtn.addEventListener('click', function() {
        const id= minusBtn.dataset.id
        let currentValue = parseInt(qtyInput.value);
        const item=cart.find(item=>item.id===id)
        if (currentValue > 1) {
            currentValue--
            qtyInput.value = currentValue
        }
        if (currentValue === 1) {
            cart = cart.filter(item => item.id !== id);
            saveCart(cart)
        }
        qtyInput.value=currentValue
        if(item){
            item.quantity=currentValue
            saveCart(cart)
        }
    });
    
    plusBtn.addEventListener('click', function() {
        const id= minusBtn.dataset.id
        let currentValue = parseInt(qtyInput.value);
        currentValue++
        qtyInput.value = currentValue
        const item=cart.find(item=>id===item.id)
        if(item){
            item.quantity=currentValue
            saveCart(cart)
        }else{
            addToCart(id,currentValue,true)
            document.querySelector(".btn-add-cart").innerHTML = "GO TO CART";
        }
        updateCartBadge()
    });
    
    // Thumbnail navigation
    const prevThumb = container.querySelector('.prev-thumb');
    const nextThumb = container.querySelector('.next-thumb');
    const thumbnailsContainer = container.querySelector('.thumbnails');
    
    prevThumb.addEventListener('click', function() {
        thumbnailsContainer.scrollBy({ left: -120, behavior: 'smooth' });
    });
    
    nextThumb.addEventListener('click', function() {
        thumbnailsContainer.scrollBy({ left: 120, behavior: 'smooth' });
    });
    
    
    
    // Buy now functionality
    const buyNowBtn = container.querySelector('.btn-buy-now');
    buyNowBtn.addEventListener('click', function() {
        console.log('Buy now clicked');
        // Add buy now functionality here
    });
    
    // Wishlist functionality
    const wishlistBtn = container.querySelector('.wishlist-btn');
    const productId=wishlistBtn.dataset.id

    if(cart.some(item => item.id === productId)){
        document.querySelector(".btn-add-cart").innerHTML = "GO TO CART";
    }
    let wishlist = JSON.parse(localStorage.getItem("wishlist"))||[]
    if(wishlist.includes(productId)){
        wishlistBtn.innerHTML = '♥ Added to Wishlist';
        wishlistBtn.style.color = '#a01010';
    }
    wishlistBtn.addEventListener('click', function() {
        const productId=this.dataset.id
        let wishlist=JSON.parse(localStorage.getItem("wishlist"))||[]
        if(!Array.isArray(wishlist))
            wishlist=[]
        const exists=wishlist.includes(productId)
        if(exists){
            wishlist=wishlist.filter(id=>id!==productId)
            this.innerHTML = '♡ Add to Wishlist';
            this.style.color = '#666';
        }else {
            wishlist.push(productId)
            this.innerHTML = '♥ Added to Wishlist';
            this.style.color = '#a01010';
        }
        localStorage.setItem("wishlist",JSON.stringify(wishlist))
    });
    
}
    
function addToCart(id) {
    const cartBtn=document.querySelector('.btn-add-cart')
    let cart = getCart()
    const qty = parseInt(document.querySelector('.qty-input').value) || 1;
    const item = cart.find(i => i.id === id)
    if(item){
        item.quantity += qty
        window.location.href = "shopping-cart.html";
    }else{
        cart.push({
            id,
            quantity:qty,
            selected: true
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        cartBtn.innerHTML="Go to cart"
    }

    saveCart(cart)

    updateCartBadge()
}

