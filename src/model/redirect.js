function checkAccess(accessLevel) {
    if (extractPrivLevel() > accessLevel) {
        return false;
    }
    return true;
}
function extractPrivLevel() {
    if(document.cookie.split('privilegeLevel=')[1]){
        return document.cookie.split('privilegeLevel=')[1].split(';')[0];
    }
    return 3;
}
module.exports = {
    checkAccess,
}