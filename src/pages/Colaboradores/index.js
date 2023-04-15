import React, { useState, useEffect } from "react";
import "./colaboradores.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import pizzaImagem from "../../assets/Pizza de Calabresa.jpg";
import Header from '../../componentes/Header';
import { toast } from 'react-toastify';




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
        mesas: ["9", "10", "13"]
    },
    {
        id: 1, nome: "Natan", email: "natan@teste", senha: "123456", tipo: "Garçom",
        mesas: ["5", "7", "8"]
    },
    {
        id: 2, nome: "Ilmar", email: "ilmar@teste", senha: "123456", tipo: "Cozinha"
    },
    {
        id: 0, nome: "Christiano", email: "christiano@teste", senha: "123456", tipo: "Administrador"
    }
    ]);





    const cargos = [{ id: 0, nome: "Administrador" }, { id: 1, nome: "Garçom" }, { id: 2, nome: "Cozinha"}];

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

    // função abrir e fechar poupup de cadastro de categorias

    const [cadCategorias, setCadCategorias] = React.useState(false);
    const handleOpenCadCategorias = () => setCadCategorias(true);
    const handleCloseCadCategorias = () => setCadCategorias(false);



    //  useState para funções de abrir e fechar poupup da mesa

    const [elementoAtivo, setElementoAtivo] = useState(null);

    const handleClick = (object) => {
        setElementoAtivo(object);
    }


    // popupup do produto

    const Popup = ({ object }) => {
        if (elementoAtivo !== object) {
            return null;
        }


        const handleClose = () => {
            setElementoAtivo(null);
            // setConta("close");
        };

        return (
            <div className="modalTransparent">
                <div className="poupupcolaborador">
                    <div className="titleproduto"><h3>{object.nome}</h3><button onClick={handleClose}>X</button><hr /></div>
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
                                            <select>
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
                                        {object.tipo === "Garçom" ? (
  <p className="mesasColaborador">
    Mesas:{" "}
    {object.mesas.map((mesa, index) => (
      <p key={index}>
        {mesa}
        {index === object.mesas.length - 1 ? "" : ", "}
      </p>
    ))}
  </p>
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
}






export default Colaboradores;
