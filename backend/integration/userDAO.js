const { Pool, Client } = require('pg')

function connect() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        // user: "wlmremkduaitnk",
        // password: "83a43bfb610544a9c62da56a7144bafb13a726bf63a91e7ec454178a9623b479",
        // database: "d38bijitre5o3s",
        // port: 5432,
        // host: "ec2-54-247-92-167.eu-west-1.compute.amazonaws.com",
        // ssl: true
    });
    client.connect();
    return client
}


function registerUser(user) {
    return new Promise(function (resolve, reject) {
        client = connect();
        const query = {
            text: "INSERT INTO person (email,name,password,role_id,ssn,surname,username) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
            values: [user.email, user.firstName, user.password, 2, user.date, user.lastName, user.username]
        }
        client.query(query, (err, res) => {
            // console.log(res.rows[0].username)
            if (res.rows[0].username == user.username) {
                client.end()
                resolve(200)
            }
            client.end()
            reject("Some error while inserting person")
        });
    });
}
function authenticateUser(credentials) {
    return new Promise(function (resolve, reject) {
        client = connect();
        const query = {
            text: "SELECT password FROM person WHERE username = $1",
            values: [credentials.username]
        }
        client.query(query, (err, res) => {
            if (res.rows[0].password === credentials.password) {
                client.end()
                resolve();
            }
            client.end()
            reject("No access")
        })
    });
}
function changeAuthToken(credentials,token) {
    return new Promise(function (resolve, reject) {
        client = connect();
        // console.log(credentials)
        const updateTokenQuery = {
            text: "UPDATE person SET token = $1 WHERE username = $2",
            values: [token, credentials.username]
        }
        client.query(updateTokenQuery, (err, res) => {
            // console.log(res)
            if (res.rowCount == '1') {
                client.end()
                resolve(token)
            }
            client.end()
            reject("Token could not be set")
        });
    });
}
module.exports = {
    registerUser,
    authenticateUser,
    changeAuthToken,

}