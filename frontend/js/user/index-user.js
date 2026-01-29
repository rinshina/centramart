function loadHTML(id, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}
function waitForElement(selector, callback) {
  const el = document.querySelector(selector);
  if (el) {
    callback(el);
    return;
  }

  const observer = new MutationObserver(() => {
    const el = document.querySelector(selector);
    if (el) {
      observer.disconnect();
      callback(el);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// banner
let scrollIndex = 0;

function scrollCategories(direction) {
  const track = document.querySelector('.categories-track');
  const cards = document.querySelectorAll('.category-card');
  const cardWidth = 164; // card width + gap
  const visibleCards = Math.floor(track.parentElement.offsetWidth / cardWidth);
  const maxIndex = cards.length - visibleCards;
  scrollIndex += direction;
  if (scrollIndex > maxIndex) {
    scrollIndex = 0; // loop back to start
  }
  if (scrollIndex < 0) {
    scrollIndex = maxIndex; // loop to end
  }
  track.style.transform = `translateX(-${scrollIndex * cardWidth}px)`;
}

const slides = document.querySelectorAll('.banner-slide');
const dots = document.querySelectorAll('.banner-dots .dot');
// 
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

document.getElementById('bannerNext').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

document.getElementById('bannerPrev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});
// brands popular slide
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("brands-track");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");

  const cardWidth = 120 + 32; // card width + gap (match CSS)
  const visibleCards = Math.floor(
    document.querySelector(".slider-viewport").offsetWidth / cardWidth
  );

  const totalCards = track.children.length;
  const maxIndex = totalCards - visibleCards;

  let currentIndex = 0;

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; // 🔁 loop back (circular)
    }
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex; // 🔁 loop back
    }
    updateSlider();
  });

  window.addEventListener("resize", updateSlider);
});

        loadHTML("header-placeholder", "partials/header.html");
        loadHTML("footer-placeholder", "partials/footer.html");
        loadHTML("login-modal-placeholder", "modals/login-modal.html");
        loadHTML("signup-modal-placeholder", "modals/signup-modal.html");
        loadHTML("forgot-password-modal-placeholder", "modals/forgot-password-modal.html");
        loadHTML("otp-modal-placeholder", "modals/otp-modal.html");
        loadHTML("user-account-modal-placeholder", "modals/user-account-modal.html");
        loadHTML("products-of-the-week-placeholder", "partials/products-of-week.html");
        loadHTML("trust-strip-placeholder", "partials/trust-strip.html");
        loadHTML("laptop-savings-placeholder", "partials/laptop-savings.html");
        loadHTML("mobile-deals-placeholder", "partials/mobile-deals.html");
        loadHTML("self-grooming-placeholder", "partials/self-grooming.html");
        loadHTML("shop-by-discount-placeholder", "partials/shop-by-discount.html");
        
        // Initialize auth state after header loads
        setTimeout(initializeAuthState, 100);


// Laptop Savings Slider
waitForElement("#laptop-track", (track) => {
  const wrapper = track.closest(".slider-wrapper");
  const prevBtn = wrapper.querySelector(".slider-btn.prev");
  const nextBtn = wrapper.querySelector(".slider-btn.next");

  let currentIndex = 0;

  const getCardsPerView = () => (window.innerWidth <= 991 ? 2 : 4);

  const getCardWidth = () => {
    const card = track.children[0];
    const gap = parseInt(getComputedStyle(track).gap) || 0;
    return card.offsetWidth + gap;
  };

  function updateSlider() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, track.children.length - cardsPerView);
    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
    track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
  }

  nextBtn.onclick = () => {
    currentIndex += getCardsPerView();
    updateSlider();
  };

  prevBtn.onclick = () => {
    currentIndex -= getCardsPerView();
    updateSlider();
  };

  window.addEventListener("resize", () => {
    currentIndex = 0;
    updateSlider();
  });

  updateSlider();
});



// mobile deals slider
waitForElement("#mobile-track", (track) => {
  const wrapper = track.closest(".slider-wrapper");
  const prevBtn = wrapper.querySelector(".prev");
  const nextBtn = wrapper.querySelector(".next");

  const cardWidth = track.children[0].offsetWidth + 24;
  let index = 0;

  nextBtn.onclick = () => {
    index = Math.min(index + 1, track.children.length - 4);
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  };

  prevBtn.onclick = () => {
    index = Math.max(index - 1, 0);
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  };
});


// self-grooming slider
waitForElement("#grooming-track", (track) => {
  const wrapper = track.closest(".slider-wrapper");
  const prevBtn = wrapper.querySelector(".prev");
  const nextBtn = wrapper.querySelector(".next");

  const cardWidth = track.children[0].offsetWidth + 24;
  let index = 0;
  const maxIndex = track.children.length - 4;

  function update() {
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  nextBtn.onclick = () => {
    index = index < maxIndex ? index + 1 : 0;
    update();
  };


  prevBtn.onclick = () => {
    index = index > 0 ? index - 1 : maxIndex;
    update();
  };


  update();
});


// Mobile menu toggle function
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  
  mobileMenu.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
}

// Categories submenu toggle
function toggleCategoriesMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const categoriesMenu = document.getElementById('categoriesMenu');
  
  mobileMenu.classList.toggle('active');
  categoriesMenu.classList.toggle('active');
}

// Brands submenu toggle
function toggleBrandsMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const brandsMenu = document.getElementById('brandsMenu');
  
  mobileMenu.classList.toggle('active');
  brandsMenu.classList.toggle('active');
}

