async function userInput(req) {
    return new Promise(function (resolve, reject) {
        const body = req.body;
        if (!body || !body.username || !body.password || !body.email || !body.date || !body.firstName || !body.lastName) {
            reject("Wrong user input")
        }
        resolve(200)
    });
}

module.exports = {
    userInput,

}