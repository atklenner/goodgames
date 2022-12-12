module.exports = {
  errorType: (error) => {
    let type;
    if (error.message === "auth") {
      type = "auth";
    } else {
      type = "list";
    }
    return type;
  }
}
