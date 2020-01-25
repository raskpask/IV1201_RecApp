const { Pool, Client } = require('pg')
const User = require('../model/user');

function connect() {
    const client = new Client({
        // connectionString: process.env.DATABASE_URL,
        user: "wlmremkduaitnk",
        password: "83a43bfb610544a9c62da56a7144bafb13a726bf63a91e7ec454178a9623b479",
        database: "d38bijitre5o3s",
        port: 5432,
        host: "ec2-54-247-92-167.eu-west-1.compute.amazonaws.com",
        ssl: true
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
            if(res == null || res.rows == null || res.rows[0] == null){
                reject("Error with inserting into db")
            } else if (res.rows[0].username == user.username) {
                client.end()
                resolve(200)
            }
            client.end()
            reject("Some error while inserting person")
        });
    });
}
function updateUser(user,token) {
    return new Promise(function (resolve, reject) {
        client = connect();
        const query = {
            text: "UPDATE person SET (email,name,password,role_id,ssn,surname,username) VALUES($1,$2,$3,$4,$5,$6,$7) WHERE token = $8",
            values: [user.email, user.firstName, user.password, 2, user.date, user.lastName, user.username,token]
        }
        console.log(query)
        client.query(query, (err, res) => {
            // console.log(res.rows[0])
            if(res == null || res.rows == null || res.rows[0] == null){
                reject("Error with inserting into db")
            } else if (res.rows[0].username == user.username) {
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
            if(res == null || res.rows == null || res.rows[0] == null){
                console.error("wrong username/password");
                // Throw error here
            } else if (res.rows[0].password === credentials.password) {
                client.end()
                return resolve();
            }
            client.end()
            reject()
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

function getUser(token) {
    return new Promise(function (resolve, reject) {
        client = connect();
        // console.log("token: "+token)
        const getUserQuery = {
            text: "SELECT person FROM person WHERE token=$1",
            values: [token]
        }
        client.query(getUserQuery, (err, res) => {
            if (res.rows[0] != null) {
                const rawUser = res.rows[0].person.split('(')[1].split(',');
                client.end()
                resolve(new User(rawUser[7],rawUser[5],rawUser[4],rawUser[3],rawUser[1],rawUser[2]));
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
    getUser,
    updateUser,

}