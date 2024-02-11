import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import { AuthContext } from '../../contexts/auth';
import firebase from 'firebase';


function FormLogin() {
    const [messageErro, setMessageErro] = useState();
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    return (
        <Formik
            initialValues={{ email: '', senha: '' }}
            validate={(values) => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Campo obrigatório!';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Isso não é um email!';
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                setLoading(true);
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(values.email, values.senha)
                    .then((response) => {
                        setLoading(false)
                        setSubmitting(false);
                        setMessageErro('');
                        login(response.user.uid);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            console.error(error.response.data.message);
                            setMessageErro(error.response.data.message);
                        }
                    });
            }}>
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                    <p className="erroMessage">{messageErro}</p>
                    <label>
                        <p>
                            <b>Usuário</b>
                        </p>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Digite seu email"
                        />
                        <p className="erroLogin">{errors.email && touched.email && errors.email}</p>
                    </label>
                    <br />
                    <label>
                        <p>
                            <b>Senha</b>
                        </p>
                        <input
                            type="password"
                            name="senha"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.senha}
                            placeholder="Digite sua senha"
                        />
                        {/* <p className="erroLogin">{errors.password && touched.password && errors.password}</p> */}
                    </label>
                    <br />
                    {!loading ? (<button type="submit" disabled={isSubmitting} className="btnentrar">
                        Entrar
                    </button>) :
                    (<button className="btnentrar" style={{ opacity: '0.4', cursor: 'wait' }}>
                        Carregando...
                    </button>)}
                </form>
            )}
        </Formik>)
}

export default FormLogin;