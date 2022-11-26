let ratingValues = [
  "Unrated",
  "Did Not Like",
  "It Was OK",
  "Liked It",
  "Really Liked It",
  "Loved It",
];
let completedValues = ["No", "Playing", "Yes", "Quit"];

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
        class="button is-primary has-text-weight-bold"
      >Edit ${type[0].toUpperCase() + type.slice(1)}</a>`;
    } else {
      return `<form action=/${type}s/like-${type}/${data._id}?_method=PUT %> method="post">
        <button class="button is-primary has-text-weight-bold" type="submit">Like</button>
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
      case "rating":
        values = ratingValues;
        break;
      case "completed":
        values = completedValues;
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
          Delete
        </button>
      </div>`;
    } else {
      return "";
    }
  },
};
