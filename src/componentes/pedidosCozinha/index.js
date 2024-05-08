import './pedidosCozinha.css';
import firebase from 'firebase';
import { SoundPlayer } from '../../componentes/somNotificacao';
import bell from '../../assets/bell.wav'

export const PedidosCozinha = ({ pedido }) => {

  const sendMessage = (title, body, token) => {
    fetch('https://ta-na-mesa-api-qb85.onrender.com/message', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        title: `PEDIDO ${title}!`,
        body: `O pedido da mesa ${pedido.mesa.numero} está ${body}!`,
        deviceToken: token
      }),
    })
      .then(response => console.log('Resposta:', response))
      .catch(error => console.error('Erro ao enviar notificação:', error));
  };


  const alterarStatus = async (pedido) => {
    let agora;
    if (pedido.status == 'producao') {
      agora = new Date();
    }
    await firebase
      .firestore()
      .collection('pedido')
      .doc(pedido.id)
      .update(
        {
          ...(pedido.status == 'aguardando' && { status: 'fila' }),
          ...(pedido.status == 'fila' && { status: 'producao' }),
          ...(pedido.status == 'producao' && { status: 'pronto' }),
          ...(pedido.status == 'producao' && { dataPronto: agora }),
        }
      ).then(async () => {
        if (pedido.status == 'producao') {
          await firebase
            .firestore()
            .collection('chamado')
            .add(
              {
                estabelecimento_id: pedido.estabelecimento_id,
                mesa: {
                  numero: pedido.mesa.numero,
                  id: pedido.mesa.id,
                },
                status: 'ATIVO',
                hora: new Date(),
                tipo: 'pedidoPronto'
              }
            ).then(() => {
              firebase
                .firestore()
                .collection('usuario')
                .doc(pedido.mesa.garcom)
                .get().then((res) => {
                  sendMessage('PRONTO', 'pronto', res.data().tokenMessage);
                });


            }).catch((error) => {
              console.log('Erro ao criar chamado: ' + error)
            })
        }
      }
      ).catch((error) => {
        console.log(error);
      })
  }

  const cancelarPedido = async (pedido) => {
    await firebase
      .firestore()
      .collection('pedido')
      .doc(pedido.id)
      .update(
        { status: 'cancelado' }
      ).then(async () => {
        await firebase
          .firestore()
          .collection('chamado')
          .add(
            {
              estabelecimento_id: pedido.estabelecimento_id,
              mesa: {
                numero: pedido.mesa.numero,
                id: pedido.mesa.id,
              },
              status: 'ATIVO',
              hora: new Date(),
              tipo: 'pedidoCancelado'
            }
          ).then(() => {
            firebase
              .firestore()
              .collection('usuario')
              .doc(pedido.mesa.garcom)
              .get().then((res) => {
                sendMessage('CANCELADO', 'cancelado', res.data().tokenMessage);
              });



          }).catch((error) => {
            console.log('Erro ao criar chamado: ' + error)
          })
      }
      ).catch((error) => {
        console.log(error);
      })
  }

  return (
    <div>
      <SoundPlayer src={bell} pedido={pedido} />
      {pedido.produtos.map((produto, index) => {
        return (
          <div className="pedidoProduto" key={index}>
            <p style={{ marginBottom: '1px' }}>
              <b>{`${produto.quantidade} - ${produto.nome}`}</b>
            </p>
            {produto.variacoes &&
              <p style={{ fontSize: '12px', marginBottom: '1px' }}>
                <b>variações:</b>
                {produto.variacoes.map((variacao) => {
                  return (
                    <>
                      {` ${variacao.nome}: `}
                      {
                        variacao.opcoes.map((opcao) => {
                          return (
                            <>
                              {`${opcao.nome}, `}
                            </>
                          )
                        })
                      }
                    </>
                  )
                })}
              </p>
            }
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