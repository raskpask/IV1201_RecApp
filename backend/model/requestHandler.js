const User = require('./user');
function extractCredentials(req){
    const body = req.body;
    const credentials = {
        username: body.username,
        password: body.password
    }
    return credentials
}
function extractUser(req){
    const body = req.body;
    return new User(body.username, body.password, body.email, body.date, body.firstName, body.lastName);
}
function extractCookie(req){
    // 
    //     if (!cookieHeader) {
    //       return null
    //     }
    //     return cookieHeader ? cookieHeader.split('=')[1] : null;
    //
    console.log(req.headers)
    return req.headers.cookie;
}
module.exports = {
    extractCredentials,
    extractUser,
    extractCookie,

}