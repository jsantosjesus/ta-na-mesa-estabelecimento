import React, { useState, useEffect } from 'react';
import './colaboradores.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Header from '../../componentes/Header';
import { toast } from 'react-toastify';
import { Modalcolaborador } from '../../componentes/colaboradores/modal-colaboarador';

function Colaboradores() {
  // puxando atributos dos colaboradores

  const [colaborador] = useState([
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

  // array de mesas

  // const [table, setTable] = useState([
  //   {
  //     id: 0,
  //     numero: '1',
  //     garcomId: 'Jadson',
  //     mesaGarcom: false
  //   },
  //   {
  //     id: 1,
  //     numero: '2',
  //     garcomId: 'Jadson',
  //     mesaGarcom: false
  //   },
  //   {
  //     id: 2,
  //     numero: '3',
  //     garcomId: 'Jadson',
  //     mesaGarcom: false
  //   },
  //   {
  //     id: 3,
  //     numero: '4',
  //     garcomId: 'Natan',
  //     mesaGarcom: false
  //   },
  //   {
  //     id: 4,
  //     numero: '5',
  //     garcomId: 'Natan',
  //     mesaGarcom: false
  //   },
  //   {
  //     id: 5,
  //     numero: '6',
  //     garcomId: 'Natan',
  //     mesaGarcom: false
  //   },
  //   {
  //     id: 6,
  //     numero: '7',
  //     garcomId: 'Natan',
  //     mesaGarcom: false
  //   },
  //   {
  //     id: 7,
  //     numero: '8',
  //     garcomId: '',
  //     mesaGarcom: false
  //   }
  // ]);

  //array de cargos
  const cargos = [
    { id: 0, nome: 'Administrador' },
    { id: 1, nome: 'Garçom' },
    { id: 2, nome: 'Cozinha' }
  ];

  // pesquisando e filtrando colaboradores

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [cargoFiltro, setcargoFiltro] = useState('');

  const filterData = () => {
    let results = colaborador;

    if (searchTerm === '' && cargoFiltro == '') {
      results = colaborador;
    }
    if (searchTerm !== '') {
      results = colaborador.filter((colaborador) =>
        colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (searchTerm === '' && cargoFiltro !== '') {
      results = colaborador.filter((colaborador) => colaborador.tipo == cargoFiltro);
    }

    setFilteredData(results);
  };

  //useeffect para pesquisa

  useEffect(() => {
    filterData();
  }, [searchTerm]);

  //useeffect para filtro

  useEffect(() => {
    filterData();
  }, [cargoFiltro]);

  //MODAL
  //abrindo novo colaborador

  const [isCreatingColaborador, setIsCreatingColaborador] = useState(false);

  const handleOpenNewColaborador = () => setIsCreatingColaborador(true);
  const handleCloseNewColaborador = () => setIsCreatingColaborador(false);

  //abrrindo colaborador existente para editar
  const [colaboradorAtivo, setColaboradorAtivo] = useState(null);

  const handleOpenColaborador = (colaborador) => {
    setColaboradorAtivo(colaborador);
    // isCreatingColaborador && setselectValueCargo(colaborador.tipo);
  };

  const handleCloseColaboradorModal = () => {
    setColaboradorAtivo(null);
    setIsCreatingColaborador(false);
  };

  //MESAS
  // abrir mesas de garçom

  // const [mesasGarcom, setMesasGarcom] = useState('close');

  // const abrirMesasGarcom = () => {
  //   setMesasGarcom('open');
  //   trocarParaNewTable();
  // };

  // // fechar mesas de garçom

  // const fecharMesasGarcom = () => {
  //   setMesasGarcom('close');
  // };

  //trocando mesas

  // function trocarParaNewTable() {
  //   const newTable = table.map((element) => element);
  //   setTable(newTable);
  // }

  //CARGO
  //pegando valor do select de cargo para abrir mesas

  // const [selectValueCargo, setselectValueCargo] = useState('');

  // function handleChange(event) {
  //   setselectValueCargo(event.target.value);
  // }

  //  useState para funções de abrir e fechar poupup da colaborador

  //salvando alterações

  function salvar() {
    toast.success('Salvo com sucesso');
    setColaboradorAtivo(null);
  }

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
              <select value={cargoFiltro} onChange={(e) => setcargoFiltro(e.target.value)}>
                <option value="">Todos</option>
                {cargos.map((cargo) => (
                  // eslint-disable-next-line react/jsx-key
                  <option value={cargo.nome}>{cargo.nome}</option>
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
            <button onClick={handleOpenNewColaborador}>Adicionar Colaborador</button>
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
              <b>Email</b>
            </p>
            <p>
              <b>Cargo</b>
            </p>
          </div>
          <div className="tabelaProdutos">
            {filteredData.map((colaborador) => (
              <div key={colaborador.id}>
                <div className="produto" onClick={() => handleOpenColaborador(colaborador)}>
                  <p>{colaborador.nome}</p>
                  <p>{colaborador.email}</p>
                  <p>{colaborador.tipo}</p>
                </div>
                {/* <Popup object={object} /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      {colaboradorAtivo !== null && (
        <Modalcolaborador
          colaborador={colaboradorAtivo}
          cargos={cargos}
          onClose={handleCloseColaboradorModal}
          onSave={salvar}
        />
      )}
      {isCreatingColaborador && (
        <Modalcolaborador
          colaborador={null}
          cargos={cargos}
          onClose={handleCloseNewColaborador}
          onSave={salvar}
        />
      )}
    </div>
  );
}

export default Colaboradores;
