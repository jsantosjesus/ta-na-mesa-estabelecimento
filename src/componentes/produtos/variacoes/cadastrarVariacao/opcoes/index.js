import { Switch } from "@mui/material";
import React, { useEffect, useState } from "react"
import TextField from '@mui/material/TextField';

export const Opcoes = ({ opcao, handleSalvar, handleExcluir, index }) => {
    const [nomeOpcao, setNomeOpcao] = useState(opcao ? opcao.nome : '');
    const [adicionalOpcao, setAdicionalOpcao] = useState(opcao ? opcao.valor_adicional : '');
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
            valor_adicional: adicionalOpcao,
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
            valor_adicional: adicionalOpcao,
            em_estoque: estoqueOpcao
        };
        handleSalvar(objectOpcao);
    };

    return (
        <div>
            <TextField
                type='text'
                name='nome'
                label='Nome'
                onChange={(e) => setNomeOpcao(e.target.value)}
                value={nomeOpcao}
            />
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
                <>{nomeOpcao !== opcao.nome ||
                    adicionalOpcao !== opcao.valor_adicional ||
                    estoqueOpcao !== opcao.em_estoque ?
                    <button type="button" onClick={salvarOpcao}>Salvar</button> : null}</> :
                <>{nomeOpcao && adicionalOpcao &&
                    <button type='button' onClick={salvarNovaOpcao}>Salvar</button>}
                </>
            }
            <button type="button" onClick={opcao ? excluirOpcao : handleExcluir}>Excluir</button>
        </div>
    );
};
