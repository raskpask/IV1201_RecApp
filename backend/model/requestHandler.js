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
    return cookieHeader ? cookieHeader.split('=')[1] : null;
}
async function extractApplication(req) {
    const body = req.body;
    let listCompetenceID = body.competence ? body.competence : [];
    let availability = body.availability;
    let name = body.name ? body.name : "";
    let applicationDate = body.applicationDate;
    const date = new Date();
    if (!body.competence) {
        const competences = await userDAO.getCompetence()
        for (i = 0; i < competences.length; i += 2) {
            listCompetenceID.push(competences[i]);
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
    return new Application(availability, applicationDate, listCompetenceID,name);
}
module.exports = {
    extractCredentials,
    extractUser,
    extractToken,
    extractApplication,
    extractUsername,
}