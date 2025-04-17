import styles from '../NovoChamado.module.css'
import FormInput from '../../../compontents/Novo Chamado/FormInput';

const InformacoesDoUsuario = ({register, errors}) => {
  return (
    <div className={styles.secao}>
        <h2>Informações do usuário</h2>
        <div className={styles.inputsSecao}>

            <div className={styles.coluna}>
            <FormInput
                label="Solicitante"
                nome="solicitante"
                placeholder="Digite seu nome"
                register={register}
                error={errors.solicitante}
            />

            </div>

            <div className={styles.coluna}>
            <FormInput
                label="Email Institucional"
                nome="emailInstitucional"
                placeholder="Digite seu email"
                register={register}
                error={errors.emailInstitucional}
            />
            </div>

        </div>
    </div>
  )
}

export default InformacoesDoUsuario;