import React from 'react';
import styles from './SelectDefault.module.css'

const SelectDefault = ({vetor, titulo, register, nome, error, placeholder, selectedValue}) => {
  return (
    <div className={styles.container}>
        <label>{titulo}</label>
        <select {...register(nome)}>
            {!selectedValue && <option value="" hidden>{placeholder}</option>}
            {
                vetor.map((item) => ( 
                    <option key={item.id} value={item.id}>{item.nome}</option> 
                ))
            }  
        </select>
        {error && <p className={styles.erro}>{error.message}</p>}
    </div>
  )
}

export default SelectDefault;