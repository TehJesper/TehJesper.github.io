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
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
KeyboardListener.KEY_S = 83;
class LevelScreen {
    constructor(canvas, ctx, keyboardListener) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.keyboardListener = keyboardListener;
        this.player = new Player(290, 0, 3, 3, this.keyboardListener);
    }
    draw() {
        this.player.move(this.canvas, this.ctx);
        this.player.draw(this.ctx);
    }
}
class Maze {
    constructor(canvasId) {
        this.canvas = canvasId;
        this.canvas.width = 702;
        this.canvas.height = 702;
        this.ctx = this.canvas.getContext('2d');
        this.keyboardListener = new KeyboardListener();
        this.levelScreen = new LevelScreen(this.canvas, this.ctx, this.keyboardListener);
        this.player = new Player(290, 0, 3, 3, this.keyboardListener);
        this.loop();
    }
    loop() {
        this.loadmaze();
        this.levelScreen.draw();
        requestAnimationFrame(this.loop.bind(this));
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.loadmaze();
    }
    loadmaze() {
        this.loadImage('../goede_maze.jpg', this.drawmaze);
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
        this.collision = 0;
        this.coin1 = [this.rand(2, 630, 22), this.rand(2, 645, 22)];
        this.coinCounter = 0;
    }
    move(canvas, ctx) {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT) && this.xPos !== 702) {
            this.xPos += this.xVel;
            this.checkCollision(ctx);
            if (this.collision == 1) {
                this.xPos -= this.xVel;
                this.collision = 0;
            }
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
            this.xPos -= this.xVel;
            this.checkCollision(ctx);
            if (this.collision == 1) {
                this.xPos += this.xVel;
                this.collision = 0;
            }
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)) {
            this.yPos -= this.yVel;
            this.checkCollision(ctx);
            if (this.collision == 1) {
                this.yPos += this.yVel;
                this.collision = 0;
            }
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
            this.yPos += this.yVel;
            this.checkCollision(ctx);
            if (this.collision == 1) {
                this.yPos -= this.yVel;
                this.collision = 0;
            }
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
        console.log(this.xPos, this.yPos);
        this.coins(ctx);
        this.endCheck();
    }
    checkCollision(ctx) {
        let imgd = ctx.getImageData(this.xPos, this.yPos, 15, 15);
        let pix = imgd.data;
        for (let i = 0; i < pix.length; i += 4) {
            if (pix[i] == 0) {
                this.collision = 1;
            }
        }
    }
    rect(x, y, w, h, ctx) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();
    }
    coins(ctx) {
        let x = this.coin1[0];
        let y = this.coin1[1];
        ctx.fillStyle = 'gold';
        ctx.beginPath();
        ctx.rect(this.coin1[0], this.coin1[1], 15, 15);
        ctx.closePath();
        ctx.fill();
        if (this.xPos >= x - 4 && this.xPos <= x + 4 && this.yPos >= y - 4 && this.yPos <= y + 4) {
            this.coin1.pop();
            ctx.clearRect(x, y, 15, 15);
            ctx.fillStyle = 'purple';
            this.rect(x, y, 15, 15, ctx);
            if (this.coinCounter < 100) {
                this.coinCounter += 100;
            }
            console.log(this.coinCounter);
        }
        else {
            document.getElementById('question').innerHTML = ``;
            document.getElementById('answers').innerHTML = ``;
        }
        document.getElementById('Score').innerHTML = `Coins: ${this.coinCounter}`;
    }
    endCheck() {
        if (this.yPos >= 156 && this.yPos <= 160 && this.xPos == 647) {
            window.location.href = '../maze.html';
        }
    }
    rand(min, max, step) {
        var delta, range, rand;
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }
        if (!step) {
            step = 1;
        }
        delta = max - min;
        range = delta / step;
        rand = Math.random();
        rand *= range;
        rand = Math.floor(rand);
        rand *= step;
        rand += min;
        return rand;
    }
}
//# sourceMappingURL=app.js.map
