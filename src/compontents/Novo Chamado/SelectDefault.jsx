import styles from '../../styles/Novo Chamado/SelectDefault.module.css'

const SelectDefault = ({vetor, titulo, register, nome, error, placeholder, selectedValue}) => {
  return (
    <div className={styles.container}>
        <label>{titulo}</label>
        <select {...register(nome)}>
            {!selectedValue && <option value="" hidden>{placeholder}</option>}
            {
                vetor.map((item, index) => ( 
                    <option key={index} value={item}>{item}</option>
                ))
            }  
        </select>
        {error && <p className={styles.erro}>{error.message}</p>}
    </div>
  )
}

export default SelectDefault;