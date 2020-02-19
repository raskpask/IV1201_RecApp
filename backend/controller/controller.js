const userDAO = require('../integration/userDAO');

const requestHandler = require('../model/requestHandler');
const authToken = require('../model/authToken');
const dbError = require('../error/dbErrors')
/**
 * Registers a user in the DB.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with 200
 */
async function registerUser(req) {
    const registerUser = requestHandler.extractUser(req);
    return await userDAO.registerUser(registerUser);
}
/**
 * Authenticate a user. Checks if the client used the right credentials and generate a cookie to set it to the user.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with the user
 */
async function authenticateUser(req) {
    const credentials = requestHandler.extractCredentials(req);
    const token = authToken.generate();
    await userDAO.authenticateUser(credentials);
    await userDAO.changeAuthToken(credentials, token);
    return await userDAO.getUser(token);
}
/**
 * Logouts a user and removes the token from the DB.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with token.
 */
async function deAuthenticateUser(req) {
    const token = requestHandler.extractToken(req);
    return await userDAO.changeAuthToken(null, token);
}
/**
 * Fetches a user from the DB.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with user
 */
async function getUser(req) {
    try {
        return await userDAO.getUser(requestHandler.extractToken(req));
    }
    catch (error) {
        throw error
    }
}
/**
 * Validates if the username is in the DB.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with a string, Username taken or Username not taken.
 */
async function checkIfUsernameIsAvailable(req) {
    return await userDAO.checkIfUsernameIsAvailable(requestHandler.extractUsername(req));
}
/**
 * Changes the the user in the DB.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with 200.
 */
async function updateUser(req) {
    const updateUser = requestHandler.extractUser(req);
    return await userDAO.updateUser(updateUser, requestHandler.extractToken(req));
}
/**
 * Fetch an application
 *
 * @param {String} req - The request of the client.
 * @returns Promise with list of all matching applications
 */
async function getApplication(req) {
    try {
        const token = requestHandler.extractToken(req);
        const application = await requestHandler.extractApplication(req)
        const lang = await requestHandler.extractLang(req);
        let privilegeLevel = await userDAO.getPrivilegeLevel(token);
        if (privilegeLevel == "no access") {
            throw new Error(dbError.errorCodes.NO_ACCESS_ERROR);
        }
        return await userDAO.getApplication(privilegeLevel, application, lang);
    } catch (error) {
        throw error
    }
}
/**
 * Creates a application. 
 *
 * @param {String} req - The request of the client.
 * @returns Promise with 200.
 */
async function createApplication(req) {
    const token = await requestHandler.extractToken(req);
    const application = await requestHandler.extractCreateApplication(req);
    const user = await userDAO.getUser(token);
    return await userDAO.createApplication(application, user);
}
/**
 * Update the application status and last edited.
 *
 * @param {String} req - The request of the client.
 * @returns {Promise} - with code 200.
 */
async function updateApplicationStatus(req) {
    const token = requestHandler.extractToken(req)
    let privilegeLevel = await userDAO.getPrivilegeLevel(token);
    if (privilegeLevel == "no access" || privilegeLevel.role_id > 1) {
        throw new Error(dbError.errorCodes.NO_ACCESS_ERROR.code);
    }
    return await userDAO.updateApplicationStatus(req.body.status, req.body.id, req.body.lastEdited);
}
/**
 * Fetches the competences of the user.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with list competences.
 */
async function getCompetence(req) {
    const lang = requestHandler.extractLang(req);
    return await userDAO.getCompetence(lang);
}
/**
 * Fetches the token of the User
 *
 * @param {String} req - The request of the client.
 * @returns String with token.
 */
function getToken(req) {
    return requestHandler.extractToken(req);
}

/**
 * Extracts language cookie from header.
 *
 * @param {String} req - Request from client
 * @returns String of language
 */
function extractLangCookie(req) {
    return requestHandler.extractLang(req);
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
    extractLangCookie,
}