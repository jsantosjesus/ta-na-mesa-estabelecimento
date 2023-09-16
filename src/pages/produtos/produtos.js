import React, { useState, useEffect } from 'react';
import './produtos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Header from '../../componentes/Header';
import { toast } from 'react-toastify';
import { ModalProduto } from '../../componentes/produtos/modal-produto';
import { apiClient } from '../../config/api';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// import { AuthContext } from '../../contexts/auth';

function Produtos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  // const { user } = useContext(AuthContext);
  const estabelecimentoId = '8fb6e710-07c7-4c41-a7ab-2ad9bdf1cd7d';
  const [loading, setLoading] = useState(false);

  //buscando categorias em conexão com a API
  const [categorias, setCategorias] = useState([]);

  const getCategorias = async () => {
    const result = await apiClient.get(`/categorias/estabelecimento/${estabelecimentoId}`, {
      params: { limit: 30, offset: 0 },
      headers: {
        'ngrok-skip-browser-warning': true
      }
    });
    console.log(result);
    setCategorias(result.data);
  };

  const [produtos, setProdutos] = useState([]);

  const getProdutos = async () => {
    setLoading(true);
    const result = await apiClient.get(`/produtos/estabelecimento/${estabelecimentoId}`, {
      params: { limit: 30, offset: 0 },
      headers: {
        'ngrok-skip-browser-warning': true
      }
    });
    setProdutos(result.data);
    setFilteredData(result.data);
    console.log(produtos);
    setLoading(false);
  };

  useEffect(() => {
    getCategorias();
    getProdutos();
  }, []);

  // const handleSelectChange = (event) => {
  //     setCategoriaFiltro(event.target.value);

  // };

  useEffect(() => {
    getProdutos();
    filterDataByCategoria();
  }, [categoriaFiltro]);

  const handleSalvarProduto = () => {
    toast.success('Salvo com sucesso');
    setProdutoAtivo(null);
  };

  const filterDataByCategoria = async () => {
    setLoading(true);
    const result = await apiClient.get(`/produtos/categoria/${categoriaFiltro}`, {
      params: { limit: 30, offset: 0 },
      headers: {
        'ngrok-skip-browser-warning': true
      }
    });
    setFilteredData(result.data);
    setLoading(false);
  };

  const filterData = () => {
    let results = produtos;

    if (searchTerm === '' && categoriaFiltro == '') {
      results = produtos;
    }
    if (searchTerm !== '') {
      results = produtos.filter((object) =>
        object.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (searchTerm === '' && categoriaFiltro !== '') {
      results = produtos.filter((object) => object.categoria == categoriaFiltro);
    }

    setFilteredData(results);
  };

  useEffect(() => {
    filterData();
  }, [searchTerm]);

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
  const handleCloseNewProduto = () => setIsCreatingProduto(false);

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
              filteredData.map((produto) => {
                return (
                  <div key={produto.id}>
                    <div className="produto" onClick={() => handleClickProduto(produto)}>
                      <p>{produto.nome}</p>
                      <p>R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
                      <p>
                        {categorias.map((categoria) => {
                          let categoriaNome;

                          if (categoria.id === produto.categoriaId) {
                            categoriaNome = categoria.nome;
                          }

                          return <>{categoriaNome}</>;
                        })}
                      </p>
                      <p>{produto.estoque}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        {/* <div className="adicionarCategoria">
                <button >Adicionar Categoria</button>
                </div> */}
      </div>

      {produtoAtivo !== null && (
        <ModalProduto
          produto={produtoAtivo}
          categorias={categorias}
          onClose={handleCloseProdutoModal}
          onSave={handleSalvarProduto}
        />
      )}
      {isCreatingProduto && (
        <ModalProduto
          categorias={categorias}
          onClose={handleCloseNewProduto}
          onSave={handleSalvarProduto}
        />
      )}
    </div>
  );
}

export default Produtos;
