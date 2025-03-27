import React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./NovoChamado.module.css"
import FormInput from './FormInput';
import PopUpErro from './PopUpErro';
import Loading from './Loading';

//Define as regras de cada input utilizando a biblioteca yup
const schema = yup.object({
  nome: yup.string().required("O nome é obrigatório!"),
  email: yup.string().email("Email inválido!").required("O email é obrigatório!"),
  idade: yup.number().required("O campo idade é obrigatório").positive("Idade inválida")
})


const NovoChamado = () => {

  //Utiliza o useState para criar um vetor com as variáveis do formulário e a função para atualizá-las
  const [loading, SetLoading] = useState(false)
  const [idChamado, SetIdChamado] = useState(0)
  const [valorInputID, SetValorInputID] = useState(0)
  const [erroDados, SetErroDados] = useState(false)

  //Usa o hook useForm para o controle e validação dos inputs do formulário
  const {register, handleSubmit, setValue, reset, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
      idade: "",
    },
  })

  const dadosDoBanco = {
    nome: "João Silva",
    email: "joao@email.com",
    idade: 30,
  };

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
          <h3>Para aproveitar os dados de um chamado anterior, digite o número do chamado e clique no botão</h3>
          <div className={styles.aproveitamento}>
            <input 
              type="number"
              placeholder="Digite o número do chamado"
              style={{width: "50%"}}
              onChange={(event) => SetValorInputID(event.target.value)}
            />
            <button onClick={() => handleClickID(valorInputID)}>
              Buscar
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.secao}>
            <h2>Informações Pessoais</h2>
            <FormInput
              label="Nome"
              nome="nome"
              placeholder="Digite seu nome"
              register={register}
              error={errors.nome}
            />
          </div>

          <div className={styles.secao}>
            <h2>Informações Pessoais</h2>
            <div className={styles.inputsSecao}>
              <FormInput
                label="Email"
                nome="email"
                placeholder="Digite seu email"
                register={register}
                error={errors.email}
              />

              <FormInput
                label="Idade"
                nome="idade"
                placeholder="Digite sua idade"
                register={register}
                error={errors.idade}
              />
            </div>
          </div>

          <div className={styles.submitButton}>
            <button type="submit">
              Enviar
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default NovoChamado;