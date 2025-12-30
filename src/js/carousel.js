document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    if (!carousel) return;

    const track = carousel.querySelector(".carousel__track");
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector(".carousel__arrow--prev");
    const nextBtn = carousel.querySelector(".carousel__arrow--next");

    let currentIndex = 0;

    function updateCarousel() {
        const offset = currentIndex * -100;
        track.style.transform = `translateX(${offset}%)`;

        slides.forEach((slide, index) => {
            const caption = slide.querySelector(".carousel__caption");
            if (!caption) return;

            caption.classList.toggle("is-active", index === currentIndex);
        });
    }

    prevBtn.addEventListener("click", () => {
        currentIndex =
            currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex =
            currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        updateCarousel();
    });
});
