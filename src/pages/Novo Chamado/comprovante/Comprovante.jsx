import styles from '../NovoChamado.module.css'

const Comprovante = ({dados}) => {
  return (
    <div className={styles.overlay}>
        <div className={styles.comprovante}>
            <div className={styles.secao}>
                <h1>Comprovante de envio</h1>
                <div className={styles.dadosComprovante}>
                    <h2>Solicitante</h2>
                    <p>{`Nome: ${dados.nome}`}</p>
                    <p>{`E-mail: ${dados.email}`}</p>
                    <p>{`Departamento: ${dados.departamento}`}</p>
                    <p>{`Local: ${dados.local}`}</p>
                    <p>{`Ramal: ${dados.ramal}`}</p>
                </div>

                <div className={styles.dadosComprovante}>
                    <h2>Solicitação</h2>
                    <p>{`Área: ${dados.area}`}</p>
                    <p>{`Serviço: ${dados.servico}`}</p>
                    <p>{`Assunto: ${dados.assunto}`}</p>
                    <p>{`Descrição: ${dados.descricao}`}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Comprovante