const userDAO = require('../integration/userDAO');

const validation = require('../model/requestValidation');
const requestHandler = require('../model/requestHandler');
const authToken = require('../model/authToken');

async function registerUser(req, res) {
    await validation.userInput(body, res);
    const registerUser = requestHandler.extractUser(req);
    return await userDAO.registerUser(registerUser);
}
async function authenticateUser(req) {
    const credentials = requestHandler.extractCredentials(req);
    const token = authToken.generate();
    await userDAO.authenticateUser(credentials);
    return await userDAO.changeAuthToken(credentials, token);
}
async function getUser(req){
    return await userDAO.getUser(requestHandler.extractCookie(req));
}
async function updateUser(req){
    console.log(req.body)
    const updateUser = requestHandler.extractUser(req);
    return await userDAO.updateUser(updateUser,requestHandler.extractCookie(req));
}

module.exports = {
    registerUser,
    authenticateUser,
    getUser,
    updateUser,

}