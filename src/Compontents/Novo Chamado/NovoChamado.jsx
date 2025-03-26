import React from 'react';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./NovoChamado.module.css"
import FormInput from './FormInput';

//Define as regras de cada input utilizando a biblioteca yup
const schema = yup.object({
  nome: yup.string().required("O nome é obrigatório!"),
  email: yup.string().email("Email inválido!").required("O email é obrigatório!")
})


const NovoChamado = () => {

  //define a variável id como new no caso de um novo chamado ou como o id passado na tela inicial para aproveitar os dados de um chamado
  const params = useParams()
  const id = params.idChamado || "new";

  //Utiliza o useState para criar um vetor com as variáveis do formulário e a função para atualizá-las
  const [variaveisForm, SetVariaveisForm] = useState([])

  //Utiliza useEffect para buscar as informações do chamado de que se quer aproveitar
  useEffect(() => {
    try{
      if(id != "new"){
        console.log(`Busca pelo chamado ${id}`)
        //axios para buscar as variaveis do chamado do determinado id
        //SetVariaveisForm(variaveis)
      }
    }
    catch(error){
      console.error(`Erro ao obter o chamado ${id}`)
    }
  }, [])

  //Usa o hook useForm para o controle e validação dos inputs do formulário
  const {register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  })

  //Função que envia os dados do formulário para o backend ao clicar no botão de submit
  const onSubmit = (data) => console.log("Dados enviados:", data);

//   return (
//     <div style={{display: "flex", justifyContent: "center", marginTop: "300px"}}>
//         <img src="/loading.svg" alt="Carregando"/>
//     </div>
// )  

  return (
    <div className={styles.container}>

      <div className={styles.form}>

        <div className={styles.secao}>
          <h3>Para aproveitar os dados de um chamado anterior, digite o número do chamado e clique no botão</h3>
          <div className={styles.aproveitamento}>
            <input 
              type="number"
              placeholder="Digite o número do chamado"
              style={{width: "50%"}}
            />
            <button>
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
                label="Email"
                nome="email"
                placeholder="Digite seu email"
                register={register}
                error={errors.email}
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