
const http = require('http');
const app = require('./app');
const dbConfig = require('./config/dbConfig');

const port = 6012;
const hostname = '127.0.0.1';

const server = http.createServer(app); 
dbConfig();

app.get('/', function (req, res) {
  res.send('Welcome to boatrr. Dev')
})
server.listen(port,hostname);