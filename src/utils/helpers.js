export const handleClickID = (valorInput, SetIdChamado, SetErroDados) => {
    if (valorInput && valorInput > 0) {
      SetIdChamado(valorInput)
      SetErroDados(null)
    }
    else {
      SetErroDados("Erro! ID de chamado inválido")
    }
  }

export const handleChangePatrimonio = (event, nome, setValue) => {
    // Obtém o valor digitado
    let value = event.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, '');

    //Formata o valor no padrão NNNNNNNNN-N
    if (value.length > 1) {
      value = value.slice(0, -1) + '-' + value.slice(-1);
    }

    // Atualiza o valor no input
    setValue(nome, value);
  };

const trataHorarioContinuo = (horario) => {
  return horario.split(",")
}

const trataHorarioPartido = (horario) => {
  const vetorHorario = horario.split(",")
  return Array([vetorHorario[0], vetorHorario[1]], [vetorHorario[2], vetorHorario[3]])
}

//Trata strings de horários como ex.: "12:3013:00--:----:--12:3013:30--:----:----:----:--13:0021:3012:3013:30--:----:----:----:----:----:--"
const trataHorarioVariado = (horario) => {
  const vetorHorario = []
  var vetorAuxiliar = []
  for(let i=0; i<horario.length; i+=10){
    if(horario[i] != "-"){
      vetorAuxiliar[0] = horario.substring(i, i + 5)
      vetorAuxiliar[1] = horario.substring(i+5, i+10)
      vetorHorario.push([...vetorAuxiliar])
    }
    else{
      vetorHorario.push(["", ""])
    }
  }
  return vetorHorario
}

export const trataHorarioIntranet = (horario, setValue) => {
  if(horario.length == 11){
    setValue("tipoHorario", "Horário continuo")
    setValue("horarioContinuo", trataHorarioContinuo(horario))
    return 
  }

  if(horario.length == 23){
    setValue("tipoHorario", "Horário partido")
    setValue("horarioPartido", trataHorarioPartido(horario))
    return
  }

  setValue("tipoHorario", "Horário variado")
  setValue("horarioVariado", trataHorarioVariado(horario))
}