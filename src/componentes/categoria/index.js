import { Formik } from 'formik';
import * as Yup from 'yup';
import { apiClient } from '../../config/api';



function ModalCategoria({ categoria, onClose, onSave, token, usuario, erro }) {
    const isEditingCategoria = !!categoria;

    const categoriaSchema = Yup.object().shape({
        nome: Yup.string()
            .required('Campo obrigatorio')
    });

    return (
        <div className="modalTransparent">
            <div className="poupupcolaborador">
                <div className="titlecolaborador">
                    <h3>{isEditingCategoria ? 'Editar' : 'Criar'} Categoria</h3>
                    <button onClick={onClose}>X</button>
                    <hr />
                </div>
                <hr />
                <div className="corpoProduto">
                    <Formik
                        initialValues={
                            isEditingCategoria
                                ? {
                                    nome: categoria.nome,
                                }
                                :
                                {}

                        }
                        validationSchema={categoriaSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            isEditingCategoria ?
                                (
                                    await apiClient.put(`/categorias/${categoria.id}`, values, {
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
                                            console.log(JSON.stringify(values, null, 2));
                                            onClose();
                                            erro();
                                            console.log(categoria.id);
                                        })
                                )
                                :
                                (
                                    await apiClient.post(`/categorias/estabelecimento/${usuario.estabelecimentoId}`, values, {
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
                                            <p>Nome</p>
                                            <input
                                                type="name"
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
export { ModalCategoria };
