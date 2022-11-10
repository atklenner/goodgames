const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviewsController");

router.get("/new-review/:gameId", reviewsController.addReviewPage);

router.get("/:id", reviewsController.getReview);

router.post("/new-review/:gameId", reviewsController.addReview);

router.put("/update-review/:id", reviewsController.updateReview);

router.delete("/delete-review/:id", reviewsController.deleteReview);

module.exports = router;
