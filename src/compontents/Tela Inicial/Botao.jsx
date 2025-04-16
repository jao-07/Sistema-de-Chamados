import React from 'react';
import styles from './Botao.module.css'

const Botao = ({texto, funcao}) => {

  return (
    <div className={styles.container}>
        <div className={styles.botao} onClick={() => funcao()}>
            {texto}
        </div>
    </div>
  );
};

export default Botao;