import React, { Component, useContext, useState } from 'react';
import './Login.css';
import logomarcaEmpresa from '../../assets/logomarca.png';
import {AuthContext} from '../../context/auth'

function Login() {
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');

  const {signIn} = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      signIn(email, password)
    }

  }

  
    return (
      <div className='login'>
        <div className='oitenta'>
          <div className='formulario'>
          <form onSubmit={handleSubmit}>
            <label>
            <p><b>Usuário</b></p>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Digite seu email'/>
            </label>
            <br />
            <label>
             <p> <b>Senha</b></p>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Digite sua senha'/>
            </label>
            {/* <p className='link'><a href='#'>Esqueci a senha</a></p> */}
            <br />
            <button className='btnentrar' type="submit"><b>Entrar</b></button>
          </form>
          
          </div>
        </div>
        <div className='footer'>
        <img className='logoarcafooter' width='200px' src={logomarcaEmpresa} alt="Logo" />
        </div>
      </div>

    );
  }


export default Login;
