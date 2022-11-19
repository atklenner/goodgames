document.addEventListener("DOMContentLoaded", () => {
  let fileInput = document.querySelector(".file-input");
  let burger = document.querySelector(".navbar-burger");
  let modalButton = document.querySelector(".modal-button");
  document
    .querySelectorAll(".modal-background, .modal-close, .no-button")
    .forEach((elt) => {
      elt.addEventListener("click", () => {
        let modal = document.getElementById(modalButton.dataset.target);
        modal.classList.remove("is-active");
      });
    });

  if (modalButton) {
    modalButton.addEventListener("click", () => {
      let modal = document.getElementById(modalButton.dataset.target);
      modal.classList.add("is-active");
    });
  }
  if (burger) {
    burger.addEventListener("click", () => {
      let menu = document.getElementById(burger.dataset.target);
      burger.classList.toggle("is-active");
      menu.classList.toggle("is-active");
    });
  }
  if (fileInput) {
    fileInput.onchange = () => {
      if (fileInput.files.length > 0) {
        const fileName = document.querySelector(".file-name");
        fileName.textContent = fileInput.files[0].name;
      }
    };
  }
});
