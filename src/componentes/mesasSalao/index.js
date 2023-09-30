import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Conta from '../contaSalao';

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

export default function NestedModal({ mesa, close = () => {} }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description">
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Mesa {`${mesa.numero} (${mesa.status})`}</h2>
          <p id="parent-modal-description">{mesa.status === 'LIVRE' ? 'Última c' : 'C'}onta: R$</p>
          <Conta mesa={mesa} />
        </Box>
      </Modal>
    </div>
  );
}
