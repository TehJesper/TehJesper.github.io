class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_ESC = 27;
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.ARROW_LEFT = 37;
KeyboardListener.KEY_LEFT = 65;
KeyboardListener.ARROW_UP = 38;
KeyboardListener.KEY_UP = 87;
KeyboardListener.ARROW_RIGHT = 39;
KeyboardListener.KEY_RIGHT = 68;
KeyboardListener.ARROW_DOWN = 40;
KeyboardListener.KEY_DOWN = 83;
KeyboardListener.KEY_S = 83;
class LevelScreen {
    constructor(canvas, ctx, keyboardListener) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.keyboardListener = keyboardListener;
        this.player = new Player(30, 30, 5, 5, this.keyboardListener);
    }
    draw() {
        this.player.move(this.canvas);
        this.player.draw(this.ctx);
    }
}
class Maze {
    constructor(canvasId) {
        this.canvas = canvasId;
        this.canvas.width = 482;
        this.canvas.height = 482;
        this.ctx = this.canvas.getContext('2d');
        this.keyboardListener = new KeyboardListener();
        this.levelScreen = new LevelScreen(this.canvas, this.ctx, this.keyboardListener);
        this.collision = 0;
        this.x = 200;
        this.y = 5;
        this.loadmaze();
        this.loop();
    }
    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.clear();
        this.levelScreen.draw();
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.loadmaze();
    }
    checkCollision() {
        let imgd = this.ctx.getImageData(this.x, this.y, 15, 15);
        let pix = imgd.data;
        for (let i = 0; i < pix.length; i += 4) {
            if (pix[i] == 0) {
                this.collision = 1;
            }
        }
    }
    loadmaze() {
        this.loadImage('maze.gif', this.drawmaze);
    }
    drawmaze(img) {
        this.ctx.drawImage(img, 0, 0);
    }
    loadImage(source, callback) {
        const imageElement = new Image();
        imageElement.addEventListener("load", () => {
            callback.apply(this, [imageElement]);
        });
        imageElement.src = source;
    }
}
let init = () => {
    const Asteroids = new Maze(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class Player {
    constructor(xPos, yPos, xVel, yVel, keyboardListener) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.keyboardListener = keyboardListener;
    }
    move(canvas) {
        if (this.keyboardListener.isKeyDown(KeyboardListener.ARROW_RIGHT) && this.xPos !== 482) {
            this.xPos += this.xVel;
        }
        else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT) && this.xPos !== 482) {
            this.xPos += this.xVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.ARROW_LEFT)) {
            this.xPos -= this.xVel;
        }
        else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
            this.xPos -= this.xVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.ARROW_UP)) {
            this.yPos -= this.yVel;
        }
        else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)) {
            this.yPos -= this.yVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.ARROW_DOWN)) {
            this.yPos += this.yVel;
        }
        else if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
            this.yPos += this.yVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)) {
            window.location.replace("../scorescreen.html");
        }
    }
    draw(ctx) {
        const x = 15;
        const y = 15;
        ctx.fillStyle = 'purple';
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, x, y);
        ctx.closePath();
        ctx.fill();
    }
}
//# sourceMappingURL=app.js.map