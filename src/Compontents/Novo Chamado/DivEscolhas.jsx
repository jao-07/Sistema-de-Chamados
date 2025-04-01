import React from 'react';
import styles from './DivEscolhas.module.css'
import DynamicIcon from '../Helpers/DynamicIcon';

const DivEscolhas = ({vetor, size, onEscolha, idSelecionado}) => {

    return (
        <div className={styles.container}>
            {
                vetor.map((item) => {
                    return(
                        <div key={item.id} className={idSelecionado == item.id ? styles.iconSelected : styles.iconUnselected} onClick={() => onEscolha(item.id)}>
                            <DynamicIcon name={item.icone} size={size} />
                            <p>{item.titulo}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DivEscolhas;