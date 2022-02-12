//react
import React, { useState, useEffect } from 'react';

//phaser
import PhaserWrapper from '../phaser/wrapper';
import HelloWorld from '../phaser/scenes/hello-world';
import Room from '../phaser/scenes/room';

//phaser config
const config = {
	type: Phaser.AUTO,
	width: 768,
	height: 800
};

//example app
const App = props => {
	//state
	const [game, setGame] = useState(null);

	//phaser setup
	useEffect(() => {
		if (!game) {
			return;
		}

		//load all scenes TODO: make dynamic
		game.scene.add('hello-world', HelloWorld);
		game.scene.add('room', Room);

		//start first scene
		game.scene.start('room');
	}, [game]);

	return (
		<>
			<PhaserWrapper config={config} setGame={setGame} />
		</>
	);
};

export default App;
