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
}

const getDestination = entity => {
	return destinations[entity];
}

const setPosition = (entity, pos) => {
	return positions[entity] = pos;
};

const setVelocity = (entity, vel) => {
	return velocities[entity] = vel;
}

const setDestination = (entity, dest) => {
	return destinations[entity] = dest;
}

module.exports = {
	makeEntity,
	clearEntity,
	getPosition,
	getVelocity,
	getDestination,
	setPosition,
	setVelocity,
	setDestination,
};