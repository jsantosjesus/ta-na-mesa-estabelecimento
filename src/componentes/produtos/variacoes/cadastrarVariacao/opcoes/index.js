import { Switch } from "@mui/material";
import React, { useEffect, useState } from "react";

export const Opcoes = ({ opcao, handleSalvar, handleExcluir, index }) => {
    const [nomeOpcao, setNomeOpcao] = useState(opcao ? opcao.nome : '');
    const [adicionalOpcao, setAdicionalOpcao] = useState(opcao && opcao.valor_adicional ? opcao.valor_adicional : 0);
    const [estoqueOpcao, setEstoqueOpcao] = useState(opcao ? opcao.em_estoque : true);

    useEffect(() => {
        if (opcao) {
            setNomeOpcao(opcao.nome);
            setAdicionalOpcao(opcao.valor_adicional);
            setEstoqueOpcao(opcao.em_estoque);
        }
    }, [opcao]);

    const salvarOpcao = () => {
        const objectOpcao = {
            nome: nomeOpcao,
            valor_adicional: parseFloat(adicionalOpcao),
            em_estoque: estoqueOpcao
        };
        handleSalvar(objectOpcao, index);
    };

    const excluirOpcao = () => {
        handleExcluir(index);
    };

    const salvarNovaOpcao = () => {
        const objectOpcao = {
            nome: nomeOpcao,
            ...(adicionalOpcao && {valor_adicional: adicionalOpcao}),
            em_estoque: estoqueOpcao
        };
        handleSalvar(objectOpcao);
    };

    return (
        <div style={{ display: 'flex' }}>
            <span style={{ display: 'block' }}>
                <p><b>Opção</b></p>
                <input
                    type='text'
                    name='nome'
                    label='Nome'
                    onChange={(e) => setNomeOpcao(e.target.value)}
                    value={nomeOpcao}
                />
            </span>
            <span style={{ display: 'block', marginLeft: '5px' }}>
                <p><b>Valor Adicional</b></p>
                <span style={{display: 'flex'}}>
                    <input
                        type='number'
                        name='adicional'
                        onChange={(e) => setAdicionalOpcao(e.target.value)}
                        value={adicionalOpcao}
                    />
                    <Switch
                        onChange={(e) => setEstoqueOpcao(e.target.checked)}
                        checked={estoqueOpcao}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    {opcao ?
                        <>{nomeOpcao !== opcao.nome |
                            adicionalOpcao !== opcao.valor_adicional |
                            estoqueOpcao !== opcao.em_estoque ?
                            <button type="button" onClick={salvarOpcao}>Salvar</button> : null}</> :
                        <>{nomeOpcao &&
                            <button type='button' onClick={salvarNovaOpcao}>Salvar</button>}
                        </>
                    }
                    <button type="button" style={{marginLeft: '3px'}} onClick={opcao ? excluirOpcao : handleExcluir}>Excluir</button>
                </span>
            </span>
        </div>
    );
};
