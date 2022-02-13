//internal members (every entity has these)
let entityCount = 0;
const positions = [];
const velocities = [];
const destinations = [];

//externals
const makeEntity = () => {
	const entity = entityCount++;
	positions[entity] = { x: 0, y: 0 };
	velocities[entity] = { x: 0, y: 0 };
	destinations[entity] = { x: 0, y: 0 };
	return entity;
};

const clearEntity = entity => {
	delete positions[entity];
	delete velocities[entity];
	delete destinations[entity];
};

const getPosition = entity => {
	return positions[entity];
};

const getVelocity = entity => {
	return velocities[entity];
};

const getDestination = entity => {
	return destinations[entity];
};

const setPosition = (entity, pos) => {
	return positions[entity] = pos;
};

const setVelocity = (entity, vel) => {
	return velocities[entity] = vel;
};

const setDestination = (entity, dest) => {
	return destinations[entity] = dest;
};

let delta = 1;
const calcPositions = () => {
	const f = (_, entity) => {
		//don't move past X
		if (Math.abs(destinations[entity].x - positions[entity].x) < Math.abs(velocities[entity].x * delta)) {
			positions[entity].x = destinations[entity].x;
			velocities[entity].x = 0;
		} else {
			positions[entity].x += velocities[entity].x * delta;
		}

		//don't move past Y
		if (Math.abs(destinations[entity].y - positions[entity].y) < Math.abs(velocities[entity].y * delta)) {
			positions[entity].y = destinations[entity].y;
			velocities[entity].y = 0;
		} else {
			positions[entity].y += velocities[entity].y * delta;
		}

		console.log(positions, velocities[entity].x * delta);
	};

	//run the next iteration
	let simTime = (new Date()).getTime();
	setTimeout(() => {
		console.log('looping...');
		//calc delta
		const d = new Date();
		if (simTime < d.getTime()) {
			delta = d.getTime() - simTime;
			simTime += delta;
		}

		positions.forEach(f);
		setTimeout(() => calcPositions(), delta);
	}, delta);
};

module.exports = {
	makeEntity,
	clearEntity,
	getPosition,
	getVelocity,
	getDestination,
	setPosition,
	setVelocity,
	setDestination,
	calcPositions,
};