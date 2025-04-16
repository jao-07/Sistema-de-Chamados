import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaExclamationCircle } from "react-icons/fa";

import styles from "./NovoChamado.module.css"
import FormInput from '../../compontents/Novo Chamado/FormInput';
import PopUpErro from '../../compontents/Novo Chamado/PopUpErro';
import Loading from '../../compontents/Novo Chamado/Loading';
import FormChooses from '../../compontents/Novo Chamado/FormChooses';
import SelectServico from '../../compontents/Novo Chamado/SelectServico'; 
import SelectDefault from '../../compontents/Novo Chamado/SelectDefault';
import Horarios from '../../compontents/Novo Chamado/Horarios';

const timeValidation = (value) => {
  if (!Array.isArray(value) || value.length < 2) return false;

  const [start, end] = value;
  if (!start || !end) return false;
  if(start == "" || end == "") return false;

  return start < end;
}

const ValidationInputsPP = (values) => {
  return (
    !!values.numeroTermo?.trim() || !!values.numeroProjeto?.trim() || !!values.numeroPatrimonioPP?.trim()
  )
}

//Define as regras de cada input utilizando a biblioteca yup
const schema = yup.object({
  //nome do solicitante
  solicitante:
    yup.string()
      .required("O nome é obrigatório!"),

  //email institucional do solicitante
  emailInstitucional:
    yup.string()
      .email("Email inválido!")
      .required("O email é obrigatório!"),

  //Número da área de serviço escolhida (Informática, comunicação ...)
  areaServico: 
    yup.number()
      .required("Origatório escolher a área do serviço!"),

  //ID do serviço escolhido
  servico:
    yup.number()
      .required("Obrigatório selecionar o serviço!")
      .transform((value, originalValue) => originalValue === "" ? undefined : value),

  //Assunto do chamado
  assunto:
    yup.string()
      .required("Obrigatório escrever o assunto!"),

  //Descrição do chamado
  descricao:
    yup.string().
      required("Obrigatório escrever a descrição!")
      .min(20, "Descrição muito curta!"),

  //Opção escolhida para quais informações de contato utilizar, 1 para intranet, 2 para outras
  infoContato: 
    yup.number()
    .required("Origatório escolher uma opção para contato!"),

  //ID do departamento escolhido
  departamento: 
    yup.number()
    .required("Obrigatório informar o departamento!")
    .transform((value, originalValue) => originalValue === "" ? undefined : value),

  //ID oo bloco/sala escolhido
  bloco_sala: 
    yup.string()
    .required("Obrigatório informar o bloco/sala!"),

  //Ramal digitado
  ramal: 
    yup.number()
    .required("Obrigratório informar o ramal!")
    .integer("Ramal inválido!")
    .positive("Ramal inválido!")
    .transform((value, originalValue) => originalValue === "" ? undefined : value),
  
  //Contatos adicionais digitados
  contatosAdicionais: 
    yup.string()
    .required("Obrigatório informar contatos adicionais para o atendimento!"),
  
  //Opção escolhida para o tipo de horário, 1 para horário corrido, 2 para horário partido e 3 para horário variado
  tipoHorario: 
    yup.number()
    .required("Origatório escolher o horário a ser contactado!"),

  //Horários definidos nos campos de horário corrido
  //É definido como um array de horarios (string)
  horarioCorrido: yup.mixed().when("tipoHorario", {
    is: 1,
    then: () =>
      yup
        .array()
        .of(
          yup
            .string()
            .transform((value, originalValue) =>
              originalValue === "" ? undefined : value
            )
            .matches(/^([0-9]{2}):([0-9]{2})$/, "Formato inválido!")
        )
        .length(2, "Informe os dois horários")
        .required("Informe o horário corrido")
        .test("valid-range", "Horários passados inválidos!", timeValidation),
    otherwise: () => yup.mixed().notRequired()
  }),

  //Horários definidos nos campos de horário partido
  //É definido como uma matriz, de dois arrays com dois horários (string) cada
  horarioPartido: yup.mixed().when("tipoHorario", {
    is: 2,
    then: () =>
      yup
        .array()
        .of(
          yup
            .array()
            .of(
              yup
                .string()
                .transform((value, originalValue) => originalValue === "" ? undefined : value)
                .matches(/^([0-9]{2}):([0-9]{2})$/, "Formato inválido")
            )
            .length(2)
            .test("valid-range", "Horários passados inválidos!", timeValidation)
        )
        .length(2)
        .required("Informe os horários do turno partido"),
    otherwise: () => yup.mixed().notRequired()
  }),
  
  //Horários definidos nos campos de horário variado
  //É definido como uma matriz com 10 vetores, com dois horários (string) cada
  horarioVariado: yup.mixed().when("tipoHorario", {
    is: 3,
    then: () =>
      yup
        .array()
        .of(
          yup
            .array()
            .of(
              yup
                .string()
                .transform((value, originalValue) => originalValue === "" ? undefined : value)
                .matches(/^([0-9]{2}):([0-9]{2})$/, "Formato inválido")
            )
            .length(2)
            .test("valid-range", "Horários passados inválidos!", timeValidation)
        )
        .length(10)
        .required("Informe os horários do turno variado"),
    otherwise: () => yup.mixed().notRequired()
  }),

  //Se o chamado está relacionado a algum equipamento ou não
  //1 = sim, 2 = não
  relacionadoEquipamento:
    yup.number()
      .required("Obrigatório informar se o chamado envolve algum equipamento!")
      .transform((value, originalValue) => originalValue === "" ? undefined : value),

  //Se o chamado é para o computador do usuário ou não
  //1 = sim, 2 = não
  seuComputador:
    yup.number()
      .required("Obrigatório informar se é para seu computador ou não!")
      .transform((value, originalValue) => originalValue === "" ? undefined : value),

  //Origem do equipamento
  //1 = Patrimoniado, 2 = Projeto de pesquisa, 3 = Particular
  origemEquipamento:
    yup.number()
      .required("Obrigatório informar a origem do equipamento!")
      .transform((value, originalValue) => originalValue === "" ? undefined : value),

  //Número de patrimônio
  //Obrigatório caso a origem do equipamento seja Patrimoniado
  //Caso não seja, não é obrigatório
  numeroPatrimonioEquipamentoPatrimoniado:
    yup.mixed().when("origemEquipamento", {
      is: 1,
      then: () =>
        yup.string()
          .required("Obrigatório informar o número de patrimônio!"),

      otherwise: () => yup.mixed().notRequired()
    }),

  //Número de patrimônio
  //Obrigatório caso a origem do equipamento seja Patrimoniado
  //Caso não seja, não é obrigatório
  agencia:
    yup.mixed().when("origemEquipamento", {
      is: 2,
      then: () =>
        yup.number()
          .required("Obrigatório informar a agência!")
          .transform((value, originalValue) => originalValue === "" ? undefined : value),

      otherwise: () => yup.mixed().notRequired()
    }),

  agenciaOutro:
    yup.mixed().when("agencia", {
      is: 4,
      then: () => 
        yup.string()
          .required("Obrigatório informar o nome da agência!"),

      otherwise: () => yup.mixed().notRequired()
    }),

  projetoPesquisa:
    yup.object({
      numeroTermo: yup.string("Número de termo inválido!").transform((value, originalValue) => originalValue === "" ? undefined : value),
      numeroProjeto: yup.string("Número de projeto inválido!").transform((value, originalValue) => originalValue === "" ? undefined : value),
      numeroPatrimonioPP: yup.string("Número de patrimônio inválido!").transform((value, originalValue) => originalValue === "" ? undefined : value)
    }).when("origemEquipamento", {
      is: 2,
      then: (schema) => 
        schema.test(
          'pelo-menos-um', 
          'Preencha pelo menos um dos campos: N° de Termo, de projeto ou de patrimônio', 
          ValidationInputsPP
        ),
        otherwise: (schema) => schema.notRequired(),
    }),

  responsavelGuarda:
    yup.mixed().when("origemEquipamento", {
      is: 3,
      then: () => 
        yup.string()
          .required("Obrigatório informar o responsável pela guarda!"),

    otherwise: () => yup.mixed().notRequired(),
   }),

  comprovanteEnvio: 
    yup.mixed()
    .test("required", "Obrigatório comprovar o envio!", (value) => {
      return value && value.length > 0;
    })
    .test("fileSize", "O arquivo deve ser menor que 5MB!", (value) => {
      return value && value[0]?.size <= 5 * 1024 * 1024; // 5 MB
    }),


})


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

  //console.log("Erros do formulário:", errors);

  const handleClickID = (valorInput) => {
    if (valorInput && valorInput > 0) {
      SetIdChamado(valorInputID)
      SetErroDados()
    }
    else {
      SetErroDados("Erro! ID de chamado inválido")
    }
  }

  const handleCloseError = () => {
    SetErroDados()
  }

  const handleChangePatrimonio = (event, nome) => {
    // Obtém o valor digitado
    let value = event.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, '');

    //Formata o valor no padrão NNNNNNNNN-N
    if (value.length > 1) {
      value = value.slice(0, -1) + '-' + value.slice(-1);
    }

    // Atualiza o valor no input
    setValue(nome, value);
  };

  //Vetor de objetos utilizado para a parte da escolha da área do serviço
  const vetorArea =
    [
      { id: 1, icone: "FaComputer", titulo: "Informática" },
      { id: 2, icone: "FaMicrophoneLines", titulo: "Assessoria de Comunicação" },
      { id: 3, icone: "FaGears", titulo: "Serviços de Infraestrutura" },
      { id: 4, icone: "FaScrewdriverWrench", titulo: "Manutenção Predial ou de Equipamentos" }
    ]

  //Vetor de objetos utilizado para a parte da escolha do serviço
  const servicos =
    [
      { id: 3, id_setor: 1, id_categoria: 2, nome: "Impressora", descricao: "Resolver problema de impressora" },
      { id: 4, id_setor: 1, id_categoria: 2, nome: "Defeito Computador", descricao: "Resolver problema de computador" },
      { id: 14, id_setor: 1, id_categoria: 1, nome: "Direito autoral", descricao: "Resolver problema de direito autoral" },
      { id: 34, id_setor: 1, id_categoria: 1, nome: "Problema no cabo", descricao: "Resolver problema de cabo" },
      { id: 16, id_setor: 1, id_categoria: 3, nome: "Alterar email", descricao: "Resolver problema de alteração de email" },
      { id: 18, id_setor: 1, id_categoria: 3, nome: "Erro no acesso", descricao: "Resolver problema de acesso" },
      { id: 21, id_setor: 1, id_categoria: 4, nome: "Cadastro sala", descricao: "Resolver problema de cadastro de sala" },
      { id: 25, id_setor: 1, id_categoria: 4, nome: "IBM Notes", descricao: "Resolver problema de IBM Notes" },
    ]

  const categoria_servicos = [
    { id_categoria: 1, categoria: "Rede", descricao: "Serviços de rede" },
    { id_categoria: 2, categoria: "Suporte", descricao: "Serviços de suporte" },
    { id_categoria: 3, categoria: "Email", descricao: "Serviços de email" },
    { id_categoria: 4, categoria: "Sistemas", descricao: "Serviços de sistemas" },
    { id_categoria: 5, categoria: "ACBio", descricao: "Serviços de ACBio" },
    { id_categoria: 6, categoria: "Infraestrutura", descricao: "Serviços de infraestrutura" },
    { id_categoria: 7, categoria: "Manutenção Predial", descricao: "Serviços de manutenção predial" },
  ]

  const vetorInfos =
    [
      { id: 1, icone: "FaI", titulo: "Informações cadastradas no Intranet" },
      { id: 2, icone: "FaClock", titulo: "Outras informações" }
    ]

  const vetorHorarios =
    [
      { id: 1, icone: "FaArrowRightLong", titulo: "Horário corrido" },
      { id: 2, icone: "FaPause", titulo: "Horário partido" },
      { id: 3, icone: "FaAsterisk", titulo: "Horário variado" }
    ]

  const vetorSimOuNao = [
    {id: 1, icone: "FaCircleCheck", titulo: "Sim"},
    {id: 2, icone: "FaCircleXmark", titulo: "Não"}
  ]

  const vetorOrigemEquipamento = [
    {id: 1, icone: "FaBuildingColumns", titulo: "Patrimoniado"},
    {id: 2, icone: "FaVial", titulo: "Projeto de pesquisa"},
    {id: 3, icone: "FaBriefcase", titulo: "Particular"}
  ]

  const departamentos =
    [
      { id: 1, nome: "Administração" },
      { id: 2, nome: "Genética, Ecologia e Evolução" },
      { id: 3, nome: "Bioquímica e Imunologia" },
      { id: 4, nome: "Botânica" }
    ]

  const blocos_salas =
    [
      { id: 574, nome: "- Não se aplica -" },
      { id: 490, nome: "A1" },
      { id: 78, nome: "B2 - 162 - SALA DE SEMINÁRIOS" },
      { id: 20, nome: "C1 - 120 - SEÇÃO DE COMPRAS" }
    ]

  const agenciasProjetoPesquisa = [
    {id: 1, nome: "FAPEMIG"},
    {id: 2, nome: "FUNDEP"},
    {id: 3, nome: "CNPQ"},
    {id: 4, nome: "Outro"},
  ]


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
              vetor={vetorArea}
              size={80}
              setValue={setValue}
              clearErrors={clearErrors}
              nome="areaServico"
              error={errors.areaServico}
              selectedValue={watch().areaServico}
            />
            {watch().areaServico &&
              <SelectServico
                vetorServicos={servicos}
                vetorCategorias={categoria_servicos}
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
              vetor={vetorInfos}
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
                    vetor={blocos_salas}
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
              vetor={vetorHorarios}
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
              vetor={vetorSimOuNao}
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
                      vetor={vetorSimOuNao}
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
                      vetor={vetorOrigemEquipamento}
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
                        vetor={agenciasProjetoPesquisa}
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