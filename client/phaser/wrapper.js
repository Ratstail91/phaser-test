import React, { useState, useEffect, useRef } from 'react';
import Phaser from 'phaser';

//connect react and phaser
const connect = (config, divRef) => {
	const conf = JSON.parse(JSON.stringify(config));

	conf.parent = divRef.current || divRef;

	return new Phaser.Game(conf);
};

//the phaser component
const PhaserWrapper = props => {
	//internal state
	const [game, setGame] = useState(null);

	//refs
	const phaserRef = useRef();

	//effects
	useEffect(() => {
		//if the user wants to capture the game
		const setGame = props.setGame || setGame;

		//setup
		setGame(connect(props.config || {}, phaserRef));

		//shutdown
		return () => game.destroy();
	}, []);

	//render
	return <div ref={phaserRef} />;
};

export default PhaserWrapper;