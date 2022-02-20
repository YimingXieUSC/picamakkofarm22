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
var keyX;
var keyC;
var keyV;
var disabledMoving = false;
var currentPlayingAnim = 'idle_down';
var cat;
var running = false;
// direction: 0 (down), 1 (up), 2 (left), 3 (right)
var direction = 0;
const allDirections = ['down', 'up', 'left', 'right'];

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

        /********************* Start of Animation set *********************/
        /** Start of Main Characrer Animation Set **/
        // idle
        this.anims.create({
            key: 'idle_down',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 0, 1, 2, 3, 4, 5, 6, 7 ] }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'idle_up',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 8, 9, 10, 11, 12, 13, 14, 15 ] }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'idle_left',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 16, 17, 18, 19, 20, 21, 22, 23 ] }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'idle_right',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 24, 25, 26, 27, 28, 29, 30, 31 ] }),
            frameRate: 8,
            repeat: -1,
        });
        // walk
        this.anims.create({
            key: 'walk_down',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 32, 33, 34, 35, 36, 37, 38, 39 ] }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'walk_up',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 40, 41, 42, 43, 44, 45, 46, 47 ] }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 48, 49, 50, 51, 52, 53, 54, 55 ] }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 56, 57, 58, 59, 60, 61, 62, 63 ] }),
            frameRate: 8,
            repeat: -1,
        });
        // run
        this.anims.create({
            key: 'run_down',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 64, 65, 66, 67, 68, 69, 70, 71 ] }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'run_up',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 72, 73, 74, 75, 76, 77, 78, 79 ] }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'run_right',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 80, 81, 82, 83, 84, 85, 86, 87 ] }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'run_left',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 88, 89, 90, 91, 92, 93, 94, 95 ] }),
            frameRate: 8,
            repeat: -1,
        });
        // tilling
        this.anims.create({
            key: 'tilling_down',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 96, 97, 98, 99, 100, 101, 102, 103 ] }),
            frameRate: 8,
        });
        this.anims.create({
            key: 'tilling_up',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 104, 105, 106, 107, 108, 109, 110, 111 ] }),
            frameRate: 8,
        });
        this.anims.create({
            key: 'tilling_left',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 112, 113, 114, 115, 116, 117, 118, 119 ] }),
            frameRate: 8,
        });
        this.anims.create({
            key: 'tilling_right',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 120, 121, 122, 123, 124, 125, 126, 127 ] }),
            frameRate: 8,
        });
        // chopping
        this.anims.create({
            key: 'chopping_down',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 128, 129, 130, 131, 132, 133, 134, 135 ] }),
            frameRate: 8,
        });
        this.anims.create({
            key: 'chopping_up',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 136, 137, 138, 139, 140, 141, 142, 143 ] }),
            frameRate: 8,
        });
        this.anims.create({
            key: 'chopping_left',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 144, 145, 146, 147, 148, 149, 150, 151 ] }),
            frameRate: 8,
        });
        this.anims.create({
            key: 'chopping_right',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 152, 153, 154, 155, 156, 157, 158, 159 ] }),
            frameRate: 8,
        });
        // watering
        this.anims.create({
            key: 'watering_down',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 160, 161, 162, 163, 164, 165, 166, 167 ] }),
            frameRate: 8,
        });
        this.anims.create({
            key: 'watering_up',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 168, 169, 170, 171, 172, 173, 174, 175 ] }),
            frameRate: 8,
        });
        this.anims.create({
            key: 'watering_left',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 176, 177, 178, 179, 180, 181, 182, 183 ] }),
            frameRate: 8,
        });
        this.anims.create({
            key: 'watering_right',
            frames: this.anims.generateFrameNumbers('main_character', { frames: [ 184, 185, 186, 187, 188, 189, 190, 191 ] }),
            frameRate: 8,
        });
        /** End of Main Characrer Animation Set **/
        /********************* End of Animation set *********************/
        // add key inputs for moving up, down, left, right
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
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
        cat = this.add.sprite(SCREEN_RIGHT / 2, SCREEN_BOTTOM / 2);
        cat.setScale(MAIN_CHARACTER_SCALE);
        cat.play('idle_down');
    },
    update: function() {
        if (!disabledMoving) {
            // check for tilling
            if (keyX.isDown) {
                disabledMoving = true;
                if (direction == 1) {
                    currentPlayingAnim = 'tilling_up';
                    cat.play('tilling_up');
                } else if (direction == 0) {
                    currentPlayingAnim = 'tilling_down';
                    cat.play('tilling_down');
                } else if (direction == 2) {
                    currentPlayingAnim = 'tilling_left';
                    cat.play('tilling_left');
                } else if (direction == 3) {
                    currentPlayingAnim = 'tilling_right';
                    cat.play('tilling_right');
                }
            } else if (keyC.isDown) {
                disabledMoving = true;
                if (currentPlayingAnim === 'run_up' ||
                    currentPlayingAnim === 'walk_up' ||
                    currentPlayingAnim === 'idle_up') {
                    currentPlayingAnim = 'chopping_up';
                    cat.play('chopping_up');
                } else if (currentPlayingAnim === 'run_down' ||
                    currentPlayingAnim === 'walk_down' ||
                    currentPlayingAnim === 'idle_down') {
                    currentPlayingAnim = 'chopping_down';
                    cat.play('chopping_down');
                } else if (currentPlayingAnim === 'run_left' ||
                    currentPlayingAnim === 'walk_left' ||
                    currentPlayingAnim === 'idle_left') {
                    currentPlayingAnim = 'chopping_left';
                    cat.play('chopping_left');
                } else if (currentPlayingAnim === 'run_right' ||
                    currentPlayingAnim === 'walk_right' ||
                    currentPlayingAnim === 'idle_right') {
                    currentPlayingAnim = 'chopping_right';
                    cat.play('chopping_right');
                }
            } else if (keyV.isDown) {
                disabledMoving = true;
                if (direction == 1) {
                    currentPlayingAnim = 'watering_up';
                    cat.play('watering_up');
                } else if (direction == 0) {
                    currentPlayingAnim = 'watering_down';
                    cat.play('watering_down');
                } else if (direction == 2) {
                    currentPlayingAnim = 'watering_left';
                    cat.play('watering_left');
                } else if (direction == 3) {
                    currentPlayingAnim = 'watering_right';
                    cat.play('watering_right');
                }
            } else if (keyW.isDown) {
                direction = 1;
                if (keyW.getDuration() > 1500 || running) {
                    running = true;
                    if (currentPlayingAnim !== 'run_up') {
                        currentPlayingAnim = 'run_up';
                        cat.play('run_up');
                    }
                    cat.y = Math.max(cat.y - RUNNING_SPEED,
                        SCREEN_TOP + MAIN_CHARACTER_SCALE * MAIN_CHARACTER_SIZE / 2);
                } else {
                    running = false;
                    if (currentPlayingAnim !== 'walk_up') {
                        currentPlayingAnim = 'walk_up';
                        cat.play('walk_up');
                    }
                    cat.y = Math.max(cat.y - WALKING_SPEED,
                        SCREEN_TOP + MAIN_CHARACTER_SCALE * MAIN_CHARACTER_SIZE / 2);
                }
            } else if (keyS.isDown) {
                direction = 0;
                if (keyS.getDuration() > 1500 || running) {
                    running = true;
                    if (currentPlayingAnim !== 'run_down') {
                        currentPlayingAnim = 'run_down';
                        cat.play('run_down');
                    }
                    cat.y = Math.min(cat.y + RUNNING_SPEED,
                        SCREEN_BOTTOM - MAIN_CHARACTER_SCALE * MAIN_CHARACTER_SIZE / 2);
                } else {
                    running = false;
                    if (currentPlayingAnim !== 'walk_down') {
                        currentPlayingAnim = 'walk_down';
                        cat.play('walk_down');
                    }
                    cat.y = Math.min(cat.y + WALKING_SPEED,
                        SCREEN_BOTTOM - MAIN_CHARACTER_SCALE * MAIN_CHARACTER_SIZE / 2);
                }
            } else if (keyA.isDown) {
                direction = 2;
                if (keyA.getDuration() > 1500 || running) {
                    running = true;
                    if (currentPlayingAnim !== 'run_left') {
                        currentPlayingAnim = 'run_left';
                        cat.play('run_left');
                    }
                    cat.x = Math.max(cat.x - RUNNING_SPEED,
                        SCREEN_LEFT + MAIN_CHARACTER_SCALE * MAIN_CHARACTER_SIZE / 2);
                } else {
                    running = false;
                    if (currentPlayingAnim !== 'walk_left') {
                        currentPlayingAnim = 'walk_left';
                        cat.play('walk_left');
                    }
                    cat.x = Math.max(cat.x - WALKING_SPEED,
                        SCREEN_LEFT + MAIN_CHARACTER_SCALE * MAIN_CHARACTER_SIZE / 2);
                }
            } else if (keyD.isDown) {
                direction = 3;
                if (keyD.getDuration() > 1500 || running) {
                    running = true;
                    if (currentPlayingAnim !== 'run_right') {
                        currentPlayingAnim = 'run_right';
                        cat.play('run_right');
                    }
                    cat.x = Math.min(cat.x + RUNNING_SPEED,
                        SCREEN_RIGHT - MAIN_CHARACTER_SCALE * MAIN_CHARACTER_SIZE / 2);
                } else {
                    running = false;
                    if (currentPlayingAnim !== 'walk_right') {
                        currentPlayingAnim = 'walk_right';
                        cat.play('walk_right');
                    }
                    cat.x = Math.min(cat.x + WALKING_SPEED,
                        SCREEN_RIGHT - MAIN_CHARACTER_SCALE * MAIN_CHARACTER_SIZE / 2);
                }
            } else {
                running = false;
                if (direction <= 3 && direction >= 0 &&
                    currentPlayingAnim !== 'idle_' + allDirections[direction]) {
                    currentPlayingAnim = 'idle_'+ allDirections[direction];
                    cat.play(currentPlayingAnim);
                }
            }
        }
        else if (!cat.anims.isPlaying)
        {
            disabledMoving = false;
        }
    }
});