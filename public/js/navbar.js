document.addEventListener("DOMContentLoaded", () => {
  let burger = document.querySelector(".navbar-burger");
  if (burger) {
    burger.addEventListener("click", () => {
      let menu = document.getElementById(burger.dataset.target);
      burger.classList.toggle("is-active");
      menu.classList.toggle("is-active");
    });
  }
});
