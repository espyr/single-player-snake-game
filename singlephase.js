
import MainScene from "./MainScene.js";


const config={
    width:640,
    height:640,
    type: Phaser.AUTO,
    parent:'phaser-game',
    scene:[MainScene]
    

}

var game = new Phaser.Game(config);
game.scale.pageAlignHorizontally = true;
game.scale.pageAlignVertically = true;
game.scale.refresh();
