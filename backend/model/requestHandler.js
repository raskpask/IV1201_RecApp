const User = require('./user');
const Application = require('./application');
const userDAO = require('../integration/userDAO');
const validation = require('./requestValidation');
const dbError = require('../error/dbErrors');

function extractCredentials(req) {
    const body = req.body;
    const credentials = {
        username: body.username,
        password: body.password
    }
    return credentials
}

function extractUsername(req) {
    return req.body.username;
}
function extractUser(req) {
    validation.registerInput(req)
    const body = req.body;
    return new User(body.username, body.password, body.email, body.date, body.firstName, body.lastName);
}
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

    // console.log(token)
    return token ? token : null;

}
async function extractCreateApplication(req) {
    //insert vaildation here
    const competenceList = req.body.competence;
    const availability = req.body.availability;
    return new Application(availability, null, competenceList, null)
}
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
    // console.log(availability)
    // console.log(applicationDate)
    // console.log(competenceList)
    // console.log(name)
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