import firebase from "firebase";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../contexts/auth';

function PaginaTeste() {
    const [dados, setDados] = useState([]);
    const { user } = useContext(AuthContext);
    const usuarioId = user.uid;
    let dadosFormatados;
    useEffect(() => {
        firebase.firestore().collection('estabelecimento').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // 'doc' é um objeto do tipo QueryDocumentSnapshot
                    // Você pode acessar os atributos do documento usando a função .data()
                    const dadosDoUsuario = doc.data();

                    // Agora você pode acessar os atributos específicos do documento
                    const nome = dadosDoUsuario.nome;
                    const estabelecimentoId = dadosDoUsuario.estabelecimento_id;

                    console.log(`Nome: ${nome}, estabelecimentoID: ${estabelecimentoId}`);
                });
            })
            .catch((error) => {
                console.error('Erro ao obter documentos: ', error);
            });
    }, []);


    return (
        <div>
            <h1>Pagina teste</h1>

            <div>
                <h2>Dados da Coleção:</h2>
                <ul>
                    {dados.map(item => (
                        <li key={item.id}>{item.id}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PaginaTeste;