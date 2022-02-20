var GameOverScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "GameOverScene" });
    },
    init: function(data) {
        // this.message = data.message;
        this.message = "GAME OVER"
    },
    preload: function() {
        this.load.image('house', 'assets/tilesets/Objects/Houses/1.png');
        this.load.image("hilled_dirt_tiles", "/assets/tilesets/Tilled_Dirt.png");

    },
    onObjectClicked() {

        console.log("Object clicked");

        this.scene.start("BeginGameScene", {
            "message": "Game over"
        });
    
    },
    create: function() {

        // tilemap level
        const level = [
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   1,   2,   3,   0,   0,   0,   1,   2,   3,   0 ],
            [  0,   5,   6,   7,   0,   0,   0,   5,   6,   7,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,  14,  13,  14,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,  14,  14,  14,  14,  14,   0,   0,   0,  15 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,  15,  15 ],
            [ 15,  16,  11,   0,   0,   0,   0,   0,  15,  15,  15 ],
            [ 11,  11,  11,  11,  11,  11,  11,  11,  11,  11,  11 ]
          ];

        const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 }); // create a Tilemap
        const tiles = map.addTilesetImage("hilled_dirt_tiles");
        const layer = map.createStaticLayer(0, tiles, 0, 0);



        var text = this.add.text(
            640, 
            360, 
            this.message, 
            {
                fontSize: 50,
                color: "#FFFFFF",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
    },
    update: function() {}
});