// import React, { useEffect, useState, useContext } from 'react';
// import Header from '../../componentes/Header';
// import { toast } from 'react-toastify';
// import { ModalMesa } from '../../componentes/mesa';
// import firebase from 'firebase';
// import { AuthContext } from '../../contexts/auth';
// function Mesas() {
//   const { user } = useContext(AuthContext);
//   const [mesas, setMesas] = useState();
//   const [loading, setLoading] = useState(true);

//   const getMesasFirebase = async () => {
//     await firebase
//         .firestore()
//         .collection('mesa')
//         .where('estabelecimento_id', '==', user.estabelecimentoId)
//         .get()
//         .then((result) => {
//           setMesas(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error('Erro ao obter documento: ', error);
//         });
//   };

//   useEffect(() => {
//     getMesasFirebase();
//     console.log('teste')
//   }, []);


//   const [isCreatingMesa, setIsCreatingMesa] = useState(false);

//   const handleOpenNewMesa = () => setIsCreatingMesa(true);
//   const handleCloseNewMesa = () => setIsCreatingMesa(false);

//   //abrrindo colaborador existente para editar
//   const [mesaAtiva, setMesaAtiva] = useState(null);

//   const handleOpenMesa = (mesa) => {
//     setMesaAtiva(mesa);
//     // isCreatingColaborador && setselectValueCargo(colaborador.tipo);
//   };

//   const handleCloseMesaModal = () => {
//     setMesaAtiva(null);
//     setIsCreatingMesa(false);
//   };
//   //salvando alterações
//   function salvar() {
//     toast.success('Salvo com sucesso');
//     setMesaAtiva(null);
//     getMesasFirebase();
//   }

//   function erro() {
//     toast.error('Desculpe, algo deu errado');
//   }
//   // renderizando array de mesas
//   return (
//     <div>
//       <Header />
//       <div className="bodyProdutos">
//         <div className="subHeader">
//           <div className="botaoProduto">
//             <button onClick={handleOpenNewMesa}>Adicionar Mesa</button>
//           </div>
//           <div className="botaoProdutoResponsive">
//             <button onClick={handleOpenNewMesa}>Adicionar Mesa</button>
//           </div>
//         </div>
//         <div className="produtos">
//           <div className="cabecalho">
//             <p>
//               <b>Numero</b>
//             </p>
//             <p>
//               <b>Status</b>
//             </p>
//             <p>
//               <b>Colaborador</b>
//             </p>
//           </div>
//           <div className="tabelaProdutos">
//             {mesas.map((mesa) => (
//               <div key={mesa.id}>
//                 <div className="produto" onClick={() => handleOpenMesa(mesa)}>
//                   <p>Mesa {mesa.numero}</p>
//                   <p>{mesa.status}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       {mesaAtiva !== null && (
//         <ModalMesa
//           mesa={mesaAtiva}
//           onClose={handleCloseMesaModal}
//           onSave={salvar}
//           erro={erro}
//         />
//       )}
//       {isCreatingMesa && (
//         <ModalMesa
//           mesa={null}
//           onClose={handleCloseNewMesa}
//           onSave={salvar}
//           erro={erro}
//         />
//       )}
//     </div>
//   );
// }

// export default Mesas;
