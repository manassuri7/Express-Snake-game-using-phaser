import Snake from './Snake.js';
export default class MainScene extends Phaser.Scene{
    constructor(){
        super('MainScene');
    }

    //phaser ha many methods like create, update, preload

    create(){
      this.snake=new Snake(this);
    }

    update(time){
       this.snake.update(time);
    }
}