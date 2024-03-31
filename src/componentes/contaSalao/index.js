import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import './contaSalao.css';
import firebase from 'firebase';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};
export default function Conta({ conta, mesaId }) {
  const [open, setOpen] = useState(false);
  const [pedidos, setPedidos] = useState();
  const [totalConta, setTotalConta] = useState(0);
  const [confirmarPagarConta, setConfirmarPagarConta] = useState(false);

  useEffect(() => {


    const getPedidosFirebase = firebase.firestore()
      .collection('pedido')
      .where('conta_id', '==', conta.id)
      .onSnapshot(snapshot => {
        const newData = [];
        let totalConta = 0;
        snapshot.forEach(doc => {
          if (doc.data().status !== 'cancelado') {
            newData.push({ id: doc.id, ...doc.data() });
            totalConta += doc.data().total
          }
        });
        // Atualiza o estado com os dados mais recentes
        setPedidos(newData);
        setTotalConta(totalConta);
      });

    // Retorna a função de limpeza para interromper a escuta quando o componente for desmontado
    return () => getPedidosFirebase();
  }, [])

  const pagarConta = async () => {
    let agora = new Date();

    await firebase
      .firestore()
      .collection('conta')
      .doc(conta.id)
      .update(
        { dataPaga: agora }
      ).then(async () => {
        await firebase
          .firestore()
          .collection('mesa')
          .doc(mesaId)
          .update(
            {
              status: 'LIVRE',
              contaAtiva: false
            }
          )
          .then(() => {
            setConfirmarPagarConta(false);
          })
          .catch((error) => {
            console.log(error);
          })
      }
      ).catch((error) => {
        console.log(error);
      })

  }


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const print = () => {
    var conteudo = document.getElementById('contaContent').innerHTML,
      tela_impressao = window.open('about:blank');
    tela_impressao.document.write(conteudo);
    tela_impressao.window.print();
    tela_impressao.window.close();
  };


  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Ver {conta.dataPaga && 'última '}conta</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description">
        <Box sx={{ ...style, width: 500 }} >
          <div id="contaContent">
            <p id="child-modal-description" className="titleContaContent">
              --------------------------
            </p>
            <p id="child-modal-description" className="titleContaContent">
              Conta {conta.codigo}
            </p>

            <p id="child-modal-description" className="titleContaContent">
              --------------------------
            </p>
            {pedidos && pedidos.map((pedido) => {
              return (
                <>
                  {pedido.produtos.map((produto) => {
                    return (
                      <p id="child-modal-description">{produto.quantidade} - {produto.nome} - ({pedido.usuario}) - R${produto.preco.toFixed(2).replace('.', ',')} = R${(produto.preco * produto.quantidade).toFixed(2).replace('.', ',')}</p>
                    )
                  })}
                </>
              )
            })}
            <p id="child-modal-description" className="totalContaContent">
              Total R${totalConta.toFixed(2).replace('.', ',')}
            </p>
          </div>
          <Button onClick={print}>Imprimir</Button>
          {!conta.dataPaga && <Button onClick={() => setConfirmarPagarConta(true)}>Pagar conta</Button>}
          {confirmarPagarConta &&
            <div style={{ textAlign: 'center', border: 'solid 1px black', borderRadius: '5px' }}>
              Pagar conta? <Button onClick={pagarConta}>Confirmar</Button>
              <Button onClick={() => setConfirmarPagarConta(false)}>Cancelar</Button>
            </div>}
        </Box>
      </Modal>
    </React.Fragment>
  );
}
