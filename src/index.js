import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/login';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './componentes/Header';
import Mesas from './pages/mesas/Mesas';
import Produtos from './pages/produtos/produtos';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Login /> */}
    {/* <Menubar/> */}
    {/* <Header /> */}
    {/* <Mesas /> */}
    {/* <Produtos/> */}
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
