import Phaser from 'phaser';
import { io } from 'socket.io-client';

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

		//load the assets
		this.load.image('character', 'img/red.png');
	}

	create() {
		//
	}
}