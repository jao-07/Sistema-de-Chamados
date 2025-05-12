import { useEffect, useState } from "react"
import styles from "./ChamadosAnteriores.module.css"
import { useNavigate } from "react-router";
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";

export default function ChamadosAnteriores() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  let navigate = useNavigate();

  const userLogin = "joaovecruz"

  //********* */
  //Fazer o infinite scroll e os gets corretos

  useEffect(() => {
     const carregarSolicitacoes =  async () => {
      try {
        setLoading(true);
        const resposta = await axios.get(`https://sistemas.icb.ufmg.br/wifi/api/chamado/chamadosAnteriores/${userLogin}`);
        console.log(resposta.data)
        setSolicitacoes(resposta.data);
      } catch (e) {
        setErro(e.message);
      } finally {
        setLoading(false);
      }
    }
    
    carregarSolicitacoes();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p style={{ color: "red" }}>Erro: {erro}</p>;
  if (solicitacoes.length === 0) return <p>Você ainda não fez nenhuma solicitação.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Histórico de Solicitações</h2>
      <ul className={styles.list}>
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
              <button onClick={() => navigate(`/solicitacoesAnteriores/${sol.id}`)}>
                Consultar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}