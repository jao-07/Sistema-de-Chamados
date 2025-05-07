import styles from '../NovoChamado.module.css'
import FormChooses from '../../../compontents/Novo Chamado/FormChooses'
import SelectServico from '../../../compontents/Novo Chamado/SelectServico'
import * as options from '../../../utils/options'
import { useEffect, useState } from 'react'

const InformacoesDoServico = ({watch, errors, register, setValue, clearErrors, setores, categorias, servicos}) => {
  const [categoriasFiltradas, SetCategoriasFiltradas] = useState([])

  useEffect(() => {
    if(watch().areaServico == "Informática"){
      SetCategoriasFiltradas(categorias.slice(0,4))
    }   
    else if(watch().areaServico == "Assessoria de Comunicação"){
        SetCategoriasFiltradas(categorias.slice(4,5))
    }
    else if(watch().areaServico == "Serviços de Infraestrutura"){
        SetCategoriasFiltradas(categorias.slice(5,6))
    }
    else{
        SetCategoriasFiltradas(categorias.slice(6,7))
    }
  }, [watch().areaServico])

  return (
    <div className={styles.secao}>
      <h2>Informações do serviço</h2>
      <p>Escolha a área do serviço desejado</p>
      <FormChooses
        vetor={setores}
        size={80}
        setValue={setValue}
        clearErrors={clearErrors}
        nome="areaServico"
        error={errors.areaServico}
        selectedValue={watch().areaServico}
      />
      {watch().areaServico &&
        <p style={{paddingBottom: "50px"}}>Chamados para {setores.find(item => item.titulo == watch().areaServico)?.observacao}</p>
      }
      {watch().areaServico &&
        <SelectServico
          vetorServicos={servicos}
          vetorCategorias={categoriasFiltradas}
          titulo="Escolha o serviço"
          nome="servico"
          placeholder="Escolha o serviço requerido"
          register={register}
          error={errors.servico}
          selectedValue={watch().servico}
        />
      }
    </div>
  )
}

export default InformacoesDoServico;