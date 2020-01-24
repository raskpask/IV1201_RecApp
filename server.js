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
const requestHandler = require('./backend/model/requestHandler')

app.post('/api/user', async (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.username || !body.password || !body.email || !body.date || !body.firstName || !body.lastName) {
      console.log("Missing param or params")
      res.status(400)
      res.send()
    }
    
    console.log(req.body)
    // controller.registerUser(user)
    res.send();
  } catch (error) {
    console.log(error)
  }
});


app.get('/ping', function (req, res) {
  return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);