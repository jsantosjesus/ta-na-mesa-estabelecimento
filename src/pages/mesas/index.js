import React, { useState, useContext, useEffect } from 'react';
import '../../pages/produtos/produtos.css';
import Header from '../../componentes/Header';
import { toast } from 'react-toastify';
import { ModalMesa } from '../../componentes/mesa/index'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../contexts/auth';
import firebase from 'firebase';
import MesaQR from '../../componentes/mesa/mesaQRcode';


function Mesas() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [mesas, setMesas] = useState();
  const [garcons, setGarcons] = useState();
  const [garcomFiltro, setGarcomFiltro] = useState('');
  const [idNovaMesa, setIdNovaMesa] = useState();
  const [openMesaQR, setOpenMesaQR] = useState(false);

  //puxando garçons
  const getGarconsFirebase = async () => {
    await firebase
      .firestore()
      .collection('usuario')
      .where('estabelecimento_id', '==', user.estabelecimentoId)
      .where('cargo', '==', 'garcom')
      .get()
      .then((result) => {
        setGarcons(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((error) => {
        console.error('Erro ao obter documento: ', error);
      });
  };

  //listando mesas

  const getMesasFirebase = async () => {
    if (garcomFiltro == '') {
      await firebase
        .firestore()
        .collection('mesa')
        .where('estabelecimento_id', '==', user.estabelecimentoId)
        .get()
        .then((result) => {
          setMesas(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao obter documento: ', error);
        });
    } else if (garcomFiltro != '') {
      await firebase
        .firestore()
        .collection('mesa')
        .where('garcom_id', '==', garcomFiltro)
        .where('estabelecimento_id', '==', user.estabelecimentoId)
        .get()
        .then((result) => {
          setMesas(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao obter documento: ', error);
        });
    }
  };
  useEffect(() => {
    getGarconsFirebase();
  }, []);

  useEffect(() => {
    getMesasFirebase();
  }, [garcomFiltro])

  const handleSalvarMesa = (menssagem) => {
    toast.success(menssagem);
    setMesaAtiva(null);
    setIsCreatingMesa(false);
    getMesasFirebase();
  };

  const handleErrorSalvarMesa = () => {
    toast.error('Erro ao salvar produto');
    setMesaAtiva(null);
    setIsCreatingMesa(false);
  };

  //  useState para funções de abrir e fechar poupup da mesa

  const [mesaAtiva, setMesaAtiva] = useState(null);

  const handleClickMesa = (mesa) => {
    setMesaAtiva(mesa);
  };

  const handleCloseMesaModal = () => {
    setMesaAtiva(null);
    setIsCreatingMesa(false);
  };

  // abrir criar nova mesa

  const [isCreatingMesa, setIsCreatingMesa] = useState(false);

  const handleOpenNewMesa = () => setIsCreatingMesa(true);

  const passarIdNovaMesa = (id) => {
    setIdNovaMesa(id);
    setOpenMesaQR(true);
  }

  // renderizando array de mesas

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
              <select value={garcomFiltro} onChange={(e) => setGarcomFiltro(e.target.value)}>
                <option value="">Todos</option>
                {garcons && garcons.map((garcom) => (
                  <option key={garcom.id} value={garcom.id}>
                    {garcom.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="pesquisa"></div>
          <div className="botaoProduto">
            <button onClick={handleOpenNewMesa}>Adicionar Mesa</button>
          </div>
          <div className="botaoProdutoResponsive">
            <button onClick={handleOpenNewMesa}>+</button>
          </div>
        </div>
        <div className="produtos">
          <div className="cabecalho">
            <p>
              <b>Numero</b>
            </p>
            <p>
              <b>Status</b>
            </p>
            <p>
              <b>Garçom</b>
            </p>
          </div>
          <div className="tabelaProdutos">
            {loading ? (
              <Box sx={{ display: 'grid', placeItems: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              mesas.map((mesa) => {
                return (
                  <div key={mesa.id}>
                    <div className="produto" onClick={() => handleClickMesa(mesa)}>
                      <p>mesa {mesa.numero}</p>
                      <p>{mesa.status}</p>
                      {garcons && garcons.map((garcom) => {
                        if (garcom.id == mesa.garcom_id) {
                          return <p key={garcom.id}>{garcom.nome}</p>
                        }
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {mesaAtiva !== null && (
        <ModalMesa
          mesa={mesaAtiva}
          onClose={handleCloseMesaModal}
          onSave={handleSalvarMesa}
          erro={handleErrorSalvarMesa}
          garcons={garcons}
          user={user}
        />
      )}
      {isCreatingMesa && (
        <ModalMesa
          mesa={null}
          onClose={handleCloseMesaModal}
          onSave={handleSalvarMesa}
          erro={handleErrorSalvarMesa}
          garcons={garcons}
          user={user}
          passarIdNovaMesa={passarIdNovaMesa}
        />
      )}

      <MesaQR open={openMesaQR} fechar={() => setOpenMesaQR(false)} mesa_id={idNovaMesa} />
    </div>
  );
}

export default Mesas;
