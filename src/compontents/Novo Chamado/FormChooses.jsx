import styles from '../../styles/Novo Chamado/FormChooses.module.css'
import DynamicIcon from '../Helpers/DynamicIcon';

const FormChooses = ({vetor, size, nome, error, setValue, clearErrors, selectedValue}) => {

    const handleClickFormChooses = (nome, value) => {
        setValue(nome, value)
        clearErrors(nome)
        //caso seja a parte de selecionar a área de serviço, limpa o select e as observações de serviço
        if(nome == "areaServico")
            setValue("servico", "")
    }

    return (
        <div className={styles.container} name={nome}>
            <div className={styles.chooses}>
                {
                    Array.isArray(vetor) && vetor.map((item, index) => {
                        return(
                            <div key={index} className={selectedValue == item.titulo ? styles.iconSelected : styles.iconUnselected} onClick={() => handleClickFormChooses(nome, item.titulo)}>
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

export default FormChooses;