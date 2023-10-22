const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    DEAD: 4
}

class State {
    constructor(state) {
        this.state = State;
    }
}

export class Sitting extends State {
    constructor(player) {
        super('SITTING');
        this.player = player;
    }
    enter() {
        this.player.framX = 0;
        this.player.maxFrame = 4;
        this.player.framY = 5; //sitting
    }
    handleInput(input) {
        if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
            this.player.setState(states.RUNNING);
        }
        else if (input.includes("ArrowDown")) {
            this.player.setState(states.SITTING);
        }
        else if (input.includes("ArrowUp")) {
            this.player.setState(states.JUMPING);
        }
    }
}

export class Running extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player;
    }
    enter() {
        this.player.framX = 0;
        this.player.maxFrame = 6;
        this.player.framY = 3; //running
    }
    handleInput(input) {
        if (input.includes("ArrowDown")) {
            this.player.setState(states.SITTING);
        } else if (input.includes("ArrowUp")) {
            this.player.setState(states.JUMPING);
        }
    }
}

export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
    }
    enter() {
        if (this.player.onGround()) this.player.vy -= 28;
        this.player.framX = 0;
        this.player.maxFrame = 6;
        this.player.framY = 1; //jumping up
    }
    handleInput(input) {
        if (this.player.vy > this.player.weight) {
            this.player.setState(states.FALLING);
        }
    }
}

export class Falling extends State {
    constructor(player) {
        super('FALLING');
        this.player = player;
    }
    enter() {
        this.player.framX = 0;
        this.player.maxFrame = 6;
        this.player.framY = 2; //falling down
    }
    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.RUNNING);
        }
    }
}