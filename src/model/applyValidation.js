const validateCompitence = (type,newState,errorMessages) =>{
    if(type === "yoe"){
        return competenceYOEValidation(newState,errorMessages);
    }else if(type ==="competenceType"){
        return competenceTypeValidation(newState,errorMessages);
    }else{
        const yoeState = competenceYOEValidation(newState,errorMessages);
        const competenceTypeState = competenceTypeValidation(newState,errorMessages);
        return{
            ...newState, 
            competence:{
                competenceType:{...competenceTypeState.competence.competenceType},
                numberOfYears:{...yoeState.competence.numberOfYears},
            }
        }
    }    
}
const competenceYOEValidation = (newState, errorMessages) =>{
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
const competenceTypeValidation = (newState, errorMessages) =>{
    const competenceType = newState.competence.competenceType;
    if(!competenceType.valueHasChanged){
        competenceType.message = errorMessages.competenceTypeNotChoosen.message;
        competenceType.isInvalid = true;
       };
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
//Validates whole form. Called when the "Submit application" button is clicked
const validateForm = (state, errorMessages)=>{
    if(state.addedCompetences.length===0 && state.availability.length===0){
        state ={
            ...state,
            form:{
                noCompetences:true,
                noAvailability:true,
                message:errorMessages.bothCompAndAvailMissing.message,
            }
        }
    }else if(state.addedCompetences.length===0){
        state ={
            ...state,
            form:{
                noCompetences:true,
                noAvailability:false,
                message:errorMessages.compMissing.message,
            }
        }
    }else if(state.availability.length===0){
        state ={
            ...state,
            form:{
                noCompetences:false,
                noAvailability:true,
                message:errorMessages.availMissing.message,
            }
        }
    }
    return state;
}
export {
    validateCompitence,
    validateForm,
}