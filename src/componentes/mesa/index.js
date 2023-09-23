/* eslint-disable prettier/prettier */
import { Formik } from 'formik';
import * as Yup from 'yup';


function ModalMesa({ mesa, onClose, onSave, colaborador }) {
    const isEditingMesa = !!mesa;

    const status = ['LIVRE', 'OCUPADA', 'INATIVA'];

    const mesaSchema = Yup.object().shape({
        numero: Yup.string()
            .required('Campo obrigatorio'),
        garcom: Yup.string()
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
                                    garcom: mesa.colaboradorId
                                }
                                : {}
                        }
                        validationSchema={mesaSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                console.log(JSON.stringify(values, null, 2));
                                onSave();
                                setSubmitting(false);
                            }, 400);
                        }}>
                        {({
                            errors,
                            values,
                            touched,
                            handleChange,
                            handleBlur
                            // handleSubmit,
                            // isSubmitting
                            /* and other goodies */
                        }) => (
                            <forms>
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
                                                    name="garcom"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.garcom}>
                                                    <optgroup label="Selecione:">
                                                        {isEditingMesa &&
                                                            colaborador.map((colaborador) => {
                                                                if (colaborador.tipo !== 'garcom') {
                                                                    if (colaborador.id === mesa.colaboradorId) {
                                                                        // eslint-disable-next-line prettier/prettier
                                                                        return (
                                                                            <option key={colaborador.id} value={colaborador.id}>
                                                                                {colaborador.nome}
                                                                            </option>
                                                                        );
                                                                    }
                                                                }
                                                            })}
                                                        {/* {categorias.map((categoria) => {
                                                            if (!isEditingProduto || categoria.id !== produto.categoriaId) {
                                                                // eslint-disable-next-line prettier/prettier
                                                                return (
                                                                    <option key={categoria.id} value={categoria.id}>
                                                                        {categoria.nome}
                                                                    </option>
                                                                );
                                                            }
                                                        })} */}
                                                    </optgroup>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="salvar">
                                    <button className="botaoSalvarProduto">
                                        Salvar Alterações
                                    </button>
                                </div>
                            </forms>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
export { ModalMesa };
