var BeginGameScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "BeginGameScene" });
    },
    init: function(data) {
        this.message = data.message;
    },
    onObjectClicked() {
        console.log("Object clicked");

        this.scene.start("GameEntryScene", {
            "message": "Start Over"
        });
    
    },
    preload: function() {
        preloadAnimation(this);

        this.load.image('quit_button', 'assets/ui/buttons/B_BT_Exit_single.png');
        this.load.image('start_button', 'assets/ui/buttons/B_BT_Start_single.png');

        // map
        this.load.image("tiles","assets/tileset3.png");
        this.load.tilemapTiledJSON('map',"assets/tilemap7.json");
        

    },
    onObjectClicked() {
        console.log("Quitting the game");
        this.scene.start("GameEntryScene", {
            "message": "Start over"
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

        // UI
        var quitButton = this.add.image(SCREEN_RIGHT - 50 , 20, 'quit_button').setDepth(1);


        // button to quit the game
        quitButton.setInteractive();

        this.input.on('gameobjectdown', this.onObjectClicked, this);
        
        // add the main character
        spawnMainCharacter(this, SCREEN_RIGHT / 4 -30, SCREEN_BOTTOM / 2 - 80, 'idle_down');
    },
    update: function() {
        processInput();
    }
});