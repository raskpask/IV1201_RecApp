
async function registerUser(user){
    return userDAO.registerUser(user)
}
module.exports = {
    registerUser,

}