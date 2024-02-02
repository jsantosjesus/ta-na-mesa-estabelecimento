import React, { useState, useContext, useEffect } from 'react';
import '../../pages/produtos/produtos.css';
import Header from '../../componentes/Header';
import { toast } from 'react-toastify';
import { ModalCategoria } from '../../componentes/categoria';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AuthContext } from '../../contexts/auth';
import firebase from 'firebase';


function Categorias() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState();

  //puxando garçons
  const getCategoriasFirebase = async () => {
    await firebase
      .firestore()
      .collection('categoria')
      .where('estabelecimento_id', '==', user.estabelecimentoId)
      .get()
      .then((result) => {
        setCategorias(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao obter documento: ', error);
      });
  };

  useEffect(() => {
    getCategoriasFirebase();
  }, []);

  
  const handleSalvarCategoria = () => {
    toast.success('Salvo com sucesso');
    setCategoriaAtiva(null);
    setIsCreatingCategoria(false);
    getCategoriasFirebase();
  };

  const handleErrorSalvarCategoria = () => {
    toast.error('Erro ao salvar categoria');
    setCategoriaAtiva(null);
    setIsCreatingCategoria(false);
  };

  //  useState para funções de abrir e fechar poupup da categoria

  const [categoriaAtiva, setCategoriaAtiva] = useState(null);

  const handleClickCategoria = (categoria) => {
    setCategoriaAtiva(categoria);
  };

  const handleCloseCategoriaModal = () => {
    setCategoriaAtiva(null);
    setIsCreatingCategoria(false);
  };

  // abrir criar nova categoria

  const [isCreatingCategoria, setIsCreatingCategoria] = useState(false);

  const handleOpenNewCategoria = () => setIsCreatingCategoria(true);

  // renderizando array de mesas

  return (
    <div>
      <Header />
      <div className="bodyProdutos">
        <div className="subHeader">
          <div className="filtros"></div>
          <div className="pesquisa"></div>
          <div className="botaoProduto">
            <button onClick={handleOpenNewCategoria}>Adicionar Categoria</button>
          </div>
          <div className="botaoProdutoResponsive">
            <button onClick={handleOpenNewCategoria}>+</button>
          </div>
        </div>
        <div className="produtos">
          <div className="cabecalho">
            <p>
              <b>Nome</b>
            </p>
          </div>
          <div className="tabelaProdutos">
            {loading ? (
              <Box sx={{ display: 'grid', placeItems: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              categorias.map((categoria) => {
                return (
                  <div key={categoria.id}>
                    <div className="produto" onClick={() => handleClickCategoria(categoria)}>
                      <p>{categoria.nome}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {categoriaAtiva !== null && (
        <ModalCategoria
          categoria={categoriaAtiva}
          onClose={handleCloseCategoriaModal}
          onSave={handleSalvarCategoria}
          erro={handleErrorSalvarCategoria}
          user={user}
        />
      )}
      {isCreatingCategoria && (
        <ModalCategoria
          categoria={null}
          onClose={handleCloseCategoriaModal}
          onSave={handleSalvarCategoria}
          erro={handleErrorSalvarCategoria}
          user={user}
        />
      )}
    </div>
  );
}

export default Categorias;
