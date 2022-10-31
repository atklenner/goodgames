document.addEventListener("DOMContentLoaded", () => {
  let deleteButton = document.querySelector(".delete-button");
  if (deleteButton) {
    deleteButton.addEventListener("click", () => {
      let modal = document.getElementById(deleteButton.dataset.target);
      modal.classList.add("is-active");
    });
  }
  document
    .querySelectorAll(".modal-background, .modal-close, .no-button")
    .forEach((elt) => {
      elt.addEventListener("click", () => {
        let modal = document.getElementById(deleteButton.dataset.target);
        modal.classList.remove("is-active");
      });
    });
});
