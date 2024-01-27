import firebase from 'firebase';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

function PaginaTeste() {
  const { user } = useContext(AuthContext);
  const [produtos, setProdutos] = useState([]);
  const getProdutosFirebas = async () => {
    await firebase
      .firestore()
      .collection('produto')
      .where('estabelecimento_id', '==', user.estabelecimentoId)
      .get()
      .then((result) => {
        setProdutos(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(produtos);
      })
      .catch((error) => {
        console.error('Erro ao obter documento: ', error);
      });
  };

  const mostrarProdutos = () => {
    produtos.map((produto) => {
      console.log(produto.nome);
    })
  }

  const createProdutoFirebase = async () => {
    await firebase
    .firestore()
    .collection('produto')
    .add({
        nome: 'produtoTeste'
    })
  }

    useEffect(() => {
        getProdutosFirebas();
    }, []);

    return (
        <div>
            <h1>Pagina teste</h1>

            <div>
                <h2>Dados da Coleção:</h2>
                <button onClick={createProdutoFirebase}></button>
                {produtos.map((produto) => {

                    return (
                        <div>
                            <img src={produto.imagem} width={100} />{produto.nome}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PaginaTeste;