import React, { useState, useEffect } from 'react';
import Header from '../../componentes/Header';
import './cozinha.css';
import CustomizedAccordions from '../../componentes/pedidosCozinha';
import { apiClient } from '../../config/api';

export const Cozinha = () => {
  const [pedidos, setPedidos] = useState({});

  const getPedido = async () => {
    const result = await apiClient.get(`/pedidos/6a414041-b39d-41b5-94f1-e3ebe51dc27d`, {
      params: { limit: 30, offset: 0 },
      headers: {
        'ngrok-skip-browser-warning': true
      }
    });
    setPedidos(result.data);
    console.log(pedidos);
  };

  useEffect(() => {
    getPedido();
  }, []);

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
