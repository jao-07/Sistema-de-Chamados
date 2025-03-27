import React from 'react';
import styles from './PopUpErro.module.css'

const PopUpErro = ({error, functionClose}) => {

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <p>{error}</p>
                <button onClick={functionClose}>Fechar</button>
            </div>
        </div>
    )
}

export default PopUpErro;