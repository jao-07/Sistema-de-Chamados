import { useEffect, useState } from "react"
import styles from "./ChamadosAnteriores.module.css"
import { useNavigate } from "react-router";
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";

import Loading from "../../compontents/Novo Chamado/Loading";

export default function ChamadosAnteriores() {
  const [solicitacoes, setSolicitacoes] = useState([])
  const [erro, setErro] = useState(null)
  const [pagina, SetPagina] = useState(1)
  const [temMais, SetTemMais] = useState(true)
  const [loading, SetLoading] = useState(false)
  const limite = 10

  let navigate = useNavigate();

  const usuario = "joaovecruz"

  useEffect(() => {
    carregarSolicitacoes()
  }, []);

  const carregarSolicitacoes =  async () => {
    try {
      SetLoading(true)
      const resposta = await axios.get(`https://sistemas.icb.ufmg.br/wifi/api/chamado/chamadosAnteriores`,{
        params:{
          usuario,
          limite,
          pagina,
        }
      });
      console.log(resposta.data)
      if(pagina == 1)
        setSolicitacoes(resposta.data)
      else
        setSolicitacoes((prev) => [...prev, ...resposta.data])
      if(resposta.data.length < limite)
        SetTemMais(false)
      else
        SetPagina((p) => p + 1)
    } catch (e) {
      setErro(e.message);
    }
    finally{
      SetLoading(false)
    }
  }

  if (erro) return <p style={{ color: "red" }}>Erro: {erro}</p>;

  return (  

    <div className={styles.container}>

      {loading && pagina == 1 &&(
        <Loading />
      )}

      <h2 className={styles.title}>Histórico de Solicitações</h2>
      {solicitacoes.length == 0 && <h2>Você não possui nenhuma solicitação.</h2>}
      <ul className={styles.list}>
        <InfiniteScroll
          dataLength={solicitacoes.length}
          next={carregarSolicitacoes}
          hasMore={temMais}
          >
          {solicitacoes.map((sol) => (
            <li key={sol.ticket} className={styles.solicitacao}>
              <div className={styles.contents}>
                <p><strong>Ticket:</strong> #{sol.ticket}</p>
                <p><strong>Responsável:</strong> {sol.responsavel}</p>
                <p><strong>Área:</strong> {sol.area}</p>
                <p><strong>Serviço:</strong> {sol.servico}</p>
                <p><strong>Status:</strong> {sol.status}</p>
                <p><strong>Solicitado em:</strong> {new Date(sol.dataSolicitacao).toLocaleDateString()}</p>
                {sol.dataEncerramento && <p><strong>Última modificação em:</strong> {new Date(sol.ultimaModificacao).toLocaleDateString()}</p>}
              </div>
              <div className={styles.botao}>
                <button onClick={() => navigate(`/solicitacoesAnteriores/${sol.ticket}`, { state: { autorizado: true } })}>
                  Consultar
                </button>
              </div>
            </li>
          ))}
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
        </InfiniteScroll>
      </ul>
    </div>
  )
}