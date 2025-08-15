import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddFoodForm from '../components/AddFoodForm';
import { useAuth } from '../hooks/useAuth';
import { getAllFoods, deleteFood } from '../services/foodService';
import '../App.css';

function FoodListPage() {
  const [foodData, setFoodData] = useState(null);
  const { user } = useAuth();

  const loadFoods = () => {
    getAllFoods()
      .then((data) => setFoodData(data))
      .catch((error) => console.error('Error fetching menu:', error));
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const handleFoodAdded = () => {
    loadFoods();
  };

  const handleDelete = (idToDelete) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
      deleteFood(idToDelete)
        .then(() => loadFoods())
        .catch((error) => alert(`Gagal menghapus: ${error.message}`));
    }
  };

  // Fungsi untuk memformat harga ke Rupiah
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!foodData) return <div className="loading">Loading the menu...</div>;

  return (
    <>
      {user && user.role === 'admin' && <AddFoodForm onFoodAdded={handleFoodAdded} />}
      
      <hr style={{ width: '80%', margin: '40px 0' }} />
      <h1 className="page-title">Menu Restoran Kami</h1>
      
      {foodData.length === 0 ? (
        <p style={{ marginTop: '20px' }}>Yah, menunya masih kosong!</p>
      ) : (
        <div className="menu-container">
          {foodData.map((food) => (
            <div key={food.id} className="food-card">
              <img 
                src={`https://placehold.co/600x400/282c34/white?text=${food.name.replace(/\s/g, '+')}`} 
                alt={`Gambar ${food.name}`}
                className="food-image"
              />
              <div className="food-details">
                <h3>{food.name}</h3>
                <p className="food-description">{food.description}</p>
                <p className="food-price">{formatRupiah(food.price)}</p>
                
                {user && user.role === 'admin' && (
                  <div className="card-actions">
                    <Link to={`/food/edit/${food.id}`} className="edit-btn">Edit</Link>
                    <button className="delete-btn" onClick={() => handleDelete(food.id)}>Hapus</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default FoodListPage;
