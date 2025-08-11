import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddFoodForm from "../components/AddFoodForm";
import "../App.css";

function FoodListPage() {
  const [foodData, setFoodData] = useState(null);

  const fetchFood = () => {
    fetch("http://localhost:8080/food")
      .then((response) => response.json())
      .then((data) => setFoodData(data))
      .catch((error) => console.error("Error fetching menu:", error));
  };

  useEffect(() => {
    fetchFood();
  }, []);

  const handleFoodAdded = (newFood) => {
    setFoodData([...foodData, newFood]);
  };

  const handleDelete = (idToDelete) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
      fetch(`http://localhost:8080/food/${idToDelete}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setFoodData(foodData.filter((food) => food.id !== idToDelete));
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  if (!foodData) return <div className="loading">Loading the menu...</div>;

  return (
    <>
      <AddFoodForm onFoodAdded={handleFoodAdded} />
      <hr style={{ width: "80%", margin: "40px 0" }} />
      <h1>Our Restaurant Menu</h1>

      {foodData.length === 0 ? (
        <p>Yah, menunya masih kosong!</p>
      ) : (
        <div className="menu-container">
          {foodData.map((food) => (
            <div key={food.id} className="food-card">
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <p className="price">Rp {food.price.toFixed(3)}</p>
              <div className="card-actions">
                {/* UBAH TOMBOL EDIT MENJADI LINK */}
                <Link to={`/food/edit/${food.id}`} className="edit-btn">
                  Edit
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(food.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default FoodListPage;