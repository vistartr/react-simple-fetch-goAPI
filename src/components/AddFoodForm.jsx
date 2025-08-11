import React, { useState } from 'react';

// Komponen ini menerima satu prop: 'onFoodAdded'
// Ini adalah fungsi yang akan dipanggil setelah makanan berhasil ditambahkan
function AddFoodForm({ onFoodAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    // Mencegah browser me-refresh halaman saat form disubmit
    event.preventDefault();

    const newFood = {
      name,
      description,
      // Ubah harga dari string menjadi angka
      price: parseFloat(price),
    };

    // Kirim data ke API menggunakan fetch dengan metode POST
    fetch('http://localhost:8080/food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFood),
    })
      .then(response => response.json())
      .then(addedFood => {
        // Panggil fungsi yang diberikan dari App.jsx
        onFoodAdded(addedFood);
        // Kosongkan form setelah berhasil
        setName('');
        setDescription('');
        setPrice('');
      })
      .catch(error => console.error('Error adding food:', error));
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
        type="text"
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