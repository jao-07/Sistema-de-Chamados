import { useParams, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from "./ConsultaAnteriores.module.css"
import axios from "axios"

import Loading from '../../../compontents/Novo Chamado/Loading';

function ConsultaAnteriores() {

    const location = useLocation();

    const { id } = useParams();
    const [motivoReabertura, SetMotivoReabertura] = useState("")
    const [mensagens, setMensagens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    if (!location.state?.autorizado) {
        return <Navigate to="/" replace />;
    }
    //TODO: Fazer a verificação se quem está logado é o dono do chamado
    //Caso não seja, mostrar um aviso de que não é possível acessar o chamado


    const reabrirChamado = () => {
        //axios post mensagem reabertura
    }

    console.log(motivoReabertura)

    useEffect(() => {
        const obtemMensagens = async () => {
            try{
                setLoading(true)
                const resposta = await axios.get(`https://sistemas.icb.ufmg.br/wifi/api/chamado/mensagens/${id}`)
                console.log(resposta.data)
                setMensagens(resposta.data)
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
    if (mensagens.length === 0 && !loading) return <p>Não há nenhuma mensagem.</p>;

    return (
        <div className={styles.container}>

            {loading &&(
                <Loading />
            )}

            <div className={styles.secao} >
                <h3>Caso queira reabrir o chamado, digite abaixo os motivos da reabertura:</h3>
                <textarea 
                    type="text"
                    placeholder='Digite o motivo da reabertura'
                    value={motivoReabertura} 
                    onChange={(e) => SetMotivoReabertura(e.target.value)}
                    style={{width: "100%"}}
                />

                <button onClick={reabrirChamado}>
                    Enviar
                </button> 
            </div>
            
            <div className={styles.secao}>
                <div className={styles.titulo}>
                    <h2>Mensagens:</h2>
                </div>
                
                {mensagens.map((msg, index) => (
                    msg.tipo == "Create" &&
                        <div key={index} className={styles.aviso}>
                            <p>Solicitação criada:</p>
                            <div dangerouslySetInnerHTML={{ __html: msg.mensagem}} />
                            <p>{`Data: ${msg.data}`}</p>
                        </div>
                    ||
                    msg.tipo == "Correspond" && msg.tipoConteudo != "application/x-empty" &&
                        <div key={index} className={styles.mensagem}>
                            <div className={styles.infosSecao}>
                                <p>{`Usuário: ${msg.usuario}`}</p>
                                <p>{`Data: ${msg.data}`}</p>
                            </div>
                            {msg.tipoConteudo == "application/pdf" && (
                                <iframe src={msg.mensagem} width='90%' height='600'></iframe>
                            )}
                            {msg.tipoConteudo.startsWith("image/") && (
                                <img src={msg.mensagem} alt="Imagem enviada" style={{ maxWidth: 'clamp(3rem, 50vw, 80rem)' }} />
                            )}
                            {msg.tipoConteudo.startsWith("text/") && <div dangerouslySetInnerHTML={{ __html: msg.mensagem}} />}
                        </div>
                    ||
                    msg.tipo == "Status" &&
                        <div key={index} className={styles.aviso}>
                            <p>{`Novo status: ${msg.status}`}</p>
                            <p>{`Data: ${msg.data}`}</p>
                        </div>   
                ))}
            </div>

        </div>
        
    )
}

export default ConsultaAnteriores