export const singleShiftValidation = (value) => {
  const [start, end] = value;
  return start < end;
}

export const shiftValidation = (value) => {
  if (!Array.isArray(value) || value.length == 1) return false;

  const [start, end] = value;
  if ((start && !end) || (!start && end)) return false;
  if(!start && !end) return true;

  return start < end;
}

export const atLeastOneValidation = (value) => {
  value.forEach(elemento => {
    if(elemento[0] != undefined || elemento[0] != undefined)
      return true
  })
  return false
}
  
export const ValidationInputsPP = (values) => {
  return (
    !!values.numeroTermo?.trim() || !!values.numeroProjeto?.trim() || !!values.numeroPatrimonioPP?.trim()
  )
}