import styles from '../NovoChamado.module.css'
import {handleClickID} from '../../../utils/HandleFunctions'
import { useEffect, useState } from 'react'

const BuscarChamadoAnterior = ({SetLoading, reset, SetErroDados}) => {

    const [idChamado, SetIdChamado] = useState(0)
    const [inputValue, SetInputValue] = useState(0)

    const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const dadosDoBanco = {
        solicitante: "João",
        emailInstitucional: "email@aleatorio.br",
        areaServico: 1,
        urgencia: 1,
        servico: 14,
        assunto: "Chamado teste",
        descricao: "Texto qualquer para simular a descrição do problema",
        infoContato: 2,
        departamento: 2,
        ramal: 2544,
        bloco_sala: 490,
        contatosAdicionais: "outro@email.com",
        tipoHorario: 1,
        horarioCorrido: [
            "10:05",
            "12:07"
        ],
        relacionadoEquipamento: 1,
        seuComputador: 1,
        origemEquipamento: 1,
        numeroPatrimonioEquipamentoPatrimoniado: "1234567890",
        ipEquipamento: "150.164.23.200"

    }

    //Utiliza useEffect para buscar as informações do chamado de que se quer aproveitar
    useEffect(() => {
        SetLoading(true)
        const getDados = async (ID) => {
        try {
            await esperar(200)
            const response = await Promise.resolve(dadosDoBanco)
            reset(response)
            SetErroDados(null)
            SetLoading(false)
        }
        catch (error) {
            SetLoading(false)
            SetErroDados("Erro! Não foi possível carregar os dados")
        }
        }
        getDados(idChamado)
        SetIdChamado()
    }, [idChamado])

    return (
        <div className={styles.secao}>
            <p>Para aproveitar os dados de um chamado anterior, digite o número do chamado e clique no botão</p>
            <div className={styles.aproveitamento}>
                <input
                    type="number"
                    placeholder="Digite o número do chamado"
                    style={{ width: "70%" }}
                    onChange={(event) => SetInputValue(event.target.value)}
                />
                <button onClick={() => handleClickID(inputValue, SetIdChamado, SetErroDados)}>
                    Buscar
                </button>
            </div>
        </div>
    )
}

export default BuscarChamadoAnterior;