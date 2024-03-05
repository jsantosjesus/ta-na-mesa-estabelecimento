import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ModalCategoria({ categoria, onClose, onSave, erro, user }) {
    const isEditingCategoria = !!categoria;
    const [loading, setLoading] = useState(false);
    const [decisaoExcluir, setDecisaoExcluir] = useState(false);

    const editarCategoriaFirebase = async (values) => {
        await firebase
            .firestore()
            .collection('categoria')
            .doc(categoria.id)
            .update(
                {
                    nome: values.nome
                }
            ).then(() => {
                onSave('Salvo com sucesso');
                setLoading(false);
            }
            ).catch((error) => {
                erro();
                setLoading(false);
                console.log(error.data);
            })
    }


    const cadastrarCategoriaFirebase = async (values) => {
        await firebase
            .firestore()
            .collection('categoria')
            .add(
                {
                    nome: values.nome,
                    estabelecimento_id: user.estabelecimentoId
                }
            ).then(() => {
                onSave('Salvo com sucesso');
                setLoading(false);
            }
            ).catch((error) => {
                erro();
                setLoading(false);
                console.log(error.data);
            })
    }

    const excluirCategoria = async () => {
        await firebase
            .firestore()
            .collection('produto')
            .where('estabelecimento_id', '==', user.estabelecimentoId)
            .where('categoria_id', '==', categoria.id)
            .get()
            .then(async (result) => {
                let produtoCategoria = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                if (produtoCategoria.length == 0) {
                    await firebase
                        .firestore()
                        .collection('categoria')
                        .doc(categoria.id)
                        .delete()
                        .then(() => {
                            onSave('Excluido com sucesso');
                            setLoading(false);
                            setDecisaoExcluir(false);
                        }
                        ).catch((error) => {
                            erro();
                            setLoading(false);
                            console.log(error);
                        })
                } else {
                    window.alert('Essa categoria não pode ser excluida pois existem produtos vinculados a ela');
                    setLoading(false);
                }
            }).catch((error) => {
                erro();
                console.log(error);
                setLoading(false);
            })
    }

    const categoriaSchema = Yup.object().shape({
        nome: Yup.string()
            .required('Campo obrigatorio')
    });

    return (
        <div className="modalTransparent">
            <div className="poupupcolaborador">
                {isEditingCategoria && (<div className='excluir'>
                    <button className='botaoExcluir' onClick={() => setDecisaoExcluir(true)}><FontAwesomeIcon icon={faTrash} /></button>
                    {decisaoExcluir && (<><p>Excluir categoria?</p>
                        <p className='excluirDecisao' onClick={excluirCategoria}>Sim</p><p className='excluirDecisao' onClick={() => setDecisaoExcluir(false)}>Não</p></>)}
                </div>)}
                <div className="titleproduto">
                    <h3>{isEditingCategoria ? 'Editar' : 'Criar'} categoria</h3>
                    <button onClick={onClose}>X</button>
                </div>
                <hr />
                <div className="corpoProduto">
                    <Formik
                        initialValues={
                            isEditingCategoria
                                ? {
                                    nome: categoria.nome
                                }
                                : {}
                        }
                        validationSchema={categoriaSchema}
                        onSubmit={async (values) => {
                            setLoading(true);
                            isEditingCategoria ?
                                (
                                    editarCategoriaFirebase(values)
                                )
                                :
                                (
                                    cadastrarCategoriaFirebase(values)
                                )
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
                                <div className="corpoProduto1">
                                    <div className="inputs">
                                        <div className="nome">
                                            <p>Nome</p>
                                            <input
                                                type="text"
                                                name="nome"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.nome}></input>
                                            {errors.nome && touched.nome ? (
                                                <div className="errorInput">{errors.nome}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>

                                <div className="salvar">
                                    {values.nome ?
                                        (<>{!loading ? (<button className="botaoSalvarProduto" type="submit" disabled={isSubmitting}>
                                            Salvar Alterações
                                        </button>) : (<button className="botaoSalvarProduto" style={{ opacity: '0.4', cursor: 'wait' }}>Salvando...</button>)}</>) : (
                                            <button className="botaoSalvarProduto" style={{ opacity: '0.4', cursor: 'not-allowed' }}>Salvar Alterações</button>
                                        )
                                    }
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
export { ModalCategoria };
