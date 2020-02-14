const userDAO = require('../integration/userDAO');

const requestHandler = require('../model/requestHandler');
const authToken = require('../model/authToken');
const dbError = require('../error/dbErrors');
async function registerUser(req) {
    const registerUser = requestHandler.extractUser(req);
    return await userDAO.registerUser(registerUser);
}
async function authenticateUser(req) {
    const credentials = requestHandler.extractCredentials(req);
    const token = authToken.generate();
    await userDAO.authenticateUser(credentials);
    await userDAO.changeAuthToken(credentials, token);
    return await userDAO.getUser(token);
}
async function deAuthenticateUser(req) {
    const token = requestHandler.extractToken(req);
    return await userDAO.changeAuthToken(null, token);
}
async function getUser(req) {
    try {
        return await userDAO.getUser(requestHandler.extractToken(req));
    }
    catch (error) {
        throw error
    }
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
            throw new Error(dbError.errorCodes.NO_ACCESS_ERROR);
        }
        return await userDAO.getApplication(privilegeLevel, token, application);
    } catch (error) {
        throw error
    }
}
async function createApplication(req) {
    const token = await requestHandler.extractToken(req);
    const application = await requestHandler.extractCreateApplication(req);
    const user = await userDAO.getUser(token);
    return await userDAO.createApplication(application, user);
}
async function updateApplicationStatus(req) {
    const token = requestHandler.extractToken(req)
    let privilegeLevel = await userDAO.getPrivilegeLevel(token);
    if (privilegeLevel == "no access" || privilegeLevel.role_id > 1) {
        throw new Error(dbError.errorCodes.NO_ACCESS_ERROR.code);
    }
    return await userDAO.updateApplicationStatus(req.body.status, req.body.id);
}
async function getCompetence(req) {
    const token = requestHandler.extractToken(req)
    return await userDAO.getCompetence(token);
}
function getToken(req) {
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