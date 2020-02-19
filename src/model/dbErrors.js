const errorCodes = {
    CONNECTION_ERROR: {
        code: 'CONNECTION_ERROR',
        message: 'The connection the to database could not be made.'
    },
    UNKNOWN_ERROR: {
        code: 'UNKNOWN_ERROR',
        message: 'Some internal error occured'
    },
    INSERTING_USER_ERROR: {
        code: 'INSERTING_USER_ERROR',
        message: 'Problem when the user was to be insterted to the database.'
    },
    USER_ERROR: {
        code: 'USER_ERROR',
        message: 'A problem occured when the user was supposed to be set.'
    },
    UPDATE_USER_ERROR: {
        code: 'UPDATE_USER_ERROR',
        message: 'A problem when tring to update the user.'
    },
    LOGIN_ERROR: {
        code: 'LOGIN_ERROR',
        message: 'The password or username was not correct!'
    },
    TOKEN_ERROR: {
        code: 'TOKEN_ERROR',
        message: 'Token could not be set.'
    },
    GET_USER_ERROR: {
        code: 'GET_USER_ERROR',
        message: 'The request for the user was not correct.'
    },
    NO_USER_ERROR: {
        code: 'NO_USER_ERROR',
        message: 'The user could not be found.'
    },
    NO_ACCESS_ERROR: {
        code: 'NO_ACCESS_ERROR',
        message: 'The the client does not have the access rights to this function.'
    },
    APPLICATION_ERROR: {
        code: 'APPLICATION_ERROR',
        message: 'Error while trying to fetch a application.'
    },
    CREATE_APPLICATION_ERROR: {
        code: 'CREATE_APPLICATION_ERROR',
        message: 'Error while making an application in one of the three queries.'
    },
    UPDATE_APPLCIATION_ERROR: {
        code: 'UPDATE_APPLCIATION_ERROR',
        message: 'The application status could not be set.'
    },
    GET_COMPETENCE_ERROR: {
        code: 'GET_COMPETENCE_ERROR',
        message: 'Error while getting the competences.'
    },
    WRONG_REGISTER_INPUT_ERROR: {
        code: 'WRONG_REGISTER_INPUT',
        message: 'The input from the user is incorrect'
    },
    DUPLICATE_USER_ERROR: {
        code: 'DUPLICATE_USER_ERROR',
        message: 'The user already exists try another username'
    },
    DUPLICATE_APPLICATION_ERROR: {
        code: 'DUPLICATE_APPLICATION_ERROR',
        message: 'The user already as an application'
    },
    NO_APPLICATION_ERROR: {
        code: 'NO_APPLICATION_ERROR',
        message: 'Could not find application'
    },
    NO_TOKEN_ERROR: {
        code: 'NO_TOKEN_ERROR',
        message: 'Could not find token'
    },
    APPLICATION_EDITED_ERROR: {
        code: 'APPLICATION_EDITED_ERROR',
        message: 'The application was updated after the user checked the status'
    },
    
}
function respondError(error, res) {
    console.error(error)
    switch (error) {
        case errorCodes.CONNECTION_ERROR.code:
            res.status(503);
            res.send(errorCodes.CONNECTION_ERROR.code);
            break;
        case errorCodes.INSERTING_USER_ERROR.code:
            res.status(503);
            res.send('DB error');
            break;
        case errorCodes.UNKNOWN_ERROR.code:
            res.status(500);
            res.send('Internal server error');
            break;
        case errorCodes.USER_ERROR.code:
            res.status(503);
            res.send(errorCodes.USER_ERROR.code);
            break;
        case errorCodes.UPDATE_USER_ERROR.code:
            res.status(503);
            res.send(errorCodes.UPDATE_USER_ERROR.code);
            break;
        case errorCodes.LOGIN_ERROR.code:
            res.status(401);
            res.send(errorCodes.LOGIN_ERROR.code);
            break;
        case errorCodes.GET_USER_ERROR.code:
            res.status(400);
            res.send(errorCodes.GET_USER_ERROR.code);
            break;
        case errorCodes.NO_USER_ERROR.code:
            res.status(400);
            res.send(errorCodes.NO_USER_ERROR.code);
            break;
        case errorCodes.NO_ACCESS_ERROR.code:
            res.status(403);
            res.send(errorCodes.NO_ACCESS_ERROR.code);
            break;
        case errorCodes.APPLICATION_ERROR.code:
            res.status(500);
            res.send(errorCodes.APPLICATION_ERROR.code);
            break;
        case errorCodes.UPDATE_APPLCIATION_ERROR.code:
            res.status(500);
            res.send(errorCodes.UPDATE_APPLCIATION_ERROR.code);
            break;
        case errorCodes.GET_COMPETENCE_ERROR.code:
            res.status(500);
            res.send(errorCodes.GET_COMPETENCE_ERROR.code);
            break;
        case errorCodes.WRONG_REGISTER_INPUT_ERROR.code:
            res.status(400);
            res.send(errorCodes.WRONG_REGISTER_INPUT_ERROR.code);
            break;
        case errorCodes.DUPLICATE_USER_ERROR.code:
            res.status(400);
            res.send(errorCodes.DUPLICATE_USER_ERROR.code);
            break;
        case errorCodes.DUPLICATE_APPLICATION_ERROR.code:
            res.status(400);
            res.send(errorCodes.DUPLICATE_APPLICATION_ERROR.code);
            break;
        case errorCodes.NO_APPLICATION_ERROR.code:
            res.status(400);
            res.send(errorCodes.NO_APPLICATION_ERROR.code);
            break;
        case errorCodes.NO_TOKEN_ERROR.code:
            res.status(400);
            res.send(errorCodes.NO_TOKEN_ERROR.code);
            break;
        case errorCodes.APPLICATION_EDITED_ERROR.code:
            res.status(400);
            res.send(errorCodes.APPLICATION_EDITED_ERROR.code);
            break;
        default:
            res.status(500);
            res.send('Something went wrong on the server');
    }
}
module.exports = {
    errorCodes,
    respondError
}