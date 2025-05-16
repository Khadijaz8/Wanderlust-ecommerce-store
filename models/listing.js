const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { string } = require("joi");
const listingSchema = new Schema({
  title: {
    type: String,
    // required: true,
    // default: "N/A",
  },
  description: {
    type: String,
    // required: true,
    // default: "N/A",
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true,
    default: "0",
  },
  // location: { type: String, required: true, default: "N/A" },
  country: {
    type: String,
    // required: true,
    // default: "N/A",
  },
  // listing.reviews.push(newReview);
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
