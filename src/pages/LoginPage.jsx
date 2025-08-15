
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // 1. Impor hook useAuth

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. Ambil fungsi login dari AuthContext

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginData = { username, password };

    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    })
    .then(response => {
      if (!response.ok) {
        // Jika status code bukan 2xx (misal: 401 Unauthorized), anggap sebagai error
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      if (data.token) {
        // 3. Panggil fungsi login dari context untuk menyimpan token secara global
        login(data.token);
        
        alert('Login berhasil!');
        navigate('/'); // Arahkan ke halaman utama setelah login
      } else {
        // Handle jika response berhasil tapi tidak berisi token (sebagai fallback)
        alert('Gagal login: ' + (data.error || 'Token tidak diterima'));
      }
    })
    .catch(err => {
        console.error(err);
        alert('Username atau password salah.');
    });
  };

  return (
    <div className="edit-form-container">
      <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;