const controller = require('../controller/controller');
const dbErrors = require('../error/dbErrors');

/**
 * Routes all api requests. 
 * All client requests will be send here and and the right functions here will send a request to the controller.
 *
 * @param {App} router - The express application.
 */
function router(router) {
    router.post('/api/user', async (req, res) => {
        try {
            const statusCode = await controller.registerUser(req);
            res.status(statusCode);
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
        res.send();
    });

    router.put('/api/user', async (req, res) => {
        try {
            const statusCode = await controller.updateUser(req);
            res.status(statusCode);
        } catch (error) {
            dbErrors.respondError(error.message, res)
            console.error(error.message);
        }
        res.send();
    });

    router.get('/api/user', async (req, res) => {
        try {
            const user = await controller.getUser(req);
            res.cookie('privilegeLevel', user.privilegeLevel, { expires: new Date(Date.now() + 1800000) });
            res.cookie('authToken', controller.getToken(req), { expires: new Date(Date.now() + 1800000) });
            res.send(JSON.stringify({ user: user }));
        } catch (error) {
            dbErrors.respondError(error.message, res)
            console.error(error)
        }
    });

    router.get('/api/username', async (req, res) => {
        try {
            res.send(await controller.checkIfUsernameIsAvailable(req));
        } catch (e) {
            dbErrors.respondError(e.message, res)
            console.error(e);
            res.sendStatus(500);
        }
    });


    router.post('/api/authentication', async (req, res) => {
        try {
            const user = await controller.authenticateUser(req);
            const lang = await controller.extractLangCookie(req);
            res.cookie('lang',lang);
            res.cookie('authToken', user.token, { expires: new Date(Date.now() + 1800000) });
            res.cookie('privilegeLevel', user.privilegeLevel, { expires: new Date(Date.now() + 1800000) });
        } catch (error) {
            dbErrors.respondError(error.message, res)
            console.error(error);
            res.status(401);
        }
        res.send()
    });

    router.delete('/api/authentication', async (req, res) => {
        try {
            await controller.deAuthenticateUser(req);
            res.clearCookie('authToken');
            res.clearCookie('privilegeLevel')
            res.send();
        } catch (error) {
            dbErrors.respondError(error.message, res)
            console.error(error)
            res.status(401);
        }
    })

    router.get('/api/application', async (req, res) => {
        try {
            const application = await controller.getApplication(req);
            if (application == "no access") {
                res.sendStatus(401)
            } else {
                res.send(JSON.stringify(application));
            }
        } catch (error) {
            dbErrors.respondError(error.message, res)
            console.error(error);
        }
    });

    router.post('/api/application', async (req, res) => {
        try {
            const application = await controller.createApplication(req);
            res.send("Application was created");
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
    });

    router.put('/api/application', async (req, res) => {
        try {
            const application = await controller.updateApplicationStatus(req);
            if (application === 200) {
                res.send()
            }
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
    });

    router.get('/api/competence', async (req, res) => {
        try {
            res.send(JSON.stringify(await controller.getCompetence(req)));
        } catch (error) {
            dbErrors.respondError(error.message, res)
            console.error(error)
        }
    })
}

module.exports = {
    router,
}