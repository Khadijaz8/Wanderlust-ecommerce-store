const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  // ya capital L wala listing bhi model ka naam hai.
  let listing = await Listing.findById(req.params.id);
  // yahan par hamaray model ka naam ay ga wo naam jissay humnay model ko app.ja mai export kiya hai.
  let newReview = new Review(req.body.review);
  // yahan wo reviews array likhna hai jissaay humnay apnay listing.js mai set kiya hai.  likhna hai ji
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  // ya new review hamaray obnject ka naam hai jo humnay apnay model kay liya phela object banaya hai.
  let result = await newReview.save();
  await listing.save();
  req.flash("success", "review created!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "review deleted!");
  res.redirect(`/listings/${id}`);
};
