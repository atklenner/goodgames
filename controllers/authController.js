const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const List = require("../models/List");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("login");
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("signup");
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (!validator.isLength(req.body.username, { min: 3 }))
    validationErrors.push({
      msg: "Username must be at least 3 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  

  User.findOne(
    { $or: [{ email: req.body.email }, { username: req.body.username }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      Promise.all(addDefaultLists(user)).then(
        user.save((err) => {
          if (err) {
            return next(err);
          }
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
            res.redirect("/");
          });
        })
      )
    }
  );
};

// this will create the lists even if the user creation fails...
function addDefaultLists(user) {
  try {
    // all of these could be done in parallel...
    let completed = new List({ 
      name: "Completed", 
      user: { 
        _id: user._id, 
        username: user.username 
      }, 
      description: "All the games I have completed", 
      private: true 
    });
    let wantToPlay = new List({ 
      name: "Want to play", 
      user: { 
        _id: user._id, 
        username: user.username 
      }, 
      description: "All the games I want to play", 
      private: true 
    });
    let playing = new List({ 
      name: "Currently Playing", 
      user: { 
        _id: user._id, 
        username: user.username 
      }, 
      description: "All the games I playing right now", 
      private: true 
    });
    user.mainList = playing._id;
    user.lists = [playing._id, wantToPlay._id, completed._id];
    return [playing.save(), wantToPlay.save(), completed.save()];
  } catch (error) {
    console.log(error);
  }
}
