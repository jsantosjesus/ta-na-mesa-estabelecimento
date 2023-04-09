
import Login from '../pages/login';
import  {Switch}  from 'react-router-dom';

import Mesas from '../pages/mesas/Mesas';
import Route from './Route';

export default function Rotas(){
    return(
        <Switch>
          <Route exact path="/" component={Login} /> 

          <Route exact path="/mesas" component={Mesas} isPrivate/>
        </Switch>
    )
}