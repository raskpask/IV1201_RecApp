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
    const body = req.body;
    const statusCode = await controller.registerUser(body, res)
    res.status(statusCode)
    res.send();
  } catch (error) {
    console.log(error)
  }
});

app.post('/api/login', async (req, res) => {
  const body = req.body;
  const token = await controller.authenticateUser(body)
  res.cookie('authToken', token);
  res.send()
});

function extractCookie(cookieHeader) {
  if (!cookieHeader) {
      return null
  }
  return cookieHeader ? cookieHeader.split('=')[1] : null;
}
// For React
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);