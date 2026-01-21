function loadHTML(id, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}
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

loadHTML("header-placeholder", "partials/header.html");
loadHTML("footer-placeholder", "partials/footer.html");
loadHTML("login-modal-placeholder", "modals/login-modal.html");
loadHTML("signup-modal-placeholder", "modals/signup-modal.html");
loadHTML("forgot-password-modal-placeholder", "modals/forgot-password-modal.html");
loadHTML("otp-modal-placeholder", "modals/otp-modal.html");

