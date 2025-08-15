import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFoodById, updateFood } from "../services/foodService"; // Impor service

function EditFoodPage() {
  const [food, setFood] = useState({ name: "", description: "", price: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Gunakan service untuk mengambil data
    getFoodById(id)
      .then((data) => {
        setFood(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFood((prevFood) => ({
      ...prevFood,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const foodToUpdate = {
      ...food,
      price: parseFloat(food.price),
    };

    // Gunakan service untuk mengupdate data
    updateFood(id, foodToUpdate)
      .then(() => {
        alert("Menu berhasil diupdate!");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert(`Gagal mengupdate: ${err.message}`);
      });
  };

  if (!food.name) return <div>Loading...</div>;

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
