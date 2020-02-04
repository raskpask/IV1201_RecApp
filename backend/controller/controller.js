const userDAO = require('../integration/userDAO');
const validation = require('../model/requestValidation');
const requestHandler = require('../model/requestHandler');
const authToken = require('../model/authToken');

async function registerUser(req) {
    await validation.userInput(req);
    const registerUser = requestHandler.extractUser(req);
    return await userDAO.registerUser(registerUser);
}
async function authenticateUser(req) {
    const credentials = requestHandler.extractCredentials(req);
    const token = authToken.generate();
    await userDAO.authenticateUser(credentials);
    return await userDAO.changeAuthToken(credentials, token);
}
async function deAuthenticateUser(req) {
    const token = requestHandler.extractToken(req);
    return await userDAO.changeAuthToken(null, token);
}
async function getUser(req) {
    return await userDAO.getUser(requestHandler.extractToken(req));
}
async function checkIfUsernameIsAvailable(req) {
    return await userDAO.checkIfUsernameIsAvailable(requestHandler.extractUsername(req));
}
async function updateUser(req) {
    const updateUser = requestHandler.extractUser(req);
    return await userDAO.updateUser(updateUser, requestHandler.extractToken(req));
}
async function getApplication(req) {
    try {
        const token = requestHandler.extractToken(req);
        const application = await requestHandler.extractApplication(req)
        let privilegeLevel = await userDAO.getPrivilegeLevel(token);
        if (privilegeLevel == "no access") {
            return "no access";
        }
        return await userDAO.getApplication(privilegeLevel, token, application);
    } catch (error) {
        throw error
    }
}
async function createApplication(req) {
    const token = requestHandler.extractToken(req);
    const application = await requestHandler.extractApplication(req);
    const user = await userDAO.getUser(token);
    return await userDAO.createApplication(application, user);
}
async function updateApplicationStatus(req) {
    const token = requestHandler.extractToken(req)
        let privilegeLevel = await userDAO.getPrivilegeLevel(token);
        if (privilegeLevel == "no access" || privilegeLevel > 1) {
            return "no access";
        }
    return await userDAO.updateApplicationStatus(req.body.status,req.body.id);
}
async function getCompetence(req) {
    const token = requestHandler.extractToken(req)
    return await userDAO.getCompetence(token);
}
function getToken(req){
    return requestHandler.extractToken(req);
}

module.exports = {
    registerUser,
    authenticateUser,
    getUser,
    updateUser,
    getApplication,
    createApplication,
    updateApplicationStatus,
    deAuthenticateUser,
    getCompetence,
    checkIfUsernameIsAvailable,
    getToken,
}