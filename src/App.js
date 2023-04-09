import './App.css';
import Header from './componentes/Header';
import firebase from './services/firebaseConnection';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes';
import AuthProvider from './context/auth';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <Header /> */}
        <Rotas />
      </BrowserRouter>
    </AuthProvider>


  );
}

export default App;