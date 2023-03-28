import React, { Component } from "react";
import Menu from "./Menu";
import logomarcaEmpresa from '../../imagens/logomarca.png';
import './Menubar.css';



class Menubar extends Component {

    constructor(props) {
        super(props);
        this.state = {
          nome: 'Jadson',
        };
      }
    render() {
        return (
            <div className="menubar">
                <div>
                    <Menu />
                </div>
                <div className="divLogo">
                    <img className='logoarcafooter' width='100px' src={logomarcaEmpresa} alt="Logo" />   
                </div>
                <div className="divUser">
                    <p>Olá {this.state.nome}</p>
                </div>
            </div>

        );
    }
}

export default Menubar;