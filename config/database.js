const mongoose = require("mongoose");

module.exports = () =>
  mongoose.connect(process.env.DB_STRING, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log("connected to DB");
  });
