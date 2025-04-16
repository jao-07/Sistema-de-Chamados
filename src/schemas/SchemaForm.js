import * as yup from "yup";
import { timeValidation,  ValidationInputsPP} from "../utils/validações";

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
      
    //Nome da agência caso o usuário tenha selecionado a opção "Outro" no select de agências de Projeto de Pesquisa
    agenciaOutro:
      yup.mixed().when("agencia", {
        is: 4,
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
        is: 2,
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
        is: 3,
        then: () => 
          yup.string()
            .required("Obrigatório informar o responsável pela guarda!"),
  
      otherwise: () => yup.mixed().notRequired(),
     }),
  
    //Foto ou Comprovante de envio do formulário de Bens Particulares, caso o equipamento seja Particular
    comprovanteEnvio: 
      yup.mixed()
      .test("required", "Obrigatório comprovar o envio!", (value) => {
        return value && value.length > 0;
      })
      .test("fileSize", "O arquivo deve ser menor que 5MB!", (value) => {
        return value && value[0]?.size <= 5 * 1024 * 1024; // 5 MB
      }),
  
})