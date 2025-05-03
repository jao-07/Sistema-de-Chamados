import React from 'react'
import styles from "./Botao.module.css"
import DynamicIcon from '../../compontents/Helpers/DynamicIcon'

const Botao = ({icone, size, handle, posTop, posLeft, title}) => {

  return (
    <div 
        className={styles.container} 
        onClick={handle} 
        style={{top: posTop, left: posLeft}} 
        title={title}
    >
        <DynamicIcon 
            name={icone} 
            size={size} 
        />
    </div>
  )
}

export default Botao