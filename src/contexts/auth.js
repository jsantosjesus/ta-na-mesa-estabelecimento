import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase';

export const AuthContext = createContext();

export const AuthProvicer = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  let usuarioFirestore = {};

  const getUserFirebastore = async (uid) => {
    await firebase.firestore().collection('usuario').where(firebase.firestore.FieldPath.documentId(), '==', uid).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const dadosDoUsuario = doc.data();

          usuarioFirestore = {
            id: uid,
            nome: dadosDoUsuario.nome,
            estabelecimentoId: dadosDoUsuario.estabelecimento_id,
            tipo: dadosDoUsuario.tipo
          };
        });

        // console.log(usuarioFirestore);
      })
      .catch((error) => {
        console.error('Erro ao obter documento: ', error);
      });
  }

  useEffect(() => {
    const recoveredUser = localStorage.getItem('usuarioLogado');

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = async (usuario) => {
    // console.log(usuario.uid);
    await getUserFirebastore(usuario);
    // console.log('login', { email, password, usuario });
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioFirestore));
    setUser(usuarioFirestore);
    // console.log(user);
    navigate('/');
  };

  const logout = () => {
    console.log('logout');
    localStorage.removeItem('usuarioLogado');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
