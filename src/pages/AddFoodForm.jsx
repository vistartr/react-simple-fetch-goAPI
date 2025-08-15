import React, { useState } from 'react';
import { createFood } from '../services/foodService'; // 1. Impor service

function AddFoodForm({ onFoodAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newFood = {
      name,
      description,
      price: parseFloat(price),
    };

    // 2. Panggil fungsi createFood dari service
    createFood(newFood)
      .then(() => {
        alert('Makanan baru berhasil ditambahkan!');
        onFoodAdded(); // Panggil fungsi dari parent untuk memuat ulang data
        // Kosongkan form setelah berhasil
        setName('');
        setDescription('');
        setPrice('');
      })
      .catch((error) => {
        console.error('Error adding food:', error);
        alert(`Gagal menambahkan makanan: ${error.message}`);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="food-form">
      <h3>Add a New Food</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        step="0.01"
      />
      <button type="submit">Add Food</button>
    </form>
  );
}

export default AddFoodForm;
