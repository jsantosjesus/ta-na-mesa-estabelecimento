import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import QRCode from 'react-qr-code';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

export default function MesaQR({ open, fechar, estabelecimento_id, mesa_id }) {

    const print = () => {
        var conteudo = document.getElementById('imprimirQR').innerHTML,
            tela_impressao = window.open('about:blank');
        tela_impressao.document.write(conteudo);
        tela_impressao.window.print();
        tela_impressao.window.close();
    };


    return (
        <Modal
            open={open}
            onClose={fechar}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div id='imprimirQR'>
                <QRCode
                    value={`https://ta-na-mesa.vercel.app/`}
                /></div>
                <Button onClick={print}>imprimir</Button>

            </Box>
        </Modal>
    );
}