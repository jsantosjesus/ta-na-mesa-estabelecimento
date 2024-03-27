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
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

export default function MesaQR({ open, fechar, mesa_id }) {

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
                <div id='imprimirQR' style={{ textAlign: 'center' }}>
                    <QRCode
                        value={`https://ta-na-mesa-cliente.vercel.app/${mesa_id}`}
                        size={400}
                    />
                    <Typography variant="body1" gutterBottom>
                        Escaneie o QR Code e faça seu pedido
                    </Typography>
                </div>
                <Button onClick={print}>imprimir</Button>

            </Box>
        </Modal>
    );
}
