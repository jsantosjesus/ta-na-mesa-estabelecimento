import React, { useState, useEffect } from "react";
import "./produtos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import pizzaImagem from "../imagens/Pizza de Calabresa.jpg"



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

    // função abrir e fechar poupup da conta

    const [conta, setConta] = React.useState("close");
    const handleOpenConta = () => setConta("open");
    const handleCloseConta = () => setConta("close");



    //  useState para funções de abrir e fechar poupup da mesa

    const [elementoAtivo, setElementoAtivo] = useState(null);

    const handleClick = (id) => {
        setElementoAtivo(id);
    }


    // popupup do produto

    const Popup = ({ object }) => {
        if (elementoAtivo !== object.id) {
            return null;
        }


            const handleClose = () => {
              setElementoAtivo(null);
              setConta("close");
            };

        return (
            <div className="poupupproduto">
                <div className="titleproduto"><h1>{object.nome}</h1><button onClick={handleClose}>X</button></div>
            </div>
        );
    }
    {/* //             <h2>Pedidos</h2>
    //             <div className="pedido">
    //                 {object.pedidos.map((pedido, id) => (
    //                     <p key={id}>{pedido}</p>
    //                 ))}
    //             </div>

    //             <h2>Clientes</h2>
    //             <div className="cliente">
    //                 {object.clientes.map((cliente, id) => (
    //                     <p key={id}>{cliente} </p>
    //                 ))}
    //             </div>
    //         </div>

    //     </div>
    // ); */}



    // renderizando array de mesas

    return (
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
                            <div className="produto" onClick={() => handleClick(id)} key={id}>
                                
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
    );
}






export default Produtos;
