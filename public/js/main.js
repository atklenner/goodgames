const form = document.querySelector("form");
const deleteBtns = document.querySelectorAll(".delete-btn");
const editBtns = document.querySelectorAll(".edit-btn");
const submitBtn = document.querySelector(".submit-btn");
const resetBtn = document.querySelector(".reset-btn");
const nameInput = document.querySelector("#name");
const genreInput = document.querySelector("#genre");
const ratingInput = document.querySelector("#rating");
const completedInput = document.querySelector("#completed");
let editing = false;
let editingID = undefined;

deleteBtns.forEach((button) => {
  button.addEventListener("click", deleteGame);
});

editBtns.forEach((button) => {
  button.addEventListener("click", fillForm);
});

resetBtn.addEventListener("click", resetForm);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let name = nameInput.value;
  let genre;
  console.log(name);
});

async function deleteGame(element) {
  try {
    const res = await fetch(`api/delete-game/${element.target.id}`, {
      method: "delete",
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (error) {
    console.error(error);
  }
}

async function updateGame(element) {}

function resetForm() {
  editing = false;
  editingID = undefined;
  nameInput.value = "";
  genreInput.value = "";
  ratingInput.value = "Unrated";
  completedInput.value = "No";
}

function fillForm(element) {
  editing = true;
  editingID = element.target.id;
  let name = document.querySelector(
    `#game-name-${element.target.id}`
  ).textContent;
  let genre = document.querySelector(
    `#game-genre-${element.target.id}`
  ).textContent;
  let rating = document.querySelector(
    `#game-rating-${element.target.id}`
  ).textContent;
  let completed = document.querySelector(
    `#game-completed-${element.target.id}`
  ).textContent;
  nameInput.value = name.trim();
  genreInput.value = genre;
  ratingInput.value = rating;
  completedInput.value = completed;
}
