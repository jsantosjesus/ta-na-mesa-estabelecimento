import React, { Component } from 'react';
import './Login.css';
import logomarcaEmpresa from '../imagens/logomarca.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${this.state.email}, Password: ${this.state.password}`);
    
  }

  render() {
    return (
      <div>
        <div className='oitenta'>
          <div className='formulario'>
          <form onSubmit={this.handleSubmit}>
            <label>
            <p><b>Usuário</b></p>
              <input type="email" value={this.state.email} onChange={this.handleEmailChange} placeholder='Digite seu email'/>
            </label>
            <br />
            <label>
             <p> <b>Senha</b></p>
              <input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder='Digite sua senha'/>
            </label>
            <p className='link'><a href='#'>Esqueci a senha</a></p>
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
}

export default Login;
