import './App.css';
import Header from './componentes/Header';
import firebase from './services/firebaseConnection';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes';
import AuthProvider from './context/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <ToastContainer autoClose={1000}/>
        <Rotas />
      </BrowserRouter>
    </AuthProvider>


  );
}

export default App;