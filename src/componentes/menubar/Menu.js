import { useState } from 'react';
import HamburguerIcon from './HamburguerIcon';
import './Menu.css';




function Menu(props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={props.className}>
      <HamburguerIcon className="hamburguer-icon" onClick={toggleMenu} />
      {isOpen && (
        <ul className="menu-list">
          <li><a href="#">Cozinha</a></li>
          <li><a href="#">Produtos</a></li>
          <li><a href="#">Mesas</a></li>
          <li><a href="#">Colaboradores</a></li>
        </ul>
      )}
    
    </div>
  );
}

export default Menu;