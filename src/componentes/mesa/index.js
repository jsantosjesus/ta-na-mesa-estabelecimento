/* eslint-disable prettier/prettier */
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ModalMesa({ mesa, onClose, onSave, garcons, erro, user }) {
    const isEditingMesa = !!mesa;
    const [loading, setLoading] = useState(false);
    const [decisaoExcluir, setDecisaoExcluir] = useState(false);

    const status = ['LIVRE', 'OCUPADA', 'INATIVA'];

    const editarMesaFirebase = async (values) => {
        await firebase
            .firestore()
            .collection('mesa')
            .doc(mesa.id)
            .update(
                {
                    numero: values.numero,
                    garcom_id: values.garcomId,
                    status: values.status
                }
            ).then(() => {
                onSave('Mesa editada com sucesso');
                setLoading(false);
            }
            ).catch((error) => {
                erro();
                setLoading(false);
                console.log(error.data);
            })
    }

    const cadastrarMesaFirebase = async (values) => {
        await firebase
            .firestore()
            .collection('mesa')
            .add(
                {
                    numero: values.numero,
                    garcom_id: values.garcomId,
                    status: values.status,
                    estabelecimento_id: user.estabelecimentoId,
                }
            ).then(() => {
                onSave('Mesa salva com sucesso');
                setLoading(false);
            }
            ).catch((error) => {
                erro();
                setLoading(false);
                console.log(error.data);
            })
    }

    const excluirMesa = async () => {
        if(mesa.status !== "OCUPADA"){
        await firebase
            .firestore()
            .collection('mesa')
            .doc(mesa.id)
            .delete()
            .then(() => {
                onSave('Excluida com sucesso');
                setLoading(false);
                setDecisaoExcluir(false);
            }
            ).catch((error) => {
                erro();
                setLoading(false);
                console.log(error);
            })
        }else{
            window.alert('Essa mesa está ocupada! Não pode ser excluída')
        }
    }

    const mesaSchema = Yup.object().shape({
        numero: Yup.string()
            .required('Campo obrigatorio'),
        garcomId: Yup.string()
            .required('Campo obrigatorio')
    });

    return (
        <div className="modalTransparent">
            <div className="poupupcolaborador">
                {isEditingMesa && (<div className='excluir'>
                    <button className='botaoExcluir' onClick={() => setDecisaoExcluir(true)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    {decisaoExcluir && (<><p>Excluir categoria?</p>
                        <p className='excluirDecisao' onClick={excluirMesa}>Sim</p><p className='excluirDecisao' onClick={() => setDecisaoExcluir(false)}>Não</p></>)}
                </div>)}
                <div className="titleproduto">
                    <h3>{isEditingMesa ? 'Editar' : 'Criar'} mesa</h3>
                    <button onClick={onClose}>X</button>
                </div>
                <hr />
                <div className="corpoProduto">
                    <Formik
                        initialValues={
                            isEditingMesa
                                ? {
                                    numero: mesa.numero,
                                    status: mesa.status,
                                    garcomId: mesa.garcom_id
                                }
                                : {
                                    status: 'LIVRE'
                                }
                        }
                        validationSchema={mesaSchema}
                        onSubmit={async (values) => {
                            setLoading(true);
                            isEditingMesa ?
                                (
                                    editarMesaFirebase(values)
                                )
                                :
                                (
                                    cadastrarMesaFirebase(values)
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
                                            <p>Numero</p>
                                            <input
                                                type="number"
                                                name="numero"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.numero}></input>
                                            {errors.numero && touched.numero ? (
                                                <div className="errorInput">{errors.numero}</div>
                                            ) : null}
                                        </div>

                                        <div className="nome">
                                            <p>status</p>
                                            <select
                                                type="name"
                                                name="status"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.status}>
                                                <optgroup label="Selecione:">
                                                    {isEditingMesa &&
                                                        status.map((status) => {
                                                            if (status === mesa.status) {
                                                                // eslint-disable-next-line prettier/prettier
                                                                return (
                                                                    <option key={status} value={status}>
                                                                        {status}
                                                                    </option>
                                                                );
                                                            }
                                                        })}
                                                    {status.map((status) => {
                                                        if (!isEditingMesa || status !== mesa.status) {
                                                            // eslint-disable-next-line prettier/prettier
                                                            return (
                                                                <option key={status} value={status}>
                                                                    {status}
                                                                </option>
                                                            );
                                                        }
                                                    })}
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div className="categoriaEadicionar">
                                            <div>
                                                <p>Garçom</p>
                                                <select
                                                    // eslint-disable-next-line react/no-unknown-property
                                                    name="garcomId"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.garcomId}>
                                                    <optgroup label="Selecione:">
                                                        {!values.garcomId && (<option>Selecione</option>)}
                                                        {isEditingMesa &&
                                                            garcons.map((garcom) => {
                                                                if (garcom.id === mesa.garcom_id) {
                                                                    // eslint-disable-next-line prettier/prettier
                                                                    return (
                                                                        <option key={garcom.id} value={garcom.id}>
                                                                            {garcom.nome}
                                                                        </option>
                                                                    );
                                                                }
                                                            })}
                                                        {garcons.map((garcom) => {

                                                            if (!isEditingMesa || garcom.id !== mesa.garcom_id) {
                                                                // eslint-disable-next-line prettier/prettier
                                                                return (
                                                                    <option key={garcom.id} value={garcom.id}>
                                                                        {garcom.nome}
                                                                    </option>
                                                                );
                                                            }

                                                        })}
                                                    </optgroup>
                                                </select>
                                                {errors.garcomId && touched.garcomId ? (
                                                    <div className="errorInput">{errors.garcomId}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="salvar">
                                    {values.numero && values.garcomId && values.status ?
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
export { ModalMesa };
