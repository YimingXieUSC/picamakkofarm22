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
		pearTree.character.setSize(25, 26);
		pearTree.character.setOffset(11, 16);
		pearTree.character.setImmovable(true);
		this.physics.add.collider(
		  mainCharacter.character, pearTree.character,
		  function (_player, _tree)
		  {
			  if (_player.body.touching.down)
			  {
				  _player.depth = 0;
				  _tree.depth = 10;
			  } else {
				  _player.depth = 10;
				  _tree.depth = 0;
			  }
		  });

		this.physics.add.collider(mainCharacter.character, pearTree.character);
	},
	update: function() {
		processInput();
	}
});