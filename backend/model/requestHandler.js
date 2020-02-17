const User = require('./user');
const Application = require('./application');
const userDAO = require('../integration/userDAO');
const validation = require('./requestValidation');
const dbError = require('../error/dbErrors');

/**
 * Extracts the credentials of the client request
 *
 * @param {*} req
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
 * @param {*} req
 * @returns String of username
 */
function extractUsername(req) {
    return req.body.username;
}
/**
 * Extracts the user from the client request.
 *
 * @param {*} req
 * @returns Instance of user.
 */
function extractUser(req) {
    validation.registerInput(req)
    const body = req.body;
    return new User(body.username, body.password, body.email, body.date, body.firstName, body.lastName);
}
/**
 * Extracts the client token from the request.
 *
 * @param {*} req
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
 * @param {*} req
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
 * @param {*} req
 * @returns Instance of application.
 */
async function extractApplication(req) {
    let availability = '';
    let applicationDate = '';
    let competenceList = [];
    let name = '';
    if (Boolean(req.query.application)) {
        application = JSON.parse(req.query.application);
        // console.log(application)
        if (application.applicationDate.startDate !== '' || application.applicationDate.endDate !== '') {
            applicationDate = application.applicationDate;
        }
        if (application.availability.startDate !== '' || application.availability.endDate !== '') {
            availability = application.availability;
        }
        competenceList = application.competence ? application.competence : [];
        name = application.name ? application.name : "";
    } else {
        const competences = await userDAO.getCompetence()
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
}