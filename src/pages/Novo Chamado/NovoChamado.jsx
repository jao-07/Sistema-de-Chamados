import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FaExclamationCircle } from "react-icons/fa"

import { schema } from '../../schemas/SchemaForm'
import { handleChangePatrimonio, handleClickID, handleCloseError } from '../../utils/HandleFunctions'
import * as options from '../../utils/options.js'

import styles from "./NovoChamado.module.css"
import FormInput from '../../compontents/Novo Chamado/FormInput'
import PopUpErro from '../../compontents/Novo Chamado/PopUpErro'
import Loading from '../../compontents/Novo Chamado/Loading'
import FormChooses from '../../compontents/Novo Chamado/FormChooses'
import SelectServico from '../../compontents/Novo Chamado/SelectServico' 
import SelectDefault from '../../compontents/Novo Chamado/SelectDefault'
import Horarios from '../../compontents/Novo Chamado/Horarios'

const NovoChamado = () => {

  //useStates utilizados
  const [loading, SetLoading] = useState(false)
  const [idChamado, SetIdChamado] = useState(0)
  const [valorInputID, SetValorInputID] = useState(0)
  const [erroDados, SetErroDados] = useState(false)

  //Usa o hook useForm para o controle e validação dos inputs do formulário
  const { register, handleSubmit, watch, setValue, clearErrors, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      urgencia: 1,
    },
  })

  const dadosDoBanco = {
    solicitante: "João",
    emailInstitucional: "email@aleatorio.br"
  }

  const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  //Utiliza useEffect para buscar as informações do chamado de que se quer aproveitar
  useEffect(() => {
    SetLoading(true)
    const getDados = async (ID) => {
      try {
        await esperar(2000)
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

  //Função que envia os dados do formulário para o backend ao clicar no botão de submit
  const onSubmit = (data) => {
    console.log("Dados enviados:", data)
  }

  return (
    <div className={styles.container}>

      {loading && (
        <Loading />
      )}

      {erroDados && (
        <PopUpErro error={erroDados} functionClose={handleCloseError} />
      )}

      <div className={styles.form}>

        <div className={styles.secao}>
          <p>Para aproveitar os dados de um chamado anterior, digite o número do chamado e clique no botão</p>
          <div className={styles.aproveitamento}>
            <input
              type="number"
              placeholder="Digite o número do chamado"
              style={{ width: "70%" }}
              onChange={(event) => SetValorInputID(event.target.value)}
            />
            <button onClick={() => handleClickID(valorInputID)}>
              Buscar
            </button>
          </div>
        </div>

        <div className={styles.secao}>
          <div className={styles.conteudo}>
            <div className={styles.iconExclamacao}>
              <FaExclamationCircle />
            </div>
            <div>
              <h2>Atenção!</h2>
              <p>Para cada serviço, deverá ser aberto um chamado separadamente!</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.secao}>
            <h2>Informações do usuário</h2>
            <div className={styles.inputsSecao}>

              <div className={styles.coluna}>
                <FormInput
                  label="Solicitante"
                  nome="solicitante"
                  placeholder="Digite seu nome"
                  register={register}
                  error={errors.solicitante}
                />

              </div>

              <div className={styles.coluna}>
                <FormInput
                  label="Email Institucional"
                  nome="emailInstitucional"
                  placeholder="Digite seu email"
                  register={register}
                  error={errors.emailInstitucional}
                />
              </div>

            </div>
          </div>

          <div className={styles.secao}>
            <h2>Informações do serviço</h2>
            <p>Escolha a área do serviço desejado</p>
            <FormChooses
              vetor={options.vetorArea}
              size={80}
              setValue={setValue}
              clearErrors={clearErrors}
              nome="areaServico"
              error={errors.areaServico}
              selectedValue={watch().areaServico}
            />
            {watch().areaServico &&
              <SelectServico
                vetorServicos={options.servicos}
                vetorCategorias={options.categoria_servicos}
                titulo="Escolha o serviço"
                nome="servico"
                placeholder="Escolha o serviço requerido"
                register={register}
                error={errors.servico}
                selectedValue={watch().servico}
              />
            }
          </div>

          <div className={styles.secao}>
            <h2>Descrição do problema</h2>
            <FormInput
              label="Assunto do chamado"
              nome="assunto"
              placeholder="Digite o assunto do chamado"
              register={register}
              error={errors.assunto}
            />

            <FormInput
              label="Descrição do problema"
              nome="descricao"
              type='textarea'
              placeholder="Digite a descrição do problema"
              register={register}
              error={errors.descricao}
            />

            <label>Escolha a urgência do problema</label>
            <select {...register("urgencia")}>
              <option value={1}>Normal</option>
              <option value={2}>Urgente (Ônus reversível)</option>
              <option value={3}>Emergência (Ônus irreversível)</option>
            </select>
          </div>

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
            {watch().infoContato == 1 &&
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
                    vetor={options.departamentos}
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
                    vetor={options.blocos_salas}
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
                error={[errors.horarioCorrido, errors.horarioPartido, errors.horarioVariado]}
              />
            }

          </div>

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

            { watch().relacionadoEquipamento == 1 &&
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
                {watch().origemEquipamento == 3 &&
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
                {/* Inputs caso o equipamento seja Patrimoniado */}
                { watch().origemEquipamento == 1 &&
                  <div className={styles.inputsSecao}>
                    <div className={styles.coluna}>
                      <FormInput
                        label="Número de patrimônio"
                        nome="numeroPatrimonioEquipamentoPatrimoniado"
                        placeholder="Digite o número de patrimônio"
                        register={register}
                        onChange={handleChangePatrimonio}
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
                { watch().origemEquipamento == 2 &&
                  <div className={styles.inputsSecao}>
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
                      { watch().agencia == 4 &&
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
                { watch().origemEquipamento == 3 &&
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
            {errors?.projetoPesquisa?.message && watch().relacionadoEquipamento == 1 && watch().origemEquipamento == 2 && <p style={{color: "red"}}>{errors.projetoPesquisa.message}</p>}
          </div>
          

          <div className={styles.submitButton}>
            <button type="submit">
              Enviar
            </button>
          </div>

        </form>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </div>
    </div>
  )
}

export default NovoChamado;