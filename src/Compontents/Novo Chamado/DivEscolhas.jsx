import React from 'react';
import styles from './DivEscolhas.module.css'
import DynamicIcon from '../Helpers/DynamicIcon';

const DivEscolhas = ({vetor, size, nome, error, setValue, clearErrors, selectedValue}) => {

    const handleClickDivEscolhas = (nome, value) => {
        setValue(nome, value)
        clearErrors(nome)
      }

    return (
        <div className={styles.container}>
            <div className={styles.chooses}>
                {
                    vetor.map((item) => {
                        return(
                            <div key={item.id} className={selectedValue == item.id ? styles.iconSelected : styles.iconUnselected} onClick={() => handleClickDivEscolhas(nome, item.id)}>
                                <DynamicIcon name={item.icone} size={size} />
                                <p>{item.titulo}</p>
                            </div>
                        )
                    })
                }
            </div>
            {error && <p className={styles.erro}>{error.message}</p>}
        </div>
    )
}

export default DivEscolhas;