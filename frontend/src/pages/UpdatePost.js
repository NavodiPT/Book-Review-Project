import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../styles/CreatePost.css';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdatePost() {
  
  const {id} = useParams();
  const navigate = useNavigate();
    
  const [form, setForm] = useState({
    title : '',
    author: '',
    rating: '',
    review: '',
    date: ''
  });


  useEffect ( ()=>{
    const fetchReview = async() =>{
        try {
            const response = await axios.get(`http://localhost:5000/api/reviews/${id}`);
            setForm(response.data)
        } catch (error) {
            console.log('Error fetching the review:', error)
        }
    };

    fetchReview();
  }, [id]);


  const handleChange = (e) =>
    setForm({...form, [e.target.name]: e.target.value});

  
  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/reviews/${id}`,form);
      alert('Review updated successfully');
      navigate('/'); 
    } catch (error) {
      alert('Failed to update review. Try again.');
    }
  }




  return (
    <div className="create-post-container">
      <h1>Update Book Review</h1>
      <form onSubmit={handleSubmit}>
        <label>Book Title:</label>
        <input type="text" name="title"  value={form.title} onChange={handleChange} required/>

        <label>Author:</label>
        <input type="text" name= "author"  value={form.author} onChange={handleChange} required/>

        <label>Rating:</label>
        <input type="text" name="rating" min="1" max="5" value={form.rating} onChange={handleChange} required/>

        <label>Review Text:</label>
        <input type="text" name="review" value={form.review} onChange={handleChange} required/>

        <label>Date:</label>
        <input type="date"  name="date" value={form.date} onChange={handleChange} required/>

        <button type="submit">Update Review</button>
      </form>
    </div>
  );
}