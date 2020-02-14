const validator = (changedValueName,userState,errorMessages) => {
  //changedValueName will be "null" if it is a form submittion that is being validated
  let isFormSubmit = false;
  if(changedValueName === null){
    isFormSubmit = true;
  }
  //We set the "valueHasChanged" on the changed element to true
  if(!isFormSubmit)
  userState = {
    ...userState,
    [changedValueName]:{
      ...userState[changedValueName],
      valueHasChanged:true
    }
  }
  let firstName = { ...userState.firstName };
  let lastName = { ...userState.lastName };
  let email = { ...userState.email };
  let date = { ...userState.date };
  let username = { ...userState.username };
  let password = { ...userState.password };
  let confirmPassword = { ...userState.confirmPassword };
  let isGood = false;

  firstName = checkFirstName(firstName, isFormSubmit, errorMessages);
  lastName = checkLastName(lastName, isFormSubmit, errorMessages);
  email = checkEmail(email, isFormSubmit, errorMessages);
  date = checkDate(date, isFormSubmit, errorMessages);
  username = checkUsername(username, isFormSubmit, errorMessages);
  password = checkPassword(password, isFormSubmit, errorMessages);
  confirmPassword = checkConfirmPassword(confirmPassword, password, isFormSubmit, errorMessages);

  if(isFormSubmit && (firstName.isValid && lastName.isValid && email.isValid && 
    date.isValid && username.isValid && password.isValid && confirmPassword.isValid)) isGood = true;
  userState = {
    ...userState,
    firstName,
    lastName,
    email,
    date,
    username,
    password,
    confirmPassword,
    validated: isGood
  }
  return userState;
}
const checkFirstName = (firstName, isFormSubmit, errorMessages) =>{
  if(!firstName.valueHasChanged && !isFormSubmit) return firstName;
  if (firstName.value === "") {
    firstName = setInvalid(firstName, errorMessages.emptyField.message);
  }else if(isNotUnicode(firstName.value)){
    firstName = setInvalid(firstName, errorMessages.notUnicode.message);
  }
  else{
    firstName = setValid(firstName, "")
  }
  return firstName;
}
const checkLastName = (lastName, isFormSubmit, errorMessages) =>{
  if(!lastName.valueHasChanged && !isFormSubmit) return lastName;
  if (lastName.value === "") {
    lastName = setInvalid(lastName, errorMessages.emptyField.message);
  }else if(isNotUnicode(lastName.value)){
    lastName = setInvalid(lastName, errorMessages.notUnicode.message);
  }
  else{
    lastName = setValid(lastName, "")
  }
  return lastName;
}
const checkEmail = (email, isFormSubmit, errorMessages) =>{
    if(!email.valueHasChanged && !isFormSubmit) return email;
    if (email.value === "") {
      email = setInvalid(email, errorMessages.emptyField.message);
    }else if(!isEmail(email.value)){
      email = setInvalid(email, errorMessages.notValidField.message.replace("FIELD", email.name));
    }else if(isNotUnicode(email.value)){
      email = setInvalid(email, errorMessages.notUnicode.message);
    }
    else{
      email = setValid(email, "")
    }
    return email;
}
const checkDate = (date, isFormSubmit, errorMessages) =>{
  if(!date.valueHasChanged && !isFormSubmit) return date;
  if (date.value === "") {
    date = setInvalid(date, errorMessages.emptyField.message);
  }else if(isFutureDate(date.value)){
    date = setInvalid(date, errorMessages.notValidField.message.replace("FIELD", date.name));
  }else{
    date = setValid(date, "")
  }
  return date;
}
const checkUsername = (username, isFormSubmit, errorMessages) =>{
  const usernameMaxLength = 60;
  //if username has not been changed then we do not validate(unless it is a form submittion)
  if(!username.valueHasChanged && !isFormSubmit) return username;
  //Empty field
  if (username.value === "") {
    username = setInvalid(username, errorMessages.emptyField.message);
  }else if(!maxLength(username.value, usernameMaxLength)){
    username = setInvalid(username, errorMessages.toLongField.message.replace("FIELD", username.name).replace("MAXNUM", usernameMaxLength));
  }else if(!isAlphaNumerical(username.value)){
    username = setInvalid(username, errorMessages.invalidCharacters.message.replace("FIELD", username.name));
  }else if(username.alreadyTakenUsernames.includes(username.value)){
    username = setInvalid(username, errorMessages.duplicateUsername.message);
  }
  else{
    username = setValid(username, "")
  }
  return username;
}
const checkPassword = (password, isFormSubmit, errorMessages) =>{
  const passwordMinLength = 7;
  if(!password.valueHasChanged && !isFormSubmit) return password;
  if (password.value === "") {
    password = setInvalid(password, errorMessages.emptyField.message);
  }else if(!minLength(password.value, passwordMinLength)){
    password = setInvalid(password, errorMessages.toShortField.message.replace("FIELD", password.name).replace("MINNUM", passwordMinLength));
  }else if(isNotUnicode(password.value)){
    password = setInvalid(password, errorMessages.notUnicode.message);
  }
  else{
    password = setValid(password, "")
  }
  return password;
}
const checkConfirmPassword = (confirmPassword, password, isFormSubmit, errorMessages) =>{
  if(!confirmPassword.valueHasChanged && !isFormSubmit) return confirmPassword;
  if (confirmPassword.value === "") {
    confirmPassword = setInvalid(confirmPassword, errorMessages.emptyField.message);
  }else if(confirmPassword.value === password.value){
    confirmPassword = setValid(confirmPassword, "")
  }else if(isNotUnicode(confirmPassword.value)){
    confirmPassword = setInvalid(confirmPassword, errorMessages.notUnicode.message);
  }
  else{
    confirmPassword = setInvalid(confirmPassword, errorMessages.noMatchPassword.message);
  }
  return confirmPassword;
}
const minLength = (value, length) =>{
  if(value.length<length){
    return false;
  }
  return true;
}
const maxLength = (value, length) =>{
  if(value.length>length){
    return false;
  }
  return true;
}
const isEmail = (value) =>{
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}
const isFutureDate = (date) =>{
  const today = new Date();
  const selectedDate = new Date(date);
  //if the selectedDate is in the future of today
  if(today.getTime()<selectedDate.getTime()){
    return true;
  }
  
  return false;
}
const isAlphaNumerical = (value) => {
  let len, i, code;
  for (i = 0, len = value.length; i < len; i++) {
    code = value.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}
function isNotUnicode(value) {
  for (var i = 0, n = value.length; i < n; i++) {
      if (value.charCodeAt( i ) > 255) { return true; }
  }
  return false;
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
  validator,
}
