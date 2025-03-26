import Botao from './Botao'
import { useNavigate } from 'react-router-dom';
import styles from './TelaInicial.module.css'

const TelaInicial = () => {

  const navigate = useNavigate();

  const FuncaoSolicitacoesAnteriores = () =>{
    navigate('/anteriores');
  }

  const FuncaoCriarSolicitacao = () => {
    navigate('/novaSolicitacao')
  }

  return (
    <div className={styles.container}>
      <div className={styles.botoes}>
        <Botao texto="Consultar solicitações anteriores" funcao={FuncaoSolicitacoesAnteriores}/>
        <Botao texto="Criar nova solicitação" funcao={FuncaoCriarSolicitacao}/>
      </div>
    </div>
  )
}

export default TelaInicial
