import React, { useState, useContext, useEffect } from 'react';
import './colaboradores.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Header from '../../componentes/Header';
import { toast } from 'react-toastify';
import { Modalcolaborador } from '../../componentes/colaboradores/modal-colaboarador';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AuthContext } from '../../contexts/auth';
import firebase from 'firebase';


function Colaboradores() {
  // const [searchTerm, setSearchTerm] = useState('');
  const [cargoFiltro, setCargoFiltro] = useState('');
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [colaboradores, setColaboradores] = useState([]);


  //listando colaboradores

  const getColaboradoresFirebase = async () => {
    setLoading(true);
    if (cargoFiltro == '' 
    // && searchTerm == ''
    ) {

      //consulta de todos os colaboradores

      await firebase
        .firestore()
        .collection('usuario')
        .where('estabelecimento_id', '==', user.estabelecimentoId)
        .get()
        .then((result) => {
          setColaboradores(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao obter documento: ', error);
        });
    } else if (cargoFiltro != '' 
    // && searchTerm == ''
    ) {

      //consulta filtrando por cargo
      
      await firebase
        .firestore()
        .collection('usuario')
        .where('cargo', '==', cargoFiltro)
        .where('estabelecimento_id', '==', user.estabelecimentoId)
        .get()
        .then((result) => {
          setColaboradores(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao obter documento: ', error);
        });
    }
    // else{
    //   await firebase
    //     .firestore()
    //     .collection('usuario')
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
    getColaboradoresFirebase();
  }, [cargoFiltro]);

  const handleSalvarColaborador = () => {
    toast.success('Salvo com sucesso');
    setColaboradorAtivo(null);
    setIsCreatingColaborador(false);
    getColaboradoresFirebase();
  };

  const handleErrorSalvarColaborador = () => {
    toast.error('Erro ao salvar produto');
    setColaboradorAtivo(null);
    setIsCreatingColaborador(false);
  };

  //  useState para funções de abrir e fechar poupup do produto

  const [colaboradorAtivo, setColaboradorAtivo] = useState(null);

  const handleClickColaborador = (colaborador) => {
    setColaboradorAtivo(colaborador);
  };

  const handleCloseColaboradorModal = () => {
    setColaboradorAtivo(null);
    setIsCreatingColaborador(false);
  };

  // abrir criar novo produto

  const [isCreatingColaborador, setIsCreatingColaborador] = useState(false);

  const handleOpenNewColaborador = () => setIsCreatingColaborador(true);

  // renderizando array de colaboradores

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
              <select value={cargoFiltro} onChange={(e) => setCargoFiltro(e.target.value)}>
                <option value="">Todos</option>
                <option value="garcom">Garçom</option>
                <option value="cozinha">Cozinha</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>
          </div>
          <div className="pesquisa">
            {/* <input type="text"
              placeholder="Pesquisar"></input> */}
          </div>
          <div className="botaoProduto">
            <button onClick={handleOpenNewColaborador}>Adicionar Colaborador</button>
          </div>
          <div className="botaoProdutoResponsive">
            <button onClick={handleOpenNewColaborador}>+</button>
          </div>
        </div>

        <div className="produtos">
          <div className="cabecalho">
            <p>
              <b>Nome</b>
            </p>
            <p>
              <b>Email</b>
            </p>
            <p>
              <b>Cargo</b>
            </p>
          </div>
          {loading ? (
            <Box sx={{ display: 'grid', placeItems: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <div className="tabelaProdutos">
              {colaboradores.map((colaborador) => (
                <div key={colaborador.id}>
                  <div className="produto" onClick={() => handleClickColaborador(colaborador)}>
                    <p>{colaborador.nome}</p>
                    <p>{colaborador.email}</p>
                    <p>{colaborador.cargo}</p>
                  </div>
                  {/* <Popup object={object} /> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {colaboradorAtivo !== null && (
        <Modalcolaborador
          colaborador={colaboradorAtivo}
          onClose={handleCloseColaboradorModal}
          onSave={handleSalvarColaborador}
          onError={handleErrorSalvarColaborador}
          user={user}
        />
      )}
      {isCreatingColaborador && (
        <Modalcolaborador
          colaborador={null}
          onClose={handleCloseColaboradorModal}
          onSave={handleSalvarColaborador}
          onError={handleErrorSalvarColaborador}
          user={user}
        />
      )}
    </div>
  );
}

export default Colaboradores;
