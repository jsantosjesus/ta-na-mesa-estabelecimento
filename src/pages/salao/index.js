import React, { useEffect, useState, useContext } from 'react';
import './salao.css';
import Header from '../../componentes/Header';
import { apiClient } from '../../config/api';
import NestedModal from '../../componentes/mesasSalao';
import { AuthContext } from '../../contexts/auth';

function Salao() {
  // puxando atributos das mesas
  const { user } = useContext(AuthContext);
  const estabelecimentoId = user.usuario.estabelecimentoId;
  const token = user.token;

  const [mesas, setMesas] = useState([]);

  const getMesas = async () => {
    // setLoading(true);
    await apiClient
      .get(`/mesas/estabelecimento/${estabelecimentoId}`, {
        params: { limit: 30, offset: 0 },
        headers: {
          'ngrok-skip-browser-warning': true,
          Authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        setMesas(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
  useEffect(() => {
    getMesas();
  }, []);

  //  useState para funções de abrir e fechar poupup da mesa

  const [mesaAtiva, setMesaAtiva] = useState(null);

  const handleClick = (mesa) => {
    setMesaAtiva(mesa);
  };

  const handleClose = () => {
    setMesaAtiva(null);
  };

  // renderizando array de mesas

  return (
    <div>
      <Header />
      <div className="bodyMesas">
        <div className="mesas">
          {mesas.map((mesa, id) => (
            <div key={mesa.id}>
              <div id={mesa.status} className="mesa" onClick={() => handleClick(mesa)} key={id}>
                <h1>
                  <b>Mesa {mesa.numero}</b>
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      {mesaAtiva && <NestedModal mesa={mesaAtiva} close={handleClose} />}
    </div>
  );
}

export default Salao;
