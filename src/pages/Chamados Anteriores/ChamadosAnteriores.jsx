import { useEffect, useState } from "react"
import styles from "./ChamadosAnteriores.module.css"
import { useNavigate } from "react-router";

export default function ChamadosAnteriores({ userId }) {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
     const carregarSolicitacoes =  async () => {
      try {
        //const resposta = await fetch(`/api/solicitacoes?usuario=${userId}`);
        const resposta = [
          {id: 1, area: "Rede", servico: "Configurar roteador", status: "Aberto", dataSolicitacao: "02/05/2025", responsavel: "Chico", dataEncerramento: "07/05/2025"},
          {id: 2, area: "Email", servico: "Configurar Notes", status: "Encerrado", dataSolicitacao: "10/03/2025", responsavel: "José", dataEncerramento: "11/03/2025"},
          {id: 3, area: "Suporte", servico: "Alterar cadastro de salas", status: "Cancelado", dataSolicitacao: "10/03/2025", responsavel: "Chico", dataEncerramento: "03/20/2025"},
          {id: 4, area: "Sistemas", servico: "Configurar Notes", status: "Aberto", dataSolicitacao: "10/03/2025", responsavel: "Rodolfo", dataEncerramento: "07/05/2025"}
        ]
        const dados = await resposta;
        setSolicitacoes(dados);
      } catch (e) {
        setErro(e.message);
      } finally {
        setLoading(false);
      }
    }
    setLoading(true);
    carregarSolicitacoes();
  }, [userId]);

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p style={{ color: "red" }}>Erro: {erro}</p>;
  if (solicitacoes.length === 0) return <p>Você ainda não fez nenhuma solicitação.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Histórico de Solicitações</h2>
      <ul className={styles.list}>
        {solicitacoes.map((sol) => (
          <li key={sol.id} className={styles.solicitacao}>
            <div className={styles.contents}>
              <p><strong>Ticket:</strong> #{sol.id}</p>
              <p><strong>Responsável:</strong> {sol.responsavel}</p>
              <p><strong>Área:</strong> {sol.area}</p>
              <p><strong>Serviço:</strong> {sol.servico}</p>
              <p><strong>Status:</strong> {sol.status}</p>
              <p><strong>Solicitado em:</strong> {new Date(sol.dataSolicitacao).toLocaleDateString()}</p>
              {sol.dataEncerramento && <p><strong>Encerrado em:</strong> {new Date(sol.dataEncerramento).toLocaleDateString()}</p>}
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