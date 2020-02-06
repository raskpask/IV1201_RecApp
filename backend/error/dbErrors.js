errorCodes = {
    CONNECTION_ERROR: 'The connection the to database could not be made.',
    UNKNOWN_ERROR: 'Some internal error occured',
    INTSERTING_USER_ERROR: 'Problem when the user was to be insterted to the database.',
    USER_ERROR: 'A problem occured when the user was supposed to be set.',
    UPDATE_USER_ERROR: 'A problem when tring to update the user.',
    LOGIN_ERROR: 'The password or username was not correct!',
    TOKEN_ERROR: 'Token could not be set.',
    GET_USER_ERROR: 'The request for the user was not correct.',
    NO_USER_ERROR: 'The user could not be found.',
    NO_ACCESS_ERROR: 'The the client does not have the access rights to this function.',
    APPLICATION_ERROR: 'Error while trying to fetch a application.',
    CREATE_APPLICATION_ERROR: 'Error while making an application in one of the three queries.',
    UPDATE_APPLCIATION_ERROR: 'The application status could not be set.',
    GET_COMPETENCE_ERROR: 'Error while getting the competences.',
    WRONG_REGISTER_INPUT: 'The input from the user is incorrect',
    DUPLICATE_USER_ERROR: 'The user already exists try another username',
    DUPLICATE_APPLICATION_ERROR: 'The user already as an applicationa',
}
function respondError(error, res) {
    console.error(error)
    switch (error) {
        case errorCodes.CONNECTION_ERROR:
            res.status(503);
            res.send(errorCodes.CONNECTION_ERROR);
            break;
        case errorCodes.INTSERTING_USER_ERROR:
            res.status(503);
            res.send('DB error');
            break;
        case errorCodes.UNKNOWN_ERROR:
            res.status(500);
            res.send('Internal server error');
            break;
        case errorCodes.USER_ERROR:
            res.status(503);
            res.send(errorCodes.USER_ERROR);
            break;
        case errorCodes.UPDATE_USER_ERROR:
            res.status(503);
            res.send(errorCodes.UPDATE_USER_ERROR);
            break;
        case errorCodes.LOGIN_ERROR:
            res.status(401);
            res.send(errorCodes.LOGIN_ERROR);
            break;
        case errorCodes.GET_USER_ERROR:
            res.status(400);
            res.send(errorCodes.GET_USER_ERROR);
            break;
        case errorCodes.NO_USER_ERROR:
            res.status(400);
            res.send(errorCodes.NO_USER_ERROR);
            break;
        case errorCodes.NO_ACCESS_ERROR:
            res.status(403);
            res.send(errorCodes.NO_ACCESS_ERROR);
            break;
        case errorCodes.APPLICATION_ERROR:
            res.status(500);
            res.send(errorCodes.APPLICATION_ERROR);
            break;
        case errorCodes.UPDATE_APPLCIATION_ERROR:
            res.status(500);
            res.send(errorCodes.UPDATE_APPLCIATION_ERROR);
            break;
        case errorCodes.GET_COMPETENCE_ERROR:
            res.status(500);
            res.send(errorCodes.GET_COMPETENCE_ERROR);
            break;
        case errorCodes.WRONG_REGISTER_INPUT:
            res.status(400);
            res.send(errorCodes.WRONG_REGISTER_INPUT);
            break;
        case errorCodes.DUPLICATE_USER_ERROR:
            res.status(400);
            res.send(errorCodes.DUPLICATE_USER_ERROR);
            break;
        case errorCodes.DUPLICATE_APPLICATION_ERROR:
            res.status(400);
            res.send(errorCodes.DUPLICATE_APPLICATION_ERROR);
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