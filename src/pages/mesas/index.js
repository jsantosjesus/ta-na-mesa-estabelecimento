import React, { useEffect, useState } from 'react';
import Header from '../../componentes/Header';
import { toast } from 'react-toastify';
import { ModalMesa } from '../../componentes/mesa';
import { apiClient } from '../../config/api';
function Mesas() {
  // puxando atributos dos mesas

  const [mesas, setMesas] = useState([
    {
      id: '1',
      numero: '20',
      status: 'INATIVA',
      colaboradorId: '1'
    }
  ]);
  const estabelecimentoId = '8fb6e710-07c7-4c41-a7ab-2ad9bdf1cd7d';
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hYW5AZ21haWwuY29tIiwic2VuaGEiOiIkMmEkMTAkOXdsN1NiMXVHaTRiTjVxTmNDZ3FidTR2cEJ4WE95Y3Z2Nm1keWpBNzIzSy5BOW9OTEdYYXEiLCJpYXQiOjE2OTQ5MDYwNDUsImV4cCI6MTcwMjY4MjA0NX0.WLF6inxtRFbBUKcaZ9lBKL7zmmANQdpvDQC9Hmwpxl8';

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

  //array de cargos
  const colaborador = [
    { id: '0', nome: 'Jadson', tipo: 'garcom' },
    { id: '1', nome: 'Natan', tipo: 'administrador' },
    { id: '2', nome: 'Matheus', tipo: 'garcom' }
  ];

  const [isCreatingMesa, setIsCreatingMesa] = useState(false);

  const handleOpenNewMesa = () => setIsCreatingMesa(true);
  const handleCloseNewMesa = () => setIsCreatingMesa(false);

  //abrrindo colaborador existente para editar
  const [mesaAtiva, setMesaAtiva] = useState(null);

  const handleOpenMesa = (mesa) => {
    setMesaAtiva(mesa);
    // isCreatingColaborador && setselectValueCargo(colaborador.tipo);
  };

  const handleCloseMesaModal = () => {
    setMesaAtiva(null);
    setIsCreatingMesa(false);
  };
  //salvando alterações
  function salvar() {
    toast.success('Salvo com sucesso');
    setMesaAtiva(null);
  }
  // renderizando array de mesas
  return (
    <div>
      <Header />
      <div className="bodyProdutos">
        <div className="subHeader">
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
              <b>Colaborador</b>
            </p>
          </div>
          <div className="tabelaProdutos">
            {mesas.map((mesa) => (
              <div key={mesa.id}>
                <div className="produto" onClick={() => handleOpenMesa(mesa)}>
                  <p>Mesa {mesa.numero}</p>
                  <p>{mesa.status}</p>
                  <p>
                    {colaborador.map((garcom) => {
                      if (garcom.id === mesa.colaboradorId) {
                        return <>{garcom.nome}</>;
                      }
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {mesaAtiva !== null && (
        <ModalMesa
          mesa={mesaAtiva}
          colaborador={colaborador}
          onClose={handleCloseMesaModal}
          onSave={salvar}
        />
      )}
      {isCreatingMesa && (
        <ModalMesa
          mesa={null}
          colaborador={colaborador}
          onClose={handleCloseNewMesa}
          onSave={salvar}
        />
      )}
    </div>
  );
}

export default Mesas;
