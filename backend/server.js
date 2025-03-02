const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const ReviewsSchema = new mongoose.Schema({
    title: String,
    author: String,
    rating: String,
    review: String,
    date: Date
})

const Reviews = mongoose.model('reviews', ReviewsSchema);

//create review
app.post('/api/create', async (req, res) => {
  try {
    const { title, author, rating, review, date } = req.body;
    const newReview = new Reviews({ title, author, rating, review, date });
    await newReview.save();
    res.status(201).json({ message: 'Review created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review. Try again.' });
  }
});

//View all reveiws
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Reviews.find();  // Fetch all reviews from MongoDB
    res.status(200).json(reviews); // Send the reviews as JSON
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews. Try again.' });
  }
});

//View relevant review
app.get('/api/reviews/:id', async (req, res) => {
  try {
    const review = await Reviews.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ error: 'Failed to fetch review. Try again.' });
  }
});


// DELETE Review
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const review = await Reviews.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review." });
  }
});

// UPDATE Review
app.put('/api/reviews/:id', async (req, res) => {
  try {
    const updatedReview = await Reviews.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReview) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Failed to update review." });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
