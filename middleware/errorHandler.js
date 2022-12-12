module.exports = (err, req, res, next) => {
  let status = 500;
  if (err.type === "auth") {
    err.message = "You must be logged in as that user.";
    status = 403;
  } else if (err.type) {
    err.message = `That ${err.type} does not exist.`;
    status = 404;
  }
  res.status(status).render("../views/404.ejs", { status, message: err.message || "Internal Server Error", user: req.user });
}
