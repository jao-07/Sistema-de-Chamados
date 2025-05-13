import styles from '../NovoChamado.module.css'
import FormChooses from '../../../compontents/Novo Chamado/FormChooses'
import FormInput from '../../../compontents/Novo Chamado/FormInput'
import SelectDefault from '../../../compontents/Novo Chamado/SelectDefault'
import Horarios from '../../../compontents/Novo Chamado/Horarios'
import * as options from '../../../utils/options'
import { FaExclamationCircle } from "react-icons/fa"

const InformacoesDeContato = ({watch, errors, register, setValue, clearErrors, blocosSalas, departamentos}) => {

    return (
        <div className={styles.secao}>
            <h2>Informações de Contato</h2>
            <p>Quais informações utilizar para esse chamado?</p>
            <FormChooses
                vetor={options.vetorInfos}
                size={80}
                setValue={setValue}
                clearErrors={clearErrors}
                nome="infoContato"
                error={errors.infoContato}
                selectedValue={watch().infoContato}
            />
            {watch().infoContato == "Informações cadastradas no Intranet" &&
                <div className={styles.conteudo} style={{ border: '1px solid black', borderRadius: '10px', paddingLeft: '60px', marginBottom: '40px' }}>
                <div className={styles.iconExclamacao}>
                    <FaExclamationCircle />
                </div>
                <div>
                    <h2>Atenção!</h2>
                    <p>Confira se seus dados na Intranet estão atualizados!</p>
                    <p>Para atualizá-los, acesse <a href="https://sistemas.icb.ufmg.br/intranet/">Intranet</a></p>
                </div>
                </div>
            }
            {watch().infoContato &&
                <div className={styles.inputsSecao}>
                    <div className={styles.coluna}>
                        <SelectDefault
                            vetor={departamentos}
                            titulo="Departamento"
                            nome="departamento"
                            placeholder="Escolha o departamento"
                            register={register}
                            error={errors.departamento}
                            selectedValue={watch().departamento}
                        />

                        <FormInput
                            label="Ramal"
                            nome="ramal"
                            type='number'
                            placeholder="Digite o ramal"
                            register={register}
                            error={errors.ramal}
                        />
                    </div>

                    <div className={styles.coluna}>
                        <SelectDefault
                            vetor={blocosSalas}
                            titulo="Bloco/Sala"
                            nome="bloco_sala"
                            placeholder="Escolha o bloco/sala"
                            register={register}
                            error={errors.bloco_sala}
                            selectedValue={watch().bloco_sala}
                        />

                        <FormInput
                            label="Contatos adicionais"
                            nome="contatosAdicionais"
                            placeholder="Digite os contatos adicionais"
                            register={register}
                            error={errors.contatosAdicionais}
                        />
                    </div>
                </div>
            }
            <p>Qual horário deseja ser contactado?</p>
            <FormChooses
                vetor={options.vetorHorarios}
                size={80}
                setValue={setValue}
                clearErrors={clearErrors}
                nome="tipoHorario"
                error={errors.tipoHorario}
                selectedValue={watch().tipoHorario}
            />

            {
                watch().tipoHorario &&
                <Horarios
                    tipoHorario={watch().tipoHorario}
                    register={register}
                    error={[errors.horarioContinuo, errors.horarioPartido, errors.horarioVariado]}
                />
            }

        </div>
    )
}

export default InformacoesDeContato