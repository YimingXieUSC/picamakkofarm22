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
        this.load.image("tiles","assets/tileset7.png");
        this.load.tilemapTiledJSON('map',"assets/tilemap9.json");
        

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
        const tileset = map.addTilesetImage("tileset7", "tiles");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const belowLayer1 = map.createStaticLayer("belowLayer1", tileset, 0, 0);
        const belowLayer2 = map.createStaticLayer("belowLayer2", tileset, 0, 0);
        const belowLayer3 = map.createStaticLayer("belowLayer3", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("worldLayer", tileset, 0, 0);
        const worldLayer2 = map.createStaticLayer("worldLayer2", tileset, 0, 0);
        
        worldLayer.setCollisionByProperty({ collide: true });
        worldLayer2.setCollisionByProperty({ collide: true });

        const debugGraphics = this.add.graphics().setAlpha(0.75);
        worldLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
        worldLayer2.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

        createAnimation(this);
        associateKeyboardInputs(this);

        // UI
        var quitButton = this.add.image(SCREEN_RIGHT - 50 , 20, 'quit_button').setDepth(1);


        // button to quit the game
        quitButton.setInteractive();

        this.input.on('gameobjectdown', this.onObjectClicked, this);
        
        // add the main character
        spawnMainCharacter(this, SCREEN_RIGHT / 4 - 30, SCREEN_BOTTOM / 2 - 80, 'idle_down', MAIN_CHARACTER_SCALE);
        this.physics.add.collider( mainCharacter.character, worldLayer);
        this.physics.add.collider( mainCharacter.character, worldLayer2);
    },
    update: function() {
        processInput();
    }
});