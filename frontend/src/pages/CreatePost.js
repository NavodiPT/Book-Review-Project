import React, { useState } from 'react';
import axios from 'axios'
import '../styles/CreatePost.css';

export default function CreatePost() {

  const [form, setForm] = useState({
    title : '',
    author: '',
    rating: '',
    review: '',
    date: ''
  });


  const handleChange = (e) =>
    setForm({...form, [e.target.name]: e.target.value});

  
  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/api/create`,form);
      console.log("Response:",response.data)
      alert("Review created successfully");
      setForm({title: '', author: '', rating: '', review: '', date: ''});
    } catch (error) {
      alert("Failed to create review. Try again.",error);
    }
  }




  return (
    <div className="create-post-container">
      <h1>Create New Book Review</h1>
      <form onSubmit={handleSubmit}>
        <label>Book Title:</label>
        <input type="text" placeholder="Enter book title" name = "title" value={form.title} onChange={handleChange} required/>

        <label>Author:</label>
        <input type="text" placeholder="Author's name"  name= "author" value={form.author} onChange={handleChange} required/>

        <label>Rating:</label>
        <input type="text" placeholder="Rate from 1 to 5" name = "rating" min="1" max="5" value={form.rating} onChange={handleChange} required/>

        <label>Review Text:</label>
        <input type="text" placeholder="Write your review" name= "review" value={form.review} onChange={handleChange} required/>

        <label>Date:</label>
        <input type="date"  value={form.date} name ="date" onChange={handleChange} required/>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


