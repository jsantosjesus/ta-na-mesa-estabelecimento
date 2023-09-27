import React from 'react';
import Header from '../../componentes/Header';
import './cozinha.css';
import CustomizedAccordions from '../../componentes/pedidosCozinha';

export const Cozinha = () => {
  return (
    <>
      <Header />
      <div className="bodyCozinha">
        <div className='statusPedido'>
          <h4>Aguardando aprovação</h4>
          <CustomizedAccordions />
        </div>
        <div className='statusPedido'>
          <h4>Fila</h4>
        </div>
        <div className='statusPedido'>
          <h4>Preparando</h4>
        </div>
      </div>
    </>
  );
};
