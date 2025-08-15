import { useContext } from 'react';
// Impor AuthContext dari lokasi yang benar
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  return useContext(AuthContext);
};
