let ejs = require("ejs");
let scoreValues = [
  "Unrated",
  "1 - Did Not Like",
  "2 - It Was OK",
  "3 - Liked It",
  "4 - Really Liked It",
  "5 - Loved It",
];
let ratingValues = [
  "Rating Pending",
  "Everyone",
  "Everyone 10+",
  "Teen",
  "Mature 17+",
  "Adults Only 18+",
];
let genres = [
  "Action",
  "Adventure",
  "Arcade",
  "Education",
  "Fighting",
  "FPS",
  "Multiplayer",
  "Music",
  "Party",
  "Platformer",
  "Puzzle",
  "Racing",
  "RPG",
  "Simulation",
  "Sports",
  "Strategy",
];

module.exports = {
  truncate: (str, limit) => {
    if (str.length < limit) {
      return str;
    }
    let newStr = str.slice(0, limit);
    newStr = newStr.slice(0, newStr.lastIndexOf(" "));
    newStr = newStr.length > 0 ? newStr : str.slice(0, limit);
    return newStr + "...";
  },
  editLikeButton: (data, user, type) => {
    if (data.user._id.toString() === user._id.toString()) {
      return `<a href=/${type}s/edit-${type}/${data._id}
        class="button has-text-weight-bold">
          <span class="icon">
            <i class="fa-solid fa-pen-to-square"></i>
          </span>
        </a>`;
    } else {
      return `<form action=/${type}s/like-${type}/${data._id}?_method=PUT method="post">
        <button class="button is-primary" type="submit">
          <span class="icon">
            <i class="fa-solid fa-thumbs-up"></i>
          </span>
        </button>
      </form>`;
    }
  },
  shouldThereBeAnS: (num, word) => {
    if (num === 1) return `1 ${word}`;
    return `${num} ${word}s`;
  },
  options: (optionsName, option) => {
    let values;
    switch (optionsName) {
      case "score":
        values = scoreValues;
        break;
      case "rating":
        values = ratingValues;
        break;
      default:
        values = [];
        break;
    }
    return values
      .map((value) => {
        return `<option value="${value}" ${
          option === value ? "selected=selected" : ""
        }>${value}</option>`;
      })
      .join("");
  },
  button: (type) => {
    if (type === "submit") {
      return `<div class="control">
        <button class="button is-primary has-text-weight-bold" type="submit">
          Submit
        </button>
      </div>`;
    } else if (type === "delete") {
      return `<div class="control">
        <button type="button" data-target="delete-modal" class="button modal-button is-danger has-text-weight-bold">
          <span class="icon">
            <i class="fa-solid fa-trash"></i>
          </span>
        </button>
      </div>`;
    } else {
      return "";
    }
  },
  scoreStars: (score) => {
    if (score === "Unrated") return "did not rate the game";
    let [scoreVal, scoreName] = score.split(" - ");
    let html = "";
    for (let i = 0; i < +scoreVal; i++) {
      html += '<i class="fa-solid fa-star"></i>';
    }
    for (let j = +scoreVal; j < 5; j++) {
      html += '<i class="fa-regular fa-star"></i>';
    }
    return `rated it <span aria-label="${scoreName}">${html}</span>`;
  },
  gameGenres: genres,
};
