const { truncate, editLikeButton, likes, options, button } = require("./ejs");

module.exports = (app) => {
  app.locals.truncate = truncate;
  app.locals.editLikeButton = editLikeButton;
  app.locals.likes = likes;
  app.locals.options = options;
  app.locals.button = button;
};
