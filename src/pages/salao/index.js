import React, { useEffect, useState, useContext } from 'react';
import './salao.css';
import Header from '../../componentes/Header';
import { AuthContext } from '../../contexts/auth';
import firebase from 'firebase';
import MesaModal from '../../componentes/mesasSalao';

function Salao() {
  // puxando atributos das mesas
  const { user } = useContext(AuthContext);

  const [mesas, setMesas] = useState([]);

  useEffect(() => {

    // Define a função de escuta
    const getMesasFirebase = firebase.firestore()
      .collection('mesa')
      .where('estabelecimento_id', '==', user.estabelecimentoId)
      .onSnapshot(snapshot => {
        const newData = [];
        snapshot.forEach(doc => {

          newData.push({ id: doc.id, ...doc.data() });

          setMesas(newData);
        });
      })

    // Retorna a função de limpeza para interromper a escuta quando o componente for desmontado
    return () => getMesasFirebase();
  }, []);

  //  useState para funções de abrir e fechar poupup da mesa

  const [mesaAtiva, setMesaAtiva] = useState(null);

  const handleClick = (mesa) => {
    setMesaAtiva(mesa);
  };

  const handleClose = () => {
    setMesaAtiva(null);
  };

  // renderizando array de mesas

  return (
    <div>
      <Header />
      <div className="bodyMesas">
        <div className="mesas">
          {mesas.map((mesa) => (
            <div key={mesa.id}>
              <div id={mesa.status} className="mesa" onClick={() => handleClick(mesa)} key={mesa.id}>
                <h1>
                  <b>Mesa {mesa.numero}</b>
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      {mesaAtiva && <MesaModal mesa={mesaAtiva} close={handleClose} />}
    </div>
  );
}

export default Salao;
