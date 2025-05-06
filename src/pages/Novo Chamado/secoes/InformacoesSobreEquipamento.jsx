import styles from '../NovoChamado.module.css'
import FormChooses from '../../../compontents/Novo Chamado/FormChooses'
import FormInput from '../../../compontents/Novo Chamado/FormInput'
import SelectDefault from '../../../compontents/Novo Chamado/SelectDefault'
import * as options from '../../../utils/options'
import { handleChangePatrimonio } from '../../../utils/HandleFunctions'

import { FaExclamationCircle } from "react-icons/fa"


const InformacoesSobreEquipamento = ({watch, errors, register, setValue, clearErrors}) => {
  return (
    <div className={styles.secao}>
        <h2>Informações sobre o equipamento</h2>
        <p>O chamado está relacionado a algum equipamento (Computadores, Impressoras, Roteadores)?</p>
        <FormChooses
            vetor={options.vetorSimOuNao}
            size={20}
            setValue={setValue}
            clearErrors={clearErrors}
            nome="relacionadoEquipamento"
            error={errors.relacionadoEquipamento}
            selectedValue={watch().relacionadoEquipamento}
        />

        { watch().relacionadoEquipamento == "Sim" &&
            <>
                <div className={styles.inputsSecao}>
                    <div className={styles.coluna}>
                        <p>O chamado é para o seu computador?</p>
                        <FormChooses
                            vetor={options.vetorSimOuNao}
                            size={20}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            nome="seuComputador"
                            error={errors.seuComputador}
                            selectedValue={watch().seuComputador}
                        />
                    </div>
                    <div className={styles.coluna}>
                        <p>Qual a origem do equipamento?</p>
                        <FormChooses
                            vetor={options.vetorOrigemEquipamento}
                            size={20}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            nome="origemEquipamento"
                            error={errors.origemEquipamento}
                            selectedValue={watch().origemEquipamento}
                        />
                    </div>
                </div>

                {/* Aviso sobre equipamentos particulares */}
                {watch().origemEquipamento == "Particular" &&
                    <div className={styles.conteudo} style={{ border: '1px solid black', borderRadius: '10px', paddingLeft: '60px', marginBottom: '40px' }}>
                        <div className={styles.iconExclamacao}>
                            <FaExclamationCircle />
                        </div>
                        <div>
                            <h2>Atenção!</h2>
                            <p>A Seção de Informática só atende chamados de rede em equipamentos particulares relacionados no <a href="https://sistemas2.icb.ufmg.br/chamado/formularioBemParticular.doc">Relatório de Bens Particulares</a> formalizados no instituto.</p>
                            <p>Preencha o referido formulário e envie-o no formato PDF para o e-mail da Seção de Patrimônio: spatri@icb.ufmg.br. O chamado poderá ser aberto anexando uma foto/comprovante de envio </p>
                        </div>
                    </div>
                }
                {/* Inputs caso o equipamento seja Patrimoniado */}
                { watch().origemEquipamento == "Patrimoniado" &&
                    <div className={styles.inputsSecao}>
                        <div className={styles.coluna}>
                            <FormInput
                                label="Número de patrimônio"
                                nome="numeroPatrimonioEquipamentoPatrimoniado"
                                placeholder="Digite o número de patrimônio"
                                register={register}
                                onChange={(e, n) => handleChangePatrimonio(e, n, setValue)}
                                maxLength={11}
                                error={errors.numeroPatrimonioEquipamentoPatrimoniado}
                            />
                        </div>

                        <div className={styles.coluna}>
                            <FormInput
                                label="IP do Equipamento (Se souber)"
                                nome="ipEquipamento"
                                placeholder="Digite o IP"
                                register={register}
                            />
                        </div>
                    </div>
                }

                {/* Inputs caso o equipamento seja de Projeto de Pesquisa */}
                { watch().origemEquipamento == "Projeto de pesquisa" &&
                    <div className={styles.inputsSecao} name="projetoPesquisa">
                        <div className={styles.coluna}>
                            <SelectDefault
                                vetor={options.agenciasProjetoPesquisa}
                                titulo="Agência"
                                nome="agencia"
                                placeholder="Escolha a agência"
                                register={register}
                                error={errors.agencia}
                                selectedValue={watch().agencia}
                            />

                            <FormInput
                                label="Número do projeto"
                                nome="projetoPesquisa.numeroProjeto"
                                placeholder="Digite o número do projeto"
                                register={register}
                                error={errors.projetoPesquisa?.numeroProjeto}
                            />

                            <FormInput
                                label="IP do Equipamento (Se souber)"
                                nome="ipEquipamento"
                                placeholder="Digite o IP"
                                register={register}
                            />
                        </div>

                        <div className={styles.coluna}>
                            { watch().agencia == "Outro" &&
                            <FormInput
                                label="Informe o nome da agência"
                                nome="agenciaOutro"
                                placeholder="Digite o nome da agência"
                                register={register}
                                error={errors.agenciaOutro}
                            />
                            }

                            <FormInput
                                label="Número do termo"
                                nome="projetoPesquisa.numeroTermo"
                                placeholder="Digite o número do termo"
                                register={register}
                                error={errors.projetoPesquisa?.numeroTermo}
                            />

                            <FormInput
                                label="Número de patrimônio (se houver)"
                                nome="projetoPesquisa.numeroPatrimonioPP"
                                placeholder="Digite o número de patrimônio"
                                register={register}
                                onChange={handleChangePatrimonio}
                                maxLength={11}
                                error={errors.projetoPesquisa?.numeroPatrimonioPP}
                            />
                        </div>
                    </div>
                }

                {/* Inputs caso o equipamento seja Particular */}
                { watch().origemEquipamento == "Particular" &&
                    <div className={styles.inputsSecao}>
                        <div className={styles.coluna}>
                            <FormInput
                                label="Nome do responsável pela guarda"
                                nome="responsavelGuarda"
                                placeholder="Digite o nome do responsável"
                                register={register}
                                error={errors.responsavelGuarda}
                            />
                            
                            <FormInput
                                label="Foto/Comprovante de envio"
                                nome="comprovanteEnvio"
                                register={register}
                                type="file"
                                accept=".pdf, .jpeg, .jpg, .gif, .png, .zip"
                                error={errors.comprovanteEnvio}
                            />
                        </div>

                        <div className={styles.coluna}>
                            <FormInput
                                label="IP do Equipamento (Se souber)"
                                nome="ipEquipamento"
                                placeholder="Digite o IP"
                                register={register}
                            />
                        </div>
                    </div>
                }
            
            </>
        }
        {errors?.projetoPesquisa?.message && watch().relacionadoEquipamento == "Sim" && watch().origemEquipamento == "Projeto de pesquisa" && <p style={{color: "red"}}>{errors.projetoPesquisa.message}</p>}
    </div>
  )
}

export default InformacoesSobreEquipamento