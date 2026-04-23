import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // CONTEXTO
  const navigate = useNavigate();

  // ESTADOS
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Se ejecuta al cargar la pagina e intenta obtener los datos del usuario
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    const name = sessionStorage.getItem('userName');
    const email = sessionStorage.getItem('userEmail');

    if (token && role) {
      setUser({
        token,
        role,
        name,
        email,
      });
    }

    setLoading(false);
  }, []);

  // Login
  const login = ({ token, role, name, email }) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('userEmail', email);

    setUser({ token, role, name, email });
  };

  // Logout
  const logout = () => {
    setIsLoggingOut(true);

    sessionStorage.clear();
    setUser(null);
    navigate(ROUTES.PUBLIC.LOGIN, { replace: true });

    setTimeout(() => {
      setIsLoggingOut(false);
    }, 100);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isLoggingOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);
