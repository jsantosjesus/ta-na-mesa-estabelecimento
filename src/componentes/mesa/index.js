import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import MesaQR from './mesaQRcode';

function ModalMesa({ mesa, onClose, onSave, garcons, erro, user, passarIdNovaMesa }) {
    const isEditingMesa = !!mesa;
    const [loading, setLoading] = useState(false);
    const [decisaoExcluir, setDecisaoExcluir] = useState(false);
    const [openMesaQR, setOpenMesaQR] = useState(false);

    const status = ['LIVRE', 'OCUPADA', 'INATIVA'];

    const editarMesaFirebase = async (values) => {

        //Se a mesa estiver com uma conta em aberto, o status dela não pode ser alterado
        if (mesa.status == 'OCUPADA' && values.status != 'OCUPADA') {
            // aqui o front chama a ultima conta relacionada a essa mesa
            let conta;
            await firebase
                .firestore()
                .collection('conta')
                .where('mesa_id', '==', mesa.id)
                .orderBy('dataAberta', 'desc')
                .limit(1)
                .get()
                .then( async (result) => {
                    result.docs.map((doc) => conta = doc.data());
                    
                    //se a conta não tiver um atributo chamado dataPaga, isso quer dizer que a conta ainda não foi paga 
                    if (conta && !conta.dataPaga) {

                        //então o sistema irá emitir um alert
                        setLoading(false);
                        alert('Essa mesa não pode ter o status alterado porquê tem uma conta em aberto');
                        
                    }
                    // Se estiver paga 
                    else {
                        // então o sistema irá deixar que a alteração seja feita 
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

                })
                // caso dê erro na chamada da conta
                .catch((error) => {
                    console.log(error);
                    erro();
                })

        }

        // Se a mesa não estiver com o status de ocupada, ela será alterada normalmente
        else {
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
            ).then((data) => {
                passarIdNovaMesa(data.id);
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
        if (mesa.status !== "OCUPADA") {
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
        } else {
            window.alert('Essa mesa está ocupada! Não pode ser excluída')
        }
    }

    const gerarQRcode = () => {
        setOpenMesaQR(true);
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
                    <button
                        className='botaoExcluir' style={{ color: 'black', marginLeft: '5px' }} onClick={gerarQRcode}>
                        <QrCode2Icon />
                    </button>
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
                                                                return (
                                                                    <option key={status} value={status}>
                                                                        {status}
                                                                    </option>
                                                                );
                                                            }
                                                        })}
                                                    {status.map((status) => {
                                                        if (!isEditingMesa || status !== mesa.status) {
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
                                                    name="garcomId"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.garcomId}>
                                                    <optgroup label="Selecione:">
                                                        {!values.garcomId && (<option>Selecione</option>)}
                                                        {isEditingMesa &&
                                                            garcons.map((garcom) => {
                                                                if (garcom.id === mesa.garcom_id) {
                                                                    return (
                                                                        <option key={garcom.id} value={garcom.id}>
                                                                            {garcom.nome}
                                                                        </option>
                                                                    );
                                                                }
                                                            })}
                                                        {garcons.map((garcom) => {

                                                            if (!isEditingMesa || garcom.id !== mesa.garcom_id) {
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
            {mesa && <MesaQR open={openMesaQR} fechar={() => setOpenMesaQR(false)} mesa_id={mesa.id} />}
        </div>
    );
}
export { ModalMesa };
