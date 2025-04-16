//Vetor de objetos utilizado para a parte da escolha da área do serviço
export const vetorArea =
[
  { id: 1, icone: "FaComputer", titulo: "Informática" },
  { id: 2, icone: "FaMicrophoneLines", titulo: "Assessoria de Comunicação" },
  { id: 3, icone: "FaGears", titulo: "Serviços de Infraestrutura" },
  { id: 4, icone: "FaScrewdriverWrench", titulo: "Manutenção Predial ou de Equipamentos" }
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
  { id: 1, icone: "FaI", titulo: "Informações cadastradas no Intranet" },
  { id: 2, icone: "FaClock", titulo: "Outras informações" }
]

export const vetorHorarios =
[
  { id: 1, icone: "FaArrowRightLong", titulo: "Horário corrido" },
  { id: 2, icone: "FaPause", titulo: "Horário partido" },
  { id: 3, icone: "FaAsterisk", titulo: "Horário variado" }
]

export const vetorSimOuNao = [
{id: 1, icone: "FaCircleCheck", titulo: "Sim"},
{id: 2, icone: "FaCircleXmark", titulo: "Não"}
]

export const vetorOrigemEquipamento = [
{id: 1, icone: "FaBuildingColumns", titulo: "Patrimoniado"},
{id: 2, icone: "FaVial", titulo: "Projeto de pesquisa"},
{id: 3, icone: "FaBriefcase", titulo: "Particular"}
]

export const departamentos =
[
  { id: 1, nome: "Administração" },
  { id: 2, nome: "Genética, Ecologia e Evolução" },
  { id: 3, nome: "Bioquímica e Imunologia" },
  { id: 4, nome: "Botânica" }
]

export const blocos_salas =
[
  { id: 574, nome: "- Não se aplica -" },
  { id: 490, nome: "A1" },
  { id: 78, nome: "B2 - 162 - SALA DE SEMINÁRIOS" },
  { id: 20, nome: "C1 - 120 - SEÇÃO DE COMPRAS" }
]

export const agenciasProjetoPesquisa = [
{id: 1, nome: "FAPEMIG"},
{id: 2, nome: "FUNDEP"},
{id: 3, nome: "CNPQ"},
{id: 4, nome: "Outro"},
]