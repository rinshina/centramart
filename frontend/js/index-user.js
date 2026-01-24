function loadHTML(id, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
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
loadHTML("products-of-the-week-placeholder", "partials/products-of-week.html");
loadHTML("trust-strip-placeholder", "partials/trust-strip.html");
loadHTML("laptop-savings-placeholder", "partials/laptop-savings.html");
loadHTML("mobile-deals-placeholder", "partials/mobile-deals.html");
loadHTML("self-grooming-placeholder", "partials/self-grooming.html");
loadHTML("shop-by-discount-placeholder", "partials/shop-by-discount.html");


// laptop savings slider
setTimeout(() => {
  const track = document.getElementById("laptop-track");
  if (!track) return;

  const prevBtn = document.querySelector('[data-target="laptop-track"].prev');
  const nextBtn = document.querySelector('[data-target="laptop-track"].next');
  
  if (!prevBtn || !nextBtn) return;
  
  const cardWidth = 304;
  let currentIndex = 0;
  const maxIndex = track.children.length - 4;

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
    updateSlider();
  });
}, 500);

// mobile deals slider
setTimeout(() => {
  const track = document.getElementById("mobile-track");
  if (!track) return;

  const prevBtn = document.querySelector('[data-target="mobile-track"].prev');
  const nextBtn = document.querySelector('[data-target="mobile-track"].next');
  
  if (!prevBtn || !nextBtn) return;
  
  const cardWidth = 304;
  let currentIndex = 0;
  const maxIndex = track.children.length - 4;

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
    updateSlider();
  });
}, 500);

// self-grooming slider
setTimeout(() => {
  const track = document.getElementById("grooming-track");
  if (!track) return;

  const prevBtn = document.querySelector('[data-target="grooming-track"].prev');
  const nextBtn = document.querySelector('[data-target="grooming-track"].next');
  
  if (!prevBtn || !nextBtn) return;
  
  const cardWidth = 304;
  let currentIndex = 0;
  const maxIndex = track.children.length - 4;

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
    updateSlider();
  });
}, 500);



