import React, {useState} from 'react';
import './Login.css';
import logomarcaEmpresa from '../../assets/logomarca.png';
import FormLogin from '../../componentes/login/formLogin';
import FormRecuperarSenha from '../../componentes/login/recuperarSenha';

function Login() {

  const [esqueciSenha, setEsqueciSenha] = useState(false);

  return (
    <div className="login">
      <div className="oitenta">
        <div className="formulario">
          {!esqueciSenha ? (<><FormLogin />
          <p className='esqueciSenha' onClick={() => setEsqueciSenha(true)}>Esqueci minha senha</p></>) :
          (<><FormRecuperarSenha />
          <p className='esqueciSenha' onClick={() => setEsqueciSenha(false)}>Voltar</p></>)}
        </div>
      </div>
      <div className="footer">
        <img className="logoarcafooter" width="200px" src={logomarcaEmpresa} alt="Logo" />
      </div>
    </div>
  );
}

export default Login;
