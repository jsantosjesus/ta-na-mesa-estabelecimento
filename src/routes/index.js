import Login from '../pages/login';
import { Routes, Route, Navigate } from 'react-router-dom';
import Salao from '../pages/salao';
import CentralGarcom from '../pages/CentralGarcom';
import Produtos from '../pages/produtos/produtos';
import Colaboradores from '../pages/Colaboradores';
import { AuthContext, AuthProvicer } from '../contexts/auth';
import { useContext } from 'react';
import Mesas from '../pages/mesas';

export default function Rotas() {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div>Carregando...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <AuthProvicer>
      <Routes>
        <Route exact path="/login" element={<Login />} />

        <Route
          exact
          path="/salao"
          element={
            <Private>
              <Salao />
            </Private>
          }
        />

        <Route
          exact
          path="/mesas"
          element={
            <Private>
              <Mesas />
            </Private>
          }
        />

        <Route
          exact
          path="/"
          element={
            <Private>
              <Produtos />
            </Private>
          }
        />

        <Route
          exact
          path="/colaboradores"
          element={
            <Private>
              <Colaboradores />
            </Private>
          }
        />

        <Route
          exact
          path="/central"
          element={
            <Private>
              <CentralGarcom />
            </Private>
          }
        />
      </Routes>
    </AuthProvicer>
  );
}
