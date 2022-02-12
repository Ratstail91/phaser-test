import Phaser from 'phaser';

export default class HelloWorld extends Phaser.Scene {
	constructor() {
		super('hello-world');
	}

	preload() {
		this.load.image('red', 'img/red.png');
	}

	create() {
		const particles = this.add.particles('red');

		const emitter = particles.createEmitter({
			speed: 100,
			scale: { start: 1, end: 0 },
			blendMode: 'ADD'
		});
	}
}