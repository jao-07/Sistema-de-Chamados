import React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaExclamationCircle } from "react-icons/fa";

import styles from "./NovoChamado.module.css"
import FormInput from './FormInput';
import PopUpErro from './PopUpErro';
import Loading from './Loading';
import DivEscolhas from './DivEscolhas';
import Select from './Select';

//Define as regras de cada input utilizando a biblioteca yup
const schema = yup.object({
  solicitante: yup.string().required("O nome é obrigatório!"),
  emailInstitucional: yup.string().email("Email inválido!").required("O email é obrigatório!"),
  servico: yup.string().required("Obrigatório selecionar o serviço!"),
  assunto: yup.string().required("Obrigatório escrever o assunto!"),
  descricao: yup.string().required("Obrigatório escrever a descrição!").min(20, "Descrição muito curta!")
})


const NovoChamado = () => {

  //useStates utilizados
  const [loading, SetLoading] = useState(false)
  const [idChamado, SetIdChamado] = useState(0)
  const [valorInputID, SetValorInputID] = useState(0)
  const [erroDados, SetErroDados] = useState(false)
  const [areaSelecionada, SetAreaSelecionada] = useState(null)

  //Usa o hook useForm para o controle e validação dos inputs do formulário
  const {register, handleSubmit, watch, setValue, reset, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      urgencia: 1
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
      try{
        await esperar(2000)
        const response = await Promise.resolve(dadosDoBanco)
        reset(response)
        SetErroDados(null)
        SetLoading(false)
      }
      catch(error){
        SetLoading(false)
        SetErroDados("Erro! Não foi possível carregar os dados")
      }
    }
    getDados(idChamado)
    SetIdChamado()
  }, [idChamado])

  //Função que envia os dados do formulário para o backend ao clicar no botão de submit
  const onSubmit = (data) => console.log("Dados enviados:", data);

  const handleClickID = (valorInput) => {
    if(valorInput && valorInput > 0){
      SetIdChamado(valorInputID)
      SetErroDados()
    }
    else{
      SetErroDados("Erro! ID de chamado inválido")
    } 
  }

  const handleCloseError = () => {
    SetErroDados()
  }

  const selecionaArea = (id) => {
    SetAreaSelecionada(id)
    console.log("Area selecionada: " + areaSelecionada)
  }

  //Vetor de objetos utilizado para a parte da escolha da área do serviço
  const vetorArea = 
  [
    {id: 1, icone: "FaComputer", titulo:"Informática"},
    {id: 2, icone: "FaMicrophoneLines", titulo:"Assessoria de Comunicação"},
    {id: 3, icone: "FaGears", titulo:"Serviços de Infraestrutura"},
    {id: 4, icone: "FaScrewdriverWrench", titulo:"Manutenção Predial ou de Equipamentos"}
  ]

  //Vetor de objetos utilizado para a parte da escolha do serviço
  const servicos =
  [
    {id: 3, id_setor: 1, id_categoria: 2, nome:"Impressora", descricao:"Resolver problema de impressora"},
    {id: 4, id_setor: 1, id_categoria: 2, nome:"Defeito Computador", descricao:"Resolver problema de computador"},
    {id: 14, id_setor: 1, id_categoria: 1, nome:"Direito autoral", descricao:"Resolver problema de direito autoral"},
    {id: 34, id_setor: 1, id_categoria: 1, nome:"Problema no cabo", descricao:"Resolver problema de cabo"},
    {id: 16, id_setor: 1, id_categoria: 3, nome:"Alterar email", descricao:"Resolver problema de alteração de email"},
    {id: 18, id_setor: 1, id_categoria: 3, nome:"Erro no acesso", descricao:"Resolver problema de acesso"},
    {id: 21, id_setor: 1, id_categoria: 4, nome:"Cadastro sala", descricao:"Resolver problema de cadastro de sala"},
    {id: 25, id_setor: 1, id_categoria: 4, nome:"IBM Notes", descricao:"Resolver problema de IBM Notes"},
  ]

  const categoria_servicos = [
    {id_categoria: 1, categoria: "Rede", descricao:"Serviços de rede"},
    {id_categoria: 2, categoria: "Suporte", descricao:"Serviços de suporte"},
    {id_categoria: 3, categoria: "Email", descricao:"Serviços de email"},
    {id_categoria: 4, categoria: "Sistemas", descricao:"Serviços de sistemas"},
    {id_categoria: 5, categoria: "ACBio", descricao:"Serviços de ACBio"},
    {id_categoria: 6, categoria: "Infraestrutura", descricao:"Serviços de infraestrutura"},
    {id_categoria: 7, categoria: "Manutenção Predial", descricao:"Serviços de manutenção predial"},
  ]


  return (
    <div className={styles.container}>

      {loading && (
        <Loading />
      )}

      {erroDados && (
        <PopUpErro error={erroDados} functionClose={handleCloseError}/>
      )}

      <div className={styles.form}>

      <div className={styles.secao}>
          <p>Para aproveitar os dados de um chamado anterior, digite o número do chamado e clique no botão</p>
          <div className={styles.aproveitamento}>
            <input 
              type="number"
              placeholder="Digite o número do chamado"
              style={{width: "70%"}}
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
            <DivEscolhas 
              vetor={vetorArea} 
              size={80} 
              onEscolha={selecionaArea} 
              idSelecionado={areaSelecionada}
            />
            {areaSelecionada &&
              <Select 
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