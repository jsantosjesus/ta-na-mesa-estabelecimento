import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import firebase from 'firebase';
import taNaMesaLogomarca from '../../../assets/taNaMesaLogomarca.png';
import { CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Switch from '@mui/material/Switch';
import Variacoes from '../variacoes'

function ModalProduto({ produto, onClose, categorias, onSave, user, onError }) {
  const isEditingProduto = !!produto;
  const [imagemProduto, setImagemProduto] = useState();
  const [imgPreview, setImgPreview] = useState('');
  const [imagemUrl, setImagemUrl] = useState();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [decisaoExcluir, setDecisaoExcluir] = useState(false);
  const [emEstoque, setEmEstoque] = useState(true);
  const [atribuicoes, setAtribuicoes] = useState(true);
  const [variacoesProduto, setVariacoesProduto] = useState();

  //validando dados antes de enviar
  const ProdutoSchema = Yup.object().shape({
    nome: Yup.string()
      .min(5, 'Muito pequeno!')
      .max(100, 'Muito grande!')
      .required('Campo obrigatorio'),
    preco: Yup.number().min(0, 'O preco não pode ser menor que zero').required('Defina um preço!')
  });

  // const submitVariacoes = (values) => {
  //   setVari(values);
  //   console.log(values)
  // }

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
      // excluindo imagem antiga
      if (produto.imagem) {
        const startIndex = produto.imagem.indexOf("/o/") + 3; // Encontrando o índice do primeiro caractere após "/o/"
        const endIndex = produto.imagem.indexOf("?"); // Encontrando o índice do caractere "?" que marca o final do caminho do arquivo
        const caminho = produto.imagem.substring(startIndex, endIndex);
        const caminhoDoArquivo = caminho.replace(/%2F/g, '/').replace(/%20/g, ' ');
        const storageRef = firebase.storage().ref();
        const arquivoRef = storageRef.child(caminhoDoArquivo);

        arquivoRef.delete()
          .then(async () => {
            console.log("Arquivo excluído com sucesso!");
          })
          .catch((error) => {
            console.error("Erro ao excluir o arquivo:", error);
            onError();
          });
      }
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const nomeImagem = values.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      const uploadTask = storageRef.child(`estabelecimentos/${user.estabelecimentoId}/produtos/${nomeImagem}`).put(file);

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
                  preco: values.preco,
                  em_estoque: emEstoque,
                  categoria_id: values.categoria,
                  imagem: downloadURL,
                  ...(values.descricao && { descricao: values.descricao }),
                  ...(variacoesProduto && variacoesProduto.length > 0 && { variacoes: variacoesProduto })
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
            preco: values.preco,
            em_estoque: emEstoque,
            categoria_id: values.categoria,
            ...(values.descricao && { descricao: values.descricao }),
            ...(variacoesProduto && variacoesProduto.length > 0 && { variacoes: variacoesProduto })
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
      const nomeImagem = values.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      const uploadTask = storageRef.child(`estabelecimentos/${user.estabelecimentoId}/produtos/${nomeImagem}`).put(file);

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
            console.log(nomeImagem)
            await firebase
              .firestore()
              .collection('produto')
              .add(
                {
                  nome: values.nome,
                  preco: values.preco,
                  em_estoque: emEstoque,
                  categoria_id: values.categoria,
                  estabelecimento_id: user.estabelecimentoId,
                  imagem: downloadURL,
                  ...(values.descricao && { descricao: values.descricao }),
                  ...(variacoesProduto && variacoesProduto.length > 0 && { variacoes: variacoesProduto })
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
            preco: values.preco,
            em_estoque: emEstoque,
            categoria_id: values.categoria,
            estabelecimento_id: user.estabelecimentoId,
            ...(values.descricao && { descricao: values.descricao }),
            ...(variacoesProduto && variacoesProduto.length > 0 && { variacoes: variacoesProduto })
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
    produto && produto.imagem ? setImagemProduto(produto.imagem) : setImagemProduto(taNaMesaLogomarca);
    produto ? setEmEstoque(produto.em_estoque) : setEmEstoque(true);
    produto && produto.variacoes && setVariacoesProduto(produto.variacoes)
  }, [produto]);

  const excluirProduto = async () => {
    if (produto.imagem) {
      const startIndex = produto.imagem.indexOf("/o/") + 3; // Encontrando o índice do primeiro caractere após "/o/"
      const endIndex = produto.imagem.indexOf("?"); // Encontrando o índice do caractere "?" que marca o final do caminho do arquivo
      const caminho = produto.imagem.substring(startIndex, endIndex);
      const caminhoDoArquivo = caminho.replace(/%2F/g, '/').replace(/%20/g, ' ');
      const storageRef = firebase.storage().ref();
      const arquivoRef = storageRef.child(caminhoDoArquivo);

      arquivoRef.delete()
        .then(async () => {
          console.log("Arquivo excluído com sucesso!");
          await firebase
            .firestore()
            .collection('produto')
            .doc(produto.id)
            .delete()
            .then(() => {
              onSave('Excluido com sucesso');
              setLoading(false);
              setDecisaoExcluir(false);
            }
            ).catch((error) => {
              onError();
              setLoading(false);
              console.log(error);
            })
        })
        .catch((error) => {
          console.error("Erro ao excluir o arquivo:", error);
          onError();
        });
    } else {
      await firebase
        .firestore()
        .collection('produto')
        .doc(produto.id)
        .delete()
        .then(() => {
          onSave('Excluido com sucesso');
          setLoading(false);
          setDecisaoExcluir(false);
        }
        ).catch((error) => {
          onError();
          setLoading(false);
          console.log(error);
        })
    }
  };

  return (
    <div className="poupupproduto" style={{ minHeight: '100vh' }}>
      {isEditingProduto && (<div className='excluir'>
        <button className='botaoExcluir' onClick={() => setDecisaoExcluir(true)}><FontAwesomeIcon icon={faTrash} /></button>
        {decisaoExcluir && (<><p>Excluir produto?</p>
          <p className='excluirDecisao' onClick={excluirProduto}>Sim</p><p className='excluirDecisao' onClick={() => setDecisaoExcluir(false)}>Não</p></>)}
      </div>)}
      <div className="titleproduto">
        <h3>{isEditingProduto ? 'Editar' : 'Criar'} produto</h3>
        <button onClick={onClose}>X</button>
        <hr />
      </div>
      <div className='atribuicoesVariacoes'>
        {atribuicoes ? <p className='selected'>Atribuições</p> : <p onClick={() => setAtribuicoes(true)}>Atribuições</p>}
        {!atribuicoes ? <p className='selected'>Variações</p> : <p onClick={() => setAtribuicoes(false)}>Variações</p>}
      </div>
      <hr />
      <div className="corpoProduto">
        {atribuicoes ? (<Formik
          initialValues={
            isEditingProduto
              ? {
                nome: produto.nome,
                preco: produto.preco,
                categoria: produto.categoria_id,
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
                    <CircularProgress />
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
                      {/* <input
                        type="number"
                        name="estoque"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.estoque}
                      />
                      {errors.estoque && touched.estoque ? (
                        <div className="errorInput">{errors.estoque}</div>
                      ) : null} */}
                      <Switch
                        checked={emEstoque}
                        onChange={((e) => setEmEstoque(e.target.checked))}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </div>
                  </div>
                  <div className="categoriaEDescricao">
                    <div>
                      <p>Categoria</p>
                      <select
                        name="categoria"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.categoria}>
                        <optgroup label="Selecione:">
                          {!isEditingProduto ?
                            (<>
                              {!values.categoria && <option>Selecione</option>}
                              {categorias.map((categoria) => {
                                return (
                                  <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                                )
                              })}</>) : (<>
                                {categorias.map((categoria) => {
                                  if (categoria.id == values.categoria) {
                                    return (
                                      <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                                    )
                                  }
                                  if (categoria.id !== values.categoria) {
                                    return (
                                      <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                                    )
                                  }
                                })}
                              </>)}
                        </optgroup>
                      </select>
                    </div>
                    <div className='descricao'>
                      <p>Descrição</p>
                      <textarea
                        type="text"
                        name="descricao"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.descricao}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="salvar">
                {!errors.nome && values.categoria && !errors.preco ?
                  (<>{!loading ? (<button className="botaoSalvarProduto" type="submit" disabled={isSubmitting}>
                    Salvar Alterações
                  </button>) : (<button className="botaoSalvarProduto" style={{ opacity: '0.4', cursor: 'wait' }}>Salvando...</button>)}</>) : (
                    <button className="botaoSalvarProduto" style={{ opacity: '0.4', cursor: 'not-allowed' }}>Salvar Alterações</button>
                  )
                }
              </div>
            </form>
          )}
        </Formik>) : (<>{variacoesProduto ? <Variacoes variacoes={variacoesProduto} handleSubmit={(vari) => setVariacoesProduto(vari)} /> : <Variacoes handleSubmit={(vari) => setVariacoesProduto(vari)} />}</>)}
      </div>
    </div>
  );
}
export { ModalProduto };
