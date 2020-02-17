const crypto = require('crypto');

/**
 *  Generate a authorization token to be stored in the DB and in the client window.
 *
 * @returns authToken 
 */
function generate(){
    return crypto.randomBytes(64).toString('hex');
}
module.exports = {
    generate,
}