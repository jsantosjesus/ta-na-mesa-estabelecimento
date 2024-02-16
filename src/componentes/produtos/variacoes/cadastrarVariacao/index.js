import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Opcoes } from './opcoes';
import DoneAllIcon from '@mui/icons-material/DoneAll';


export const CadastrarVariacao = ({ handleSubmit, variacao, index }) => {

    const [novaOpcao, setNovaOpcao] = useState(false);
    const [opcoes, setOpcoes] = useState([]);

    //validando antes de salvar
    const ProdutoSchema = Yup.object().shape({
        nome: Yup.string()
            .min(5, 'Muito pequeno!')
            .max(100, 'Muito grande!')
            .required('Campo obrigatorio'),
        minimo: Yup.number().min(0, 'A escolha mínima não pode ser menor que zero').required('Defina uma escolha mínima!'),
        minimo: Yup.number().min(0, 'A escolha máxima não pode ser menor que zero').required('Defina uma escolha máxima!')
    });

    const abrirNovaOpcao = () => {
        setNovaOpcao(true);
    }

    useEffect(() => {
        if (variacao) {
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
            validationSchema={ProdutoSchema}
            onSubmit={async (values) => {
                let objeto = {
                    nome: values.nome,
                    minimo: values.minimo,
                    maximo: values.maximo,
                    opcoes: opcoes
                }
                if (!variacao) {
                    handleSubmit(objeto)
                } else {
                    handleSubmit(objeto, index)
                }

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
                            {novaOpcao && <Opcoes handleExcluir={excluirNovaOpcao} handleSalvar={salvarNovaOpcao} />}
                            {opcoes && opcoes.map((opcao, index) => {
                                return (<Opcoes key={index} opcao={opcao} index={index} handleSalvar={salvarOpcao} handleExcluir={excluirOpcao} />)
                            })}
                        </div>


                    </div>
                    <div className="salvar">
                        {variacao
                            && variacao.nome == values.nome
                            && variacao.minimo == values.minimo
                            && variacao.maximo == values.maximo
                            && variacao.opcoes == opcoes
                            ? <p className="botaoSalvarProduto" style={{backgroundColor: 'green'}}><DoneAllIcon />Salvo</p>
                            :
                            <>{!errors.nome
                                && values.maximo >= values.minimo
                                && !errors.maximo && !errors.minimo
                                && opcoes.length >= 1
                                ? <button className="botaoSalvarProduto" type="submit" disabled={isSubmitting}>
                                    Salvar Variação
                                </button>
                                :
                                <button className="botaoSalvarProduto" style={{ opacity: '0.4', cursor: 'not-allowed' }}>
                                    Salvar Variação
                                </button>}</>}
                    </div>
                </form>
            )}
        </Formik>)
}