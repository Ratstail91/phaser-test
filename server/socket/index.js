//main function for socket.io
module.exports = io => {
	io.on('connection', connection(io));
};

//setup all of the callbacks for playing the game
const connection = io => socket => {
	//basic hello/goodbye
	console.log('socket connected');
	socket.on('disconnect', () => {
		console.log('socket disconnected');
	});

	//
};