/** Constants **/
const WALKING_SPEED = 0.5;
const RUNNING_SPEED = 1.2;
const SCREEN_LEFT = 0;
const SCREEN_RIGHT = 640;
const SCREEN_TOP = 0;
const SCREEN_BOTTOM = 370;
const MAIN_CHARACTER_SCALE = 1;
const MAIN_CHARACTER_SIZE = 16;
const allDirections = ['down', 'up', 'left', 'right'];

/** Global Variables **/
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

/** Reused Functions **/
function preloadAnimation(scene) {
    scene.load.spritesheet('main_character', 'assets/characters/main_character.png', { frameWidth: 48 });
}

function createAnimation(scene) {
    /********************* Start of Animation set *********************/
    /** Start of Main Characrer Animation Set **/
    // idle
    scene.anims.create({
        key: 'idle_down',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 0, 1, 2, 3, 4, 5, 6, 7 ] }),
        frameRate: 8,
        repeat: -1,
    });
    scene.anims.create({
        key: 'idle_up',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 8, 9, 10, 11, 12, 13, 14, 15 ] }),
        frameRate: 8,
        repeat: -1,
    });
    scene.anims.create({
        key: 'idle_left',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 16, 17, 18, 19, 20, 21, 22, 23 ] }),
        frameRate: 8,
        repeat: -1,
    });
    scene.anims.create({
        key: 'idle_right',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 24, 25, 26, 27, 28, 29, 30, 31 ] }),
        frameRate: 8,
        repeat: -1,
    });
    // walk
    scene.anims.create({
        key: 'walk_down',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 32, 33, 34, 35, 36, 37, 38, 39 ] }),
        frameRate: 8,
        repeat: -1,
    });
    scene.anims.create({
        key: 'walk_up',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 40, 41, 42, 43, 44, 45, 46, 47 ] }),
        frameRate: 8,
        repeat: -1,
    });
    scene.anims.create({
        key: 'walk_right',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 48, 49, 50, 51, 52, 53, 54, 55 ] }),
        frameRate: 8,
        repeat: -1,
    });
    scene.anims.create({
        key: 'walk_left',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 56, 57, 58, 59, 60, 61, 62, 63 ] }),
        frameRate: 8,
        repeat: -1,
    });
    // run
    scene.anims.create({
        key: 'run_down',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 64, 65, 66, 67, 68, 69, 70, 71 ] }),
        frameRate: 8,
        repeat: -1,
    });
    scene.anims.create({
        key: 'run_up',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 72, 73, 74, 75, 76, 77, 78, 79 ] }),
        frameRate: 8,
        repeat: -1,
    });
    scene.anims.create({
        key: 'run_right',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 80, 81, 82, 83, 84, 85, 86, 87 ] }),
        frameRate: 8,
        repeat: -1,
    });
    scene.anims.create({
        key: 'run_left',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 88, 89, 90, 91, 92, 93, 94, 95 ] }),
        frameRate: 8,
        repeat: -1,
    });
    // tilling
    scene.anims.create({
        key: 'tilling_down',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 96, 97, 98, 99, 100, 101, 102, 103 ] }),
        frameRate: 8,
    });
    scene.anims.create({
        key: 'tilling_up',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 104, 105, 106, 107, 108, 109, 110, 111 ] }),
        frameRate: 8,
    });
    scene.anims.create({
        key: 'tilling_left',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 112, 113, 114, 115, 116, 117, 118, 119 ] }),
        frameRate: 8,
    });
    scene.anims.create({
        key: 'tilling_right',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 120, 121, 122, 123, 124, 125, 126, 127 ] }),
        frameRate: 8,
    });
    // chopping
    scene.anims.create({
        key: 'chopping_down',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 128, 129, 130, 131, 132, 133, 134, 135 ] }),
        frameRate: 8,
    });
    scene.anims.create({
        key: 'chopping_up',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 136, 137, 138, 139, 140, 141, 142, 143 ] }),
        frameRate: 8,
    });
    scene.anims.create({
        key: 'chopping_left',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 144, 145, 146, 147, 148, 149, 150, 151 ] }),
        frameRate: 8,
    });
    scene.anims.create({
        key: 'chopping_right',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 152, 153, 154, 155, 156, 157, 158, 159 ] }),
        frameRate: 8,
    });
    // watering
    scene.anims.create({
        key: 'watering_down',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 160, 161, 162, 163, 164, 165, 166, 167 ] }),
        frameRate: 8,
    });
    scene.anims.create({
        key: 'watering_up',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 168, 169, 170, 171, 172, 173, 174, 175 ] }),
        frameRate: 8,
    });
    scene.anims.create({
        key: 'watering_left',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 176, 177, 178, 179, 180, 181, 182, 183 ] }),
        frameRate: 8,
    });
    scene.anims.create({
        key: 'watering_right',
        frames: scene.anims.generateFrameNumbers('main_character', { frames: [ 184, 185, 186, 187, 188, 189, 190, 191 ] }),
        frameRate: 8,
    });
    /** End of Main Characrer Animation Set **/
    /********************* End of Animation set *********************/
}

function associateKeyboardInputs(scene)
{
    keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyX = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    keyC = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    keyV = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
}

function spawnMainCharacter(scene, x, y, anim)
{
    cat = scene.add.sprite(x, y);
    cat.setScale(MAIN_CHARACTER_SCALE);
    cat.play(anim);
}

function processInput()
{
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
