import React from 'react';
import styles from './FormInput.module.css'

const FormInput = ({label, nome, type='text', register, error=null, onChange, ...rest}) => {

  const handleChange = (event) => {
    // Se houver a função onChange, chama ela
    if (onChange) {
      onChange(event, nome);
    }
  };

  return (
    type == "textarea" ?
    <div className={styles.container}>
      <label> {label} </label> 
      <textarea
        {...register(nome)}
        onChange={handleChange}
        {...rest}
      />
      <p className={styles.erro} style={{ visibility: error ? 'visible' : 'hidden' }}>{error?.message || "placeholder"}</p>
    </div>
    
    :
    <div className={styles.container}>
        <label> {label} </label>
        <input
            {...register(nome)}
            type={type}
            onChange={handleChange}
            {...rest}
        />
        <p className={styles.erro} style={{ visibility: error ? 'visible' : 'hidden' }}>{error?.message || "placeholder"}</p>
    </div>
  )
}

export default FormInput;