// import React, { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [foodData, setFoodData] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:8080/food")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Food has arrived!", data);
//         setFoodData(data);
//       })
//       .catch((error) => {
//         console.log("Error fetching food:", error);
//       });
//   }, []);

//   if (!foodData) {
//     return <div>Loading the menu...</div>;
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Welcome to our restaurant</h1>
//         <h2>Our Restaurant Menu</h2>

//         {foodData.map(food => (
//           <div key={food.name} className ="food-card">
//             <h3>{food.name}</h3>
//             <p>{food.description}</p>
//             <p className="price"> $ {food.price.toFixed(2)}</p>
//           </div>

//         ))}

//         {/* <div className="menu-container">
//           <h3>{foodData.name}
//           <p>{foodData.description}</p>
//           <p className="price">${foodData.price.toFixed(2)}</p>
//           </h3>
//         </div> */}
//       </header>
//     </div>
//   );
// }

// export default App;

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
        {/* Tambahkan komponen form kita di sini */}
        <AddFoodForm onFoodAdded={handleFoodAdded} />

        <hr style={{ width: "80%", margin: "40px 0" }} />

        <h1>Our Restaurant Menu</h1>
        <div className="menu-container">
          {foodData.map((food) => (
            <div key={food.id} className="food-card">
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <p className="price">Rp {food.price.toFixed(3)}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
