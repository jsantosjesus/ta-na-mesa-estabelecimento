import Login from '../pages/login';
import { Routes, Route } from 'react-router-dom';
import Mesas from '../pages/mesas/Mesas';
import CentralGarcom from '../pages/CentralGarcom';
import Produtos from '../pages/produtos/produtos';
import Colaboradores from '../pages/Colaboradores';

export default function Rotas() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />

      <Route exact path="/mesas" element={<Mesas />} />

      <Route exact path="/produtos" element={<Produtos />} />

      <Route exact path="/colaboradores" element={<Colaboradores />} />

      <Route exact path="/central" element={<CentralGarcom />} />
    </Routes>
  );
}
