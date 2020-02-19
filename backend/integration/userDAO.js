/**
 * The different instances can be found in the model folder. They are all contructed in the model as a JS object.
 */
const { Pool, Client } = require('pg')
const User = require('../model/user');
const dbResponseHandler = require('../model/dbResponsehandler');
const dbError = require('../error/dbErrors');

function notVaildResponse(res) {
    if (res === undefined) {
        return true;
    }
    return false
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    /*user: "wlmremkduaitnk",
    password: "83a43bfb610544a9c62da56a7144bafb13a726bf63a91e7ec454178a9623b479",
    database: "d38bijitre5o3s",
    port: 5432,
    host: "ec2-54-247-92-167.eu-west-1.compute.amazonaws.com",*/
    ssl: true
})

function connect() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        /*user: "wlmremkduaitnk",
        password: "83a43bfb610544a9c62da56a7144bafb13a726bf63a91e7ec454178a9623b479",
        database: "d38bijitre5o3s",
        port: 5432,
        host: "ec2-54-247-92-167.eu-west-1.compute.amazonaws.com",*/
        ssl: true
    });
    client.connect();
    return client
}



/**
 * Regisers a user to the DB.
 *
 * @param {user} user - Instance of user
 * @returns Promise with 200
 */
function registerUser(user) {
    return new Promise(function (resolve, reject) {
        client = connect();
        const query = {
            text: "INSERT INTO person (email,name,password,role_id,ssn,surname,username) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
            values: [user.email, user.firstName, user.password, 2, user.date, user.lastName, user.username]
        }
        client.query(query, (err, res) => {
            if (err) {
                if (err.code === '23505') {
                    reject(new Error(dbError.errorCodes.DUPLICATE_USER_ERROR.code))
                }
            }
            if (notVaildResponse(res)) {
                client.end()
                reject(new Error(dbError.errorCodes.INSERTING_USER_ERROR.code))
            } else if (res.rows[0].username == user.username) {
                client.end()
                resolve(200)
            }
            client.end()
            reject(new Error(dbError.errorCodes.USER_ERROR.code))
        });
    });
}
/**
 * Updates a user in the DB.
 *
 * @param {user} user - Instance of user
 * @param {String} token - Authorization token 
 * @returns Promise with 200
 */
function updateUser(user, token) {
    return new Promise(function (resolve, reject) {
        client = connect();
        const query = {
            text: "UPDATE person SET (email,name,password,role_id,ssn,surname,username) VALUES($1,$2,$3,$4,$5,$6,$7) WHERE token = $8",
            values: [user.email, user.firstName, user.password, 2, user.date, user.lastName, user.username, token]
        }
        client.query(query, (err, res) => {
            if (notVaildResponse(res)) {
                client.end()
                reject(new Error(dbError.errorCodes.UPDATE_USER_ERROR.code))
            } else if (res.rows[0].username == user.username) {
                client.end()
                resolve(200)
            }
            client.end()
            reject(new Error(dbError.errorCodes.UPDATE_USER_ERROR.code))
        });
    });
}
/**
 * Checks if the user has the right password and username.
 *
 * @param {JSON} credentials- Username and password of the client
 * @returns Promise with 200.
 */
function authenticateUser(credentials) {
    return new Promise(function (resolve, reject) {
        client = connect();
        const query = {
            text: "SELECT password FROM person WHERE username = $1",
            values: [credentials.username]
        }
        client.query(query, (err, res) => {
            if (notVaildResponse(res)) {
                client.end()
                reject(new Error(dbError.errorCodes.LOGIN_ERROR.code))
            } else {
                if (res.rows.length === 1) {
                    if (res.rows[0].password === credentials.password) {
                        client.end()
                        resolve(200);
                    }
                }
            }
            client.end()
            reject(new Error(dbError.errorCodes.LOGIN_ERROR.code))

        })
    });
}
/**
 *Changes the authorization token of the user in the DB.
 *
 * @param {JSON} credentials- Username and password of the client
 * @param {String} token - Authorization token 
 * @returns Promise with the token as a string.
 */
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
            if (notVaildResponse(res)) {
                client.end()
                reject(new Error(dbError.errorCodes.TOKEN_ERROR.code))
            }
            if (res.rowCount == '1') {
                client.end()
                resolve(token)
            }
        });
    });
}

/**
 * Checks if the username is taken in the DB.
 *
 * @param {String} username - Username of the client
 * @returns String with, "Username not taken" or "Username taken".
 */
