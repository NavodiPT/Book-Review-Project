const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: String, required: true },
  review: { type: String, required: true },
  date: { type: Date, required: true }
});

const Reviews = mongoose.model('reviews', ReviewsSchema);

module.exports = Reviews;