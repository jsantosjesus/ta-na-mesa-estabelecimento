import React, { useState, useContext, useEffect } from 'react';
import './produtos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Header from '../../componentes/Header';
import { toast } from 'react-toastify';
import { ModalProduto } from '../../componentes/produtos/modal-produto';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AuthContext } from '../../contexts/auth';
import firebase from 'firebase';


function Produtos() {
  const [searchTerm, setSearchTerm] = useState('');
  // const [filteredData, setFilteredData] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const getCategoriasFirebase = async () => {
    await firebase
      .firestore()
      .collection('categoria')
      .where('estabelecimento_id', '==', user.estabelecimentoId)
      .get()
      .then((result) => {
        setCategorias(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((error) => {
        console.error('Erro ao obter documento: ', error);
      });
  };
  useEffect(() => {
    getCategoriasFirebase();
  }, []);

  //listando produtos

  const getProdutosFirebase = async () => {
    setLoading(true);
    if (categoriaFiltro == '' && searchTerm == '') {

      //consulta de todos os produtos

      await firebase
        .firestore()
        .collection('produto')
        .where('estabelecimento_id', '==', user.estabelecimentoId)
        .get()
        .then((result) => {
          setProdutos(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao obter documento: ', error);
        });
    } else if (categoriaFiltro != '' && searchTerm == '') {

      //consulta filtrando por categoria

      await firebase
        .firestore()
        .collection('produto')
        .where('categoria.id', '==', categoriaFiltro)
        .where('estabelecimento_id', '==', user.estabelecimentoId)
        .get()
        .then((result) => {
          setProdutos(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao obter documento: ', error);
        });
    }
    // else{
    //   await firebase
    //     .firestore()
    //     .collection('produto')
    //     .where('nome','>=', searchTerm.toLocaleLowerCase())
    //     .where('nome','<=', searchTerm.toLocaleLowerCase() + '\uf8ff')
    //     .where('estabelecimento_id', '==', user.estabelecimentoId)
    //     .get()
    //     .then((result) => {
    //       setProdutos(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.error('Erro ao obter documento: ', error);
    //     });
    // }
  }

  // const handleSelectChange = (event) => {
  //     setCategoriaFiltro(event.target.value);

  // };

  useEffect(() => {
    getProdutosFirebase();
  }, [categoriaFiltro]);

  const handleSalvarProduto = () => {
    toast.success('Salvo com sucesso');
    setProdutoAtivo(null);
    setIsCreatingProduto(false);
    getProdutosFirebase();
  };

  const handleErrorSalvarProduto = () => {
    toast.error('Erro ao salvar produto');
    setProdutoAtivo(null);
    setIsCreatingProduto(false);
  };

  //  useState para funções de abrir e fechar poupup do produto

  const [produtoAtivo, setProdutoAtivo] = useState(null);

  const handleClickProduto = (produto) => {
    setProdutoAtivo(produto);
  };

  const handleCloseProdutoModal = () => {
    setProdutoAtivo(null);
    setIsCreatingProduto(false);
  };

  // abrir criar novo produto

  const [isCreatingProduto, setIsCreatingProduto] = useState(false);

  const handleOpenNewProduto = () => setIsCreatingProduto(true);

  // renderizando array de produtos

  return (
    <div>
      <Header />
      <div className="bodyProdutos">
        <div className="subHeader">
          <div className="filtros">
            <p>
              <FontAwesomeIcon icon={faFilter} />
            </p>
            <div>
              <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)}>
                <option value="">Todos</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="pesquisa">
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}></input>
          </div>
          <div className="botaoProduto">
            <button onClick={handleOpenNewProduto}>Adicionar Produto</button>
          </div>
          <div className="botaoProdutoResponsive">
            <button>+</button>
          </div>
        </div>

        <div className="produtos">
          <div className="cabecalho">
            <p>
              <b>Nome</b>
            </p>
            <p>
              <b>Preço</b>
            </p>
            <p>
              <b>Categoria</b>
            </p>
            <p>
              <b>Estoque</b>
            </p>
          </div>
          <div className="tabelaProdutos">
            {loading ? (
              <Box sx={{ display: 'grid', placeItems: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              produtos.map((produto) => {
                return (
                  <div key={produto.uid}>
                    <div className="produto" onClick={() => handleClickProduto(produto)}>
                      <p>{produto.nome}</p>
                      <p>R$ {produto.valor.toFixed(2).replace('.', ',')}</p>
                      {categorias.map((categoria) => {
                        if (categoria.id == produto.categoria_id) {
                          return (<p>
                            {categoria.nome}
                          </p>)
                        }
                      })}
                      <p>{produto.estoque}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {produtoAtivo !== null && (
        <ModalProduto
          produto={produtoAtivo}
          categorias={categorias}
          user={user}
          onClose={handleCloseProdutoModal}
          onSave={handleSalvarProduto}
          onError={handleErrorSalvarProduto}
        />
      )}
      {isCreatingProduto && (
        <ModalProduto
          categorias={categorias}
          user={user}
          onClose={handleCloseProdutoModal}
          onSave={handleSalvarProduto}
          produto={null}
          onError={handleErrorSalvarProduto}
        />
      )}
    </div>
  );
}

export default Produtos;
