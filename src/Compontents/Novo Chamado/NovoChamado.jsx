import React from 'react';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import styles from "./NovoChamado.module.css"

const NovoChamado = () => {

  const params = useParams()
  const id = params.idChamado || "new";

  const [variaveisForm, SetVariaveisForm] = useState([])

  useEffect(() => {
    try{
      if(id != "new"){
        console.log(`Busca pelo chamado ${id}`)
        //axios para buscar as variaveis do chamado do determinado id
        //SetVariaveisForm(variaveis)
      }
    }
    catch(error){
      console.error(`Erro ao obter o chamado ${id}`)
    }
  }, [])

  return (
    <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.formInput}>
            Nome:
            <input type="text" />
          </div>
          <div className={styles.formInput}>
            Nome:
            <input type="text" />
          </div>
        </div>
    </div>
  )
}

export default NovoChamado;