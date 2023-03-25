import logomarca from './ta-na-mesa-sem-fundo.png';
import './App.css';
import ConfirmarMesa from './ConfirmarMesa';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logomarca} className="App-logo" alt="logo" />
      </header>
      <div>
        <h3>Como quer ser chamado?</h3>
        <input type="text" name='nome' placeholder='Digite aqui' className='Seunome'></input>
      </div>
      <div>
        <h3>Por favor, comfirme sua mesa</h3>
        <ConfirmarMesa />
      </div>
    </div>
  );
}

export default App;
