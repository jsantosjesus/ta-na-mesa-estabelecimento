import pizzaImagem from '../../../assets/Pizza de Calabresa.jpg';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { apiClient } from '../../../config/api';

function ModalProduto({ produto, onClose, categorias, onSave, user }) {
  const isEditingProduto = !!produto;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hYW5AZ21haWwuY29tIiwic2VuaGEiOiIkMmEkMTAkOXdsN1NiMXVHaTRiTjVxTmNDZ3FidTR2cEJ4WE95Y3Z2Nm1keWpBNzIzSy5BOW9OTEdYYXEiLCJpYXQiOjE2OTQ5MDYwNDUsImV4cCI6MTcwMjY4MjA0NX0.WLF6inxtRFbBUKcaZ9lBKL7zmmANQdpvDQC9Hmwpxl8';
  const [imagemProduto, setImagemProduto] = useState(pizzaImagem);
  const [imgPreview, setImgPreview] = useState('');
  const ProdutoSchema = Yup.object().shape({
    nome: Yup.string()
      .min(5, 'Muito pequeno!')
      .max(100, 'Muito grande!')
      .required('Campo obrigatorio'),
    preco: Yup.number().min(0, 'Preço não pode ser menor que zero').required('Campo obrigatorio'),
    estoque: Yup.number()
      .min(0, 'Estoque não pode ser menor que zero')
      .required('Campo obrigatorio'),
    descricao: Yup.string()
      .min(5, 'Muito pequeno!')
      .max(1000, 'Muito grande!')
      .required('Campo obrigatorio'),
    categoria: Yup.string().required('Campo obrigatorio')
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        console.log(imgPreview);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    produto ? setImagemProduto(produto.imagem.url) : setImagemProduto(pizzaImagem);
    console.log(user.token);
  }, [produto]);

  return (
    <div className="modalTransparent">
      <div className="poupupproduto">
        <div className="titleproduto">
          <h3>{isEditingProduto ? 'Editar' : 'Criar'} produto</h3>
          <button onClick={onClose}>X</button>
          <hr />
        </div>
        <hr />
        <div className="corpoProduto">
          <Formik
            initialValues={
              isEditingProduto
                ? {
                    nome: produto.nome,
                    preco: produto.preco,
                    estoque: produto.estoque,
                    categoria: produto.categoriaId,
                    descricao: produto.descricao
                  }
                : {}
            }
            validationSchema={ProdutoSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (imgPreview) {
                values.imagem = imgPreview.data;
              }
              {
                isEditingProduto &&
                  (
                    await apiClient.put(`/produtos/${produto.id}`, values, {
                      headers: {
                        'ngrok-skip-browser-warning': true,
                        Authorization: `Bearer ${token}`
                      }
                    })
                  )
                    .then((response) => console.log(response.mensage))
                    .catch((error) => console.log(error.data));
                setTimeout(() => {
                  console.log(JSON.stringify(values, null, 2));
                  console.log(imgPreview);
                  onSave();
                  setSubmitting(false);
                }, 400);
              }
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
                  <div className="imagemProduto">
                    {imgPreview ? (
                      <img src={imgPreview} alt="imagem do produto" width="70%" />
                    ) : (
                      <img src={imagemProduto} alt="imagem do produto" width="70%" />
                    )}
                    <input
                      type="file"
                      name="imagem"
                      onChange={handleImageChange}
                      value={values.imagem}></input>
                  </div>

                  <div className="aoLadoDaImagem">
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
                    <div className="estoqueEpreco">
                      <div>
                        <p>Preço</p>
                        <input
                          type="number"
                          name="preco"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.preco}
                        />
                        {errors.preco && touched.preco ? (
                          <div className="errorInput">{errors.preco}</div>
                        ) : null}
                      </div>
                      <div className="estoque">
                        <p>Estoque</p>
                        <input
                          type="number"
                          name="estoque"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.estoque}
                        />
                        {errors.estoque && touched.estoque ? (
                          <div className="errorInput">{errors.estoque}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="categoriaEadicionar">
                      <div>
                        <p>Categoria</p>
                        <select
                          name="categoria"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.categoria}>
                          <optgroup label="Selecione:">
                            {isEditingProduto &&
                              categorias.map((categoria) => {
                                if (categoria.id === produto.categoriaId) {
                                  // eslint-disable-next-line prettier/prettier
                                  return (
                                    <option key={categoria.id} value={categoria.id}>
                                      {categoria.nome}
                                    </option>
                                  );
                                }
                              })}
                            {categorias.map((categoria) => {
                              if (!isEditingProduto || categoria.id !== produto.categoriaId) {
                                // eslint-disable-next-line prettier/prettier
                                return (
                                  <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                  </option>
                                );
                              }
                            })}
                          </optgroup>
                        </select>
                      </div>

                      <p className="adicionarCategoria">Adicionar categoria</p>
                    </div>
                  </div>
                </div>
                <div className="descricao">
                  <textarea
                    type="text"
                    name="descricao"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.descricao}
                  />
                  {errors.descricao && touched.descricao ? (
                    <div className="errorInput">{errors.descricao}</div>
                  ) : null}
                </div>
                <div className="salvar">
                  <button className="botaoSalvarProduto" type="submit" disabled={isSubmitting}>
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
export { ModalProduto };
