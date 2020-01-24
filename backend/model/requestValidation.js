async function userInput(body,res) {
    return new Promise(function (resolve, reject) {
        if (!body || !body.username || !body.password || !body.email || !body.date || !body.firstName || !body.lastName) {
            reject("Wrong user input")
        }
        resolve(200)
    });
}

module.exports = {
    userInput,

}