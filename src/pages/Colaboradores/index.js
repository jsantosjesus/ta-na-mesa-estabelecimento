import React, { useState, useEffect } from "react";
import "./colaboradores.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Header from '../../componentes/Header';
import { toast } from 'react-toastify';
import styled from "styled-components";





function Colaboradores() {


    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [categoriaFiltro, setCategoriaFiltro] = useState("");

    // const handleSelectChange = (event) => {
    //     setCategoriaFiltro(event.target.value);

    // };

    useEffect(() => {
        filterData();
    }, [categoriaFiltro]);




    // puxando atributos das produtos


    const [myState, setMyState] = useState([{
        id: 0, nome: "Jadson", email: "jadson@teste", senha: "123456", tipo: "Garçom",
        mesas: ["1", "2", "3"]
    },
    {
        id: 1, nome: "Natan", email: "natan@teste", senha: "123456", tipo: "Garçom",
        mesas: ["4", "5", "6", "7"]
    },
    {
        id: 2, nome: "Ilmar", email: "ilmar@teste", senha: "123456", tipo: "Cozinha", mesas: []
    },
    {
        id: 0, nome: "Christiano", email: "christiano@teste", senha: "123456", tipo: "Administrador",
        mesas: []
    }
    ]);

    const [table, setTable] = useState([{
        id: 0,
        numero: "1",
        garcomId: "Jadson",
        mesaGarcom: false

    }, {
        id: 1,
        numero: "2",
        garcomId: "Jadson",
        mesaGarcom: false
    }, {
        id: 2,
        numero: "3",
        garcomId: "Jadson",
        mesaGarcom: false
    }, {
        id: 3,
        numero: "4",
        garcomId: "Natan",
        mesaGarcom: false
    }, {
        id: 4,
        numero: "5",
        garcomId: "Natan",
        mesaGarcom: false
    }, {
        id: 5,
        numero: "6",
        garcomId: "Natan",
        mesaGarcom: false
    }, {
        id: 6,
        numero: "7",
        garcomId: "Natan",
        mesaGarcom: false
    }, {
        id: 7,
        numero: "8",
        garcomId: "",
        mesaGarcom: false
    }])

    const [changeTable, setChangeTable] = useState([]);
    
    function trocarParaNewTable() {
        const newTable = table.map((element) => element);
        setTable(newTable);
      };

    // const GerenciarMesas = (object) => {
    //     return (
    
            
    //     )
    // }

    const cargos = [{ id: 0, nome: "Administrador" }, { id: 1, nome: "Garçom" }, { id: 2, nome: "Cozinha" }];

    const filterData = () => {
        let results = myState;

        if (searchTerm === "" && categoriaFiltro == "") {
            results = myState;
        }
        if (searchTerm !== "") {
            results = myState.filter(object => object.nome.toLowerCase().includes(searchTerm.toLowerCase()))
        };

        if (searchTerm === "" && categoriaFiltro !== "") {
            results = myState.filter(object => object.tipo == categoriaFiltro)
        };

        setFilteredData(results);
    }

    useEffect(() => {
        filterData();
    }, [searchTerm]);


    // abrir mesas de garçom

    const [mesasGarcom, setMesasGarcom] = useState("close");

    const abrirMesasGarcom = () => {
        setMesasGarcom("open");
        trocarParaNewTable();
        
    }

    // fechar mesas de garçom

    const fecharMesasGarcom = () => {
        setMesasGarcom("close");
    }

    //pegando valor do select de cargo

    const [selectedValue, setSelectedValue] = useState('');

    function handleChange(event) {
        setSelectedValue(event.target.value);
    }


    //  useState para funções de abrir e fechar poupup da colaborador

    const [elementoAtivo, setElementoAtivo] = useState(null);

    const handleClick = (object) => {
        setElementoAtivo(object);
        setSelectedValue(object.tipo);
    }


    // popupup do colaborador

    const Popup = ({ object }) => {
        if (elementoAtivo !== object) {
            return null;
        }


        const handleClose = () => {
            setElementoAtivo(null);

        };

        // //administrando mesas

        // function handleClick(){
        //     const newTables = [...table];

        //     const tableIndex = newTables.findIndex(table => table.id === 5);

        //     newTables[tableIndex].mesaGarcom = true;

        //     setTable(newTables);
        // }

        return (
            <div className="modalTransparent">
                <div className="poupupcolaborador">
                    <div className="titleproduto"><h3>{object.nome}</h3><button className="fecharColaborador" onClick={handleClose}>X</button><hr /></div>
                    <hr />
                    <div className="corpoProduto">
                        <forms>
                            <div className="corpoProduto1">


                                <div className="inputs">
                                    <div className="nome">
                                        <p>Nome</p>
                                        <input type="text" name="nome" defaultValue={object.nome}></input>
                                    </div>

                                    <div className="nome">
                                        <p>Email</p>
                                        <input type="text" name="email" defaultValue={object.email}></input>
                                    </div>
                                    <div className="nome">
                                        <p>Senha</p>
                                        <input type="password" name="senha" defaultValue={object.senha}></input>
                                    </div>

                                    <div className="categoriaEadicionar">
                                        <div>
                                            <p>Cargo</p>
                                            <select defultValue={object.tipo} value={selectedValue} onChange={handleChange}>
                                                <optgroup label="Selecione:">
                                                    <option defaultValue={object.tipo}>{object.tipo}</option>
                                                    {cargos.map((cargos) => {
                                                        if (cargos.nome !== object.tipo) {
                                                            return <option value={cargos.nome}>{cargos.nome}</option>
                                                        }
                                                    })}

                                                </optgroup>
                                            </select>
                                        </div>
                                        {selectedValue === "Garçom" ? (
                                            <div className="mesasThisGarcom">
                                                Mesas:{" "}
                                                {object.mesas.map((mesa, index) => (
                                                    <p key={index}>
                                                        {mesa}
                                                        {index === object.mesas.length - 1 ? "" : ", "}
                                                    </p>
                                                ))}
                                                <p className="linkMesas" onClick={abrirMesasGarcom}>Gerenciar mesas</p>
                                            </div>


                                        ) : (
                                            <p></p>

                                        )}


                                    </div>
                                </div>
                            </div>

                            <div className="salvar">
                                <button className="botaoSalvarProduto" onClick={salvar}>Salvar Alterações</button>
                            </div>
                        </forms>


                    </div>
                    <div id={mesasGarcom} className="modalTransparentMesas">
                        <div className="mesasColaborador">
                            <div className="titleMesasGarcom">
                                <p>Selecione as mesas</p>
                                <p onClick={fecharMesasGarcom} className="fecharMesas">X</p>
                            </div>
                            <div className="bodyMesasGarcom">
                            {table.map((table) => {
                { table.garcomId === object.nome ? table.mesaGarcom = true : table.mesaGarcom = false }
    
                // const teste = () => {
                //     { table.mesaGarcom === false ? table.mesaGarcom = true : table.mesaGarcom = false };
                //     trocarParaNewTable();
                //     console.log(table);
                // }
    
    
    
                return (
                    <div style={{ border: table.mesaGarcom ? "solid 4px #3520bd" : "solid 1px black", }}
                        className="mesaGarcom" key={table.id}
                    >
                        {table.numero}
                        <p className="nomeGarcomMesa">{table.garcomId}</p>
                    </div>
                )
    
            })}
                                
                            </div>
                            <div className="footermesasGarcom">
                                <p onClick={fecharMesasGarcom}>Cancelar</p><button onClick={salvarMesasGarcom}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );

    }







    // renderizando array de colaboradores

    return (
        <div>
            <Header />
            <div className="bodyProdutos">
                <div className="subHeader">
                    <div className="filtros">
                        <p><FontAwesomeIcon icon={faFilter} /></p>
                        <div><select value={categoriaFiltro} onChange={e => setCategoriaFiltro(e.target.value)}>
                            <option value="">Todos</option>
                            {cargos.map((object) => (
                                <option value={object.nome}>{object.nome}</option>
                            ))}


                        </select></div>
                    </div>
                    <div className="pesquisa">
                        <input type="text" placeholder="Pesquisar" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></input>
                    </div>
                    <div className="botaoProduto">
                        <button>Adicionar Colaborador</button>
                    </div>
                    <div className="botaoProdutoResponsive">
                        <button>+</button>
                    </div>
                </div>


                <div className="produtos">
                    <div className="cabecalho">
                        <p><b>Nome</b></p>
                        <p><b>Email</b></p>
                        <p><b>Cargo</b></p>

                    </div>
                    <div className="tabelaProdutos">
                        {filteredData.map((object, id) => (
                            <div >
                                <div className="produto" onClick={() => handleClick(object)}>

                                    <p>{object.nome}</p>
                                    <p>{object.email}</p>
                                    <p>{object.tipo}</p>
                                </div>
                                <Popup object={object} />
                            </div>

                        )

                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );


    function salvar() {

        toast.success('Salvo com sucesso');
        setElementoAtivo(null);
    }

    function salvarMesasGarcom() {
        toast.success('Salvo com sucesso');
        fecharMesasGarcom();
    }
}






export default Colaboradores;
