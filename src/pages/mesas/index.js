import React, { useState } from 'react';
import Header from '../../componentes/Header';
import { toast } from 'react-toastify';
import { ModalMesa } from '../../componentes/mesa';
function Mesas() {
  // puxando atributos dos mesas

  const [mesa] = useState([
    {
      id: 0,
      nome: 'Jadson',
      email: 'jadson@teste',
      senha: '123456',
      tipo: 'Garçom',
      mesas: ['1', '2', '3']
    },
    {
      id: 1,
      nome: 'Natan',
      email: 'natan@teste',
      senha: '123456',
      tipo: 'Garçom',
      mesas: ['4', '5', '6', '7']
    },
    {
      id: 2,
      nome: 'Ilmar',
      email: 'ilmar@teste',
      senha: '123456',
      tipo: 'Cozinha',
      mesas: []
    },
    {
      id: 0,
      nome: 'Christiano',
      email: 'christiano@teste',
      senha: '123456',
      tipo: 'Administrador',
      mesas: []
    }
  ]);

  //array de cargos
  const cargos = [
    { id: 0, nome: 'Administrador' },
    { id: 1, nome: 'Garçom' },
    { id: 2, nome: 'Cozinha' }
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
              <b>Nome</b>
            </p>
            <p>
              <b>Email</b>
            </p>
            <p>
              <b>Cargo</b>
            </p>
          </div>
          <div className="tabelaProdutos">
            {mesa.map((mesa) => (
              <div key={mesa.id}>
                <div className="produto" onClick={() => handleOpenMesa(mesa)}>
                  <p>{mesa.nome}</p>
                  <p>{mesa.email}</p>
                  <p>{mesa.tipo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {mesaAtiva !== null && (
        <ModalMesa
          mesa={mesaAtiva}
          cargos={cargos}
          onClose={handleCloseMesaModal}
          onSave={salvar}
        />
      )}
      {isCreatingMesa && (
        <ModalMesa mesa={null} cargos={cargos} onClose={handleCloseNewMesa} onSave={salvar} />
      )}
    </div>
  );
}

export default Mesas;
