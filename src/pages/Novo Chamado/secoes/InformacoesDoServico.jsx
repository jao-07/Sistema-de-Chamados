import styles from '../NovoChamado.module.css'
import FormChooses from '../../../compontents/Novo Chamado/FormChooses'
import SelectServico from '../../../compontents/Novo Chamado/SelectServico'
import * as options from '../../../utils/options'

const InformacoesDoServico = ({watch, errors, register, setValue, clearErrors}) => {
  return (
    <div className={styles.secao}>
        <h2>Informações do serviço</h2>
        <p>Escolha a área do serviço desejado</p>
        <FormChooses
            vetor={options.vetorArea}
            size={80}
            setValue={setValue}
            clearErrors={clearErrors}
            nome="areaServico"
            error={errors.areaServico}
            selectedValue={watch().areaServico}
        />
        {watch().areaServico &&
            <SelectServico
            vetorServicos={options.servicos}
            vetorCategorias={options.categoria_servicos}
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