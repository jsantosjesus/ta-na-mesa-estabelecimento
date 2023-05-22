import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      <Rotas />
    </BrowserRouter>
  );
}

export default App;
