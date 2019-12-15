import MainScene from './MainScene.js';
const config={ //creating a game space, using phaser to decide what kind of game space we r gonna use like canvas
    width:640,
    height:640,
    type:Phaser.AUTO,
    parent:'phaser-game',//stick the game under tht div id in index.html
    scene:[MainScene]
}

new Phaser.Game(config);