document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".carousel");
    if (!carousels.length) return;

    carousels.forEach(carousel => {
        const track = carousel.querySelector(".carousel__track");
        if (!track) return;

        const slides = Array.from(track.children);
        if (slides.length < 2) return;

        const prevBtn = carousel.querySelector(".carousel__arrow--prev");
        const nextBtn = carousel.querySelector(".carousel__arrow--next");

        let index = 0;
        let isAnimating = false;

        // === Active slide ===
        const setActive = () => {
            slides.forEach((slide, i) => {
                const caption = slide.querySelector(".carousel__caption");
                const active = i === index;

                slide.classList.toggle("is-active", active);
                caption?.classList.toggle("is-active", active);
            });
        };

        // === Translate ===
        const setTranslate = () => {
            track.style.transform = `translateX(${-index * 100}%)`;
        };

        // === Next ===
        const goNext = () => {
            if (isAnimating) return;
            isAnimating = true;

            index = (index + 1) % slides.length;

            setTranslate();
            setActive();

            setTimeout(() => {
                isAnimating = false;
            }, 450);
        };

        // === Prev ===
        const goPrev = () => {
            if (isAnimating) return;
            isAnimating = true;

            index = (index - 1 + slides.length) % slides.length;

            setTranslate();
            setActive();

            setTimeout(() => {
                isAnimating = false;
            }, 450);
        };

        nextBtn?.addEventListener("click", goNext);
        prevBtn?.addEventListener("click", goPrev);

        // === Swipe ===
        let startX = 0;
        let currentX = 0;
        let dragging = false;

        carousel.addEventListener("pointerdown", e => {
            dragging = true;
            startX = e.clientX;
            currentX = startX;
            track.style.transition = "none";
        });

        window.addEventListener("pointermove", e => {
            if (!dragging) return;
            currentX = e.clientX;
            const dx = currentX - startX;
            track.style.transform = `translateX(${-index * 100}%) translateX(${dx}px)`;
        });

        window.addEventListener("pointerup", () => {
            if (!dragging) return;
            dragging = false;
            track.style.transition = "";

            const dx = currentX - startX;

            if (Math.abs(dx) > 50) {
                dx < 0 ? goNext() : goPrev();
            } else {
                setTranslate();
            }
        });

        // === Init ===
        track.style.transition = "transform 0.45s cubic-bezier(.22,.61,.36,1)";
        setTranslate();
        setActive();
    });
});
