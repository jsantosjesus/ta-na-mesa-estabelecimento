/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Container } from './styles'
import { FaBars } from 'react-icons/fa'
import Sidebar from '../Sidebar'
import './header.css';
import logomarcaEmpresa from '../../assets/logomarca.png';

const Header = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSiderbar = () => setSidebar(!sidebar)

  const user = 'Jadson';

  return (
    <Container className="menubar">
        <div className='divHamburguer'>
      <FaBars className='hamburguer' onClick={showSiderbar} />
      {sidebar && <Sidebar active={setSidebar} />}
      </div>
      <div className="divLogo">
                    <img className='logoarcafooter' width='100px' src={logomarcaEmpresa} alt="Logo" />   
                </div>
                <div className="divUser">
                    <p>Olá {user}</p>
                </div>
    </Container>
  )
}

export default Header