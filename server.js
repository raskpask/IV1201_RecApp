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


app.post('/api/user', async (req, res) => {
  try {
    const statusCode = await controller.registerUser(req);
    res.status(statusCode);
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(400)
  }
  res.send();
});

app.get('/api/user', async (req, res) => {
  try {
    const user = await controller.getUser(req);
    res.send(JSON.stringify({ user: user }));
    console.log(user);
  } catch (error) {
    console.error(error)
    res.sendStatus(400);
  }
});



app.post('/api/authentication', async (req, res) => {
  try {
    const token = await controller.authenticateUser(req);
    res.cookie('authToken', token);
    
  } catch (error) {
    console.error(error);
    res.status(401);
  }
  res.send()
});

app.delete('/api/authentication', async (req,res)=>{
  try{
    await controller.deAuthenticateUser(req);
    res.clearCookie('authToken');
    res.send();
  } catch (error){
    console.error(error)
    res.status(401);
  }
  res.sendStatus(500)
})

app.get('/api/application', async (req, res) => {
  try {
    const application = controller.getApplication(req);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
  res.send();
});

app.post('/api/application', async (req, res) => {
  try {
    const application = controller.createApplication(req);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
  res.send();
});

app.get('/api/listApplication', async (req, res) => {
  try {
    const application = await controller.getListApplication(req);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
  res.send();
});

app.get('/api/competence', async (req,res)=>{
  try {
    res.send(JSON.stringify(await controller.getCompetence(req)));
  } catch (error){
    console.error(error)
    res.sendStatus(500);
  }
})


// For React
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);