function checkIfUsernameIsAvailable(username) {
    return new Promise(function (resolve, reject) {
        client = connect();
        const getUserQuery = {
            text: "SELECT * FROM person WHERE username = $1",
            values: [username]
        }
        client.query(getUserQuery, (err, res) => {
            if (err) {
                reject(new Error(dbError.errorCodes.UNKNOWN_ERROR.code));
                return;
            }
            if (notVaildResponse(res)) {
                client.end()
                reject(new Error(dbError.errorCodes.UNKNOWN_ERROR.code))
            }
            if (res.rows[0] == undefined) {
                client.end()
                resolve("Username not taken");
            } else {
                resolve("Username taken");
            }
        });
    });
}
/**
 * Fetches a user from the DB.
 *
 * @param {String} token - Authorization token 
 * @returns Instance of user.
 */
function getUser(token) {
    return new Promise(function (resolve, reject) {
        client = connect();
        const getUserQuery = {
            text: "SELECT person FROM person WHERE token=$1",
            values: [token]
        }
        client.query(getUserQuery, (err, res) => {
            try {
                if (notVaildResponse(res)) {
                    client.end();
                    reject(new Error(dbError.errorCodes.GET_USER_ERROR.code));
                }
                if (res.rows != undefined) {
                    const rawUser = res.rows[0].person.split('(')[1].split(',');
                    client.end()
                    resolve(new User(rawUser[7], rawUser[5], rawUser[4], rawUser[3], rawUser[1], rawUser[2], rawUser[0], rawUser[6], token));
                }

            } catch (err) {
                client.end()
                reject(new Error(dbError.errorCodes.NO_USER_ERROR.code))
            }
        });
    });
}
/**
 * Fetches the privilege level of the user from the DB.
 *
 * @param {String} token - Authorization token 
 * @returns Promise with the level.
 */
function getPrivilegeLevel(token) {
    return new Promise(function (resolve, reject) {
        if (!token) {
            resolve("no access")
        }
        client = connect();
        const getPrivilegeLevelQuery = {
            text: "SELECT role_id, person_id FROM person WHERE token=$1",
            values: [token]
        }
        client.query(getPrivilegeLevelQuery, (err, res) => {
            if (err) {
                console.error(err)
                reject(new Error(dbError.errorCodes.GET_USER_ERROR.code));
                client.end()
            }
            if (notVaildResponse(res)) {
                reject(new Error(dbError.errorCodes.GET_USER_ERROR.code));
                client.end()
            } else {
                // console.log(res.rows[0])
                if (res.rows[0] != null) {
                    resolve(res.rows[0]);
                    client.end()
                }
                reject(new Error(dbError.errorCodes.GET_USER_ERROR.code))
                client.end()
            }
        });
    });
}

/**
 * Fetches a list of applications from the DB. The applciation will be fetches from the serach params that are sent in with the application param.
 *
 * @param {String} privilegeLevel - Privelege level of the client
 * @param {String} token - Authorization token 
 * @param {application} application - Instance of application
 * @returns Promise with list of instances of applications
 */
function getApplication(privilegeLevel, application, lang) {
    return new Promise(async function (resolve, reject) {
        const competences = await getCompetence(lang)
        let competenceIDList = [];
        for (let competence in application.competence) {
            competenceIDList.push(application.competence[competence])
        }
        client = connect();
        let getApplicationQuery = {
            text:
                "SELECT application.application_id, person.name AS firstname, application.status , application.last_edited , person.surname, person.ssn, competence.competence_id, competence_profile.years_of_experience, availability.to_date AS startDate, availability.from_date AS endDate, application.time_of_submission, application.status " +
                "FROM application " +
                "INNER JOIN availability ON availability.person_id = application.person_id " +
                "INNER JOIN person ON person.person_id = application.person_id " +
                "INNER JOIN competence_profile ON competence_profile.person_id = application.person_id " +
                "INNER JOIN competence ON competence.competence_id = competence_profile.competence_id " +
                "WHERE competence.competence_id IN " + '(' + competenceIDList.join() + ') ' +
                "AND availability.from_date >= DATE($1) " +
                "AND availability.to_date <= DATE($2) " +
                "AND(person.name LIKE ($3) OR person.surname LIKE ($4)) " +
                "AND DATE(application.time_of_submission) >= DATE($5) " +
                "AND DATE(application.time_of_submission) <= DATE($6) " +
                "AND person.person_id >= ($7)" +
                "AND person.person_id <= ($8)",
            values: [application.availability.startDate, application.availability.endDate, application.name + "%", application.name + "%", application.applicationDate.startDate, application.applicationDate.endDate, 0, 999999999999999]
        }
        if (privilegeLevel.role_id == 2) {
            getApplicationQuery.values[6] = privilegeLevel.person_id;
            getApplicationQuery.values[7] = privilegeLevel.person_id;

        }
        client.query(getApplicationQuery, (err, res) => {
            if (err) {
                console.error(err)
                reject(new Error(dbError.errorCodes.APPLICATION_ERROR.code));
                return;
            } else if (res.rows.length == 0) {
                reject(new Error(dbError.errorCodes.NO_APPLICATION_ERROR.code));
                return;
            } else if (notVaildResponse(res)) {
                client.end()
                reject(new Error(dbError.errorCodes.UNKNOWN_ERROR.code));
            }
            const applicationList = dbResponseHandler.extractApplication(res.rows, competences)
            client.end()
            resolve(applicationList)
        });
    });
}
/**
 * Creates a application from the client request in the DB.
 *
 * @param {application} application - Instance of application
 * @param {user} user - Instance of user
 * @returns Promise with 200
 */
