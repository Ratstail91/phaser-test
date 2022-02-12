import Phaser from 'phaser';
import { io } from 'socket.io-client';

//registered here, rendered by phaser
const players = [];

const playerMake = self => payload => {
	players[payload.entity] = {
		entity: payload.entity,
		position: payload.position,
		velocity: payload.velocity,
		destination: payload.destination,
		sprite: self.add.sprite(payload.position.x, payload.position.y, 'player')
	};
};

const playerClear = self => payload => {
	delete players[payload.entity];
};

const playerYou = self => payload => {
	self.entity = payload.entity;
};

const playerMove = self => payload => {
	console.log(payload);
	players[payload.entity].position = payload.position;
	players[payload.entity].velocity = payload.velocity;
	players[payload.entity].destination = payload.destination;

	updateSprite(payload.entity);
};

//util
const updateSprite = entity => {
	players[entity].sprite.x = players[entity].position.x;
	players[entity].sprite.y = players[entity].position.y;
};

export default class Room extends Phaser.Scene {
	constructor() {
		super('room');
	}

	preload() {
		//load the socket
		this.socket = io();

		this.socket.on('disconnect', () => {
			//try to reconnect
			console.log('socket disconnected');
			this.socket.connect();
		});

		//setup basic interaction functions
		this.socket.on('player make', playerMake(this));
		this.socket.on('player clear', playerClear(this));
		this.socket.on('player you', playerYou(this));
		this.socket.on('player move', playerMove(this));

		//load the assets
		this.load.image('player', 'img/red.png');
	}

	create() {
		//movement input
		this.input.on('pointerdown', pointer => {
			const dest = { x: pointer.x, y: pointer.y };

			//send to server
			this.socket.emit('player move', {
				entity: this.entity,
				destination: dest
			});
		});
	}

	update() {
		//move entities
		players.forEach(player => {
			// if (Math.abs(player.position.x - player.destination.x) < Math.abs(player.velocity.x)) {
			// 	//stop moving in X direction
			// 	player.position.x = player.destination.x;
			// 	player.velocity.x = 0;
			// }

			// if (Math.abs(player.position.y - player.destination.y) < Math.abs(player.velocity.y)) {
			// 	//stop moving in Y direction
			// 	player.position.y = player.destination.y;
			// 	player.velocity.y = 0;
			// }

			//actually move
			player.position += player.velocity;
			updateSprite(player.entity);
		});
	}
}