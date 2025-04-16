export const timeValidation = (value) => {
    if (!Array.isArray(value) || value.length < 2) return false;
  
    const [start, end] = value;
    if (!start || !end) return false;
    if(start == "" || end == "") return false;
  
    return start < end;
  }
  
export const ValidationInputsPP = (values) => {
    return (
      !!values.numeroTermo?.trim() || !!values.numeroProjeto?.trim() || !!values.numeroPatrimonioPP?.trim()
    )
  }