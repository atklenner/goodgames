const { truncate, editLikeButton, options } = require("./ejs");

module.exports = (app) => {
  app.locals.truncate = truncate;
  app.locals.editLikeButton = editLikeButton;
  app.locals.options = options;
};
