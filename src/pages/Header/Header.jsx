import React from 'react';
import styles from "./Header.module.css"
import Botao from './Botao';
import { useNavigate, useLocation } from "react-router";

const Header = () => {

  let navigate = useNavigate();
  const location = useLocation();

  const handleClickHome = () => {
    navigate("/")
  }

  const handleClickLogout = () => {
    //window.location.href = "https://www.google.com";
  }

  const handleClickReturn = () => {
    if(location.pathname != "/")
      navigate(-1)
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

      <Botao 
        icone="FaArrowRotateLeft"
        size="20"
        handle={handleClickReturn}
        posTop="100px"
        posLeft="140px"
        title="Logout"
      />
    </div>
  )
}

export default Header;