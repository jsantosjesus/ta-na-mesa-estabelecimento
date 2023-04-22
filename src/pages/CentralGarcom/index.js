import React, { useState, useEffect } from "react";
import Header from "../../componentes/Header";
import './centralGarcom.css';


function CentralGarcom() {

    const [pedidos, setPedidos] = useState([
        {
            id: 0,
            numero: 120,
            mesa: 12,
            status: "pronto",
            produtos:
                [{
                    quantidade: 1,
                    nome: "cerveja skol 200ml"
                },
                {
                    quantidade: 2,
                    nome: "batata frita G"
                }
                ]
        },
        {
            id: 1,
            numero: 121,
            mesa: 13,
            status: "pronto",
            produtos:
                [{
                    quantidade: 1,
                    nome: "pizza tamanho família"
                },
                {
                    quantidade: 2,
                    nome: "batata frita G"
                }
                ]
        },
        {
            id: 2,
            numero: 125,
            mesa: 12,
            status: "pronto",
            produtos:
                [{
                    quantidade: 1,
                    nome: "guaraná lata 200ml"
                }
                ]
        }
    ]);

    return (
        <div>
            <Header />
            <div className="titulo">
                <h2>Notificações</h2>
            </div>
            <div className="notificacoes">
                {pedidos.map((pedido, index) => (
                    pedido.status === "pronto" ? (
                        <div key={index} className="notificacao">
                            <div className="div80notificacao">
                                <h2><b>Mesa {pedido.mesa}: pedido pronto</b></h2>
                                <p className="produtosP">
                                    {pedido.produtos.map((produto, index) => (
                                        <p className="produtoCentral" key={index}>
                                            {produto.quantidade} {produto.nome}
                                            {index === pedido.produtos.length - 1 ? "" : ","}
                                        </p>
                                    ))}

                                </p>
                            </div>
                            <div className="notificacaoButton">
                                <button>Entregue</button>
                            </div>
                        </div>
                    ) : null
                ))}

            </div>
        </div>
    );



} export default CentralGarcom;

