import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = { username, password };

    fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert('Gagal mendaftar: ' + data.error);
      } else {
        alert('Registrasi berhasil! Silakan login.');
        navigate('/login'); // Arahkan ke halaman login setelah berhasil
      }
    })
    .catch(err => {
        console.error(err);
        alert('Terjadi error saat mendaftar.');
    });
  };

  return (
    <div className="edit-form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="food-form">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
