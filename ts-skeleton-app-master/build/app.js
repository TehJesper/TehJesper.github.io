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
        this.loop();
    }
    loop() {
        this.loadmaze();
        this.levelScreen.draw();
        requestAnimationFrame(this.loop.bind(this));
    }
    loadmaze() {
        this.loadImage('goede_maze.jpg', this.drawmaze);
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
    const maze = new Maze(document.getElementById("canvas"));
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
        this.coin = [];
        this.coin.push();
        for (let i = 0; i < 5; i++) {
            this.coin.push(this.rand(2, 645, 22), this.rand(2, 645, 22));
        }
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
        let x = [];
        for (let i = 0; i < this.coin.length; i += 2) {
            x.push(this.coin[i]);
        }
        let y = [];
        for (let i = 1; i < this.coin.length; i += 2) {
            y.push(this.coin[i]);
        }
        ctx.fillStyle = 'gold';
        for (let i = 0; i < x.length; i++) {
            ctx.beginPath();
            ctx.rect(x[i], y[i], 15, 15);
            ctx.closePath();
            ctx.fill();
        }
        for (let i = 0; i < x.length; i++) {
            if (this.xPos >= x[i] - 8 && this.xPos <= x[i] + 8 && this.yPos >= y[i] - 8 && this.yPos <= y[i] + 8) {
                console.log(this.coin);
                let indexX = this.coin.indexOf(x[i]);
                let indexY = indexX + 1;
                if (indexX % 2 !== 0 && indexX !== 0) {
                    indexX = this.coin.indexOf(x[i], x[i] + 1);
                    indexY = indexX + 1;
                    console.log('testest');
                }
                console.log(indexX, indexY);
                this.coin.splice(indexX, 1);
                this.coin.splice(indexY - 1, 1);
                ctx.clearRect(x[i], y[i], 15, 15);
                ctx.fillStyle = 'purple';
                this.rect(x[i], y[i], 15, 15, ctx);
                console.log(this.coin);
                this.coinCounter += 1;
                document.getElementById('question').innerHTML = `Vraag: y/n?`;
                document.getElementById('answers').innerHTML = `
                <button id="option1">Y</button>
                <button id="option2">N</button>`;
                document.getElementById('option1').onclick = function () {
                };
            }
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