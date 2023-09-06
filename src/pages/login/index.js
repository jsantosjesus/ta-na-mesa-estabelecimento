import React from 'react';
import './Login.css';
import logomarcaEmpresa from '../../assets/logomarca.png';
import { Formik } from 'formik';
import { apiClient } from '../../config/api';

function Login() {
  return (
    <div className="login">
      <div className="oitenta">
        <div className="formulario">
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
              apiClient.post(
                `/auth/login`,
                values, {
                  headers: {
                    'ngrok-skip-browser-warning': true
                  }
              })
                .then(response => {
                  console.log(response);
                  localStorage.setItem("usuarioLogado", JSON.stringify(response.data));
                  setSubmitting(false);
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
                <button type="submit" disabled={isSubmitting} className="btnentrar">
                  Entrar
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div className="footer">
        <img className="logoarcafooter" width="200px" src={logomarcaEmpresa} alt="Logo" />
      </div>
    </div>
  );
}

export default Login;
