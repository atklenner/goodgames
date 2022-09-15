const deleteBtns = document.querySelectorAll(".delete-btn");

deleteBtns.forEach((button) => {
  button.addEventListener("click", deleteGame);
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
