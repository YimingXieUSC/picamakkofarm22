var HomeScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "HomeScene" });
    },
    init: function(data) {
        this.message = data.message;
    },
    onObjectClicked() {
        this.scene.start("GameEntryScene", {
            "message": "Start Over"
        });
    
    },
    preload: function() {
        preloadAnimation(this);

        this.load.image('quit_button', 'assets/ui/buttons/B_BT_Exit_single.png');
        this.load.image('start_button', 'assets/ui/buttons/B_BT_Start_single.png');

        // map
        this.load.image("tiles2","assets/interior_tileset.png");
        this.load.tilemapTiledJSON('map2',"assets/interior_map.json");
        

    },
    onObjectClicked() {
        console.log("Quitting the game");
        this.scene.start("GameEntryScene", {
            "message": "Start over"
        });
    
    },
    create: function() {
        // tilemaps
        const map = this.make.tilemap({ key: "map2" });

        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = map.addTilesetImage("interior_tileset", "tiles2");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const underLayers = map.createStaticLayer("underLayers", tileset, 0, 0);
        const worldLayers2 = map.createStaticLayer("worldLayers2", tileset, 0, 0);
        const worldLayers = map.createStaticLayer("worldLayers", tileset, 0, 0);

        worldLayers.setCollisionByProperty({ collide: true });
        worldLayers2.setCollisionByProperty({ collide: true });

        createAnimation(this);
        associateKeyboardInputs(this);
        
        // add the main character
        spawnMainCharacter(this, 320.750, SCREEN_BOTTOM - 10, 'idle_down', MAIN_CHARACTER_SCALE);
        this.physics.add.collider( mainCharacter.character, worldLayers);
        this.physics.add.collider( mainCharacter.character, worldLayers2);
    },
    update: function() {
        processInput(this);
    }
});