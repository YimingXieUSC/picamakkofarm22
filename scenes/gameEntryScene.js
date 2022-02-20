var GameEntryScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "GameEntryScene" });
    },
    init: function() {},
    preload: function() {
        this.load.image('farm_background', 'assets/beginPic.png');
        this.load.image('house', 'assets/tilesets/Objects/Houses/1.png');
    
    },
    create: function() {
            // begin scene background
        const { width, height } = this.sys.game.config;

        const bg = this.add.tileSprite(0, 0, width, height, "farm_background");
        bg.setOrigin(0, 0);

        // begin scene text
        this.add
        .text(width / 2, height / 2, "Farm under Pandamic\n",
        {
            font: "50px monospace",
            color: "white"
        })
        .setOrigin(0.5, 0.5)
        .setShadow(5, 5, "#658CA1", 0, true, true);

        // this.house = this.add.image(640, 360, "house");

        this.time.addEvent({
            delay: 3000, // after 3 seconds the next named scene will start
            loop: false,
            callback: () => {
                this.scene.start("BeginGameScene", {
                    "message": "Game over"
                });
            }
        })
    },
    update: function() {}
});