const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

const controller = require('./backend/controller/controller');
const dbErrors = require('./backend/error/dbErrors');


app.post('/api/user', async (req, res) => {
  try {
    const statusCode = await controller.registerUser(req);
    res.status(statusCode);
  } catch (error) {
    dbErrors.respondError(error.message,res)
    // res.status(400)
  }
  res.send();
});

app.put('/api/user', async (req, res) => {
  try {
    const statusCode = await controller.updateUser(req);
    res.status(statusCode);
  } catch (error) {
    dbErrors.respondError(error.message,res)
    console.error(error.message);
    res.status(400)
  }
  res.send();
});

app.get('/api/user', async (req, res) => {
  try {
    const user = await controller.getUser(req);
    res.cookie('authToken', controller.getToken(req),{ expires: new Date(Date.now() + 1800000)});
    res.cookie('privilegeLevel', user.privilegeLevel ,{ expires: new Date(Date.now() + 1800000)});
    res.send(JSON.stringify({ user: user }));
    // console.log(user);

  } catch (error) {
    dbErrors.respondError(error.message,res)
    console.error(error)
    res.sendStatus(400);
  }
});

app.get('/api/username', async (req, res) => {
  try {
    res.send(await controller.checkIfUsernameIsAvailable(req));
  } catch (e) {
    dbErrors.respondError(e.message,res)
    console.error(e);
    res.sendStatus(500);
  }
});


app.post('/api/authentication', async (req, res) => {
  try {
    // console.log(req.body)
    const token = await controller.authenticateUser(req);
    
    res.cookie('authToken', token,{ expires: new Date(Date.now() + 1800000)});

  } catch (error) {
    dbErrors.respondError(error.message,res)
    console.error(error);
    res.status(401);
  }
  res.send()
});

app.delete('/api/authentication', async (req, res) => {
  try {
    await controller.deAuthenticateUser(req);
    res.clearCookie('authToken');
    res.clearCookie('privilegeLevel')
    res.send();
  } catch (error) {
    dbErrors.respondError(error.message,res)
    console.error(error)
    res.status(401);
  }
})

app.get('/api/application', async (req, res) => {
  try {
    const application = await controller.getApplication(req);
    // console.log("Server sends: " + application)
    if (application == "no access") {
      res.sendStatus(401)
    } else {
      res.send(JSON.stringify(application));
    }
  } catch (error) {
    dbErrors.respondError(error.message,res)
    console.error(error);
    res.status(400);
  }
});

app.post('/api/application', async (req, res) => {
  try {
    const application = controller.createApplication(req);
  } catch (error) {
    dbErrors.respondError(error.message,res)
    console.error(error);
    res.status(400);
  }
  res.send();
});

app.put('/api/application', async (req, res) => {
  try {
    const application = await controller.updateApplicationStatus(req);
    if(application === "OK"){
      res.send()
    }
  } catch (error) {
    dbErrors.respondError(error.message,res)
    console.error(error);
    res.status(500);
  }
  res.send();
});

app.get('/api/competence', async (req, res) => {
  try {
    res.cookie('authToken', controller.getToken(req),{ expires: new Date(Date.now() + 1800000)});
    res.send(JSON.stringify(await controller.getCompetence(req)));
  } catch (error) {
    dbErrors.respondError(error.message,res)
    console.error(error)
    res.sendStatus(500);
  }
})


// For React
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);