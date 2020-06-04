export default class Snake{
    constructor(scene){
        this.scene=scene;
        this.lastMoveTime=0;
        //how often we want to move (every 1 second)
        this.speed=100;
        this.tileSize=16;
        this.direction = Phaser.Math.Vector2.LEFT;
        this.body = [];

        this.body.push(
            //stick in to a grid of 16 pixel
            this.scene.add
                .rectangle( this.scene.game.config.width / 2,
                            this.scene.game.config.height / 2,
                            16,
                            16,
                            0x00ff00
                            )
                            .setOrigin(0)
            );

            this.apple= this.scene.add
            .rectangle(0,0,this.tileSize,this.tileSize,0xff0000)
            .setOrigin(0);    
            this.positionApple();

        scene.input.keyboard.on('keydown',e=>{this.keydown(e);
        });
            
         }


         positionApple(){
            this.apple.x=Math.floor((Math.random() * this.scene.game.config.width)/ this.tileSize)* this.tileSize;
            this.apple.y=Math.floor((Math.random() * this.scene.game.config.height)/this.tileSize)*this.tileSize;
                   } 


         keydown(event){
            console.log(event);
            switch (event.keyCode){
                case 37://left
                if (this.direction != Phaser.Math.Vector2.RIGHT){
                this.direction = Phaser.Math.Vector2.LEFT;}
                    break;
                    case 38://up
                    if (this.direction != Phaser.Math.Vector2.DOWN){
                    this.direction = Phaser.Math.Vector2.UP}
                    break;
                    case 39://right
                    if (this.direction != Phaser.Math.Vector2.LEFT){
                    this.direction = Phaser.Math.Vector2.RIGHT}
                    break;
                    case 40://down
                    if (this.direction != Phaser.Math.Vector2.UP){
                    this.direction = Phaser.Math.Vector2.DOWN}
                    break;
            }
        }
        
   
             update(time){
                

               if(time>=this.lastMoveTime + this.speed){
                this.lastMoveTime=time;
                this.move();
                            }
                        }

                            
move(){

let x = this.body[0].x + this.direction.x * this.tileSize;
let y = this.body[0].y + this.direction.y * this.tileSize;



if(this.apple.x==x && this.apple.y==y){
    this.body.push(this.scene.add.rectangle(0,0,this.tileSize,this.tileSize, 0xffffff).setOrigin(0));
    this.positionApple();
}

    //tail
    for(let index=this.body.length-1; index>0; index--){
        this.body[index].x=this.body[index-1].x;
        this.body[index].y=this.body[index-1].y;
    }
    
    //head
    this.body[0].x =x;
    this.body[0].y =y;
   //if goes off screen to the left or to the right or to the top or to the down --> DEATH
    if( this.body[0].x <0 ||
        this.body[0].x>=this.scene.game.config.width || 
        this.body[0].y<0 || 
        this.body[0].y>=this.scene.game.config.height ) {

            this.scene.scene.restart();

    }

     //if eats his tail (if head.position=any of his tail positions)--> DEATH
     // get back a piece of an array is by slicing it, so the tail starts to the index=1 until the end
     let tail = this.body.slice(1)
     //filter parses back the array and checks the statement and if it's true it's gonna pass by the element of the 
     //array so we get an array as a result 
     if(tail.filter(s => s.x==this.body[0].x && s.y==this.body[0].y ).length>0){
     this.scene.scene.restart();
     }

}

}
