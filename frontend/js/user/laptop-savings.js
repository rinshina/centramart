document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(".slider-track");

    sliders.forEach(track => {
        const sliderWrapper = track.closest(".slider-wrapper");
        const prevBtn = sliderWrapper.querySelector(".slider-btn.prev");
        const nextBtn = sliderWrapper.querySelector(".slider-btn.next");

        let currentIndex = 0;

        const getCardsPerView = () => {
            return window.innerWidth <= 991 ? 2 : 4;
        };

        const updateSlider = () => {
            const card = track.children[0];
            if (!card) return;

            const gap = parseInt(getComputedStyle(track).gap) || 0;
            const cardWidth = card.offsetWidth + gap;

            const translateX = -(currentIndex * cardWidth);
            track.style.transform = `translateX(${translateX}px)`;

            // Disable buttons at bounds
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled =
                currentIndex >= track.children.length - getCardsPerView();
        };

        nextBtn.addEventListener("click", () => {
            const maxIndex = track.children.length - getCardsPerView();
            if (currentIndex < maxIndex) {
                currentIndex += getCardsPerView();
                updateSlider();
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex -= getCardsPerView();
                updateSlider();
            }
        });

        window.addEventListener("resize", () => {
            currentIndex = 0; // reset to avoid broken state
            updateSlider();
        });

        updateSlider();
    });
});
