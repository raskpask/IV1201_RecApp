const User = require('./user');
const Application = require('./application');
const userDAO = require('../integration/userDAO');
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
    const body = req.body;
    // console.log(body)
    // console.log(body.competence[0].competenceName + " "+ body.availability)
    let competenceList = body.competence ? body.competence : [];
    let availability = body.availability;
    let applicationDate = body.applicationDate;
    // For get application only
    let name = body.name ? body.name : "";
    const date = new Date();
    if (!body.competence) {
        const competences = await userDAO.getCompetence()
        for (i = 0; i < competences.length; i += 2) {
            competenceList.push(competences[i]);
        }
    }
    if (!availability) {
        availability = {
            startDate: '1970-01-01',
            endDate: date.getFullYear()+2000 +"-01-01"
        }
    }
    if (!applicationDate) {
        applicationDate = {
            startDate: '1970-01-01',
            endDate: date.getFullYear()+2000 +"-01-01"
        }
    }
    return new Application(availability, applicationDate, competenceList,name);
}
module.exports = {
    extractCredentials,
    extractUser,
    extractToken,
    extractApplication,
    extractUsername,
}