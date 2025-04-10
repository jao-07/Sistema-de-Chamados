import React from 'react';
import styles from './FormInput.module.css'

const FormInput = ({label, nome, type='text', register, error=null, placeholder}) => {

  return (
    type == "textarea" ?
    <div className={styles.container}>
      <label> {label} </label> 
      <textarea
        {...register(nome)}
        placeholder={placeholder}
      />
      {error && <p className={styles.erro}>{error.message}</p>}
    </div>
    
    :
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