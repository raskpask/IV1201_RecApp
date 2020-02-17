const User = require('./user');
const Application = require('./application');
const userDAO = require('../integration/userDAO');
const validation = require('./requestValidation');
const dbError = require('../error/dbErrors');

/**
 * Extracts the credentials of the client request
 *
 * @param {String} req - Request from the client
 * @returns JSON of credentials.
 */
function extractCredentials(req) {
    const body = req.body;
    const credentials = {
        username: body.username,
        password: body.password
    }
    return credentials
}

/**
 * Extracts the useranme of the client request.
 *
 * @param {String} req - Request from the client
 * @returns String of username
 */
function extractUsername(req) {
    return req.body.username;
}
/**
 * Extracts the user from the client request.
 *
 * @param {String} req - Request from the client
 * @returns Instance of user.
 */
function extractUser(req) {
    validation.registerInput(req)
    const body = req.body;
    return new User(body.username, body.password, body.email, body.date, body.firstName, body.lastName);
}
/**
 * Extarct the language of the client from the cookie
 *
 * @param {String} req - Request from client
 * @returns String of language
 */
function extractLang(req){
    cookieHeader = req.headers.cookie;
    if (cookieHeader === undefined) {
        return 'en-us';
    }
    const langCookie = cookieHeader.split('lang=');
    if (langCookie === undefined || langCookie.length < 2) {
        return 'en-us';
    } 
    const lang = langCookie[1].split(';')[0];
    return lang ? lang : 'en-us';
}
/**
 * Extracts the client token from the request.
 *
 * @param {String} req - Request from the client
 * @returns String of token
 */
function extractToken(req) {
    cookieHeader = req.headers.cookie;
    if (cookieHeader === undefined) {
        throw new Error(dbError.errorCodes.NO_TOKEN_ERROR.code)
    }
    const authToken = cookieHeader.split('authToken=');
    const privToken = cookieHeader.split('privilegeLevel=');
    if (authToken === undefined || privToken === undefined) {
        throw new Error(dbError.errorCodes.NO_TOKEN_ERROR.code)
    } else if (authToken.length < 2 || privToken.length < 2) {
        throw new Error(dbError.errorCodes.NO_TOKEN_ERROR.code)

    } else if (privToken.length < 2) {
        throw new Error(dbError.errorCodes.NO_TOKEN_ERROR.code)
    }
    const token = authToken[1].split(';')[0];
    return token ? token : null;
}
/**
 * Extracts a application from client request.
 *
 * @param {String} req - Request from the client
 * @returns Instance of Application
 */
async function extractCreateApplication(req) {
    const competenceList = req.body.competence;
    const availability = req.body.availability;
    if (validation.applyInput(competenceList, availability)) {
        return new Application(availability, null, competenceList, null)
    } else {
        return null
    }

}
/**
 * Extract search params for applications from client request.
 *
 * @param {String} req - Request from the client
 * @returns Instance of application.
 */
async function extractApplication(req) {
    let availability = '';
    let applicationDate = '';
    let competenceList = [];
    let name = '';
    if (Boolean(req.query.application)) {
        application = JSON.parse(req.query.application);
        if (application.applicationDate.startDate !== '' || application.applicationDate.endDate !== '') {
            applicationDate = application.applicationDate;
        }
        if (application.availability.startDate !== '' || application.availability.endDate !== '') {
            availability = application.availability;
        }
        competenceList = application.competence ? application.competence : [];
        name = application.name ? application.name : "";
    } else {
        const competences = await userDAO.getCompetence(this.extractLang(req))
        for (i = 0; i < competences.length; i++) {
            competenceList.push(competences[i].competence_id);
        }
    }
    const date = new Date();
    if (!availability) {
        availability = {
            startDate: '1970-01-01',
            endDate: date.getFullYear() + 2000 + "-01-01"
        }
    }
    if (!applicationDate) {
        applicationDate = {
            startDate: '1970-01-01',
            endDate: date.getFullYear() + 2000 + "-01-01"
        }
    }
    return new Application(availability, applicationDate, competenceList, name);
}
module.exports = {
    extractCredentials,
    extractUser,
    extractToken,
    extractApplication,
    extractUsername,
    extractCreateApplication,
    extractLang,
}