const dbError = require('../error/dbErrors');

function registerInput(req) {
        const body = req.body;
        if (!body || !body.username || !body.password || !body.email || !body.date || !body.firstName || !body.lastName) {
            throw Error(dbError.errorCodes.WRONG_REGISTER_INPUT);
        }
        if (checkUsername(body.username) && checkPassword(body.password) && checkEmail(body.email) && checkDate(body.date) && checkName(body.firstName) && checkName(body.lastName)) {
            return true;
        }
        throw Error(dbError.errorCodes.WRONG_REGISTER_INPUT_ERROR);
}
function checkUsername(username) {
    const regEx = /([0-9]|[a-z]|[A-Z])/g;
    if (!Boolean(username.match(regEx)) || username.length < 1) {
        return false
    }
    return true;
}
function checkPassword(password) {
    if (checkUnicode(password) && password.length > 6) {
        return true;
    }
    return false;
}
function checkEmail(email) {
    email = email.split('@');
    if (email.length < 2 || email.length > 2 || email[1].split('.').length < 2) {
        return false;
    }
    return true;
}
function checkDate(date) {
    const regEx = /[0-9]/g;
    date = date.split('-');
    if (date.lengt < 3 || date.length > 3) {
        return false;
    }
    for (let number in date) {
        if (!Boolean(number.match(regEx))) {
            return false;
        }
    }
    return true;

}
function checkName(name) {
    if (checkUnicode(name) && name.length > 0) {
        return true;
    }
    return false;
}
function checkUnicode(string) {
    for (i = 0; i < string.length; i++) {
        if (string.charCodeAt(i) > 255) {
            return false;
        }
    }
    return true;
}
module.exports = {
    registerInput,

}