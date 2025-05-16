import styles from '../NovoChamado.module.css'

const Comprovante = ({dados}) => {
  return (
    <div className={styles.overlay} style={{borderRadius: 0}}>
        <div className={styles.comprovante}>
            <div className={styles.secao}>
                <h1>Comprovante de envio</h1>
                <div className={styles.dadosComprovante}>
                    <h2>Solicitante</h2>
                    <p><strong>Nome: </strong>{dados.nome}</p>
                    <p><strong>E-mail: </strong>{dados.email}</p>
                    <p><strong>Departamento: </strong>{dados.departamento}</p>
                    <p><strong>Local: </strong>{dados.local}</p>
                    <p><strong>Ramal: </strong>{dados.ramal}</p>
                </div>

                <div className={styles.dadosComprovante}>
                    <h2>Solicitação</h2>
                    <p><strong>Ticket: </strong>{dados.ticket}</p>
                    <p><strong>Área: </strong>{dados.area}</p>
                    <p><strong>Serviço: </strong>{dados.servico}</p>
                    <p><strong>Assunto: </strong>{dados.assunto}</p>
                    <p><strong>Descrição: </strong>{dados.descricao}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Comprovante