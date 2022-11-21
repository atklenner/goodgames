const { truncate } = require("./ejs");

module.exports = (app) => {
  app.locals.truncate = truncate;
};
