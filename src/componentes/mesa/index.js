/* eslint-disable prettier/prettier */
import { Formik } from 'formik';
import * as Yup from 'yup';
import { apiClient } from '../../config/api';


function ModalMesa({ mesa, onClose, onSave, colaborador, token, usuario, erro }) {
    const isEditingMesa = !!mesa;

    const status = ['LIVRE', 'OCUPADA', 'INATIVA'];

    const mesaSchema = Yup.object().shape({
        numero: Yup.string()
            .required('Campo obrigatorio')
    });

    return (
        <div className="modalTransparent">
            <div className="poupupcolaborador">
                <div className="titlecolaborador">
                    <h3>{isEditingMesa ? 'Editar' : 'Criar'} mesa</h3>
                    <button onClick={onClose}>X</button>
                    <hr />
                </div>
                <hr />
                <div className="corpoProduto">
                    <Formik
                        initialValues={
                            isEditingMesa
                                ? {
                                    numero: mesa.numero,
                                    status: mesa.status,
                                    usuarioId: mesa.colaboradorId
                                }
                                : {
                                    status: 'LIVRE'
                                }
                        }
                        validationSchema={mesaSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            isEditingMesa ?
                                (
                                    await apiClient.put(`/mesas/estabelecimento/${mesa.id}`, values, {
                                        headers: {
                                            'ngrok-skip-browser-warning': true,
                                            Authorization: `Bearer ${token}`
                                        }
                                    })
                                        .then((response) => {
                                            setTimeout(() => {
                                                console.log(JSON.stringify(values, null, 2));
                                                console.log(response.data);
                                                onSave();
                                                onClose();
                                                setSubmitting(false);
                                            }, 400);
                                        }
                                        )
                                        .catch((error) => {
                                            console.log(error);
                                            onClose();
                                            erro();
                                        })
                                )
                                :
                                (
                                    await apiClient.post(`/mesas/estabelecimento/${usuario.estabelecimentoId}`, values, {
                                        headers: {
                                            'ngrok-skip-browser-warning': true,
                                            Authorization: `Bearer ${token}`
                                        }
                                    })
                                        .then((response) => {
                                            setTimeout(() => {
                                                console.log(JSON.stringify(values, null, 2));
                                                console.log(response.data);
                                                onSave();
                                                onClose();
                                                setSubmitting(false);
                                            }, 400);
                                        }
                                        )
                                        .catch((error) => {
                                            console.log(error);
                                            onClose();
                                            erro();
                                        })
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
                                                type="name"
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
                                                    name="usuarioId"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.usuarioId}>
                                                    <optgroup label="Selecione:">
                                                        {isEditingMesa &&
                                                            colaborador.map((colaborador) => {
                                                                if (colaborador.tipo === 'GARCOM') {
                                                                    if (colaborador.id === mesa.usuarioId) {
                                                                        // eslint-disable-next-line prettier/prettier
                                                                        return (
                                                                            <option key={colaborador.id} value={colaborador.id}>
                                                                                {colaborador.nome}
                                                                            </option>
                                                                        );
                                                                    }
                                                                }
                                                            })}
                                                        {colaborador.map((colaborador) => {
                                                            if (colaborador.tipo === 'GARCOM') {
                                                                if (!isEditingMesa || colaborador.id !== mesa.usuarioId) {
                                                                    // eslint-disable-next-line prettier/prettier
                                                                    return (
                                                                        <option key={colaborador.id} value={colaborador.id}>
                                                                            {colaborador.nome}
                                                                        </option>
                                                                    );
                                                                }
                                                            }
                                                        })}
                                                    </optgroup>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="salvar">
                                    <button type="submit" disabled={isSubmitting} className="botaoSalvarProduto">
                                        Salvar Alterações
                                    </button>
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
