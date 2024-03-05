import React, { useContext, useState } from 'react'
import { Container } from './styles'
import { FaBars } from 'react-icons/fa'
import Sidebar from '../Sidebar'
import './header.css';
import logomarcaEmpresa from '../../assets/logomarca.png';
import { AuthContext } from '../../contexts/auth';

const Header = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSiderbar = () => setSidebar(!sidebar);

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  }

  return (
    <Container className="menubar">
        <div className='divHamburguer'>
      <FaBars className='hamburguer' onClick={showSiderbar} />
      {sidebar && <Sidebar active={setSidebar} user={user} />}
      </div>
      <div className="divLogo">
                    <img className='logoarcafooter' width='100px' src={logomarcaEmpresa} alt="Logo" />   
                </div>
                <div className="divUser">
                    <p>Olá {user.nome}</p><p onClick={handleLogout} className='logout'>Sair</p>
                </div>
    </Container>
  )
}

export default Header