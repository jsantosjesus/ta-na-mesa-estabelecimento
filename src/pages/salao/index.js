import React, { useEffect, useState } from 'react';
import './salao.css';
import Header from '../../componentes/Header';
import { apiClient } from '../../config/api';
import NestedModal from '../../componentes/mesasSalao';

function Salao() {
  // puxando atributos das mesas

  const estabelecimentoId = '8fb6e710-07c7-4c41-a7ab-2ad9bdf1cd7d';
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hYW5AZ21haWwuY29tIiwic2VuaGEiOiIkMmEkMTAkOXdsN1NiMXVHaTRiTjVxTmNDZ3FidTR2cEJ4WE95Y3Z2Nm1keWpBNzIzSy5BOW9OTEdYYXEiLCJpYXQiOjE2OTQ5MDYwNDUsImV4cCI6MTcwMjY4MjA0NX0.WLF6inxtRFbBUKcaZ9lBKL7zmmANQdpvDQC9Hmwpxl8';

  const [mesas, setMesas] = useState([]);

  const getMesas = async () => {
    // setLoading(true);
    await apiClient
      .get(`/mesas/estabelecimento/${estabelecimentoId}`, {
        params: { limit: 30, offset: 0 },
        headers: {
          'ngrok-skip-browser-warning': true,
          Authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        setMesas(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
  useEffect(() => {
    getMesas();
  }, []);

  // função abrir e fechar poupup da conta

  const [conta, setConta] = React.useState('close');
  const handleOpenConta = () => setConta('open');
  const handleCloseConta = () => setConta('close');

  //  useState para funções de abrir e fechar poupup da mesa

  const [mesaAtiva, setMesaAtiva] = useState(null);

  const handleClick = (mesa) => {
    setMesaAtiva(mesa);
  };

  const handleClose = () => {
    setMesaAtiva(null)
  }

  // popupup da mesa

  // const Popup = ({ mesa }) => {
  //   if (mesaAtiva !== mesa) {
  //     return null;
  //   }

  //   const handleClose = () => {
  //     setMesaAtiva(null);
  //     setConta('close');
  //   };

  //   return (
  //     <div className="toogle">
  //       <div className="poupupmesa">
  //         <div className="title">
  //           <h1>Mesa {mesa.numero}</h1>
  //           <button onClick={handleClose}>X</button>
  //         </div>
  //         <div className="corpo">
  //           <h2>Pedidos</h2>
  //           <div className="pedido">
  //             {mesa.pedidos.map((pedido, id) => (
  //               <p key={id}>{pedido}</p>
  //             ))}
  //           </div>

  //           <h2>Clientes</h2>
  //           <div className="cliente">
  //             {mesa.clientes.map((cliente, id) => (
  //               <p key={id}>{cliente} </p>
  //             ))}
  //           </div>
  //           <div className="footer">
  //             <button onClick={handleOpenConta}>Conta</button>
  //           </div>
  //           <div className="printable-modal">
  //             <div id={conta} className="contaImprimir">
  //               <h2>Mesa {mesa.numero}</h2>

  //               {/* produtos da conta */}
  //               <table>
  //                 <tbody className="tableConta">
  //                   {mesa.conta.produtos.map((produto, id) => (
  //                     <tr key={id}>
  //                       <td>{produto.quantidade}</td>
  //                       <td>{produto.nome}</td>
  //                       <td>{produto.valor * produto.quantidade}</td>
  //                     </tr>
  //                   ))}
  //                 </tbody>
  //               </table>
  //               <p>Valor total: {mesa.conta.total}</p>
  //               <div className="footerConta">
  //                 <button onClick={handleCloseConta}>Fechar</button>
  //                 <button onClick={() => window.print()}>Imprimir</button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // renderizando array de mesas

  return (
    <div>
      <Header />
      <div className="bodyMesas">
        <div className="mesas">
          {mesas.map((mesa, id) => (
            <div key={mesa.id}>
              <div id={mesa.status} className="mesa" onClick={() => handleClick(mesa)} key={id}>
                <h1>
                  <b>Mesa {mesa.numero}</b>
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      {mesaAtiva && <NestedModal 
      mesa={mesaAtiva}
      close={handleClose}/>}
    </div>
  );
}

export default Salao;
