/* eslint-disable prettier/prettier */
import { Formik } from 'formik';
import * as Yup from 'yup';


function Modalcolaborador({ colaborador, onClose, cargos, onSave, 
    // selectedValue, abrirMesasGarcom 
}) {
    const isEditingcolaborador = !!colaborador;

    const colaboradorSchema = Yup.object().shape({
        nome: Yup.string()
            .min(5, 'Muito pequeno!')
            .max(100, 'Muito grande!')
            .required('Campo obrigatorio'),
        email: Yup.string()
            .email('email invalido')
            .min(5, 'Muito pequeno!')
            .max(100, 'Muito grande!')
            .required('Campo obrigatorio'),
        senha: Yup.string()
            .required('Senha obrigatória')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                'A senha precisa ter no mínimo 8 caracteres, ' +
                'uma letra maiúscula e uma letra minúscula, ' +
                'um número e um caracter especial'
            ),
        cargo: Yup.string()
            .required('Campo obrigatorio')
    });

    return (
        <div className="modalTransparent">
            <div className="poupupcolaborador">
                <div className="titlecolaborador">
                    <h3>{isEditingcolaborador ? 'Editar' : 'Criar'} colaborador</h3>
                    <button onClick={onClose}>X</button>
                    <hr />
                </div>
                <hr />
                <div className="corpoProduto">
                    <Formik
                        initialValues={
                            isEditingcolaborador
                                ? {
                                    nome: colaborador.nome,
                                    email: colaborador.email,
                                    senha: colaborador.senha,
                                    cargo: colaborador.cargo,
                                    mesas: colaborador.mesas
                                }
                                : {}
                        }
                        validationSchema={colaboradorSchema}
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

                                        <div className="nome">
                                            <p>Email</p>
                                            <input
                                                type="name"
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}></input>
                                            {errors.email && touched.email ? (
                                                <div className="errorInput">{errors.email}</div>
                                            ) : null}
                                        </div>
                                        <div className="nome">
                                            <p>Senha</p>
                                            <input
                                                type="password"
                                                name="senha"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.senha}></input>
                                            {errors.senha && touched.senha ? (
                                                <div className="errorInput">{errors.senha}</div>
                                            ) : null}
                                        </div>

                                        <div className="categoriaEadicionar">
                                            <div>
                                                <p>Cargo</p>
                                                <select
                                                    // eslint-disable-next-line react/no-unknown-property
                                                    name="cargo"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.cargo}>
                                                    <optgroup label="Selecione:">
                                                        {isEditingcolaborador && <option>{colaborador.tipo}</option>}
                                                        {cargos.map((cargo) => {
                                                            if (isEditingcolaborador || cargo.nome !== colaborador.tipo) {
                                                                // eslint-disable-next-line react/jsx-key
                                                                return <option value={cargos.nome}>{cargos.nome}</option>;
                                                            }
                                                        })}
                                                    </optgroup>
                                                </select>
                                            </div>
                                            {/* {selectedValue === 'Garçom' ? (
                                                <div className="mesasThisGarcom">
                                                    Mesas:{' '}
                                                    {colaborador.mesas.map((mesa, index) => (
                                                        <p key={index}>
                                                            {mesa}
                                                            {index === colaborador.mesas.length - 1 ? '' : ', '}
                                                        </p>
                                                    ))}
                                                    <p className="linkMesas" onClick={abrirMesasGarcom}>
                                                        Gerenciar mesas
                                                    </p>
                                                </div>
                                            ) : (
                                                <p></p>
                                            )} */}
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
export { Modalcolaborador };
