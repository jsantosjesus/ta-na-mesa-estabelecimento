import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import firebase from 'firebase';

function ModalProduto({ produto, onClose, categorias, onSave, user, onError }) {
  const isEditingProduto = !!produto;
  const [imagemProduto, setImagemProduto] = useState();
  const [imgPreview, setImgPreview] = useState('');
  const [imagemUrl, setImagemUrl] = useState();
  const [file, setFile] = useState();
  //useState para controlar categoria escolhida
  const [idCategoriaEscolhida, setIdCategoriaEscolhida] = useState();
  const [nomeCategoriaEscolhida, setNomeCategoriaEscolhida] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    categorias.map((categoria) => {
      if (categoria.id == idCategoriaEscolhida) {
        setNomeCategoriaEscolhida(categoria.nome);
      }
    })
  }, [idCategoriaEscolhida]);

  //validando dados antes de enviar
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
      .required('Campo obrigatorio')
  });

  //função para alterar imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        console.log(imgPreview);
      };
      reader.readAsDataURL(file);
    }
  };

  const editarProduto = async (values) => {
    setLoading(true);
    if (imgPreview) {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const uploadTask = storageRef.child(`estabelecimentos/${user.estabelecimentoId}/produtos/${values.nome}`).put(file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Error
          console.error(error.message);
          onError();
        },
        () => {
          // Completed successfully
          uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            setImagemUrl(downloadURL);
            await firebase
              .firestore()
              .collection('produto')
              .doc(produto.id)
              .update(
                {
                  nome: values.nome,
                  valor: values.preco,
                  estoque: values.estoque,
                  descricao: values.descricao,
                  categoria: {
                    id: idCategoriaEscolhida,
                    nome: nomeCategoriaEscolhida
                  },
                  imagem: downloadURL
                }
              ).then(() => {
                onSave();
              }
              ).catch((error) => {
                onError();
                console.log(error.data);
              })
          });
        }
      );
    } else {
      await firebase
        .firestore()
        .collection('produto')
        .doc(produto.id)
        .update(
          {
            nome: values.nome,
            valor: values.preco,
            estoque: values.estoque,
            descricao: values.descricao,
            categoria: {
              id: idCategoriaEscolhida,
              nome: nomeCategoriaEscolhida
            }
          }
        ).then(() => {
          onSave();
        }
        ).catch((error) => {
          onError();
          console.log(error.data);
        })
    }
    setLoading(false);
  }

  const cadastrarProduto = async (values) => {
    setLoading(true);
    //enviando imagem
    if (imgPreview) {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const uploadTask = storageRef.child(`estabelecimentos/${user.estabelecimentoId}/produtos/${values.nome}`).put(file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Error
          console.error(error.message);
          onError();
        },
        () => {
          // Completed successfully
          uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            setImagemUrl(downloadURL);
            await firebase
              .firestore()
              .collection('produto')
              .add(
                {
                  nome: values.nome,
                  valor: values.preco,
                  estoque: values.estoque,
                  descricao: values.descricao,
                  categoria: {
                    id: idCategoriaEscolhida,
                    nome: nomeCategoriaEscolhida
                  },
                  estabelecimento_id: user.estabelecimentoId,
                  imagem: downloadURL
                }
              ).then(() => {
                onSave();
              }
              ).catch((error) => {
                onError();
                console.log(error.data);
              })
          });
        }
      );
    } else {
      await firebase
        .firestore()
        .collection('produto')
        .add(
          {
            nome: values.nome,
            valor: values.preco,
            estoque: values.estoque,
            descricao: values.descricao,
            categoria: {
              id: idCategoriaEscolhida,
              nome: nomeCategoriaEscolhida
            },
            estabelecimento_id: user.estabelecimentoId,
            imagem: 'https://firebasestorage.googleapis.com/v0/b/ta-na-mesa-89fec.appspot.com/o/produtos%2Fta-na-mesa-logomarca.png?alt=media&token=268b70c7-9aa5-4a17-806a-68172f14b666'
          }
        ).then(() => {
          onSave();
        }
        ).catch((error) => {
          onError();
          console.log(error.data);
        })
    }
    setLoading(false);
  }
  //useEffect para mudar a imagem quando o produto escolhido for alterado
  useEffect(() => {
    produto ? setImagemProduto(produto.imagem) : setImagemProduto('https://firebasestorage.googleapis.com/v0/b/ta-na-mesa-89fec.appspot.com/o/produtos%2Fta-na-mesa-logomarca.png?alt=media&token=268b70c7-9aa5-4a17-806a-68172f14b666');
    produto ? setIdCategoriaEscolhida(produto.categoria.id) : setIdCategoriaEscolhida(null);
    setNomeCategoriaEscolhida(null);
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
                  preco: produto.valor,
                  estoque: produto.estoque,
                  categoria: produto.categoria,
                  descricao: produto.descricao
                }
                : {}
            }
            validationSchema={ProdutoSchema}
            onSubmit={(values, { setSubmitting }) => {
              if (isEditingProduto) {
                editarProduto(values);
              } else if (!isEditingProduto) {
                cadastrarProduto(values);
              }
              setSubmitting(false);
            }}>
            {({
              errors,
              values,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="corpoProduto1">
                  <div className="imagemProduto">
                    {imgPreview ? (
                      <img src={imgPreview} alt="imagem do produto" width="70%" />
                    ) : imagemProduto ? (
                      <img src={imagemProduto} alt="imagem do produto" width="70%" />
                    ) : (
                      <><CircularProgress /></>
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
                          onChange={(e) => setIdCategoriaEscolhida(e.target.value)}
                          onBlur={handleBlur}
                          value={idCategoriaEscolhida}>
                          <optgroup label="Selecione:">
                            {!isEditingProduto ?
                              (<>
                                {!idCategoriaEscolhida && <option>Selecione</option>}
                                {categorias.map((categoria) => {
                                  return (
                                    <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                                  )
                                })}</>) : (<>
                                  <option key={values.categoria.id} value={values.categoria.id}>{values.categoria.nome}</option>
                                  {categorias.map((categoria) => {
                                    if (categoria.id != values.categoria.id) {
                                      return (
                                        <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                                      )
                                    }
                                  })}
                                </>)}
                          </optgroup>
                        </select>
                      </div>
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
                  {values.nome && idCategoriaEscolhida && values.estoque && values.preco && values.descricao ?
                    (<>{!loading ? (<button className="botaoSalvarProduto" type="submit" disabled={isSubmitting}>
                      Salvar Alterações
                    </button>) : (<button className="botaoSalvarProduto" style={{ opacity: '0.4', cursor: 'wait' }}>Salvando...</button>)}</>) : (
                      <button className="botaoSalvarProduto" style={{ opacity: '0.4', cursor: 'not-allowed' }}>Salvar Alterações</button>
                    )
                  }
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
