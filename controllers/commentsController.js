const Comment = require("../models/Comment");

module.exports = {
  likeComment: async (req, res, next) => {
    try {
      let comment = await Comment.findById(req.params.id);
      if (comment.user._id.toString() === req.user._id.toString()) {
        throw new Error('auth');
      }
      await comment.updateOne({ $inc: { likes: 1 } });
      res.redirect("back");
    } catch (error) {
      error.type = error.message = "auth" ? "auth" : "comment";
      console.log(error);
      next(error);
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      let comment = await Comment.findById(req.params.id);
      if (comment.user._id.toString() !== req.user._id.toString()) {
        throw new Error("auth");
      }
      await comment.remove();
      res.redirect("back");
    } catch (error) {
      error.type = error.message === "auth" ? "auth" : "comment";
      console.log(error);
      next(error);
    }
  }
}

