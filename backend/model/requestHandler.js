const User = require('./user');
const Application = require('./application');
const userDAO = require('../integration/userDAO');
const validation = require('./requestValidation');
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
    if (!cookieHeader) {
        return null
    }
    const token = cookieHeader.split('authToken=')[1].split(';')[0];
    // console.log(token)
    return token ? token : null;

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
    return new Application(availability, applicationDate, competenceList, name);
}
module.exports = {
    extractCredentials,
    extractUser,
    extractToken,
    extractApplication,
    extractUsername,
}