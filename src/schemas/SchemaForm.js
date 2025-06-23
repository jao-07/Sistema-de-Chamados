import * as yup from "yup";
import { singleShiftValidation, atLeastOneValidation,  ValidationInputsPP, shiftValidation} from "../utils/validações";

//Define as regras de cada input utilizando a biblioteca yup
export const schema = yup.object({
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
      yup.string()
        .required("Origatório escolher a área do serviço!"),
  
    //ID do serviço escolhido
    servico:
      yup.string()
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

    justificativa:
      yup.mixed().when("urgencia", {
        is: "1",
        then: () => yup.string().notRequired(),
        otherwise: () => yup.string().required("Obrigatório escrever a justificativa de urgência/emergência!")
      }),

  
    //Opção escolhida para quais informações de contato utilizar, 1 para intranet, 2 para outras
    infoContato: 
      yup.string()
      .required("Origatório escolher uma opção para contato!"),
  
    //ID do departamento escolhido
    departamento: 
      yup.string()
      .required("Obrigatório informar o departamento!"),
  
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
    
    //Opção escolhida para o tipo de horário, Horário continuo, Horário partido ou Horário variado
    tipoHorario: 
      yup.string()
      .required("Origatório escolher o horário a ser contactado!"),
  
    //Horários definidos nos campos de horário contínuo
    //É definido como um array de horarios (string)
    horarioContinuo: yup.mixed().when("tipoHorario", {
      is: "Horário continuo",
      then: () =>
        yup
          .array()
          .of(
            yup
              .string()
              .transform((value, originalValue) => originalValue === "" ? undefined : value)
              .matches(/^([0-9]{2}):([0-9]{2})$/, "Formato inválido!")
          )
          .length(2, "Informe os dois horários")
          .required("Informe o horário contínuo")
          .test("valid-range", "Horários passados inválidos!", singleShiftValidation),
      otherwise: () => yup.mixed().notRequired()
    }),
  
    //Horários definidos nos campos de horário partido
    //É definido como uma matriz, de dois arrays com dois horários (string) cada
    horarioPartido: yup.mixed().when("tipoHorario", {
      is: "Horário partido",
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
              .test("valid-range", "Horários passados inválidos!", shiftValidation)
          )
          .length(2)
          .test("pelo menos um turno preenchido", "Preencha pelo menos um turno!", atLeastOneValidation)
          .required("Informe os horários do turno partido"),
      otherwise: () => yup.mixed().notRequired()
    }),
    
    //Horários definidos nos campos de horário variado
    //É definido como uma matriz com 10 vetores, com dois horários (string) cada
    horarioVariado: yup.mixed().when("tipoHorario", {
      is: "Horário variado",
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
              .test("turno preenchido corretamente", "Horários passados inválidos!", shiftValidation)
              .required("Informe os horários do turno variado")
          )
          .length(10)
          .test("pelo menos um turno preenchido", "Preencha pelo menos um turno!", atLeastOneValidation)
          .required("Informe os horários do turno variado"),
      otherwise: () => yup.mixed().notRequired()
    }),
  
    //Se o chamado está relacionado a algum equipamento ou não
    relacionadoEquipamento:
      yup.string()
        .required("Obrigatório informar se o chamado envolve algum equipamento!"),
  
    //Se o chamado é para o computador do usuário ou não
    //1 = sim, 2 = não
    seuComputador:
      yup.string()
        .required("Obrigatório informar se é para seu computador ou não!"),
        //.transform((value, originalValue) => originalValue === "" ? undefined : value),
  
    //Origem do equipamento
    origemEquipamento:
      yup.mixed().when("seuComputador", {
        is: "Sim",
        then: () => yup.string().required("Obrigatório informar a origem do equipamento!"),
        otherwise: () => yup.string().notRequired()
      }),
      
  
    //Número de patrimônio
    //Obrigatório caso a origem do equipamento seja Patrimoniado
    //Caso não seja, não é obrigatório
    numeroPatrimonioEquipamentoPatrimoniado:
      yup.mixed().when("origemEquipamento", {
        is: "Patrimoniado",
        then: () =>
          yup.string()
            .required("Obrigatório informar o número de patrimônio!"),
  
        otherwise: () => yup.mixed().notRequired()
      }),
  
    //Agência
    //Obrigatório caso a origem do equipamento seja Projeto de Pesquisa
    //Caso não seja, não é obrigatório
    agencia:
      yup.mixed().when("origemEquipamento", {
        is: "Projeto de pesquisa",
        then: () =>
          yup.string()
            .required("Obrigatório informar a agência!"),
  
        otherwise: () => yup.mixed().notRequired()
      }),
      
    //Nome da agência caso o usuário tenha selecionado a opção "Outro" no select de agências de Projeto de Pesquisa
    agenciaOutro:
      yup.mixed().when("agencia", {
        is: "Outro",
        then: () => 
          yup.string()
            .required("Obrigatório informar o nome da agência!"),
  
        otherwise: () => yup.mixed().notRequired()
      }),
      
    //Inputs para identificar qual o projeto de pesquisa do usuário
    //O usuário pode colocar o N° do termo, N° de Projeto ou N° de Patrimônio
    //Caso tenha pelo menos um desses, não ocorrem erros
    //Porém se não tiver nenhum desses, gera um erro
    projetoPesquisa:
      yup.object({
        numeroTermo: yup.string("Número de termo inválido!").transform((value, originalValue) => originalValue === "" ? undefined : value),
        numeroProjeto: yup.string("Número de projeto inválido!").transform((value, originalValue) => originalValue === "" ? undefined : value),
        numeroPatrimonioPP: yup.string("Número de patrimônio inválido!").transform((value, originalValue) => originalValue === "" ? undefined : value)
      }).when("origemEquipamento", {
        is: "Projeto de pesquisa",
        then: (schema) => 
          schema.test(
            'pelo-menos-um', 
            'Preencha pelo menos um dos campos: N° de Termo, de projeto ou de patrimônio', 
            ValidationInputsPP
          ),
          otherwise: (schema) => schema.notRequired(),
      }),
  
    //Nome do responsável pela guarda do equipamento, se o equipamento for Particular
    responsavelGuarda:
      yup.mixed().when("origemEquipamento", {
        is: "Particular",
        then: () => 
          yup.string()
            .required("Obrigatório informar o responsável pela guarda!"),
  
      otherwise: () => yup.mixed().notRequired(),
     }),
  
    //Foto ou Comprovante de envio do formulário de Bens Particulares, caso o equipamento seja Particular
    comprovanteEnvio: 
      yup.mixed().when("origemEquipamento", {
        is: "Particular",
        then: () => 
          yup.mixed()
            .test("required", "Obrigatório comprovar o envio!", (value) => {
              return value && value.length > 0;
            })
            .test("fileSize", "O arquivo deve ser menor que 5MB!", (value) => {
              return value && value[0]?.size <= 5 * 1024 * 1024; // 5 MB
            }),

        otherwise: () => yup.mixed().notRequired()
      })
      
})