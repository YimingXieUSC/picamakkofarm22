/** Constants **/
const WALKING_SPEED = 45;
const RUNNING_SPEED = 70;
const SCREEN_RIGHT = 640;
const SCREEN_BOTTOM = 370;
const MAIN_CHARACTER_SCALE = 1;
const allDirections = ['down', 'up', 'left', 'right'];

/** Useful Classes **/
class AnimatedObject {
    currentPlayingAnim;
    character;
    constructor(anim) {
        this.currentPlayingAnim = anim;
    }
}
class MainCharacter extends AnimatedObject {
    disabledMoving = false;
    running = false;
    // direction: 0 (down), 1 (up), 2 (left), 3 (right)
    direction = 0;
    constructor() {
        super('idle_down');
    }
}

/** Global Variables **/
var keyW;
var keyS;
var keyA;
var keyD;
var keyX;
var keyC;
var keyV;
const mainCharacter = new MainCharacter();
var tilledSoilsX = [];
var tilledSoilsY = [];
var wateredSoilsX = [];
var wateredSoilsY = [];

/** Reused Functions **/
function preloadAnimation(scene) {
    scene.load.image('tilled_soil', 'assets/tilesets/tilled_soil.png');
    scene.load.image('watered_soil', 'assets/tilesets/water_soil.png');
    scene.load.spritesheet('main_character', 'assets/characters/main_character.png', { frameWidth: 48 });
    scene.load.spritesheet('normal_trees', 'assets/objects/Tree_animations/tree_sprites.png', { frameWidth: 48 });
    scene.load.spritesheet('pear_trees', 'assets/objects/Tree_animations/tree_pear_sprites.png', { frameWidth: 48 });
    scene.load.spritesheet('orange_trees', 'assets/objects/Tree_animations/tree_orange_sprites.png', { frameWidth: 48 });
    scene.load.spritesheet('apple_trees', 'assets/objects/Tree_animations/tree_apple_sprites.png', { frameWidth: 48 });
    scene.load.spritesheet('peach_trees', 'assets/objects/Tree_animations/tree_peach_sprites.png', { frameWidth: 48 });
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
    /** Start of Normal Tree Animation Set **/
    scene.anims.create({
        key: 'normal_tree_static',
        frames: scene.anims.generateFrameNumbers('normal_trees', { frames: [ 0 ] }),
        frameRate: 1,
    });
    scene.anims.create({
        key: 'normal_tree_moving',
        frames: scene.anims.generateFrameNumbers('normal_trees', { frames: [ 12, 13, 14, 15 ] }),
        frameRate: 4,
        repeat: -1,
    });
    scene.anims.create({
        key: 'normal_tree_chopped',
        frames: scene.anims.generateFrameNumbers('normal_trees', { frames: [ 24, 25, 26, 27, 28, 29 ] }),
        frameRate: 6,
    });
    scene.anims.create({
        key: 'normal_tree_chopped_heavily',
        frames: scene.anims.generateFrameNumbers('normal_trees', { frames: [ 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47 ] }),
        frameRate: 12,
    });
    /** End of Normal Tree Animation Set **/
    /** Start of Peach Tree Animation Set **/
    scene.anims.create({
        key: 'peach_tree_static',
        frames: scene.anims.generateFrameNumbers('peach_trees', { frames: [ 0 ] }),
        frameRate: 1,
    });
    scene.anims.create({
        key: 'peach_tree_moving',
        frames: scene.anims.generateFrameNumbers('peach_trees', { frames: [ 12, 13, 14, 15 ] }),
        frameRate: 4,
        repeat: -1,
    });
    scene.anims.create({
        key: 'peach_tree_chopped',
        frames: scene.anims.generateFrameNumbers('peach_trees', { frames: [ 24, 25, 26, 27, 28, 29 ] }),
        frameRate: 6,
    });
    scene.anims.create({
        key: 'peach_tree_chopped_heavily',
        frames: scene.anims.generateFrameNumbers('peach_trees', { frames: [ 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47 ] }),
        frameRate: 12,
    });
    scene.anims.create({
        key: 'peach_tree_moving_no_fruits',
        frames: scene.anims.generateFrameNumbers('peach_trees', { frames: [ 48, 49 ] }),
        frameRate: 2,
        repeat: -1,
    });
    /** End of Peach Tree Animation Set **/
    /** Start of Apple Tree Animation Set **/
    scene.anims.create({
        key: 'apple_tree_static',
        frames: scene.anims.generateFrameNumbers('apple_trees', { frames: [ 0 ] }),
        frameRate: 1,
    });
    scene.anims.create({
        key: 'apple_tree_moving',
        frames: scene.anims.generateFrameNumbers('apple_trees', { frames: [ 12, 13, 14, 15 ] }),
        frameRate: 4,
        repeat: -1,
    });
    scene.anims.create({
        key: 'apple_tree_chopped',
        frames: scene.anims.generateFrameNumbers('apple_trees', { frames: [ 24, 25, 26, 27, 28, 29 ] }),
        frameRate: 6,
    });
    scene.anims.create({
        key: 'apple_tree_chopped_heavily',
        frames: scene.anims.generateFrameNumbers('apple_trees', { frames: [ 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47 ] }),
        frameRate: 12,
    });
    scene.anims.create({
        key: 'apple_tree_moving_no_fruits',
        frames: scene.anims.generateFrameNumbers('apple_trees', { frames: [ 48, 49 ] }),
        frameRate: 2,
        repeat: -1,
    });
    /** End of Apple Tree Animation Set **/
    /** Start of Pear Tree Animation Set **/
    scene.anims.create({
        key: 'pear_tree_static',
        frames: scene.anims.generateFrameNumbers('pear_trees', { frames: [ 0 ] }),
        frameRate: 1,
    });
    scene.anims.create({
        key: 'pear_tree_moving',
        frames: scene.anims.generateFrameNumbers('pear_trees', { frames: [ 12, 13, 14, 15 ] }),
        frameRate: 4,
        repeat: -1,
    });
    scene.anims.create({
        key: 'pear_tree_chopped',
        frames: scene.anims.generateFrameNumbers('pear_trees', { frames: [ 24, 25, 26, 27, 28, 29 ] }),
        frameRate: 6,
    });
    scene.anims.create({
        key: 'pear_tree_chopped_heavily',
        frames: scene.anims.generateFrameNumbers('pear_trees', { frames: [ 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47 ] }),
        frameRate: 12,
    });
    scene.anims.create({
        key: 'pear_tree_moving_no_fruits',
        frames: scene.anims.generateFrameNumbers('pear_trees', { frames: [ 48, 49 ] }),
        frameRate: 2,
        repeat: -1,
    });
    /** End of Pear Tree Animation Set **/
    /** Start of Orange Tree Animation Set **/
    scene.anims.create({
        key: 'orange_tree_static',
        frames: scene.anims.generateFrameNumbers('orange_trees', { frames: [ 0 ] }),
        frameRate: 1,
    });
    scene.anims.create({
        key: 'orange_tree_moving',
        frames: scene.anims.generateFrameNumbers('orange_trees', { frames: [ 12, 13, 14, 15 ] }),
        frameRate: 4,
        repeat: -1,
    });
    scene.anims.create({
        key: 'orange_tree_chopped',
        frames: scene.anims.generateFrameNumbers('orange_trees', { frames: [ 24, 25, 26, 27, 28, 29 ] }),
        frameRate: 6,
    });
    scene.anims.create({
        key: 'orange_tree_chopped_heavily',
        frames: scene.anims.generateFrameNumbers('orange_trees', { frames: [ 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47 ] }),
        frameRate: 12,
    });
    scene.anims.create({
        key: 'orange_tree_moving_no_fruits',
        frames: scene.anims.generateFrameNumbers('orange_trees', { frames: [ 48, 49 ] }),
        frameRate: 2,
        repeat: -1,
    });
    /** End of Pear Orange Animation Set **/
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

function spawnAnimatedObject(scene, x, y, anim, animatedObj, scale, texture, collides)
{
    animatedObj.character = scene.physics.add.sprite(x, y, texture);
    animatedObj.character.setCollideWorldBounds(collides);
    animatedObj.character.setScale(scale);
    animatedObj.character.play(anim);
}

function spawnMainCharacter(scene, x, y, anim, scale)
{
    // scene.cameras.main.setBounds(0, 0, 1024, 2048);
    mainCharacter.character = scene.physics.add.sprite(x, y, 'main_character');
    mainCharacter.character.setCollideWorldBounds(true);
    mainCharacter.character.setScale(scale);
    mainCharacter.character.setSize(12, 10);
    mainCharacter.character.setOffset(18, 20);
    mainCharacter.character.setDepth(5);
    mainCharacter.character.play(anim);

    // scene.cameras.main.startFollow(mainCharacter.character, true, 0.09, 0.09);

    // scene.cameras.main.setZoom(2);

}

const xMax = 19 * 16;
const xMax_right_facing_left = 20 * 16;
const yMax = 13 * 16;
const yMax_bottom_facing_up = 14 * 16;
const xMin = 8 * 16;
const xMin_left_facing_right = 7 * 16;
const yMin = 5 * 16;
const yMin_up_facing_down = 4 * 16;

function tillSoil(scene, x, y) {
    let xPos = x + 8;
    let yPos = y + 8;
    let soil = scene.add.image(xPos, yPos, 'tilled_soil');
    scene.sound.play('collect_sound', {});
    scene.sound.pauseOnBlur = false;
    soil.setDepth(1);
    tilledSoilsX.push(xPos);
    tilledSoilsY.push(yPos);
}

function waterSoil(scene, x, y) {
    let xPos = x + 8;
    let yPos = y + 8;
    for (let i = 0; i < tilledSoilsX.length; i++) {
        if (xPos === tilledSoilsX[i] && yPos === tilledSoilsY[i]) {
            let soil = scene.add.image(xPos, yPos, 'watered_soil');
            scene.sound.play('water_sound', {});
            scene.sound.pauseOnBlur = false;
            soil.setDepth(2);
            wateredSoilsX.push(xPos);
            wateredSoilsY.push(yPos);
            return;
        }
    }
}

function processInput(scene)
{
    mainCharacter.character.setVelocity(0);
    if (!mainCharacter.disabledMoving) {
        let xPos = (mainCharacter.character.x - 8 * 16) / 16;
        let yPos = (mainCharacter.character.y - 5 * 16) / 16;
        // check for tilling
        if (keyX.isDown) {
            mainCharacter.disabledMoving = true;
            if (mainCharacter.direction === 1) {
                mainCharacter.currentPlayingAnim = 'tilling_up';
                mainCharacter.character.play('tilling_up');
                if (mainCharacter.character.x > xMin && mainCharacter.character.x < xMax &&
                  mainCharacter.character.y > yMin && mainCharacter.character.y < yMax_bottom_facing_up) {
                    tillSoil(scene, (Math.floor(xPos) + 8) * 16, (Math.max(Math.floor(yPos - 1), 0) + 5) * 16);
                }
            } else if (mainCharacter.direction === 0) {
                mainCharacter.currentPlayingAnim = 'tilling_down';
                mainCharacter.character.play('tilling_down');
                if (mainCharacter.character.x > xMin && mainCharacter.character.x < xMax &&
                  mainCharacter.character.y > yMin_up_facing_down && mainCharacter.character.y < yMax) {
                    tillSoil(scene, (Math.floor(xPos) + 8) * 16, (Math.min(Math.floor(yPos + 1), 7) + 5) * 16);
                }
            } else if (mainCharacter.direction === 2) {
                mainCharacter.currentPlayingAnim = 'tilling_left';
                mainCharacter.character.play('tilling_left');
                if (mainCharacter.character.x > xMin && mainCharacter.character.x < xMax_right_facing_left &&
                  mainCharacter.character.y > yMin && mainCharacter.character.y < yMax) {
                    tillSoil(scene, (Math.max(Math.floor(xPos - 1), 0) + 8) * 16, (Math.round(yPos) + 5) * 16);
                }
            } else if (mainCharacter.direction === 3) {
                mainCharacter.currentPlayingAnim = 'tilling_right';
                mainCharacter.character.play('tilling_right');
                if (mainCharacter.character.x > xMin_left_facing_right && mainCharacter.character.x < xMax &&
                  mainCharacter.character.y > yMin && mainCharacter.character.y < yMax) {
                    tillSoil(scene, (Math.min(Math.floor(xPos + 1), 10) + 8) * 16, (Math.round(yPos) + 5) * 16);
                }
            }
        } else if (keyC.isDown) {
            scene.sound.play('collect_sound', {
            });
            scene.sound.pauseOnBlur = false;
            mainCharacter.disabledMoving = true;
            if (mainCharacter.direction === 1) {
                mainCharacter.currentPlayingAnim = 'chopping_up';
                mainCharacter.character.play('chopping_up');
            } else if (mainCharacter.direction === 0) {
                mainCharacter.currentPlayingAnim = 'chopping_down';
                mainCharacter.character.play('chopping_down');
            } else if (mainCharacter.direction === 2) {
                mainCharacter.currentPlayingAnim = 'chopping_left';
                mainCharacter.character.play('chopping_left');
            } else if (mainCharacter.direction === 3) {
                mainCharacter.currentPlayingAnim = 'chopping_right';
                mainCharacter.character.play('chopping_right');
            }
        } else if (keyV.isDown) {
            mainCharacter.disabledMoving = true;
            if (mainCharacter.direction === 1) {
                mainCharacter.currentPlayingAnim = 'watering_up';
                mainCharacter.character.play('watering_up');
                if (mainCharacter.character.x > xMin && mainCharacter.character.x < xMax &&
                  mainCharacter.character.y > yMin && mainCharacter.character.y < yMax_bottom_facing_up) {
                    waterSoil(scene, (Math.floor(xPos) + 8) * 16, (Math.max(Math.floor(yPos - 1), 0) + 5) * 16);
                }
            } else if (mainCharacter.direction === 0) {
                mainCharacter.currentPlayingAnim = 'watering_down';
                mainCharacter.character.play('watering_down');
                if (mainCharacter.character.x > xMin && mainCharacter.character.x < xMax &&
                  mainCharacter.character.y > yMin_up_facing_down && mainCharacter.character.y < yMax) {
                    waterSoil(scene, (Math.floor(xPos) + 8) * 16, (Math.min(Math.floor(yPos + 1), 7) + 5) * 16);
                }
            } else if (mainCharacter.direction === 2) {
                mainCharacter.currentPlayingAnim = 'watering_left';
                mainCharacter.character.play('watering_left');
                if (mainCharacter.character.x > xMin && mainCharacter.character.x < xMax_right_facing_left &&
                  mainCharacter.character.y > yMin && mainCharacter.character.y < yMax) {
                    waterSoil(scene, (Math.max(Math.floor(xPos - 1), 0) + 8) * 16, (Math.round(yPos) + 5) * 16);
                }
            } else if (mainCharacter.direction === 3) {
                mainCharacter.currentPlayingAnim = 'watering_right';
                mainCharacter.character.play('watering_right');
                if (mainCharacter.character.x > xMin_left_facing_right && mainCharacter.character.x < xMax &&
                  mainCharacter.character.y > yMin && mainCharacter.character.y < yMax) {
                    waterSoil(scene, (Math.min(Math.floor(xPos + 1), 10) + 8) * 16, (Math.round(yPos) + 5) * 16);
                }
            }
        } else if (keyW.isDown) {
            mainCharacter.direction = 1;
            if (keyW.getDuration() > 1500 || mainCharacter.running) {
                mainCharacter.running = true;
                if (mainCharacter.currentPlayingAnim !== 'run_up') {
                    mainCharacter.currentPlayingAnim = 'run_up';
                    mainCharacter.character.play('run_up');
                }
                mainCharacter.character.setVelocityY(-RUNNING_SPEED);
            } else {
                mainCharacter.running = false;
                if (mainCharacter.currentPlayingAnim !== 'walk_up') {
                    mainCharacter.currentPlayingAnim = 'walk_up';
                    mainCharacter.character.play('walk_up');
                }
                mainCharacter.character.setVelocityY(-WALKING_SPEED);
            }
        } else if (keyS.isDown) {
            mainCharacter.direction = 0;
            if (keyS.getDuration() > 1500 || mainCharacter.running) {
                mainCharacter.running = true;
                if (mainCharacter.currentPlayingAnim !== 'run_down') {
                    mainCharacter.currentPlayingAnim = 'run_down';
                    mainCharacter.character.play('run_down');
                }
                mainCharacter.character.setVelocityY(RUNNING_SPEED);
            } else {
                mainCharacter.running = false;
                if (mainCharacter.currentPlayingAnim !== 'walk_down') {
                    mainCharacter.currentPlayingAnim = 'walk_down';
                    mainCharacter.character.play('walk_down');
                }
                mainCharacter.character.setVelocityY(WALKING_SPEED);
            }
            if(mainCharacter.character.x > 258 && mainCharacter.character.x < 266  && mainCharacter.character.y > 353){
                console.log("Go to region down");
                scene.scene.start("GameOverScene", {
                    "message": "Game over"
                });
            }
            if(mainCharacter.character.x > 400  && mainCharacter.character.y > 353){
                console.log("Go to region right");
                scene.scene.start("GameOverScene", {
                        "message": "Game over"
            });
            }
        } else if (keyA.isDown) {
            mainCharacter.direction = 2;
            if (keyA.getDuration() > 1500 || mainCharacter.running) {
                mainCharacter.running = true;
                if (mainCharacter.currentPlayingAnim !== 'run_left') {
                    mainCharacter.currentPlayingAnim = 'run_left';
                    mainCharacter.character.play('run_left');
                }
                mainCharacter.character.setVelocityX(-RUNNING_SPEED);
            } else {
                mainCharacter.running = false;
                if (mainCharacter.currentPlayingAnim !== 'walk_left') {
                    mainCharacter.currentPlayingAnim = 'walk_left';
                    mainCharacter.character.play('walk_left');
                }
                mainCharacter.character.setVelocityX(-WALKING_SPEED);
            }
            if(mainCharacter.character.x < 14.5 && mainCharacter.character.y > 190 && mainCharacter.character.y < 200){
                scene.scene.start("GameOverScene", {
                    "message": "Game over"
                });
            }
            
        } else if (keyD.isDown) {
            mainCharacter.direction = 3;
            if (keyD.getDuration() > 1500 || mainCharacter.running) {
                mainCharacter.running = true;
                if (mainCharacter.currentPlayingAnim !== 'run_right') {
                    mainCharacter.currentPlayingAnim = 'run_right';
                    mainCharacter.character.play('run_right');
                }
                mainCharacter.character.setVelocityX(RUNNING_SPEED);
            } else {
                mainCharacter.running = false;
                if (mainCharacter.currentPlayingAnim !== 'walk_right') {
                    mainCharacter.currentPlayingAnim = 'walk_right';
                    mainCharacter.character.play('walk_right');
                }
                mainCharacter.character.setVelocityX(WALKING_SPEED);
            }
            if(mainCharacter.character.x > 632){
                console.log("go to right scene");
                scene.scene.start("GameOverScene", {
                    "message": "Game over"
                });

            }
        } else {
            mainCharacter.running = false;
            if (mainCharacter.direction <= 3 && mainCharacter.direction >= 0 &&
                mainCharacter.currentPlayingAnim !== 'idle_' + allDirections[mainCharacter.direction]) {
                mainCharacter.currentPlayingAnim = 'idle_'+ allDirections[mainCharacter.direction];
                mainCharacter.character.play(mainCharacter.currentPlayingAnim);
            }
        }
    }
    else if (!mainCharacter.character.anims.isPlaying)
    {
        mainCharacter.disabledMoving = false;
    }
}
