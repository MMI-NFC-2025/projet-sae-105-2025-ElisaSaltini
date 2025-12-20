const burger = document.querySelector(".burger");
const overlay = document.querySelector(".menu-overlay");

burger.addEventListener("click", () => {
  const open = burger.classList.toggle("is-active");
  overlay.classList.toggle("is-active", open);
  burger.setAttribute("aria-expanded", open);
});
