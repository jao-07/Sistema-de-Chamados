//Vetor de objetos utilizado para a parte da escolha da área do serviço
export const vetorArea =
[
  {icone: "FaComputer", titulo: "Informática" },
  {icone: "FaMicrophoneLines", titulo: "Assessoria de Comunicação" },
  {icone: "FaGears", titulo: "Serviços de Infraestrutura" },
  {icone: "FaScrewdriverWrench", titulo: "Manutenção Predial ou de Equipamentos" }
]

//Vetor de objetos utilizado para a parte da escolha do serviço
export const servicos =
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

export const categoria_servicos = [
{ id_categoria: 1, categoria: "Rede", descricao: "Serviços de rede" },
{ id_categoria: 2, categoria: "Suporte", descricao: "Serviços de suporte" },
{ id_categoria: 3, categoria: "Email", descricao: "Serviços de email" },
{ id_categoria: 4, categoria: "Sistemas", descricao: "Serviços de sistemas" },
{ id_categoria: 5, categoria: "ACBio", descricao: "Serviços de ACBio" },
{ id_categoria: 6, categoria: "Infraestrutura", descricao: "Serviços de infraestrutura" },
{ id_categoria: 7, categoria: "Manutenção Predial", descricao: "Serviços de manutenção predial" },
]

export const vetorInfos =
[
  {icone: "FaI", titulo: "Informações cadastradas no Intranet" },
  {icone: "FaClock", titulo: "Outras informações" }
]

export const vetorHorarios =
[
  {icone: "FaArrowRightLong", titulo: "Horário corrido" },
  {icone: "FaPause", titulo: "Horário partido" },
  {icone: "FaAsterisk", titulo: "Horário variado" }
]

export const vetorSimOuNao = [
{icone: "FaCircleCheck", titulo: "Sim"},
{icone: "FaCircleXmark", titulo: "Não"}
]

export const vetorOrigemEquipamento = [
{icone: "FaBuildingColumns", titulo: "Patrimoniado"},
{icone: "FaVial", titulo: "Projeto de pesquisa"},
{icone: "FaBriefcase", titulo: "Particular"}
]

export const departamentos = ["Administração","Genética, Ecologia e Evolução","Bioquímica e Imunologia","Botânica"]

export const blocos_salas = ["- Não se aplica -","A1", "B2 - 162 - SALA DE SEMINÁRIOS", "C1 - 120 - SEÇÃO DE COMPRAS"]

export const agenciasProjetoPesquisa = [ "FAPEMIG", "FUNDEP", "CNPQ", "Outro"]