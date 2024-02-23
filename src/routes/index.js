import Login from '../pages/login';
import { Routes, Route, Navigate } from 'react-router-dom';
import Salao from '../pages/salao';
import Produtos from '../pages/produtos/produtos';
import Colaboradores from '../pages/Colaboradores';
import Categorias from '../pages/categorias';
import { Cozinha } from '../pages/cozinha';
import { AuthContext, AuthProvicer } from '../contexts/auth';
import { useContext } from 'react';
import Mesas from '../pages/mesas';
import { Configuracoes } from '../pages/configuracoes';

export default function Rotas() {


  const Private = ({ children, admin, login }) => {
    const { authenticated, loading, user } = useContext(AuthContext);

    if (loading) {
      return <div>Carregando...</div>;
    }

    if (!login && !authenticated) {
      return <Navigate to="/login" />;
    }

    if (login && authenticated) {
      return <Navigate to="/" />;
    }

    if (admin && !user.adm) {
      return <Navigate to="/" />;
    }

    return children;
  };
  return (
    <AuthProvicer>
      <Routes>

        <Route
          exact
          path="/login"
          element={
            <Private login={true}>
              <Login />
            </Private>
          } />


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
          path="/produtos"
          element={
            <Private>
              <Produtos />
            </Private>
          }
        />

        <Route
          exact
          path="/"
          element={
            <Private>
              <Cozinha />
            </Private>
          }
        />

        <Route
          exact
          path="/colaboradores"
          element={
            <Private admin={true}>
              <Colaboradores />
            </Private>
          }
        />

        <Route
          exact
          path="/categorias"
          element={
            <Private>
              <Categorias />
            </Private>
          }
        />

        <Route
          exact
          path="/cozinha"
          element={
            <Private>
              <Cozinha />
            </Private>
          }
        />

        <Route
          exact
          path="/configuracoes"
          element={
            <Private admin={true}>
              <Configuracoes />
            </Private>
          }
        />
      </Routes>
    </AuthProvicer>
  );
}
