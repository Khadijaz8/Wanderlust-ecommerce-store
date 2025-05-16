const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {
  validateReview,
  userloggedin,
  isreviewauthor,
} = require("../middleware.js");
const reviewController = require("../controllers/review.js");
//review route

router.post(
  "/",
  validateReview,
  userloggedin,
  wrapAsync(reviewController.createReview)
);
//delete review route
router.delete(
  "/:reviewId",
  userloggedin,
  isreviewauthor,
  wrapAsync(reviewController.deleteReview)
);
module.exports = router;
