import React, { useState } from "react";
import './mesas.css';
import Header from "../../componentes/Header";


function Mesas() {

  // puxando atributos das mesas

  const [myState, setMyState] = useState([{
    id: 0, numero: 1, status: "livre", chamandoGarcom: false,
    pedidos: ["2764", "2765"],
    clientes: ["jeferson", "natan"],
    conta: {

      produtos: [{ id: 1, nome: "hamburguer", quantidade: 2, valor: 30 }, { id: 2, nome: "cerveja", quantidade: 1, valor: 10 }],
      total: 70
    }
  },
  {
    id: 1, numero: 2, status: "ocupada", chamandoGarcom: false,
    pedidos: ["2764", "2765"],
    clientes: ["jadson", "natan"],
    conta: {

      produtos: [{ id: 1, nome: "hamburguer", quantidade: 2, valor: 30 }, { id: 2, nome: "cerveja", quantidade: 1, valor: 10 }],
      total: 60
    }
  },
  {
    id: 2, numero: 3, status: "indisponivel", chamandoGarcom: false,
    pedidos: ["2764", "2765"],
    clientes: ["jadson", "natan"],
    conta: {
      produtos: [{ id: 1, nome: "hamburguer", quantidade: 2, valor: 30 }, { id: 2, nome: "cerveja", quantidade: 1, valor: 10 }],
      total: 50
    }
  }
  ]);

  // função abrir e fechar poupup da conta

  const [conta, setConta] = React.useState("close");
  const handleOpenConta = () => setConta("open");
  const handleCloseConta = () => setConta("close");

  // const style = {
  //     position: 'absolute',
  //     top: '50%',
  //     left: '50%',
  //     transform: 'translate(-50%, -50%)',
  //     width: 400,
  //     bgcolor: 'background.paper',
  //     border: '2px solid #000',
  //     boxShadow: 24,
  //     p: 4,
  // };

  //     const array = [{indice: 0, nome: "elemento1"},
  // {indice: 1, nome: "elemento2"},
  // {indice: 2, nome: "elemento3"}]


  //  useState para funções de abrir e fechar poupup da mesa

  const [elementoAtivo, setElementoAtivo] = useState(null);

  const handleClick = (id) => {
    setElementoAtivo(id);
  }


  // popupup da mesa

  const Popup = ({ object }) => {
    if (elementoAtivo !== object.id) {
      return null;
    }

    const handleClose = () => {
      setElementoAtivo(null);
      setConta("close");
    };

    return (
      <div className="poupupmesa">
        <div className="title"><h1>Mesa {object.numero}</h1><button onClick={handleClose}>X</button></div>
        <div className="corpo">
          <h2>Pedidos</h2>
          <div className="pedido">
            {object.pedidos.map((pedido, id) => (
              <p key={id}>{pedido}</p>
            ))}
          </div>

          <h2>Clientes</h2>
          <div className="cliente">
            {object.clientes.map((cliente, id) => (
              <p key={id}>{cliente} </p>
            ))}
          </div>
          <div className="footer">
            <button onClick={handleOpenConta}>Conta</button>
          </div>
          <div className="printable-modal">
            <div id={conta} className="contaImprimir">
              <h2>Mesa {object.numero}</h2>

              {/* produtos da conta */}
              <table >
                <tbody className="tableConta">
                  {object.conta.produtos.map((produto, id) => (
                    <tr key={id}>
                      <td>{produto.quantidade}</td>
                      <td>{produto.nome}</td>
                      <td>{produto.valor * produto.quantidade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>Valor total: {object.conta.total}</p>
              <div className="footerConta">
                <button onClick={handleCloseConta}>Fechar</button>
                <button onClick={() => window.print()}>Imprimir</button>
              </div>

            </div>

          </div>
        </div>

      </div>
    );
  };


  // renderizando array de mesas

  return (
    <div>
      <Header />
      <div className="bodyMesas">
        <div className="mesas">
          {myState.map((object, id) => (
            <div >
              <div id={object.status} className="mesa" onClick={() => handleClick(id)} key={id}>
                <h1 ><b>Mesa {object.numero}</b></h1>
              </div>
              <Popup object={object} />
            </div>


          ))}


        </div>
      </div>
    </div>
  );
}

{/* <Modal 
        // aria-labelledby="transition-modal-title"
        // aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <p>mesa {object.numero}</p>
            <Button onClick={handleClose}>botão</Button>
          </Box>
        </Fade>
      </Modal> */}

export default Mesas;
