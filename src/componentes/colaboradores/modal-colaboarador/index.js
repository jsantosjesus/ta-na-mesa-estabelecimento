/* eslint-disable prettier/prettier */
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';
import { useState } from 'react';


function Modalcolaborador({ colaborador, onClose, onSave, onError, user }) {
    const isEditingcolaborador = !!colaborador;
    const [loading, setLoading] = useState(false);

    const cargos = [{
        valor: 'garcom',
        nome: 'Garçom'
    },
    {
        valor: 'cozinha',
        nome: 'Cozinha'
    }

    ]

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

    const cadastrarColaborador = async (values) => {
        await firebase.auth().createUserWithEmailAndPassword(values.email, values.senha)
  .then( async (userCredential) => {
    // Signed in 
    var usuario = userCredential.user;
    console.log(usuario);
    await firebase
              .firestore()
              .collection('usuario')
              .add(
                {
                  nome: values.nome,
                  email: values.email,
                  cargo: values.cargo,
                  estabelecimento_id: user.estabelecimentoId
                }
              ).then(() => {
                onSave();
              }
              ).catch((error) => {
                onError();
                console.log(error.data);
              })
  })
  .catch((error) => {
    console.log(`ERRO ${error.code}: ${error.mesage}`)
  });
    }


    const editarColaborador = async (values) => {
        await firebase
            .firestore()
            .collection('usuario')
            .doc(colaborador.id)
            .update(
                {
                    nome: values.nome,
                    cargo: values.cargo
                }
            ).then(() => {
                onSave();
            }
            ).catch((error) => {
                onError();
                console.log(error.data);
            })
    }

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
                                    cargo: colaborador.cargo
                                }
                                : {}
                        }
                        validationSchema={!isEditingcolaborador && colaboradorSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setLoading(true);
                            if (isEditingcolaborador) {
                                editarColaborador(values);
                            } else {
                                cadastrarColaborador(values);
                            }
                            setTimeout(() => {
                                console.log(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                                setLoading(false);
                            }, 400);
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

                                        {!isEditingcolaborador ?
                                            (<><div className="nome">
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
                                                </div></>) : (<></>)}

                                        <div className="categoriaEadicionar">
                                            {isEditingcolaborador ? (<div>
                                                {colaborador.cargo !== 'administrador' ? (<><p>Cargo</p>
                                                    <select
                                                        // eslint-disable-next-line react/no-unknown-property
                                                        name="cargo"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.cargo}>
                                                        <optgroup label="Selecione:">
                                                            {isEditingcolaborador && <option value={colaborador.cargo} key={colaborador.cargo} >{colaborador.cargo}</option>}
                                                            {cargos.map((cargo) => {
                                                                if (isEditingcolaborador && cargo.valor !== colaborador.cargo) {
                                                                    // eslint-disable-next-line react/jsx-key
                                                                    return <option key={cargo.valor} value={cargo.valor}>{cargo.nome}</option>;
                                                                } else if (!isEditingcolaborador) {
                                                                    return <option key={cargo.valor} value={cargo.valor}>{cargo.nome}</option>
                                                                }
                                                            })}
                                                        </optgroup>
                                                    </select></>) : (<></>)}
                                                    {isEditingcolaborador && colaborador.cargo == 'garcom' && values.cargo != 'garcom' && (
                                                        <p style={{color: 'red'}}>Se esse colaborador estiver vinculado à uma mesa, altere em mesas!</p>
                                                    )}
                                            </div>) : (<></>)}
                                        </div>
                                    </div>
                                </div>

                                <div className="salvar">
                                    {!loading ? <button className="botaoSalvarProduto" type="submit" disabled={isSubmitting}>
                                        Salvar Alterações
                                    </button> : (<button className="botaoSalvarProduto" style={{ opacity: '0.4', cursor: 'wait' }}>Salvando...</button>)}


                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
export { Modalcolaborador };
