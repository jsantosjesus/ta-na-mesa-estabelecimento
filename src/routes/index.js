
import Login from '../pages/login';
import  {Switch}  from 'react-router-dom';

import Mesas from '../pages/mesas/Mesas';
import CentralGarcom from '../pages/CentralGarcom';
import Produtos from '../pages/produtos/produtos';
import Colaboradores from '../pages/Colaboradores';
import Route from './Route';

export default function Rotas(){
    return(
        <Switch>
          <Route exact path="/" component={Login} /> 

          <Route exact path="/mesas" component={Mesas} />

          <Route exact path="/produtos" component={Produtos} />

          <Route exact path="/colaboradores" component={Colaboradores}/>

          <Route exact path="/central" component={CentralGarcom} />
        </Switch>
    )
}