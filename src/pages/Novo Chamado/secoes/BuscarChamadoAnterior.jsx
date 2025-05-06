import styles from '../NovoChamado.module.css'
import {handleClickID} from '../../../utils/HandleFunctions'
import { useEffect, useState } from 'react'
import axios from 'axios'

const BuscarChamadoAnterior = ({SetLoading, reset, SetErroDados}) => {

    const [idChamado, SetIdChamado] = useState(0)
    const [inputValue, SetInputValue] = useState(0)

    //const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // const dadosDoBanco = {
    //     solicitante: "João",
    //     emailInstitucional: "email@aleatorio.br",
    //     areaServico: 1,
    //     urgencia: 1,
    //     servico: 14,
    //     assunto: "Chamado teste",
    //     descricao: "Texto qualquer para simular a descrição do problema",
    //     infoContato: 2,
    //     departamento: 2,
    //     ramal: 2544,
    //     bloco_sala: 490,
    //     contatosAdicionais: "outro@email.com",
    //     tipoHorario: 1,
    //     horarioCorrido: [
    //         "10:05",
    //         "12:07"
    //     ],
    //     relacionadoEquipamento: 1,
    //     seuComputador: 1,
    //     origemEquipamento: 1,
    //     numeroPatrimonioEquipamentoPatrimoniado: "1234567890",
    //     ipEquipamento: "150.164.23.200"

    // }

    //Ex: Turno: 07:30-22:00
    const trataHorarioCorrido = (string) => {
        const vetor = string.split(" ")
        const horario = vetor[1]
        return horario.split("-")
    }

    //Ex: 1º Turno: 09:00-13:00 2º Turno: 14:00-17:00
    const trataHorarioPartido = (string) => {
        const vetor = string.split(" ")
        const primeiroHorario = vetor[2]
        const segundoHorario = vetor[5]
        const vetorHorarios = Array(primeiroHorario.split("-"), segundoHorario.split("-"))
        return vetorHorarios
    }

    //Ex: Segunda: 1º turno 15:00-17:30 2º turno: 15:00-15:30 Terça: 1º turno 15:00-16:00 2º turno: --:-----:-- Quarta: 1º turno 15:00-16:00 2º turno: 15:00-16:00 Quinta: 1º turno --:-----:-- 2º turno: --:-----:-- Sexta: 1º turno 16:30-18:30 2º turno: 18:00-20:00
    const trataHorarioVariado = (string) => {
        const vetor = string.split(" ")
        const indexes = [3,6,10,13,17,20,24,27,31,34]
        const vetorHorarios = Array()
        let index = 0
        for(let i=0; i<indexes.length; i++){
            index = indexes[i]
            if(vetor[index][0] != '-')
                vetorHorarios.push(vetor[index].split("-"))
            else
                vetorHorarios.push(["", ""])
        }
        return vetorHorarios
    }

    const trataDisponibilidade = (campos) => {
        if(campos.LargeDisponibilidade){
            campos.tipoHorario = "Horário variado"
            campos.horarioVariado = trataHorarioVariado(campos.LargeDisponibilidade)
        } 
        else {
            if(campos.disponibilidade[0] == 'T'){
                campos.tipoHorario = "Horário corrido"
                campos.horarioCorrido = trataHorarioCorrido(campos.disponibilidade)
            }
            
            else{
                campos.horarioPartido = trataHorarioPartido(campos.disponibilidade)
                campos.tipoHorario = "Horário partido"
            }
        }
    }

    const trataPatrimonio = (campos) => {
        let patrimonio = campos.patrimonio.split(" ")
        if(patrimonio[0] == 'Agência:'){
            campos.agencia = patrimonio[1]
            campos.projetoPesquisa = Object()
            campos.projetoPesquisa.numeroProjeto = patrimonio[3] != "." ? patrimonio[3] : ""
            campos.projetoPesquisa.numeroTermo = patrimonio[5] != "." ? patrimonio[5] : ""
            campos.projetoPesquisa.numeroPatrimonioPP = patrimonio[7] != "." ? patrimonio[7] : ""
        }
        else if(patrimonio[0] == "Particular"){
            patrimonio = campos.patrimonio.split(":")
            campos.responsavelGuarda = patrimonio[1]
        }
        else{
            campos.numeroPatrimonioEquipamentoPatrimoniado = patrimonio[1]
        }
    }

    const preencheCampos = (campos) => {
        if(campos.LargeDescricao)
            campos.descricao = campos.LargeDescricao

        trataDisponibilidade(campos)

        trataPatrimonio(campos)

        reset(campos)
        //Fazer o useEffect para obter os serviços
    }

    //Utiliza useEffect para buscar as informações do chamado de que se quer aproveitar
    useEffect(() => {
        const getDados = async () => {
            try {
                SetLoading(true)
                const response = await axios.get(`https://sistemas.icb.ufmg.br/wifi/api/chamadoAnterior/${idChamado}`)
                let campos = response.data[0]
                preencheCampos(campos)
                console.log(response.data[0]);
                SetErroDados(null)
            }
            catch (error) {
                SetErroDados("Erro! Não foi possível carregar os dados: " + error.message)
            }
            finally{
                SetLoading(false)
            }
        }
        if(idChamado)
            getDados()
        
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