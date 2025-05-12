import styles from '../../styles/Novo Chamado/SelectServico.module.css'

const SelectServico = ({vetorServicos, vetorCategorias, titulo, register, nome, error, placeholder, selectedValue, setValue}) => {

    return (
        <div>
            <label>{titulo}</label>
            <select key={selectedValue} {...register(nome)}>
            {!selectedValue && <option value="" hidden>{placeholder}</option>}
                {
                    vetorCategorias.map((itemCategoria) => (
                        <optgroup label={`${itemCategoria.categoria} - ${itemCategoria.descricao}`} key={itemCategoria.categoria}>
                            {
                                vetorServicos.map((itemServico) => (
                                    itemCategoria.categoria == itemServico.categoria  && 
                                    <option key={itemServico.id} value={itemServico.nome}>{itemServico.nome}</option> 
                                ))
                            }       
                        </optgroup>
                    ))
                }
            </select>
            {error && <p className={styles.erro}>{error.message}</p>}
            {selectedValue && 
                <div className={styles.observacoes}>
                    <label><strong>Observações:</strong></label>
                    <div dangerouslySetInnerHTML={{ __html: vetorServicos.find(item => item.nome == selectedValue)?.descricao}} />

                </div>
            }
        </div>
    )
}

export default SelectServico;