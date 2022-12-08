module.exports = (err, req, res, next) => {
  if (err.type) {
    res.status(404);
    err.message = `That ${err.type} does not exist.`;
    err.status = 404;
  } else {
    res.status(err.status || 500);
  }
  res.render("../views/404.ejs", { status: err.status, message: err.message || "Internal Server Error", user: req.user });
}
