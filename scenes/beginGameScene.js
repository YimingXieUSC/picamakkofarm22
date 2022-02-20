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
        this.load.image("hilled_dirt_tiles", "/assets/tilesets/Tilled_Dirt.png");
        this.load.image("hilled_tiles", "/assets/tilesets/Hills.png");
        this.load.tilemapCSV("map", "../assets/main_map_Tile_Layer1.csv");
    },
    onObjectClicked() {
        console.log("Quitting the game");
        this.scene.start("GameOverScene", {
            "message": "Game over"
        });
    
    },
    create: function() {

        // map
        const map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage("hilled_tiles");
        const layer = map.createStaticLayer(0, tileset, 0, 0); // layer index, tileset, x, y

        createAnimation(this);
        associateKeyboardInputs(this);

        var text = this.add.text(
            SCREEN_RIGHT / 2,
            SCREEN_BOTTOM / 2,
            "main game", 
            {
                fontSize: 25,
                color: "#FFFFFF",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        // button to quit the game
        var playButton = this.add.image(1200, 40, 'quit_button').setDepth(1);
        playButton.setScale(2);
        playButton.setInteractive();

        this.input.on('gameobjectdown', this.onObjectClicked, this);
        
        // add the main character
        spawnMainCharacter(this, SCREEN_RIGHT / 2, SCREEN_BOTTOM / 2, 'idle_down');
    },
    update: function() {
        processInput();
    }
});