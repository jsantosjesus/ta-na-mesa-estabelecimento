import React, { useState, useEffect } from 'react';
import Header from '../../componentes/Header';
import './cozinha.css';
import firebase from 'firebase';
import { PedidosCozinha } from '../../componentes/pedidosCozinha';
import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export const Cozinha = () => {
  const [pedidos, setPedidos] = useState();


  useEffect(() => {
    // Define a função de escuta
    const unsubscribe = firebase.firestore().collection('pedido').onSnapshot(snapshot => {
      const newData = [];
      snapshot.forEach(doc => {

        newData.push({ id: doc.id, ...doc.data() });
      });
      // Atualiza o estado com os dados mais recentes
      setPedidos(newData);
    });

    // Retorna a função de limpeza para interromper a escuta quando o componente for desmontado
    return () => unsubscribe();
  }, []);


  return (
    <>
      <Header />
      <div className="bodyCozinha">
        <div className="statusPedido">
          <h4>Aguardando aprovação</h4>
          {pedidos && pedidos.map((pedido) => {
            if (pedido.status == 'aguardando') {
              return (<Accordion key={pedido.id}>
                <AccordionSummary
                  style={{ backgroundColor: '#3520bd', color: 'white' }}
                  aria-controls={pedido}
                  id={pedido}>
                  <b>Pedido: {pedido.codigo}</b>
                </AccordionSummary>
                <AccordionDetails>
                  <PedidosCozinha pedido={pedido} />
                </AccordionDetails>
              </Accordion>)
            }
          })}
        </div>
        <div className="statusPedido">
          <h4>Fila</h4>
          {pedidos && pedidos.map((pedido) => {
            if (pedido.status == 'fila') {
              return (
                <Accordion key={pedido.id}>
                  <AccordionSummary
                    style={{ backgroundColor: '#3520bd', color: 'white' }}
                    aria-controls={pedido}
                    id={pedido}>
                    <b>Pedido: {pedido.codigo}  </b> (mesa {pedido.mesa.numero})
                  </AccordionSummary>
                  <AccordionDetails>
                    <PedidosCozinha pedido={pedido} />
                  </AccordionDetails>
                </Accordion>);
            };
          })};
        </div>
        <div className="statusPedido">
          <h4>Preparando</h4>
          {pedidos && pedidos.map((pedido) => {
            if (pedido.status == 'producao') {
              return (<Accordion key={pedido.id}>
                <AccordionSummary
                  style={{ backgroundColor: '#3520bd', color: 'white' }}
                  aria-controls={pedido}
                  id={pedido}>
                  <b>Pedido: {pedido.codigo}</b>
                </AccordionSummary>
                <AccordionDetails>
                  <PedidosCozinha pedido={pedido} />
                </AccordionDetails>
              </Accordion>)
            }
          })}
        </div>
      </div>
    </>
  );
};
