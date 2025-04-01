import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Select.module.css'

const Select = ({vetorServicos, vetorCategorias, titulo, opcaoSelecionada, onEscolha}) => {

    const [descricao, SetDescricao] = useState("")

    useEffect(() => {
        const getDados = async (id) => {
            try{
                const response = await Promise.resolve(id)
                SetDescricao(response)
            }
            catch(error){
                console.error("Erro ao obter a descrição do serviço selecionado")
            }
        }
        getDados(opcaoSelecionada)
    }, [opcaoSelecionada])

    return (
        <div>
            <p>{titulo}</p>
            <select value={opcaoSelecionada} onChange={e => onEscolha(e.target.value)}>
                {!opcaoSelecionada && <option value="" hidden>Selecione uma opção</option>}
                {
                    vetorCategorias.map((itemCategoria) => (
                        <optgroup label={`${itemCategoria.categoria} - ${itemCategoria.descricao}`} key={itemCategoria.categoria}>
                            {
                                vetorServicos.map((itemServico) => (
                                    itemCategoria.id_categoria == itemServico.id_categoria  && 
                                    <option key={itemServico.id} value={itemServico.id}>{itemServico.nome}</option> 
                                ))
                            }       
                        </optgroup>
                    )) 
                }
            </select>
            <div className={styles.descricao}>
                <p>Descrição: {descricao}</p>
            </div>
        </div>
    )
}

export default Select;