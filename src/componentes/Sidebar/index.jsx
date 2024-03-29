import React from 'react'
import { Container, Content } from './styles';
import {
  FaTimes,
} from 'react-icons/fa';
import { BsFillPersonFill, BsFillTagsFill, BsGrid1X2Fill, BsReceiptCutoff, BsGearFill, BsFillFolderFill, BsColumnsGap } from "react-icons/bs";


import { Link } from 'react-router-dom';

import SidebarItem from '../SidebarItem'

const Sidebar = ({ active, user }) => {

  const closeSidebar = () => {
    active(false)
  }


  return (
    <div className='modalTransparent' style={{zIndex: '2000'}}>
      <Container sidebar={active} >
        <FaTimes onClick={closeSidebar} />
        <Content>
          <Link to="/cozinha"><SidebarItem Icon={BsReceiptCutoff} Text="Cozinha" /></Link>
          <Link to="/salao"><SidebarItem Icon={BsGrid1X2Fill} Text="Salão" /></Link>
          <Link to="/mesas"><SidebarItem Icon={BsColumnsGap} Text="Mesas" /></Link>
          {user.adm && <Link to="/colaboradores"><SidebarItem Icon={BsFillPersonFill} Text="Colaboradores" /></Link>}
          <Link to="/produtos"><SidebarItem Icon={BsFillTagsFill} Text="Produtos" /></Link>
          <Link to="/categorias"><SidebarItem Icon={BsFillFolderFill} Text="Categorias" /></Link>
          {user.adm && <Link to="/configuracoes"><SidebarItem Icon={BsGearFill} Text="Configurações" /></Link>}
        </Content>
      </Container>
    </div>
  )
}

export default Sidebar