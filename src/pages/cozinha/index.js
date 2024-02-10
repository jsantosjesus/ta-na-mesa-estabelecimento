import React, { useState, useEffect } from 'react';
import Header from '../../componentes/Header';
import './cozinha.css';
import CustomizedAccordions from '../../componentes/pedidosCozinha';

export const Cozinha = () => {
  const [pedidos, setPedidos] = useState({});


  return (
    <>
      <Header />
      <div className="bodyCozinha">
        <div className="statusPedido">
          <h4>Aguardando aprovação</h4>
          {/* {pedidos.map((pedido) => (
          <> */}
          <CustomizedAccordions pedido={pedidos} />
          {/* </>
          ))} */}
        </div>
        <div className="statusPedido">
          <h4>Fila</h4>
        </div>
        <div className="statusPedido">
          <h4>Preparando</h4>
        </div>
      </div>
    </>
  );
};
