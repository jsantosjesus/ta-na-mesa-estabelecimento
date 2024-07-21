import React, { useState, useEffect, useContext } from 'react';
import Header from '../../componentes/Header';
import './cozinha.css';
import firebase from 'firebase';
import { PedidosCozinha } from '../../componentes/pedidosCozinha';
import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { AuthContext } from '../../contexts/auth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import BuildHora from '../../componentes/buildHora';


export const Cozinha = () => {

  const [divAtivarSom, setDivAtivarSom] = useState(true);

  const [pedidos, setPedidos] = useState();

  const { user } = useContext(AuthContext);

  const [cancelados, setCancelados] = useState(false);
  const [totalCancelados, setTotalCancelados] = useState();

  const [prontos, setProntos] = useState(false);
  const [totalProntos, setTotalProntos] = useState();
  useEffect(() => {

    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);

    const getPedidosFirebase = firebase.firestore()
      .collection('pedido')
      .where('estabelecimento_id', '==', user.estabelecimentoId)
      .where('dataPedido', '>=', ontem)
      .onSnapshot(snapshot => {
        const newData = [];
        let totalCancelados = 0;
        let totalProntos = 0;
        snapshot.forEach(doc => {

          newData.push({ id: doc.id, ...doc.data() });

          if (doc.data().status === 'cancelado') {
            totalCancelados++; // Incrementa o contador de pedidos cancelados
          }

          if (doc.data().status === 'pronto') {
            totalProntos++; // Incrementa o contador de pedidos prontos
          }
        });
        // Atualiza o estado com os dados mais recentes
        setTotalCancelados(totalCancelados);
        setTotalProntos(totalProntos);
        setPedidos(newData);
      });

    // Retorna a função de limpeza para interromper a escuta quando o componente for desmontado
    return () => getPedidosFirebase();
  }, []);



  return (
    <>
      <Header />
      <div className='cozinha'>
        <div className='prontosEcancelados'>
          <div className='cancelados'>
            <div className='divPoupupFechadoProntosEcancelados' onClick={cancelados ? (() => setCancelados(false)) : (() => setCancelados(true))}>
              {!cancelados ? <><p className='quantidadeProntosEcancelados'><b>{totalCancelados}</b></p>
                <p className='setaProntosEcancelados' style={{ backgroundColor: 'red', color: 'white' }}><KeyboardArrowDownIcon /></p></>
                :
                <p className='setaProntosEcancelados' style={{ backgroundColor: 'red', color: 'white', width: '100%', textAlign: 'center' }}><CloseIcon /></p>}
            </div>
            {cancelados && <div className="statusPedido">
              <h4>Cancelados</h4>
              {pedidos && pedidos.map((pedido) => {
                if (pedido.status == 'cancelado') {
                  return (<Accordion key={pedido.id}>
                    <AccordionSummary
                      style={{ backgroundColor: '#3520bd', color: 'white' }}
                      aria-controls={pedido}
                      id={pedido}>
                      Pedido: mesa {pedido.mesa.numero}
                    </AccordionSummary>
                    <AccordionDetails>
                      <PedidosCozinha pedido={pedido} />
                    </AccordionDetails>
                  </Accordion>)
                }
              })}
            </div>}
          </div>
          <div className='prontos'>
            <div className='divPoupupFechadoProntosEcancelados' onClick={prontos ? (() => setProntos(false)) : (() => setProntos(true))}>
              {!prontos ? <><p className='setaProntosEcancelados' style={{ backgroundColor: 'green', color: 'white' }}><KeyboardArrowDownIcon /></p>
                <p className='quantidadeProntosEcancelados'><b>{totalProntos}</b></p></>
                :
                <p className='setaProntosEcancelados' style={{ backgroundColor: 'green', color: 'white', width: '100%', textAlign: 'center' }}><CloseIcon /></p>}
            </div>
            {prontos && <div className="statusPedido">
              <h4>Prontos</h4>
              {pedidos && pedidos.map((pedido) => {
                if (pedido.status == 'pronto') {
                  return (<Accordion key={pedido.id}>
                    <AccordionSummary
                      style={{ backgroundColor: '#3520bd', color: 'white' }}
                      aria-controls={pedido}
                      id={pedido}>
                      Pedido: mesa {pedido.mesa.numero}
                    </AccordionSummary>
                    <AccordionDetails>
                      <PedidosCozinha pedido={pedido} />
                    </AccordionDetails>
                  </Accordion>)
                }
              })}
            </div>}
          </div>
        </div>
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
                    Pedido: mesa {pedido.mesa.numero}
                    <p
                      style={{ fontSize: "12px", marginLeft: "20px" }}
                    > <BuildHora dataPedido={pedido.dataPedido} /> </p>
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
                      Pedido: mesa {pedido.mesa.numero}
                      <p
                        style={{ fontSize: "12px", marginLeft: "20px" }}
                      > <BuildHora dataPedido={pedido.dataPedido} /> </p>
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
                    Pedido: mesa {pedido.mesa.numero}
                    <p
                      style={{ fontSize: "12px", marginLeft: "20px" }}
                    > <BuildHora dataPedido={pedido.dataPedido} /> </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <PedidosCozinha pedido={pedido} />
                  </AccordionDetails>
                </Accordion>)
              }
            })}
          </div>
        </div>
      </div>
      {divAtivarSom && <div className='divAtivarSomCozinha'>
        <h4>Clique na tela para ativar o som de notificação ao receber os pedidos</h4>
        <button onClick={() => setDivAtivarSom(false)}>OK!</button>
      </div>}
    </>
  );
};
