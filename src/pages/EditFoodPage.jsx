import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Impor hooks baru

function EditFoodPage() {
  const [food, setFood] = useState({ name: "", description: "", price: "" });
  const { id } = useParams(); // Hook untuk mengambil 'id' dari URL
  const navigate = useNavigate(); // Hook untuk melakukan redirect/navigasi

  // 1. Ambil data makanan yang akan diedit dari server saat komponen dimuat
  useEffect(() => {
    fetch(`http://localhost:8080/food/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data); // Isi state dengan data dari server
      })
      .catch((err) => console.error(err));
  }, [id]); // Efek ini dijalankan setiap kali 'id' berubah

  // 2. Fungsi untuk menangani perubahan pada input form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFood((prevFood) => ({
      ...prevFood,
      [name]: value,
    }));
  };

  // 3. Fungsi untuk mengirim data yang sudah diubah ke server
  const handleSubmit = (event) => {
    event.preventDefault();
    const foodToUpdate = {
        ...food,
        price: parseFloat(food.price) // Pastikan harga adalah angka
    }

    fetch(`http://localhost:8080/food/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(foodToUpdate),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Menu berhasil diupdate!");
        navigate("/"); // Redirect kembali ke halaman utama
      })
      .catch((err) => console.error(err));
  };

  if (!food) return <div>Loading...</div>;

  return (
    <div className="edit-form-container">
      <h1>Edit Menu: {food.name}</h1>
      <form onSubmit={handleSubmit} className="food-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={food.name}
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={food.description}
          onChange={handleChange}
          required
        />
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={food.price}
          onChange={handleChange}
          required
          step="0.01"
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditFoodPage;