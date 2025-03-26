import React from 'react';
import styles from './FormInput.module.css'

const FormInput = ({label, nome, type="text", register, error, placeholder}) => {
  return (
    <div className={styles.container}>
        <label> {label} </label>
        <input
            {...register(nome)}
            type={type}
            placeholder={placeholder}
        />
        {error && <p className={styles.erro}>{error.message}</p>}
    </div>
  )
}

export default FormInput;