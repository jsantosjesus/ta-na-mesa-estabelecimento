import React, { useEffect, useState } from 'react';
import './salao.css';
import Header from '../../componentes/Header';
import { apiClient } from '../../config/api';
import NestedModal from '../../componentes/mesasSalao';

function Salao() {
  // puxando atributos das mesas

  const estabelecimentoId = 'ac95ba93-1124-41cf-b1d1-5005b62686b6';
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsInNlbmhhIjoiJDJhJDEwJFVMR1QyelZsbkRLUGoyekZURm5PaU9DYThXd1RQa2VTYUhxTGJhaXl4UmhPdnhlbDlFZ3ZTIiwiaWF0IjoxNjk1NDk4OTgzLCJleHAiOjE3MDMyNzQ5ODN9.Jom7A-zLUO0EQkr4euRQPpC9jyTHdT7Nq5p_Cvb0EAg';

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
