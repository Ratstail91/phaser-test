//entity stuff
const {
	makeEntity,
	clearEntity,
	getPosition,
	getVelocity,
	getDestination,
	setPosition,
	setVelocity,
	setDestination,
	calcPositions,
} = require('../ECS/entity');

//kickoff
calcPositions();

//main function for socket.io
module.exports = io => {
	io.on('connection', connection(io));
};

//setup all of the callbacks for playing the game
const connection = io => async socket => {
	//basic hello/goodbye
	console.log('socket connected');
	socket.on('disconnect', () => {
		console.log('socket disconnected');

		//clear that entity from memory
		clearEntity(socket.entity);

		//clear from user memory too
		io.emit('player clear', {
			entity: socket.entity
		});
	});

	//create the entity and send it out
	socket.entity = makeEntity();

	//send this info to all players
	io.emit('player make', {
		entity: socket.entity,
		position: getPosition(socket.entity),
		velocity: getVelocity(socket.entity),
		destination: getDestination(socket.entity),
	});

	//send all server info to you
	const socks = await io.fetchSockets();

	socks.forEach(sock => {
		if (socket.entity == sock.entity) {
			return; //ignore self
		}

		socket.emit('player make', {
			entity: sock.entity,
			position: getPosition(sock.entity),
			velocity: getVelocity(sock.entity),
			destination: getDestination(socket.entity),
		});
	});

	//send your entity info
	socket.emit('player you', {
		entity: socket.entity
	});

	//setup inputs
	socket.on('player move', payload => {
		setDestination(payload.entity, payload.destination);

		//bounce it out
		io.emit('player move', {
			entity: payload.entity,
			position: getPosition(payload.entity),
			velocity: calcVelocity(payload.entity),
			destination: payload.destination,
		});
	});
};

const calcVelocity = entity => {
	const pos = getPosition(entity);
	const dst = getDestination(entity);

	const delay = 0.001;
	const distance = { x: dst.x - pos.x, y: dst.y - pos.y };
	const velocity = { x: distance.x * delay, y: distance.y * delay };

	return velocity;
};
