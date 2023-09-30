import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import './contaSalao.css';

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
export default function Conta({ mesa }) {
  const [open, setOpen] = React.useState(false);
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
      <Button onClick={handleOpen}>Ver {mesa.status === 'LIVRE' && 'última '}conta</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description">
        <Box sx={{ ...style, width: 400 }} id="contaContent">
          <p id="child-modal-description" className="titleContaContent">
            --------------------------
          </p>
          <p id="child-modal-description" className="titleContaContent">
            Conta #2024
          </p>
          <p id="child-modal-description" className="titleContaContent">
            --------------------------
          </p>
          <p id="child-modal-description"> 01 - Coca-Cola 500ml - (Jadson) - R$7,00</p>
          <p id="child-modal-description"> 01 - Coca-Cola 500ml - (Jadson) - R$7,00</p>
          <p id="child-modal-description"> 01 - Coca-Cola 500ml - (Jadson) - R$7,00</p>
          <p id="child-modal-description"> 01 - Coca-Cola 500ml - (Jadson) - R$7,00</p>
          <p id="child-modal-description"> 01 - Coca-Cola 500ml - (Jadson) - R$7,00</p>
          <p id="child-modal-description" className="totalContaContent">
            Total R$20,00
          </p>
          <Button onClick={print}>Imprimir</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
