import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvicer = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('usuarioLogado');

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = (email, password, usuario) => {
    console.log('login', { email, password, usuario });
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    setUser(usuario);
    console.log(user);
    navigate('/');
  };

  const logout = () => {
    console.log('logout');
    localStorage.removeItem('usuarioLogado');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
