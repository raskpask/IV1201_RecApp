const User = require('./user');
const Application = require('./application');
function extractCredentials(req) {
    const body = req.body;
    const credentials = {
        username: body.username,
        password: body.password
    }
    return credentials
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

    // console.log(req.headers)
    // return req.headers.cookie;
}
function extractApplication(req) {
    const body = req.body;
    return new Application(body.date, body.competence, body.name, body.status);
}
module.exports = {
    extractCredentials,
    extractUser,
    extractToken,
    extractApplication,

}