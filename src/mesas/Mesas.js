import React, { useState } from "react";
import "./mesas.css";

function Mesas() {
  const [myState, setMyState] = useState([{ id: 1, name: "mesa 1" }, { id: 2, name: "Mesa 2" }, { id: 3, name: "Mesa 2" }, { id: 4, name: "Mesa 2" }, { id: 5, name: "Mesa 2" }, { id: 6, name: "Mesa 2" }]);

  // Exemplo de adição de um objeto no array
//   const addObjectToArray = () => {
//     const newObject = { id: 1, name: "objeto 1" };
//     setMyState([...myState, newObject]);
//   };

//   // Exemplo de remoção de um objeto do array
//   const removeObjectFromArray = () => {
//     const newArray = myState.filter((object) => object.id !== 1);
//     setMyState(newArray);
//   };

  return (
    <div className="mesas">
      {myState.map((object) => (
        <div className="mesa" key={object.id}>
          <h1>{object.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default Mesas;
