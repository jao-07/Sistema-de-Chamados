import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FaExclamationCircle } from "react-icons/fa"

import { schema } from '../../schemas/SchemaForm'

import styles from "./NovoChamado.module.css"
import PopUpErro from '../../compontents/Novo Chamado/PopUpErro'
import Loading from '../../compontents/Novo Chamado/Loading'

import BuscarChamadoAnterior from './secoes/BuscarChamadoAnterior.jsx'
import InformacoesDoUsuario from './secoes/InformacoesDoUsuario.jsx'
import InformacoesDoServico from './secoes/InformacoesDoServico.jsx'
import DescricaoDoProblema from './secoes/DescricaoDoProblema.jsx'
import InformacoesDeContato from './secoes/InformacoesDeContato.jsx'
import InformacoesSobreEquipamento from './secoes/InformacoesSobreEquipamento.jsx'

const NovoChamado = () => {

  //useStates utilizados
  const [loading, SetLoading] = useState(false)
  const [erroDados, SetErroDados] = useState(false)

  //Usa o hook useForm para o controle e validação dos inputs do formulário
  const { register, handleSubmit, watch, setValue, clearErrors, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema), shouldFocusError: false,
    defaultValues: {
      urgencia: 1,
    },
  })


  //Função que envia os dados do formulário para o backend ao clicar no botão de submit
  const onSubmit = (data) => {
    console.log("Dados enviados:", data)
  }

  //Função que busca se tem algum erro e, caso tenha, coloca a tela no elemento que causa o erro
  const onError = (errors) => {
    const firstErrorKey = Object.keys(errors)[0];
    console.log("erro: ", firstErrorKey)
    const errorElement = document.querySelector(`[name="${firstErrorKey}"]`)
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  //console.log(errors)

  return (
    <div className={styles.container}>

      {loading && (
        <Loading />
      )}

      {erroDados && (
        <PopUpErro error={erroDados} functionClose={SetErroDados} />
      )}

      <div className={styles.form}>

        <BuscarChamadoAnterior 
          SetLoading={SetLoading}
          reset={reset}
          SetErroDados={SetErroDados}
        />

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

        <form onSubmit={handleSubmit(onSubmit, onError)}>

          <InformacoesDoUsuario 
            register={register}
            errors={errors}
          />

          <InformacoesDoServico 
            watch={watch}
            errors={errors}
            register={register}
            setValue={setValue}
            clearErrors={clearErrors}
          /> 

          <DescricaoDoProblema 
            register={register}
            errors={errors}
          />

          <InformacoesDeContato 
            watch={watch}
            errors={errors}
            register={register}
            setValue={setValue}
            clearErrors={clearErrors}
          />

          <InformacoesSobreEquipamento 
            watch={watch}
            errors={errors}
            register={register}
            setValue={setValue}
            clearErrors={clearErrors}
          />
          

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