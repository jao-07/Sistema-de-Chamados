import React, { useState } from 'react'
import Botao from './Botao'
import { useNavigate } from 'react-router-dom';
import styles from './TelaInicial.module.css'

const TelaInicial = () => {

  const navigate = useNavigate();

  const [botaoAproveitarChamado, setBotaoAproveitarChamado] = useState(false)
  const [numeroChamadoAnterior, setNumeroChamadoAnterior] = useState(0)

  const FuncaoSolicitacoesAnteriores = () =>{
    navigate('/anteriores');
  }

  const FuncaoCriarSolicitacao = () => {
    navigate('/novaSolicitacao')
  }

  const FuncaoAproveitarChamado = () => {
    setBotaoAproveitarChamado(!botaoAproveitarChamado)
    setNumeroChamadoAnterior()
  }

  return (
    <div className={styles.container}>
      <div className={styles.botoes}>
        <Botao texto="Consultar solicitações anteriores" funcao={FuncaoSolicitacoesAnteriores}/>
        <Botao texto="Criar nova solicitação" funcao={FuncaoCriarSolicitacao}/>
        <Botao texto="Aproveitar dados de um chamado anterior" funcao={FuncaoAproveitarChamado}/>
        {botaoAproveitarChamado && 
        <div className={styles.divInput}>
          <input 
            type="number" 
            placeholder='Digite o número do chamado'
            onChange={e => setNumeroChamadoAnterior(e.target.value)}
            value={numeroChamadoAnterior}
          />
          <div className={styles.botaoCriar}>
            Criar Chamado
          </div>
        </div> }
      </div>
    </div>
  )
}

export default TelaInicial
