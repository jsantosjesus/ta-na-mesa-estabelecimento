/* eslint-disable prettier/prettier */
import { Formik } from 'formik';
import * as Yup from 'yup';
import { apiClient } from '../../config/api';


function ModalMesa({ mesa, onClose, onSave, garcons, erro }) {
    const isEditingMesa = !!mesa;

    const status = ['LIVRE', 'OCUPADA', 'INATIVA'];

    const editarMesaFirebase = () => {

    }

    const cadastrarMesaFirebase = () => {

    }

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
                                    garcomId: mesa.garcom_id
                                }
                                : {
                                    status: 'LIVRE'
                                }
                        }
                        validationSchema={mesaSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            isEditingMesa ?
                                (
                                    editarMesaFirebase()
                                )
                                :
                                (
                                    cadastrarMesaFirebase()
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
