



import React, { useState, useEffect } from "react";
import "./App.css";
// Impor komponen form yang baru kita buat
import AddFoodForm from "./components/AddFoodForm";

function App() {
  const [foodData, setFoodData] = useState(null);

  // Fungsi untuk mengambil data makanan dari API
  const fetchFood = () => {
    fetch("http://localhost:8080/food")
      .then((response) => response.json())
      .then((data) => setFoodData(data))
      .catch((error) => console.error("Error fetching menu:", error));
  };

  // Panggil fetchFood saat komponen pertama kali dimuat
  useEffect(() => {
    fetchFood();
  }, []);

  // Ini fungsi yang akan kita berikan ke AddFoodForm
  // Ia akan menambahkan makanan baru ke state tanpa perlu refresh halaman
  const handleFoodAdded = (newFood) => {
    setFoodData([...foodData, newFood]);
  };

  const handleDelete = (idToDelete) => {
    // Tampilkan konfirmasi sebelum menghapus
    if (window.confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
      fetch(`http://localhost:8080/food/${idToDelete}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          // Jika berhasil, update state dengan memfilter item yang dihapus
          setFoodData(foodData.filter(food => food.id !== idToDelete));
        } else {
          // Handle error jika ada
          console.error("Gagal menghapus makanan");
        }
      })
      .catch(error => console.error("Error:", error));
    }
  };

  if (!foodData) {
    return <div className="loading">Loading the menu...</div>;
  }

  if (foodData.length === 0) {
    return (
      <div className="App">
        <header className="App-header">
          {/* Tampilkan form agar pengguna bisa mulai menambah data */}
          <AddFoodForm onFoodAdded={handleFoodAdded} />
          <hr style={{ width: "80%", margin: "40px 0" }} />
          <h1>Our Restaurant Menu</h1>
          <p style={{ marginTop: "20px" }}>
            Yah, menunya masih kosong! Silakan tambahkan makanan pertama Anda
            menggunakan form di atas.
          </p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <AddFoodForm onFoodAdded={handleFoodAdded} />
        <hr style={{ width: "80%", margin: "40px 0" }} />
        <h1>Our Restaurant Menu</h1>
        <div className="menu-container">
          {foodData.map((food) => (
            // Gunakan food.id untuk key, ini praktik terbaik
            <div key={food.id} className="food-card">
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <p className="price">Rp {food.price.toFixed(3)}</p>

              {/* --- TOMBOL-TOMBOL BARU --- */}
              <div className="card-actions">
                <button className="edit-btn">Edit</button>
                {/* Tambahkan onClick handler untuk memanggil fungsi handleDelete */}
                <button className="delete-btn" onClick={() => handleDelete(food.id)}>
                  Hapus
                </button>
              </div>

            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
