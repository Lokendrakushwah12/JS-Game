import { Sitting, Running, Jumping, Falling } from "./playerStates.js";

export class Player {
    constructor(game) {
        // game object
        this.game = game;
        // size of the player
        this.width = 100;
        this.height = 91.3;
        // position of the player
        this.x = 0;
        this.y = this.game.height - this.height;
        this.vy=0;
        // image of the player
        this.image= document.getElementById("player");
        this.framX=0;
        this.framY=0;
        this.maxFrame;
        // speed of the player
        this.speed=0;
        this.maxSpeed=10;
        this.fps=20;
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;
        // weight of the player
        this.weight=1;
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this) ];
        this.currentState = this.states[0];
        this.currentState.enter();
    }
    // update the player's position
    update(input, deltaTime) {
        this.currentState.handleInput(input);
        // move the player
        this.x += this.speed;
        if (input.includes("ArrowRight")) {
            this.speed = this.maxSpeed;
        }
        else if (input.includes("ArrowLeft")) {
            this.speed = -this.maxSpeed;
        }
        else {
            this.speed = 0;
        }
        if(this.x < 0){
            this.x = 0;
        }
        if(this.x > this.game.width - this.width){
            this.x = this.game.width - this.width;
        }
        // gravity
        this.y += this.vy;
        if(!this.onGround()){
            this.vy += this.weight;
        }
        else{
            this.vy = 0;
        }
        // Player animation
        if(this.frameTimer > this.frameInterval){
            this.frameTimer=0;
            if(this.framX < this.maxFrame){
                this.framX++;
            }
            else this.framX=0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
    // draw the player  
    draw(context) {
        context.drawImage(this.image, this.framX * this.width, this.framY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height;
    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}