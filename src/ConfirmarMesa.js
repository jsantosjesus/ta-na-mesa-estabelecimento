import React, { Component } from "react";


class ConfirmarMesa extends Component {
    constructor(props) {
        super(props);
        // Não chame this.setState() aqui!
        this.state = {
        mesa:"mesa 06",
        estabelecimento:"Pizaria Mão de Pilão"
        }
    }

    render() {
        return (
            <div>
 <p>{this.state.estabelecimento}</p>
 <p>{this.state.mesa}</p>

            </div>
        );
    }
}

export default ConfirmarMesa;