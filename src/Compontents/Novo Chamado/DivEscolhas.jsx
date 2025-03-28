import React from 'react';
import styles from './DivEscolhas.module.css'
import DynamicIcon from '../Helpers/DynamicIcon';

const DivEscolhas = ({vetor, size, onEscolha}) => {

    return (
        <div className={styles.container}>
            {
                vetor.map((item) => {
                    return(
                        <div key={item.id}> 
                            <div className={styles.icons}>
                                <DynamicIcon name={item.icone} size={size} onClick={() => onEscolha(item.id)}/>
                                <p>{item.titulo}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DivEscolhas;