import React, { useEffect, useState, useContext } from 'react';
import Header from '../../componentes/Header';
import { toast } from 'react-toastify';
import { ModalCategoria } from '../../componentes/categoria';
import { apiClient } from '../../config/api';
import { AuthContext } from '../../contexts/auth';

function Categorias() {
  const { user } = useContext(AuthContext);

  const [categorias, setCategorias] = useState([
    {
      nome: 'Hamburguer'
    }
  ]);
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState(categorias);
  const estabelecimentoId = user.usuario.estabelecimentoId;
  const token = user.token;

  const getCategorias = async () => {
    await apiClient
      .get(`/categorias/estabelecimento/${estabelecimentoId}`, {
        params: { limit: 30, offset: 0 },
        headers: {
          'ngrok-skip-browser-warning': true,
          Authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        setCategorias(result.data);
        setSearchResult(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error.data);
        erro();
      });
  };

  useEffect(() => {
    getCategorias();
  }, []);

  const [isCreatingCategoria, setIsCreatingCategoria] = useState(false);
  const handleOpenNewCategoria = () => setIsCreatingCategoria(true);
  const handleCloseNewCategoria = () => setIsCreatingCategoria(false);

  //abrrindo colaborador existente para editar
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);

  const handleOpenCategoria = (categoria) => {
    setCategoriaAtiva(categoria);
  };

  const handleCloseCategoriaModal = () => {
    setCategoriaAtiva(null);
    setIsCreatingCategoria(false);
  };
  //salvando alterações
  function salvar() {
    toast.success('Salvo com sucesso');
    setCategoriaAtiva(null);
    getCategorias();
  }

  function erro() {
    toast.error('Desculpe, algo deu errado');
  }
  // function para pesquisa
  function pesquisa() {
    let result = categorias;

    if (search) {
      result = categorias.filter((categoria) =>
        categoria.nome.toLowerCase().includes(search.toLowerCase())
      );
    }

    setSearchResult(result);
  }

  useEffect(() => {
    pesquisa();
  }, [search]);

  // renderizando array de Categorias
  return (
    <div>
      <Header />
      <div className="bodyProdutos">
        <div className="subHeader">
          <div className="pesquisa">
            <input
              type="text"
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}></input>
          </div>
          <div className="botaoProduto">
            <button onClick={handleOpenNewCategoria}>Adicionar Categoria</button>
          </div>
          <div className="botaoProdutoResponsive">
            <button onClick={handleOpenNewCategoria}>Adicionar Categoria</button>
          </div>
        </div>
        <div className="produtos">
          <div className="cabecalho">
            <p>
              <b>Nome</b>
            </p>
          </div>
          <div className="tabelaProdutos">
            {searchResult.map((categoria) => (
              <div key={categoria.id}>
                <div className="produto" onClick={() => handleOpenCategoria(categoria)}>
                  <p>{categoria.nome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {categoriaAtiva !== null && (
        <ModalCategoria
          categoria={categoriaAtiva}
          onClose={handleCloseCategoriaModal}
          onSave={salvar}
          token={token}
          usuario={user.usuario}
          erro={erro}
        />
      )}
      {isCreatingCategoria && (
        <ModalCategoria
          categoria={null}
          onClose={handleCloseNewCategoria}
          onSave={salvar}
          token={token}
          usuario={user.usuario}
          erro={erro}
        />
      )}
    </div>
  );
}

export default Categorias;
