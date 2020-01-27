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
const User = require('./backend/model/user');


app.post('/api/user', async (req, res) => {
  try {
    const statusCode = await controller.registerUser(req, res);
    res.status(statusCode);
  } catch (error) {
    console.log(error);
    res.status(400)
  }
  res.send();
});

app.put('/api/user', async (req, res) => {
  const body = req.body;
  try {
    const statusCode = await controller.updateUser(req);
    res.status(statusCode);
  } catch (error) {
    console.log(error);
    res.status(400)
  }
  res.send();
});

app.get('/api/user', async (req, res) => {
  try {
    console.log("the request was recived")
    // const cookie = extractCookie(req.header.cookie);
    const user = await controller.getUser(req);
    res.send(JSON.stringify({ user: user }))
    console.log(user)
  } catch (error) {
    console.error(error)
  }
});



app.post('/api/login', async (req, res) => {
  try {
    const token = await controller.authenticateUser(req);
    res.cookie('authToken', token);
  } catch (error) {
    res.status(401);
  }

  res.send()
});

app.get('/api/application', async (req, res) => {
  try {
    const application = controller.getApplication(req);
  } catch (error) {
    res.status(400);
  }
  res.send();
});

app.post('/api/application', async (req, res) => {
  try {
    const application = controller.createApplication(req);
  } catch (error) {
    res.status(400);
  }
  res.send();
});

app.get('/api/listApplication', async (req, res) => {
  try {
    const application = controller.getListApplication(req);
  } catch (error) {
    res.status(400);
  }
  res.send();
});




// For React
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);