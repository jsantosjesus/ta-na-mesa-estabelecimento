import { Switch } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Opcoes } from './opcoes';


export const CadastrarVariacao = ({ handleSubmit, variacao }) => {
    
    const [novaOpcao, setNovaOpcao] = useState(false);  
    const [opcoes, setOpcoes] = useState([]);

    const abrirNovaOpcao = () => {
        setNovaOpcao(true);
    }

    useEffect(() => {
        if(variacao){
            setOpcoes(variacao.opcoes)
            console.log(opcoes);
        }
    }, [variacao]);

    const salvarNovaOpcao = (opcao) => {
        const newData = [...opcoes, opcao];
        setOpcoes(newData)
        setNovaOpcao(false);
    }

    const excluirNovaOpcao = () => {
        setNovaOpcao(false);
        console.log(opcoes);
    };

    const salvarOpcao = (opcao, index) => {
        const newData = [...opcoes];
    
    newData[index] = { ...newData[index], nome: opcao.nome, valor_adicional: opcao.valor_adicional, em_estoque: opcao.em_estoque };
    
    setOpcoes(newData);
    };

    const excluirOpcao = (index) => {
        const newData = [...opcoes];

        newData.splice(index, 1);

        setOpcoes(newData);

    }

    return (
        <Formik
            initialValues={
                variacao ?
                    {
                        nome: variacao.nome,
                        minimo: variacao.minimo,
                        maximo: variacao.maximo,
                    }
                    :
                    {}
            }
            // validationSchema={mesaSchema}
            onSubmit={async (values) => {
                let objeto = {
                    nome: values.nome,
                    minimo: values.minimo,
                    maximo: values.maximo,
                    opcoes: opcoes
                }
                handleSubmit(objeto)
            }}>
            {({
                errors,
                values,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="nome">
                            <p>Nome</p>
                            <input
                                type="text"
                                name="nome"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nome}></input>
                            {/* {errors.numero && touched.numero ? (
                                <div className="errorInput">{errors.numero}</div>
                            ) : null} */}
                        </div>
                        <div className="nome">
                            <p>Escolha Mínima</p>
                            <input
                                type="number"
                                name="minimo"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.minimo}></input>
                            {/* {errors.numero && touched.numero ? (
                                <div className="errorInput">{errors.numero}</div>
                            ) : null} */}
                        </div>
                        <div className="nome">
                            <p>Escolha Máxima</p>
                            <input
                                type="number"
                                name="maximo"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.maximo}></input>
                        </div>
                        <p>opções:</p>
                        <div>
                            <button type="button" onClick={abrirNovaOpcao}>Adicionar opção</button>
                            {novaOpcao && <Opcoes handleExcluir={excluirNovaOpcao} handleSalvar={salvarNovaOpcao}/>}
                            {opcoes && opcoes.map((opcao, index) => {
                                return (<Opcoes key={index} opcao={opcao} index={index} handleSalvar={salvarOpcao} handleExcluir={excluirOpcao}/>)
                            })}
                        </div>


                    </div>
                    <div className="salvar">
                        <button className="botaoSalvarProduto" type="submit" disabled={isSubmitting}>
                            Salvar Variação
                        </button>
                    </div>
                </form>
            )}
        </Formik>)
}