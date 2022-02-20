var GameEntryScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "GameEntryScene" });
    },
    init: function() {},
    preload: function() {
        this.load.image('farm_background', 'assets/beginPic.png');
        this.load.image('start_button', 'assets/ui/buttons/B_BT_Start_single.png');
        this.load.audio('menu_music', 'assets/bgm/menu.mp3');

    
    },
    onObjectClicked() {
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
        this.sound.pauseOnBlur = false;

        // begin scene text
        this.add
        .text(width / 2, height / 2, "Farm under Pandamic\n",
        {
            font: "50px monospace",
            color: "white"
        })
        .setOrigin(0.5, 0.5)
        .setShadow(5, 5, "#658CA1", 0, true, true);


        // button to the next scene
        var playButton = this.add.image(SCREEN_RIGHT / 2, SCREEN_BOTTOM * 3 / 4, 'start_button').setDepth(1);
        playButton.setScale(3);

        playButton.setInteractive();

        this.input.on('pointerover', function (event, gameObjects) {

            gameObjects[0].setTint(0xF5C222);
    
        });
    
        this.input.on('pointerout', function (event, gameObjects) {
    
            gameObjects[0].clearTint();
    
        });

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