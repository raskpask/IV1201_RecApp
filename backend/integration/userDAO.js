const { Pool, Client } = require('pg')
const User = require('../model/user');
const Application = require('../model/application');
const Competence = require('../model/competence');

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
            if (res == null || res.rows == null || res.rows[0] == null) {
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
function updateUser(user, token) {
    return new Promise(function (resolve, reject) {
        client = connect();
        const query = {
            text: "UPDATE person SET (email,name,password,role_id,ssn,surname,username) VALUES($1,$2,$3,$4,$5,$6,$7) WHERE token = $8",
            values: [user.email, user.firstName, user.password, 2, user.date, user.lastName, user.username, token]
        }
        console.log(query)
        client.query(query, (err, res) => {
            // console.log(res.rows[0])
            if (res == null || res.rows == null || res.rows[0] == null) {
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
            if (res == null || res.rows == null || res.rows[0] == null) {
                reject("Wrong username/password")
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
function changeAuthToken(credentials, token) {
    return new Promise(function (resolve, reject) {
        client = connect();
        let updateTokenQuery = "";
        if (credentials == null) {
            updateTokenQuery = {
                text: "UPDATE person SET token = null WHERE token = $1",
                values: [token]
            }
        } else {
            updateTokenQuery = {
                text: "UPDATE person SET token = $1 WHERE username = $2",
                values: [token, credentials.username]
            }
        }
        client.query(updateTokenQuery, (err, res) => {
            if (res) {

                if (res.rowCount == '1') {
                    client.end()
                    resolve(token)
                }
            }
            client.end()
            reject("Token could not be set")
        });
    });
}

function checkIfUsernameIsAvailable(username) {
    return new Promise(function (resolve, reject) {
        client = connect();
        const getUserQuery = {
            text: "SELECT * FROM person WHERE username = $1",
            values: [username]
        }
        client.query(getUserQuery, (err, res) => {
            if (res.rows[0] == null) {
                client.end()
                resolve("Username not taken");
            } else {
                resolve("Username taken");
            }
            client.end()
            reject("Internal error")
        });
    });
}
function getUser(token) {
    return new Promise(function (resolve, reject) {
        client = connect();
        const getUserQuery = {
            text: "SELECT person FROM person WHERE token=$1",
            values: [token]
        }
        client.query(getUserQuery, (err, res) => {
            if (res.rows[0] != null) {
                const rawUser = res.rows[0].person.split('(')[1].split(',');
                // console.log("token: "+token)
                client.end()
                resolve(new User(rawUser[7], rawUser[5], rawUser[4], rawUser[3], rawUser[1], rawUser[2], rawUser[0], rawUser[6]));
            }
            client.end()
            reject("User could not be found")
        });
    });
}
function getPrivilegeLevel(token) {
    return new Promise(function (resolve, reject) {
        if (!token) {
            resolve("no access")
        }
        client = connect();
        const getPrivilegeLevelQuery = {
            text: "SELECT role_id FROM person WHERE token=$1",
            values: [token]
        }
        client.query(getPrivilegeLevelQuery, (err, res) => {
            if (res.rows[0] != null) {
                resolve(res.rows[0]);
            }
            client.end()
            reject("User could not be found")
        });
    });
}

function getApplication(privilegeLevel, token, application) {
    return new Promise(function (resolve, reject) {
        client = connect();
        let getApplicationQuery = {
            text:
                "SELECT application.application_id, person.name, person.surname, competence.name, competence_profile.years_of_experience, availability.to_date AS startDate, availability.from_date AS endDate, application.time_of_submission, application.status " +
                "FROM application " +
                "INNER JOIN availability ON availability.person_id = application.person_id " +
                "INNER JOIN person ON person.person_id = application.person_id " +
                "INNER JOIN competence_profile ON competence_profile.person_id = application.person_id " +
                "INNER JOIN competence ON competence.competence_id = competence_profile.competence_id " +
                "WHERE competence.competence_id IN " + '(' + application.competence.join() + ')' +
                "AND availability.from_date >= DATE($1) " +
                "AND availability.to_date <= DATE($2) " +
                "AND(person.name LIKE ($3) OR person.surname LIKE ($4)) " +
                "AND DATE(application.time_of_submission) >= DATE($5) " +
                "AND DATE(application.time_of_submission) <= DATE($6)",
            values: [application.availability.startDate, application.availability.endDate, application.name + "%", application.name + "%", application.applicationDate.startDate, application.applicationDate.endDate]
        }
        if (privilegeLevel == 2) {
            getApplicationQuery.text.concat(" AND person.token = ($7)")
            getApplicationQuery.values.push(token)
        }

        // get status, job application, competence with year, availability, person name *
        client.query(getApplicationQuery, (err, res) => {
            // console.log(err)
            if (err) {
                reject(err);
            } else if (res.rows[0] != null) {
                //         const rawUser = res.rows[0].person.split('(')[1].split(',');
                //         client.end()
                // console.log(res.rows)
                resolve(res.rows)
            }
            //     client.end();
            //     reject();
            // });
            resolve();
        });
    });
}
function createApplication(application, token) {
    return new Promise(function (resolve, reject) {
        const user = this.getUser(token);
        const pool = new Pool();

        (async () => {
            const client = await pool.connect()
            try {
                await client.query("BEGIN");
                for (i = 0; i < application.competence.length; i++) {
                    let addCompetenceProfileQuery = {
                        text: "INSERT INTO person (person_id,competence_id,years_of_experience) VALUES($1,$2,$3) RETURNING *",
                        values: [user.personID, application.competence[i].id, application.competence[i].years]
                    }
                    await client.query(addCompetenceProfileQuery);
                }
                for (i = 0; i < application.availability.length; i++) {
                    let addAvailabilityQuery = {
                        text: "INSERT INTO availability (person_id,from_date,to_date) VALUES($1,$2,$3) RETURNING *",
                        values: [user.personID, application.availability[i].startDate, application.availability[i].endDate]
                    }
                    await client.query(addAvailabilityQuery);
                }
                const addApplicatonQuery = {
                    text: "INSERT INTO application (person_id,time_of_submission,status) VALUES($1,$2,$3) RETURING *",
                    values: [user.personID, Date.now(), 0]
                }
                await client.query(addApplicationQuery);
                await client.query("COMMIT");
                resolve();
            } catch (e) {
                await client.query("ROLLBACK");
                reject(e);

            } finally {
                client.release();
            }
        })().catch(e => console.error(e.stack));
    });
}
function updateApplicationStatus(application_id, status) {
    return new Promise(function (resolve, reject) {
        client = connect();
        // // console.log("token: "+token)
        const updateApplicationStatusQuery = {
            text: "UPDATE application SET status = $1 WHERE application_id = $2",
            values: [status, application_id]

        }
        client.query(getUserQuery, (err, res) => {
            client.end();
            if (res.rowCount == '1') {
                resolve()
            }
            reject();
        });
    });
}
function getCompetence(token) {
    return new Promise(function (resolve, reject) {
        client = connect();
        const getCompetenceQuery = {
            text: "SELECT * FROM competence",
        }
        client.query(getCompetenceQuery, (err, res) => {
            if (res.rows[0] != null) {
                let competences = [];
                for (i = 0; i < res.rows.length; i++) {
                    competences.push(res.rows[i].competence_id);
                    competences.push(res.rows[i].name);
                }
                // console.log(res.rows[0])
                resolve(competences);
                client.end()
            }
            client.end()
            reject("Could not be found")
        });
    });
}


module.exports = {
    registerUser,
    authenticateUser,
    changeAuthToken,
    getUser,
    updateUser,
    getApplication,
    createApplication,
    updateApplicationStatus,
    getCompetence,
    checkIfUsernameIsAvailable,
    getPrivilegeLevel,

}