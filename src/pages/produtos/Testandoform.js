import { useState } from "react";

function Formulario() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [pessoas, setPessoas] = useState([
    { nome: "João", idade: 20 },
    { nome: "Maria", idade: 30 },
  ]);

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleIdadeChange = (event) => {
    setIdade(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const novaPessoa = { nome, idade };
    setPessoas([...pessoas, novaPessoa]);
    setNome("");
    setIdade("");
  };

  const handleFinalizar = (index) => {
    const novaArray = [...pessoas];
    novaArray[index] = { nome, idade };
    setPessoas(novaArray);
    setNome("");
    setIdade("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={handleNomeChange} />
        </label>
        <label>
          Idade:
          <input type="number" value={idade} onChange={handleIdadeChange} />
        </label>
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {pessoas.map((pessoa, index) => (
          <li key={index}>
            <span>{pessoa.nome}</span>
            <span>{pessoa.idade}</span>
            <button onClick={() => handleFinalizar(index)}>Finalizar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Formulario;
