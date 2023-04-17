import React, { useState, useEffect } from "react";
import "./produtos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import pizzaImagem from "../../assets/Pizza de Calabresa.jpg";
import Header from '../../componentes/Header';
import { toast } from 'react-toastify';




function Produtos() {


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

    const [nome, setNome] = useState("");
    const [imagem, setImagem] = useState("");
    const [estoque, setEstoque] = useState("");
    const [preco, setPreco] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descricao, setDescricao] = useState("");
    const [myState, setMyState] = useState([{
        id: 0, nome: "hamburguer", imagem: "url", estoque: 100,
        preco: 29.00,
        descricao: "produto feito artesanalmente",
        categoria: "lanches"
    },
    {
        id: 1, nome: "cerveja", imagem: "url", estoque: 100,
        preco: 9.00,
        descricao: "se beber, não diriga",
        categoria: "bebidas"
    },
    {
        id: 2, nome: "hamburguer", imagem: "url", estoque: 100,
        preco: 29.00,
        descricao: "produto feito artesanalmente",
        categoria: "lanches"
    },
    {
        id: 3, nome: "cerveja", imagem: "url", estoque: 100,
        preco: 9.00,
        descricao: "se beber, não diriga",
        categoria: "bebidas"
    },
    {
        id: 4, nome: "cerveja loren loren loren loren", imagem: "url", estoque: 100,
        preco: 9.00,
        descricao: "se beber, não diriga",
        categoria: "bebidas"
    },
    {
        id: 5, nome: "cerveja", imagem: "url", estoque: 100,
        preco: 9.00,
        descricao: "se beber, não diriga",
        categoria: "bebidas"
    },
    {
        id: 6, nome: "cerveja", imagem: "url", estoque: 100,
        preco: 9.00,
        descricao: "se beber, não diriga",
        categoria: "bebidas"
    },
    {
        id: 7, nome: "cerveja", imagem: "url", estoque: 100,
        preco: 9.00,
        descricao: "se beber, não diriga",
        categoria: "bebidas"
    },
    {
        id: 8, nome: "cerveja", imagem: "url", estoque: 100,
        preco: 9.00,
        descricao: "se beber, não diriga",
        categoria: "bebidas"
    },
    {
        id: 9, nome: "cerveja", imagem: "url", estoque: 100,
        preco: 9.00,
        descricao: "se beber, não diriga",
        categoria: "bebidas"
    },
    {
        id: 10, nome: "cerveja", imagem: "url", estoque: 100,
        preco: 9.00,
        descricao: "se beber, não diriga",
        categoria: "bebidas"
    },
    {
        id: 11, nome: "cerveja", imagem: "url", estoque: 100,
        preco: 9.00,
        descricao: "se beber, não diriga",
        categoria: "bebidas"
    },
    {
        id: 12, nome: "cerveja", imagem: "url", estoque: 100,
        preco: 9.00,
        descricao: "se beber, não diriga",
        categoria: "bebidas"
    },
    {
        id: 13, nome: "cerveja", imagem: "url", estoque: 100,
        preco: 9.00,
        descricao: "se beber, não diriga",
        categoria: "bebidas"
    },
    {
        id: 14, nome: "pizza de queijo", imagem: "url", estoque: 100,
        preco: 9.00,
        descricao: "se beber, não diriga",
        categoria: "pizzas"
    }
    ]);



    const categorias = [{ id: 0, nome: "bebidas" }, { id: 1, nome: "lanches" }, { id: 2, nome: "pizzas" }];

    const filterData = () => {
        let results = myState;

        if (searchTerm === "" && categoriaFiltro == "") {
            results = myState;
        }
        if (searchTerm !== "") {
            results = myState.filter(object => object.nome.toLowerCase().includes(searchTerm.toLowerCase()))
        };

        if (searchTerm === "" && categoriaFiltro !== "") {
            results = myState.filter(object => object.categoria == categoriaFiltro)
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
                <div className="poupupproduto">
                    <div className="titleproduto"><h3>{object.nome}</h3><button onClick={handleClose}>X</button><hr /></div>
                    <hr />
                    <div className="corpoProduto">
                        <forms>
                            <div className="corpoProduto1">
                                <div className="imagemProduto">
                                    <img src={pizzaImagem} alt="imagem do produto" width="70%"></img>
                                </div>

                                <div className="aoLadoDaImagem">
                                    <div className="nome">
                                        <p>Nome</p>
                                        <input type="text" name="nome" defaultValue={object.nome}></input>
                                    </div>
                                    <div className="estoqueEpreco">
                                        <div>
                                            <p>Preço</p>
                                            <input defaultValue={object.preco.toFixed(2).replace(".", ",")} name="preco" />
                                        </div>
                                        <div className="estoque">
                                            <p>Estoque</p>
                                            <input type="number" defaultValue={object.estoque} name="estoque"></input>
                                        </div>
                                    </div>
                                    <div className="categoriaEadicionar">
                                        <div>
                                            <p>Categoria</p>
                                            <select>
                                                <optgroup label="Selecione:">
                                                    <option defaultValue={object.categoria}>{object.categoria}</option>
                                                    {categorias.map((categoria) => {
                                                        if (categoria.nome !== object.categoria) {
                                                            return <option value={categoria.nome}>{categoria.nome}</option>
                                                        }
                                                    })}

                                                </optgroup>
                                            </select>
                                        </div>

                                        <p onClick={handleOpenCadCategorias} className="adicionarCategoria">Adicionar categoria</p>
                                    </div>
                                </div>
                            </div>
                            <div className="descricao">
                                <textarea type="text" name="descricao" defaultValue={object.descricao} />

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

    // poupup para cadastrar categorias

    function Categorias() {
        if (cadCategorias === false) {
            return (null);

        }

        return (

            <div className="modalTransparent">
                <div>deu certo</div>
                <button onClick={handleCloseCadCategorias}>fechar</button>

            </div>
        );

    }




    // renderizando array de produtos

    return (
        <div>
            <Header />
            <div className="bodyProdutos">
                <div className="subHeader">
                    <div className="filtros">
                        <p><FontAwesomeIcon icon={faFilter} /></p>
                        <div><select value={categoriaFiltro} onChange={e => setCategoriaFiltro(e.target.value)}>
                            <option value="">Todos</option>
                            {categorias.map((object) => (
                                <option value={object.nome}>{object.nome}</option>
                            ))}


                        </select></div>
                    </div>
                    <div className="pesquisa">
                        <input type="text" placeholder="Pesquisar" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></input>
                    </div>
                    <div className="botaoProduto">
                        <button>Adicionar Produto</button>
                    </div>
                    <div className="botaoProdutoResponsive">
                        <button>+</button>
                    </div>
                </div>


                <div className="produtos">
                    <div className="cabecalho">
                        <p><b>Nome</b></p>
                        <p><b>Preço</b></p>
                        <p><b>Categoria</b></p>
                        <p><b>Estoque</b></p>
                    </div>
                    <div className="tabelaProdutos">
                        {filteredData.map((object, id) => (
                            <div >
                                <div className="produto" onClick={() => handleClick(object)}>

                                    <p>{object.nome}</p>
                                    <p>R$ {object.preco.toFixed(2).replace(".", ",")}</p>
                                    <p>{object.categoria}</p>
                                    <p>{object.estoque}</p>
                                </div>
                                <Popup object={object} />
                            </div>

                        )

                        )
                        }
                    </div>
                </div>
                {/* <div className="adicionarCategoria">
            <button >Adicionar Categoria</button>
            </div> */}
            </div>
        </div>
    );


    function salvar() {

        toast.success('Salvo com sucesso');
        setElementoAtivo(null);

    }
}






export default Produtos;