async function createApplication(application, user) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.connect()
        try {
            await client.query("BEGIN");
            for (i = 0; i < application.competence.length; i++) {
                let addCompetenceProfileQuery = {
                    text: "INSERT INTO competence_profile (person_id,competence_id,years_of_experience) VALUES($1,$2,$3) RETURNING *",
                    values: [user.personID, application.competence[i].competenceID, application.competence[i].numberOfYears]
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
            let date = new Date()
            date = JSON.stringify(date).split('T')[0].split('"')[1]
            const addApplicatonQuery = {
                text: "INSERT INTO application (person_id,time_of_submission,status) VALUES($1,$2,$3)",
                values: [user.personID, date, 0]
            }
            await client.query(addApplicatonQuery);
            await client.query("COMMIT");
            resolve(200)

        } catch (e) {
            await client.query("ROLLBACK");
            if (e.code == '23505') {
                reject(new Error(dbError.errorCodes.DUPLICATE_APPLICATION_ERROR.code))
            }
            console.error(e)
            reject(new Error(dbError.errorCodes.CREATE_APPLICATION_ERROR.code))
        } finally {
            client.release();
        }
    });
}
/**
 * Updates the applications status and the last edited columns in the application.
 *
 * @param {int} status - Int of the new status of the user
 * @param {int} applicationID - Application id of the application
 * @param {Date} lastEdited - The date and time when the application was edited the last time.
 * @returns Promise with 200.
 */
function updateApplicationStatus(status, applicationID, lastEdited) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.connect()
        try {
            await client.query("BEGIN");
            const getLastEditedQuery = {
                text: "SELECT last_edited FROM application WHERE application_id = $1",
                values: [applicationID]
            }
            client
                .query(getLastEditedQuery)
                .then(res => {
                    const lastEditedDB = new Date(res.rows[0].last_edited)
                    const lastUpdated = new Date(lastEdited)
                    if (lastEditedDB > lastUpdated) {
                        reject(new Error(dbError.errorCodes.APPLICATION_EDITED_ERROR.code))
                    } else {
                        const updateApplicationStatusQuery = {
                            text: "UPDATE application SET status = $1 ,last_edited = $2  WHERE application_id = $3",
                            values: [status, new Date(), applicationID]
                        }
                        client
                            .query(updateApplicationStatusQuery)
                            .then(res => {
                                if (res.rowCount == '1') {
                                    resolve(200)
                                }
                                reject(new Error(dbError.errorCodes.UPDATE_APPLCIATION_ERROR.code));
                            })
                        client.query("COMMIT");
                    }
                })
                .catch(err => {
                    reject(new Error(err.message))
                })

        } catch (e) {
            await client.query("ROLLBACK");
            reject(new Error(dbError.errorCodes.UPDATE_APPLCIATION_ERROR.code))

        } finally {
            client.release();
        }
    });
}

/**
 * Fetches all the competences that exists in the DB.
 *
 * @returns Promise with list of Strings that contains the different competences.
 */
function getCompetence(lang) {
    return new Promise(function (resolve, reject) {
        client = connect();
        const getCompetenceQuery = {
            text: "SELECT competence_id, name FROM competence_language WHERE language=$1",
            values: [lang]
        }
        client.query(getCompetenceQuery, (err, res) => {
            if (notVaildResponse(res)) {
                client.end()
                reject(new Error(dbError.errorCodes.GET_COMPETENCE_ERROR.code))
            } else {
                client.end()
                resolve(res.rows);
            }
            client.end()
            reject(new Error(dbError.errorCodes.UNKNOWN_ERROR.code));
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