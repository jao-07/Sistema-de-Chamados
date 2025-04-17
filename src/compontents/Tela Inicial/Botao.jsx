import styles from '../../styles/Tela Inicial/Botao.module.css'

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