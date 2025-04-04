import React from 'react';
import styles from './Horarios.module.css'

const Horarios = ({tipoHorario, register, error}) => {
  
    return (
        <div className={styles.container}>
            {
                tipoHorario == 1 && //Horário corrido
                <div className={styles.horarios}>
                    <p>*Obs: Quando há um único turno de trabalho contínuo, sem pausas, todos os dias</p>
                    <div className={styles.linha}>
                        <p>Turno:</p>
                        <input type="time" {...register("horarioCorrido.0")} />
                        <input type="time" {...register("horarioCorrido.1")} />                 
                    </div>
                </div>
            }

            {
                tipoHorario == 2 && //Horário partido
                <div className={styles.horarios}>
                    <p>*Obs: Quando há dois turnos de trabalho com pausa entre esses turnos</p>
                    <div className={styles.linha}>
                        <p>1° Turno:</p>
                        <input type="time" {...register("horarioPartido.0")} />
                        <input type="time" {...register("horarioPartido.1")} />
                        <p>2° Turno:</p>
                        <input type="time" {...register("horarioPartido.2")} />
                        <input type="time" {...register("horarioPartido.3")} />
                    </div>
                </div>
                
            }

            {
                tipoHorario == 3 && //Horário partido
                <div className={styles.horarios}>
                    <p>*Obs: Quando há turnos diferentes para cada dia da semana</p>
                    <div className={styles.linha}>

                        <div> <label>Segunda: </label> </div>
                        <p>1° Turno:</p>
                        <input type="time" {...register("horarioVariado.0")} />
                        <input type="time" {...register("horarioVariado.1")} />
                        <p>2° Turno:</p>
                        <input type="time" {...register("horarioVariado.2")} />
                        <input type="time" {...register("horarioVariado.3")} />

                        <div> <label>Terça: </label> </div>
                        <p>1° Turno:</p>
                        <input type="time" {...register("horarioVariado.4")} />
                        <input type="time" {...register("horarioVariado.5")} />
                        <p>2° Turno:</p>
                        <input type="time" {...register("horarioVariado.6")} />
                        <input type="time" {...register("horarioVariado.7")} />

                        <div> <label>Quarta: </label> </div>
                        <p>1° Turno:</p>
                        <input type="time" {...register("horarioVariado.8")} />
                        <input type="time" {...register("horarioVariado.9")} />
                        <p>2° Turno:</p>
                        <input type="time" {...register("horarioVariado.10")} />
                        <input type="time" {...register("horarioVariado.11")} />

                        <div> <label>Quinta: </label> </div>
                        <p>1° Turno:</p>
                        <input type="time" {...register("horarioVariado.12")} />
                        <input type="time" {...register("horarioVariado.13")} />
                        <p>2° Turno:</p>
                        <input type="time" {...register("horarioVariado.14")} />
                        <input type="time" {...register("horarioVariado.15")} />

                        <div> <label>Sexta: </label> </div>
                        <p>1° Turno:</p>
                        <input type="time" {...register("horarioVariado.16")} />
                        <input type="time" {...register("horarioVariado.17")} />
                        <p>2° Turno:</p>
                        <input type="time" {...register("horarioVariado.18")} />
                        <input type="time" {...register("horarioVariado.19")} />
                    </div>
                </div>      
            }
            {error[0] && <p className={styles.erro}>{error[0].message}</p>}
            {error[1] && <p className={styles.erro}>{error[1].message}</p>}
            {error[2] && <p className={styles.erro}>{error[2].message}</p>}
            fazer os erros de cada caso
        </div>
    )
}

export default Horarios;