import './pedidosCozinha.css';
import firebase from 'firebase';
import { SoundPlayer } from '../../componentes/somNotificacao';
import bell from '../../assets/bell.wav'

export const PedidosCozinha = ({ pedido }) => {

  const alterarStatus = async(pedido) => {
    let horaReal;
    if(pedido.status == 'producao'){
      horaReal = new Date();
    }
    await firebase
              .firestore()
              .collection('pedido')
              .doc(pedido.id)
              .update(
                {...(pedido.status == 'aguardando' && { status: 'fila' }),
                ...(pedido.status == 'fila' && { status: 'producao' }),
                ...(pedido.status == 'producao' && { status: 'pronto' }),
                ...(pedido.status == 'producao' && { dataPronto: horaReal }), 
              }
              ).then(() => {
              }
              ).catch((error) => {
                console.log(error);
              })
  }

  const cancelarPedido = async(pedido) => {
    await firebase
              .firestore()
              .collection('pedido')
              .doc(pedido.id)
              .update(
                {status: 'cancelado'}
              ).then(() => {
              }
              ).catch((error) => {
                console.log(error);
              })
  }

  return (
    <div>
      <SoundPlayer src={bell} pedido={pedido}/>
      {pedido.produtos.map((produto, index) => {
        return (
          <div className="pedidoProduto" key={index}>
            <p style={{ marginBottom: '1px' }}><b>{`${produto.quantidade} - ${produto.nome}`}</b></p>
            <p style={{ fontSize: '12px', marginBottom: '1px' }}><b>variações:</b> {produto.variacoes.map((variacao) => `${variacao}; `)}</p>
            {produto.observacao && <p style={{ fontSize: '12px' }}><b>Observação: </b>{produto.observacao}</p>}
            <p className='totalPedido' style={{ fontSize: '12px' }} ><b>R$ {produto.preco.toFixed(2).replace('.', ',')}</b></p>
          </div>
        )
      })}
      <p className='totalPedido' style={{ color: '#3520bd', marginTop: '3px' }}><b>Total R$ {pedido.total.toFixed(2).replace('.', ',')}</b></p>
      {pedido.status != 'pronto' && pedido.status != 'cancelado' && <div className='botoesPedido'>
        <button className='confirmarPedido' onClick={() => alterarStatus(pedido)}>
          {pedido.status == 'aguardando' && <>Aceitar</>}
          {pedido.status == 'fila' && <>Produção</>}
          {pedido.status == 'producao' && <>Pedido Pronto</>}
        </button>
        {pedido.status != 'producao' && <button className='cancelarPedido' onClick={() => cancelarPedido(pedido)}>Cancelar</button>}
      </div>}
    </div>
  );
}