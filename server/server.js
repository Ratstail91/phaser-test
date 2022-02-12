//environment variables
//require('dotenv').config();

//libraries
const path = require('path');

//create the server
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = new (require('socket.io').Server)(server);

//config
app.use(express.json());

//handle compressed files (middleware)
app.get('*.js', (req, res, next) => {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	res.set('Content-Type', 'text/javascript');
	next();
});

app.get('*.css', (req, res, next) => {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	res.set('Content-Type', 'text/css');
	next();
});

//handle images
app.use('/img', express.static(path.resolve(__dirname, '..', 'public', 'content')));

//send static files
app.use('/', express.static(path.resolve(__dirname, '..', 'public')));

//fallback to the index file
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'public' , 'index.html'));
});

//handle socket.io
const socket = require('./socket');
socket(io);

//startup
server.listen(process.env.WEB_PORT || 8080, async (err) => {
	console.log(`listening to localhost:${process.env.WEB_PORT || 8080}`);
});
