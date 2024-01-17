import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebaseConfig } from './firebase';
import firebase from 'firebase';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      <Rotas />
    </BrowserRouter>
  );
}

export default App;
