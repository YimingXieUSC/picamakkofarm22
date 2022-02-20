const main_character_anim_keys = [
    'idle_down', 'idle_up', 'idle_left', 'idle_right',
    'walk_down', 'walk_up', 'walk_right', 'walk_left',
    'run_down', 'run_up', 'run_right', 'run_left',
    'tilling_down', 'tilling_up', 'tilling_left', 'tilling_right',
    'chopping_down', 'chopping_up', 'chopping_left', 'chopping_right',
    'watering_down', 'watering_up', 'watering_left', 'watering_right',
];

var keyW;
var keyS;
var keyA;
var keyD;
var currentPlayingAnim = 'idle_down';
var cat;

var BeginGameScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "BeginGameScene" });
    },
    init: function(data) {
        this.message = data.message;
    },
    preload: function() {
        this.load.spritesheet('main_character', 'assets/characters/main_character.png', { frameWidth: 48 });
    },
    create: function() {
        /********************* Start of Animation set *********************/
        /** Start of Main Characrer Animation Set **/
        // idle
        this.anims.create({
            key: 'idle_down',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 0, 1, 2, 3, 4, 5, 6, 7 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_up',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 8, 9, 10, 11, 12, 13, 14, 15 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_left',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 16, 17, 18, 19, 20, 21, 22, 23 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_right',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 24, 25, 26, 27, 28, 29, 30, 31 ] }),
            frameRate: 8,
            repeat: -1
        });
        // walk
        this.anims.create({
            key: 'walk_down',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 32, 33, 34, 35, 36, 37, 38, 39 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_up',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 40, 41, 42, 43, 44, 45, 46, 47 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 48, 49, 50, 51, 52, 53, 54, 55 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 56, 57, 58, 59, 60, 61, 62, 63 ] }),
            frameRate: 8,
            repeat: -1
        });
        // run
        this.anims.create({
            key: 'run_down',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 64, 65, 66, 67, 68, 69, 70, 71 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'run_up',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 72, 73, 74, 75, 76, 77, 78, 79 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'run_right',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 80, 81, 82, 83, 84, 85, 86, 87 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'run_left',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 88, 89, 90, 91, 92, 93, 94, 95 ] }),
            frameRate: 8,
            repeat: -1
        });
        // tilling
        this.anims.create({
            key: 'tilling_down',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 96, 97, 98, 99, 100, 101, 102, 103 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'tilling_up',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 104, 105, 106, 107, 108, 109, 110, 111 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'tilling_left',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 112, 113, 114, 115, 116, 117, 118, 119 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'tilling_right',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 120, 121, 122, 123, 124, 125, 126, 127 ] }),
            frameRate: 8,
            repeat: -1
        });
        // chopping
        this.anims.create({
            key: 'chopping_down',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 128, 129, 130, 131, 132, 133, 134, 135 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'chopping_up',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 136, 137, 138, 139, 140, 141, 142, 143 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'chopping_left',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 144, 145, 146, 147, 148, 149, 150, 151 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'chopping_right',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 152, 153, 154, 155, 156, 157, 158, 159 ] }),
            frameRate: 8,
            repeat: -1
        });
        // watering
        this.anims.create({
            key: 'watering_down',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 160, 161, 162, 163, 164, 165, 166, 167 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'watering_up',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 168, 169, 170, 171, 172, 173, 174, 175 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'watering_left',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 176, 177, 178, 179, 180, 181, 182, 183 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'watering_right',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 184, 185, 186, 187, 188, 189, 190, 191 ] }),
            frameRate: 8,
            repeat: -1
        });
        /** End of Main Characrer Animation Set **/
        /********************* End of Animation set *********************/
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
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

        cat = this.add.sprite(640, 360);
        cat.setScale(3);
        cat.play('idle_down');
    },
    update: function() {
        if (keyW.isDown)
        {
            if (currentPlayingAnim !== 'walk_up')
            {
                currentPlayingAnim = 'walk_up';
                cat.play('walk_up');
            }
        }
        else if (keyS.isDown)
        {
            if (currentPlayingAnim !== 'walk_down')
            {
                currentPlayingAnim = 'walk_down';
                cat.play('walk_down');
            }
        }
        else if (keyA.isDown)
        {
            if (currentPlayingAnim !== 'walk_left')
            {
                currentPlayingAnim = 'walk_left';
                cat.play('walk_left');
            }
        }
        else if (keyD.isDown)
        {
            if (currentPlayingAnim !== 'walk_right')
            {
                currentPlayingAnim = 'walk_right';
                cat.play('walk_right');
            }
        }
        else
        {
            if (currentPlayingAnim === 'walk_right')
            {
                currentPlayingAnim = 'idle_right';
                cat.play('idle_right');
            }
            else if (currentPlayingAnim === 'walk_left')
            {
                currentPlayingAnim = 'idle_left';
                cat.play('idle_left');
            }
            else if (currentPlayingAnim === 'walk_up')
            {
                currentPlayingAnim = 'idle_up';
                cat.play('idle_up');
            }
            else if (currentPlayingAnim === 'walk_down')
            {
                currentPlayingAnim = 'idle_down';
                cat.play('idle_down');
            }
        }
    }
});