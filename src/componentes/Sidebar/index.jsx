import React from 'react'
import { Container, Content } from './styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";
import { 
  FaTimes, 
  FaHome, 
  FaEnvelope, 
  FaRegSun, 
  FaUserAlt, 
  FaIdCardAlt, 
  FaRegFileAlt,
  FaRegCalendarAlt,
  FaChartBar
} from 'react-icons/fa'

import SidebarItem from '../SidebarItem'

const Sidebar = ({ active }) => {

  const closeSidebar = () => {
    active(false)
  }


  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />  
      <Content>
        <SidebarItem Icon={FaHome} Text="Cozinha" />
        <SidebarItem Icon={FaChartBar} Text="Mesas" />
        <SidebarItem Icon={FaUserAlt} Text="Colaboradores" />
        <SidebarItem Icon={FaEnvelope} Text="Produtos" />
        {/* <SidebarItem Icon={FaRegCalendarAlt} Text="Calendar" />
        <SidebarItem Icon={FaIdCardAlt} Text="Employees" />
        <SidebarItem Icon={FaRegFileAlt} Text="Reports" />
        <SidebarItem Icon={FaRegSun} Text="Settings" /> */}
      </Content>
    </Container>
  )
}

export default Sidebar