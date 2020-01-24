
function extractCredentials(body){
    const credentials = {
        username: body.username,
        password: body.password
    }
    return credentials
}
module.exports = {
    extractCredentials,

}