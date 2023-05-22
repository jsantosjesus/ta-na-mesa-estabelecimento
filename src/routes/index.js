import Login from '../pages/login';
import { Switch, Route } from 'react-router-dom';

import Mesas from '../pages/mesas/Mesas';
import CentralGarcom from '../pages/CentralGarcom';
import Produtos from '../pages/produtos/produtos';
import Colaboradores from '../pages/Colaboradores';

export default function Rotas() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />

      <Route exact path="/mesas" component={Mesas} />

      <Route exact path="/produtos" component={Produtos} />

      <Route exact path="/colaboradores" component={Colaboradores} />

      <Route exact path="/central" component={CentralGarcom} />
    </Switch>
  );
}
