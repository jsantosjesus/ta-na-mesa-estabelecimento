import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Conta from '../contaSalao';
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

export default function MesaModal({ mesa, close = () => { } }) {
  const [conta, setConta] = useState();

  useEffect(() => {

    // Define a função de escuta
    const getContaFirebase = firebase.firestore()
      .collection('conta')
      .where('mesa_id', '==', mesa.id)
      .orderBy('dataAberta', 'desc')
      .limit(1)
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          setConta(doc.data());
        });
      })

    // Retorna a função de limpeza para interromper a escuta quando o componente for desmontado
    return () => getContaFirebase();
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description">
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Mesa {`${mesa.numero} (${mesa.status})`}</h2>
          <Conta conta={conta} />
        </Box>
      </Modal>
    </div>
  );
}
