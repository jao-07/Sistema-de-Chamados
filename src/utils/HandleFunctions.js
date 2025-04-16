export const handleClickID = (valorInput) => {
    if (valorInput && valorInput > 0) {
      SetIdChamado(valorInputID)
      SetErroDados()
    }
    else {
      SetErroDados("Erro! ID de chamado inválido")
    }
  }

export const handleCloseError = () => {
    SetErroDados()
  }

export const handleChangePatrimonio = (event, nome) => {
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