import React, { useState, useEffect } from 'react';
import './produtos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Header from '../../componentes/Header';
import { toast } from 'react-toastify';
import { ModalProduto } from '../../componentes/produtos/modal-produto';
import { apiClient } from '../../config/api';

function Produtos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  //buscando categorias
  const [categorias, setCategorias] = useState([]);

  const getCategorias = async () => {
    const estabelecimentoId = '5e5fdd34-89df-483b-8bd1-39ad953046ba';
    const result = await apiClient.get(`/categorias/estabelecimento/${estabelecimentoId}`, {
      params: { limit: 30, offset: 0 }
    });
    console.log(result);
    setCategorias(result.data);
  };

  useEffect(() => {
    getCategorias();
  }, []);

  // const handleSelectChange = (event) => {
  //     setCategoriaFiltro(event.target.value);

  // };

  useEffect(() => {
    filterData();
  }, [categoriaFiltro]);

  // puxando atributos das produtos

  const [myState] = useState([
    {
      id: 0,
      nome: 'hamburguer',
      imagem: 'url',
      estoque: 100,
      preco: 29.0,
      descricao: 'produto feito artesanalmente',
      categoria: 'lanches'
    },
    {
      id: 1,
      nome: 'cerveja',
      imagem: 'url',
      estoque: 100,
      preco: 9.0,
      descricao: 'se beber, não diriga',
      categoria: 'bebidas'
    },
    {
      id: 2,
      nome: 'hamburguer',
      imagem: 'url',
      estoque: 100,
      preco: 29.0,
      descricao: 'produto feito artesanalmente',
      categoria: 'lanches'
    },
    {
      id: 3,
      nome: 'cerveja',
      imagem: 'url',
      estoque: 100,
      preco: 9.0,
      descricao: 'se beber, não diriga',
      categoria: 'bebidas'
    },
    {
      id: 4,
      nome: 'cerveja loren loren loren loren',
      imagem: 'url',
      estoque: 100,
      preco: 9.0,
      descricao: 'se beber, não diriga',
      categoria: 'bebidas'
    },
    {
      id: 5,
      nome: 'cerveja',
      imagem: 'url',
      estoque: 100,
      preco: 9.0,
      descricao: 'se beber, não diriga',
      categoria: 'bebidas'
    },
    {
      id: 6,
      nome: 'cerveja',
      imagem: 'url',
      estoque: 100,
      preco: 9.0,
      descricao: 'se beber, não diriga',
      categoria: 'bebidas'
    },
    {
      id: 7,
      nome: 'cerveja',
      imagem: 'url',
      estoque: 100,
      preco: 9.0,
      descricao: 'se beber, não diriga',
      categoria: 'bebidas'
    },
    {
      id: 8,
      nome: 'cerveja',
      imagem: 'url',
      estoque: 100,
      preco: 9.0,
      descricao: 'se beber, não diriga',
      categoria: 'bebidas'
    },
    {
      id: 9,
      nome: 'cerveja',
      imagem: 'url',
      estoque: 100,
      preco: 9.0,
      descricao: 'se beber, não diriga',
      categoria: 'bebidas'
    },
    {
      id: 10,
      nome: 'cerveja',
      imagem: 'url',
      estoque: 100,
      preco: 9.0,
      descricao: 'se beber, não diriga',
      categoria: 'bebidas'
    },
    {
      id: 11,
      nome: 'cerveja',
      imagem: 'url',
      estoque: 100,
      preco: 9.0,
      descricao: 'se beber, não diriga',
      categoria: 'bebidas'
    },
    {
      id: 12,
      nome: 'cerveja',
      imagem: 'url',
      estoque: 100,
      preco: 9.0,
      descricao: 'se beber, não diriga',
      categoria: 'bebidas'
    },
    {
      id: 13,
      nome: 'cerveja',
      imagem: 'url',
      estoque: 100,
      preco: 9.0,
      descricao: 'se beber, não diriga',
      categoria: 'bebidas'
    },
    {
      id: 14,
      nome: 'pizza de queijo',
      imagem: 'url',
      estoque: 100,
      preco: 9.0,
      descricao: 'se beber, não diriga',
      categoria: 'pizzas'
    }
  ]);

  const handleSalvarProduto = () => {
    toast.success('Salvo com sucesso');
    setProdutoAtivo(null);
  };

  // const categorias = [
  //   { id: 0, nome: 'bebidas' },
  //   { id: 1, nome: 'lanches' },
  //   { id: 2, nome: 'pizzas' }
  // ];

  const filterData = () => {
    let results = myState;

    if (searchTerm === '' && categoriaFiltro == '') {
      results = myState;
    }
    if (searchTerm !== '') {
      results = myState.filter((object) =>
        object.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (searchTerm === '' && categoriaFiltro !== '') {
      results = myState.filter((object) => object.categoria == categoriaFiltro);
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
                {categorias.map((object) => (
                  <option key={object.id} value={object.nome}>
                    {object.nome}
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
            {filteredData.map((produto) => (
              <div key={produto.id}>
                <div className="produto" onClick={() => handleClickProduto(produto)}>
                  <p>{produto.nome}</p>
                  <p>R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
                  <p>{produto.categoria}</p>
                  <p>{produto.estoque}</p>
                </div>
              </div>
            ))}
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
