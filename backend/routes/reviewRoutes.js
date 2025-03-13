const express = require('express');
const Reviews = require('../models/BookReview');
const router = express.Router();

//create review
router.post('/create', async (req, res) => {
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
  router.get('/reviews', async (req, res) => {
    try {
      const reviews = await Reviews.find();  // Fetch all reviews from MongoDB
      res.status(200).json(reviews); // Send the reviews as JSON
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews. Try again.' });
    }
  });
  
  //View relevant review
  router.get('/reviews/:id', async (req, res) => {
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
  router.delete('/reviews/:id', async (req, res) => {
    try {
      const review = await Reviews.findByIdAndDelete(req.params.id);
      if (!review) return res.status(404).json({ message: "Review not found" });
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review." });
    }
  });
  
  // UPDATE Review
  router.put('/reviews/:id', async (req, res) => {
    try {
      const updatedReview = await Reviews.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedReview) return res.status(404).json({ message: "Review not found" });
      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(500).json({ error: "Failed to update review." });
    }
  });
  

module.exports = router;