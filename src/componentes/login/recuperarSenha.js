import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import firebase from 'firebase';


function FormRecuperarSenha() {
    const [mensagem, setMensagem] = useState();
    const [loading, setLoading] = useState(false);

    return (
        <>
            {!mensagem ? (<Formik
                initialValues={{ email: '' }}
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
                        .sendPasswordResetEmail(values.email)
                        .then(() => {
                            setLoading(false)
                            setSubmitting(false);
                            setMensagem('Verique sua caixa de email');
                        })
                        .catch(() => {
                            setMensagem('Desculpe! aconteceu um erro! Verifique se esse email está cadastrado em nosso sistema')
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
                        <label>
                            <p>
                                <b>Digite seu email cadastrado</b>
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
                        {!loading ? (<button type="submit" disabled={isSubmitting} className="btnentrar">
                            Enviar
                        </button>) :
                            (<button className="btnentrar" style={{ opacity: '0.4', cursor: 'wait' }}>
                                Carregando...
                            </button>)}
                    </form>
                )}
            </Formik>) : (<h3>{mensagem}</h3>)}
        </>
    )
}

export default FormRecuperarSenha;