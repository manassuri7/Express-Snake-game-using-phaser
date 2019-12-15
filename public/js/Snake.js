export default class Snake{
    constructor(scene){
      this.scene=scene;
       this.lastMoveTime=0;
       this.moveInterval=200;//0.2 sec, adjust the speed of snake
      this.direction=Phaser.Math.Vector2.RIGHT; //vector for snake direction, it can also take UP, DOWN and LEFT 
      this.body=[];
      //adding game objects to a screen
     this.body.push( 
     //    this.scene.add.rectangle(100,100,16,16,0xff0000).setOrigin(0)
           this.scene.add.rectangle(this.scene.game.config.width/2,this.scene.game.config.height/2,
            16,16,0xff0000)
            .setOrigin(0)
         );

         this.body.push( 
            this.scene.add.rectangle(0,0,16,16,0x0000ff).setOrigin(0)
            );

            this.apple=this.scene.add.rectangle(0,0,16,16,0x00ff00).setOrigin(0);
             this.positionApple();

            this.body.push( 
                this.scene.add.rectangle(0,0,16,16,0xffffff).setOrigin(0)
                );
            scene.input.keyboard.on('keydown',e=>{
                this.keydown(e);
            });
    }
//everywhere we r  using 16 just as a standard pixelation count
    positionApple(){
        this.apple.x=Math.floor(Math.random(0)*this.scene.game.config.width/16)*16; //this done for right positioning of apple
        this.apple.y=Math.floor(Math.random(0)*this.scene.game.config.height/16)*16;
    }

    keydown(event){
        console.log(event);
        switch (event.keyCode){
//based on the keys pressed we want to change the snake direction            
            case 37: //left
           if(this.direction!==Phaser.Math.Vector2.RIGHT)
           { 
               this.direction=Phaser.Math.Vector2.LEFT;
            }
            break;
            case 38://up
            if(this.direction!==Phaser.Math.Vector2.DOWN){
            this.direction=Phaser.Math.Vector2.UP;
            }
            break;
            case 39: //right
            if(this.direction!==Phaser.Math.Vector2.LEFT){
            this.direction=Phaser.Math.Vector2.RIGHT;
            }
            break;
            case 40: //down
            if(this.direction!==Phaser.Math.Vector2.UP){
            this.direction=Phaser.Math.Vector2.DOWN;
            }
            break;

        }

    }
    update(time){
      if(time>=this.lastMoveTime + this.moveInterval){
        this.lastMoveTime=time;
        this.move();
      }
      
    }

    move(){
        //tail
     //   this.body[2].x+=this.body[1].x;
     //   this.body[2].y+=this.body[1].y;
     //   this.body[1].x+=this.body[0].x;
     //   this.body[1].y+=this.body[0].y;
        //head

     //to eat the apple we need to compare position of snake head and apple
     let x=this.body[0].x +this.direction.x*16;
     let y=this.body[0].y +this.direction.y*16; 

       if(this.apple.x===x && this.apple.y===y) {
           //eaten the apple, then increase the body size
           this.body.push(this.scene.add.rectangle(0,0,16,16,0xffffff).setOrigin(0));
           this.positionApple();
       }
        for(let index=this.body.length-1;index>0;index--){
            this.body[index].x=this.body[index-1].x;
        this.body[index].y=this.body[index-1].y;
        }
        this.body[0].x=x;
        this.body[0].y=y;

        //snake dead by going off the screen
       if(this.body[0].x<0 || 
        this.body[0].x>=this.scene.game.config.width ||
        this.body[0].y<0 ||
        this.body[0].y>=this.scene.game.config.height) 
        {
            this.scene.scene.restart();
        }
//death by eating own tail
 let tail=this.body.slice(1);
if(tail.filter(s=>s.x===this.body[0].x && s.y===this.body[0].y).length>0){//returns an array
    this.scene.scene.restart();
}
    }
}