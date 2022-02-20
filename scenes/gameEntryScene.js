var GameEntryScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "GameEntryScene" });
    },
    init: function() {},
    preload: function() {
        this.load.image('farm_background', 'assets/beginPic.png');
        this.load.image('start_button', 'assets/ui/buttons/B_BT_Start.png');
        this.load.audio('menu_music', 'assets/bgm/menu.mp3');

    
    },
    onObjectClicked() {

        console.log("Object clicked");

        this.scene.start("BeginGameScene", {
            "message": "Game over"
        });
    
    },
    create: function() {
            // begin scene background
        const { width, height } = this.sys.game.config;

        const bg = this.add.tileSprite(0, 0, width, height, "farm_background");
        bg.setOrigin(0, 0);

        // play music
        this.sound.play('menu_music', {
            loop: true
        });

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

        // button to the next scene
        var playButton = this.add.image(640, 500, 'start_button').setDepth(1);
        playButton.setScale(3);

        playButton.setInteractive();

        this.input.on('gameobjectdown', this.onObjectClicked, this);

        // playButton.on('poninterdown', function () {
        //     this.scene.start("BeginGameScene", {
        //         "message": "Game over"
        //      });
        //  }, this);

        // this.time.addEvent({
        //     delay: 30000, // after 3 seconds the next named scene will start
        //     loop: false,
        //     callback: () => {
        //         this.scene.start("BeginGameScene", {
        //             "message": "Game over"
        //         });
        //     }
        // })
    },
    update: function() {}
});