import React from 'react'
import { useState, useEffect } from 'react'
import styles from './SelectServico.module.css'

const SelectServico = ({vetorServicos, vetorCategorias, titulo, register, nome, error, placeholder, selectedValue}) => {
    return (
        <div>
            <label>{titulo}</label>
            <select {...register(nome)}>
            {!selectedValue && <option value="" hidden>{placeholder}</option>}
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
            {error && <p className={styles.erro}>{error.message}</p>}
            {selectedValue && 
                <div className={styles.observacoes}>
                    <label>Observações:</label>
                    <p>{vetorServicos.find(item => item.id == selectedValue).descricao}</p>

                </div>
            }
        </div>
    )
}

export default SelectServico;