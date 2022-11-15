document.addEventListener("DOMContentLoaded", () => {
  let modalButton = document.querySelector(".modal-button");
  if (modalButton) {
    modalButton.addEventListener("click", () => {
      let modal = document.getElementById(modalButton.dataset.target);
      modal.classList.add("is-active");
    });
  }
  document
    .querySelectorAll(".modal-background, .modal-close, .no-button")
    .forEach((elt) => {
      elt.addEventListener("click", () => {
        let modal = document.getElementById(modalButton.dataset.target);
        modal.classList.remove("is-active");
      });
    });
});
