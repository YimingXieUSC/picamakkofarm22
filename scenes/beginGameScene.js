var BeginGameScene = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function() {
		Phaser.Scene.call(this, { "key": "BeginGameScene" });
	},
	init: function(data) {
		this.message = data.message;
	},
	preload: function() {
		preloadAnimation(this);

		this.load.image('quit_button', 'assets/ui/buttons/B_BT_Exit.png');

		// map
		this.load.image("tiles","assets/tileset3.png");
		this.load.tilemapTiledJSON('map',"assets/tilemap7.json");


	},
	onObjectClicked() {
		console.log("Quitting the game");
		this.scene.start("GameOverScene", {
			"message": "Game over"
		});

	},
	create: function() {
		// tilemaps
		const map = this.make.tilemap({ key: "map" });

		// Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
		// Phaser's cache (i.e. the name you used in preload)
		const tileset = map.addTilesetImage("tileset6", "tiles");

		// Parameters: layer name (or index) from Tiled, tileset, x, y
		const ttt1 = map.createStaticLayer("ttt1", tileset, 0, 0);
		const ttt2 = map.createStaticLayer("ttt2", tileset, 0, 0);
		const ttt3 = map.createStaticLayer("ttt3", tileset, 0, 0);


		createAnimation(this);
		associateKeyboardInputs(this);

		// button to quit the game
		var playButton = this.add.image(1200, 40, 'quit_button').setDepth(1);
		playButton.setScale(2);
		playButton.setInteractive();

		this.input.on('gameobjectdown', this.onObjectClicked, this);

		// add the main character
		spawnMainCharacter(this, SCREEN_RIGHT / 2, SCREEN_BOTTOM / 2, 'idle_down', MAIN_CHARACTER_SCALE);
		// this.physics.add.collider(mainCharacter.character, worldLayer);
		const pearTree = new AnimatedObject('pear_tree_moving');
		spawnAnimatedObject(this, SCREEN_RIGHT / 5, SCREEN_BOTTOM / 5,
		  'pear_tree_static', pearTree, MAIN_CHARACTER_SCALE, 'pear_trees', true);
		pearTree.character.setSize(25, 30);
		pearTree.character.setOffset(11, 12);
		pearTree.character.setImmovable(true);
		this.physics.add.collider(
		  mainCharacter.character, pearTree.character,
		  function (_player, _tree)
		  {
			  console.log(_player.body.overlapX)
		// 	  let speed = mainCharacter.running ? RUNNING_SPEED : WALKING_SPEED;
		// 	  // going up
		// 	  if (mainCharacter.direction === 0 && _player.body.touching.up) {
		// 		  _player.y -= speed;
		// 	  } else if (mainCharacter.direction === 1 && _player.body.touching.down) {  // going down
		// 		  _player.y += speed;
		// 	  } else if (mainCharacter.direction === 2 && _player.body.touching.left) {
		// 		  _player.x += speed;
		// 	  } else if (mainCharacter.direction === 3 && _player.body.touching.right) {
		// 		  _player.x -= speed;
		// 	  }
		  });

		// this.physics.add.collider(mainCharacter.character, pearTree.character);
	},
	update: function() {
		processInput();
	}
});