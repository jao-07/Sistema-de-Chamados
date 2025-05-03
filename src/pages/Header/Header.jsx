import React from 'react';
import styles from "./Header.module.css"
import Botao from './Botao';
import { useNavigate } from "react-router";

const Header = () => {

  let navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/")
  }

  const handleClickLogout = () => {
    //window.location.href = "https://www.google.com";
  }

  return (
    <div className={styles.header}>
      Sistema de Solicitação de Serviços do ICB

      <Botao
        icone="FaHouse"
        size="20"
        handle={handleClickHome}
        posTop="100px"
        posLeft="40px"
        title="Menu Principal"
      />

      <Botao 
        icone="FaArrowRightFromBracket"
        size="20"
        handle={handleClickLogout}
        posTop="100px"
        posLeft="90px"
        title="Logout"
      />
    </div>
  )
}

export default Header;