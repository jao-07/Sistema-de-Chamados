import styles from '../NovoChamado.module.css'
import FormInput from '../../../compontents/Novo Chamado/FormInput'

const DescricaoDoProblema = ({register, errors}) => {
  return (
    <div className={styles.secao}>
        <h2>Descrição do problema</h2>
        <FormInput
            label="Assunto do chamado"
            nome="assunto"
            placeholder="Digite o assunto do chamado"
            register={register}
            error={errors.assunto}
        />

        <FormInput
            label="Descrição do problema"
            nome="descricao"
            type='textarea'
            placeholder="Digite a descrição do problema"
            register={register}
            error={errors.descricao}
        />

        <label>Escolha a urgência do problema</label>
        <select {...register("urgencia")}>
            <option value={1}>Normal</option>
            <option value={2}>Urgente (Ônus reversível)</option>
            <option value={3}>Emergência (Ônus irreversível)</option>
        </select>
    </div>
  )
}

export default DescricaoDoProblema