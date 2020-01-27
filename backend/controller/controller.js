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
async function deAuthenticateUser(req){
    const token = requestHandler.extractToken(req);
    return await userDAO.changeAuthToken(null,token);
}
async function getUser(req) {
    return await userDAO.getUser(requestHandler.extractToken(req));
}
async function updateUser(req) {
    // console.log(req.body)
    const updateUser = requestHandler.extractUser(req);
    return await userDAO.updateUser(updateUser, requestHandler.extractToken(req));
}
async function getApplication(req) {
    const token = requestHandler.extractToken(req);
    return await userDAO.getApplication(token);
}
async function createApplication(req) {
    const token = requestHandler.extractToken(req);
    const application = requestHandler.extractApplication(req);
    return await userDAO.getApplication(application, token);
}
async function listApplications(req) {
    const token = requestHandler.extractToken(req)
    return await userDAO.listApplications(token);
}


module.exports = {
    registerUser,
    authenticateUser,
    getUser,
    updateUser,
    getApplication,
    createApplication,
    listApplications,
    deAuthenticateUser,

}