/* eslint-disable prettier/prettier */
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';
import { useState } from 'react';

function ModalCategoria({ categoria, onClose, onSave, erro, user }) {
    const isEditingCategoria = !!categoria;
    const [loading, setLoading] = useState(false);

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
                onSave();
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
                onSave();
                setLoading(false);
            }
            ).catch((error) => {
                erro();
                setLoading(false);
                console.log(error.data);
            })
    }

    const categoriaSchema = Yup.object().shape({
        nome: Yup.string()
            .required('Campo obrigatorio')
    });

    return (
        <div className="modalTransparent">
            <div className="poupupcolaborador">
                <div className="titlecolaborador">
                    <h3>{isEditingCategoria ? 'Editar' : 'Criar'} categoria</h3>
                    <button onClick={onClose}>X</button>
                    <hr />
                </div>
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
