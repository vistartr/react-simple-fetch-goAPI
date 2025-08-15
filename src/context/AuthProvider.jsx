import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
// Impor objek Context dari file terpisahnya
import { AuthContext } from './AuthContext';

// File ini HANYA mengekspor komponen Provider sebagai default.
export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken);
        setToken(storedToken);
        setUser(decodedUser);
      } catch { // Perbaikan: Gunakan "optional catch binding". Tidak perlu variabel (error).
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (newToken) => {
    try {
      const decodedUser = jwtDecode(newToken);
      setToken(newToken);
      setUser(decodedUser);
      localStorage.setItem('token', newToken);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    token,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
