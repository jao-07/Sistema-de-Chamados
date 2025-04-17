import styles from '../../styles/Novo Chamado/PopUpErro.module.css'

const PopUpErro = ({error, functionClose}) => {

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <p>{error}</p>
                <button onClick={() => functionClose(null)}>Fechar</button>
            </div>
        </div>
    )
}

export default PopUpErro;