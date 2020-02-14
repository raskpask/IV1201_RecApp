const validateCompitence = (newState,errorMessages) =>{
    const yoe = newState.competence.numberOfYears;
    if(yoe.value === ""){
        setInvalid(yoe, errorMessages.emptyField.message)
    }else if(isNaN(yoe.value)){
        setInvalid(yoe, errorMessages.notNumber.message)
    }
    else{
        setValid(yoe,"");
    }
    return newState;
}
const setInvalid = (value, message) =>{
    value.isValid = false;
    value.isInvalid = true;
    value.message = message;
    return value;
  }
  const setValid = (value, message) =>{
    value.isValid = true;
    value.isInvalid = false;
    value.message = message;
    return value;
  }
export {
    validateCompitence,
}