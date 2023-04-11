import { createContext, useEffect, useState } from "react";
import firebase from '../services/firebaseConnection';


export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        function loadStorage() {
            const storageUser = localStorage.getItem('EstabelecimentoUser');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();

    }, [])

    //função de fazer login
    async function signIn(email, password) {
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                const userProfile = await firebase.firestore().collection('users')
                    .doc(uid).get();

                let data = {
                    uid: uid,
                    cargo: userProfile.data().cargo,
                    nome: userProfile.data().nome,
                    tipo: userProfile.data().tipo,
                    email: value.user.email
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);

            })
            .catch((error) => {
                console.log(error);
                setLoadingAuth(false);
            })
    }

    function storageUser(data) {
        localStorage.setItem('EstabelecimentoUser', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            loading,
            signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider; 