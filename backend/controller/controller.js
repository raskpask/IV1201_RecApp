const userDAO = require('../integration/userDAO');
const User = require('../model/user');
const validation = require('../model/requestValidation');
const requestHandler = require('../model/requestHandler');
const authToken = require('../model/authToken');

async function registerUser(body, res) {
    await validation.userInput(body, res);
    const registerUser = new User(body.username, body.password, body.email, body.date, body.firstName, body.lastName);
    return await userDAO.registerUser(registerUser);
}
async function authenticateUser(body) {
    const credentials = requestHandler.extractCredentials(body);
    const token = authToken.generate();
    await userDAO.authenticateUser(credentials);
    return await userDAO.changeAuthToken(credentials, token);
}
async function getUser(req){
    // console.log(token)
    return await userDAO.getUser(req.headers.cookie);
}
module.exports = {
    registerUser,
    authenticateUser,
    getUser,

}