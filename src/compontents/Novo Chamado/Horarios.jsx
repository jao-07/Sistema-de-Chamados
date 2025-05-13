import styles from '../../styles/Novo Chamado/Horarios.module.css'

const Horarios = ({tipoHorario, register, error}) => {

    //Verifica se há algum erro em algum input de cada tipo de horário e coloca a mensagem de erro nas variáveis abaixo
    const erroHorarioContinuo = error[0]?.root?.message; 
    const erroHorarioPartido = error[1]?.find(e => e?.message)?.message;
    const erroHorarioVariado = error[2]?.find(e => e?.message)?.message;
  
    return (
        <div className={styles.container} name={tipoHorario == "Horário continuo" ? "horarioContinuo" : tipoHorario == "Horário partido" ? "horarioPartido" : "horarioVariado"}>
            {
                tipoHorario == "Horário continuo" &&
                <div className={styles.horarios}>
                    <p>*Obs: Quando há um único turno de trabalho contínuo, sem pausas, todos os dias</p>
                    <div className={styles.linha}>
                        <p>Turno:</p>
                        <input type="time" {...register("horarioContinuo.0")} className={error[0]?.[0] ? styles.erroInput : ""}/>
                        <input type="time" {...register("horarioContinuo.1")} className={error[0]?.[1] ? styles.erroInput : ""}/>                 
                    </div>
                </div>
            }

            {
                tipoHorario == "Horário partido" &&
                <div className={styles.horarios}>
                    <p>*Obs: Quando há dois turnos de trabalho com pausa entre esses turnos</p>
                    <div className={styles.linha}>
                        <p>1° Turno:</p>
                        <input type="time" {...register("horarioPartido.0.0")} className={error[1]?.[0] ? styles.erroInput : ""}/>
                        <input type="time" {...register("horarioPartido.0.1")} className={error[1]?.[0] ? styles.erroInput : ""}/>
                        <p>2° Turno:</p>
                        <input type="time" {...register("horarioPartido.1.0")} className={error[1]?.[1] ? styles.erroInput : ""}/>
                        <input type="time" {...register("horarioPartido.1.1")} className={error[1]?.[1] ? styles.erroInput : ""}/>
                    </div>
                </div>
                
            }

            {
                tipoHorario == "Horário variado" &&
                <div className={styles.horarios}>
                    <p>*Obs: Quando há turnos diferentes para cada dia da semana</p>
                    <div className={styles.linha}>

                        <div> <label>Segunda: </label> </div>
                        
                        <p>1° Turno:</p>
                        <input type="time" {...register("horarioVariado.0.0")} className={error[2]?.[0] ? styles.erroInput : ""}/>
                        <input type="time" {...register("horarioVariado.0.1")} className={error[2]?.[0] ? styles.erroInput : ""}/>
                        
                        <p>2° Turno:</p>
                        <input type="time" {...register("horarioVariado.1.0")} className={error[2]?.[1] ? styles.erroInput : ""}/>
                        <input type="time" {...register("horarioVariado.1.1")} className={error[2]?.[1] ? styles.erroInput : ""}/>
                        
                        <div> <label>Terça: </label> </div>
                        <p>1° Turno:</p>
                        <input type="time" {...register("horarioVariado.2.0")} className={error[2]?.[2] ? styles.erroInput : ""}/>
                        <input type="time" {...register("horarioVariado.2.1")} className={error[2]?.[2] ? styles.erroInput : ""}/>
                        <p>2° Turno:</p>
                        <input type="time" {...register("horarioVariado.3.0")} className={error[2]?.[3] ? styles.erroInput : ""}/>
                        <input type="time" {...register("horarioVariado.3.1")} className={error[2]?.[3] ? styles.erroInput : ""}/>

                        <div> <label>Quarta: </label> </div>
                        <p>1° Turno:</p>
                        <input type="time" {...register("horarioVariado.4.0")} className={error[2]?.[4] ? styles.erroInput : ""}/>
                        <input type="time" {...register("horarioVariado.4.1")} className={error[2]?.[4] ? styles.erroInput : ""}/>
                        <p>2° Turno:</p>
                        <input type="time" {...register("horarioVariado.5.0")} className={error[2]?.[5] ? styles.erroInput : ""}/>
                        <input type="time" {...register("horarioVariado.5.1")} className={error[2]?.[5] ? styles.erroInput : ""}/>

                        <div> <label>Quinta: </label> </div>
                        <p>1° Turno:</p>
                        <input type="time" {...register("horarioVariado.6.0")} className={error[2]?.[6] ? styles.erroInput : ""}/>
                        <input type="time" {...register("horarioVariado.6.1")} className={error[2]?.[6] ? styles.erroInput : ""}/>
                        <p>2° Turno:</p>
                        <input type="time" {...register("horarioVariado.7.0")} className={error[2]?.[7] ? styles.erroInput : ""}/>
                        <input type="time" {...register("horarioVariado.7.1")} className={error[2]?.[7] ? styles.erroInput : ""}/>

                        <div> <label>Sexta: </label> </div>
                        <p>1° Turno:</p>
                        <input type="time" {...register("horarioVariado.8.0")} className={error[2]?.[8] ? styles.erroInput : ""}/>
                        <input type="time" {...register("horarioVariado.8.1")} className={error[2]?.[8] ? styles.erroInput : ""}/>
                        <p>2° Turno:</p>
                        <input type="time" {...register("horarioVariado.9.0")} className={error[2]?.[9] ? styles.erroInput : ""}/>
                        <input type="time" {...register("horarioVariado.9.1")} className={error[2]?.[9] ? styles.erroInput : ""}/>
                    </div>
                </div>      
            }
            {tipoHorario == "Horário continuo" && erroHorarioContinuo && <p className={styles.erro}>{erroHorarioContinuo}</p>}
            {tipoHorario == "Horário partido" && erroHorarioPartido && <p className={styles.erro}>{erroHorarioPartido}</p>}
            {tipoHorario == "Horário variado" && erroHorarioVariado && <p className={styles.erro}>{erroHorarioVariado}</p>}
        </div>
    )
}

export default Horarios;