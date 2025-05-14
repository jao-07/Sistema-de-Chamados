import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from "./ConsultaAnteriores.module.css"
import axios from "axios"

import Loading from '../../../compontents/Novo Chamado/Loading';

function ConsultaAnteriores() {

    const { id } = useParams();
    const [motivoReabertura, SetMotivoReabertura] = useState("")
    const [mensagens, setMensagens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const reabrirChamado = () => {
        //axios post mensagem reabertura
    }

    console.log(motivoReabertura)

    useEffect(() => {
        const obtemMensagens = async () => {
            try{
                setLoading(true);
                //const resposta = await fetch(`/api/solicitacoes?usuario=${userId}`);
                const resposta = [
                    {data: "07/05/2025", usuario: "solicitante", mensagem: "Mensagem aleatória"},
                    {data: "08/05/2025", usuario: "atendente", mensagem: "Mensagem aleatória2"},
                    {data: "08/05/2025", usuario: "solicitante", mensagem: "Mensagem aleatória3"},
                    {data: "09/05/2025", usuario: "atendente", mensagem: "Mensagem aleatória4"}
                ]
                const dados = await resposta;
                setMensagens(dados)
            }
            catch(e){
                setErro(e.message)
            }
            finally{
                setLoading(false);
            }
        }
        
        obtemMensagens()
    }, [])

    if (erro) return <p style={{ color: "red" }}>Erro: {erro}</p>;
    if (mensagens.length === 0) return <p>Não há nenhuma mensagem.</p>;

    return (
        <div className={styles.container}>

            {loading && pagina == 1 &&(
                <Loading />
            )}

            <h3>Caso queira reabrir o chamado, digite abaixo os motivos da reabertura:</h3>
            <textarea 
                type="text"
                placeholder='Digite o motivo da reabertura'
                value={motivoReabertura} 
                onChange={(e) => SetMotivoReabertura(e.target.value)}
            />
            <button onClick={reabrirChamado}>
                Reabrir
            </button> 
        </div>
        
    )
}

export default ConsultaAnteriores