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
KeyboardListener.KEY_0 = 48;
KeyboardListener.KEY_1 = 49;
KeyboardListener.KEY_2 = 50;
KeyboardListener.KEY_3 = 51;
KeyboardListener.KEY_4 = 52;
KeyboardListener.KEY_5 = 53;
KeyboardListener.KEY_6 = 54;
KeyboardListener.KEY_7 = 55;
KeyboardListener.KEY_8 = 56;
KeyboardListener.KEY_9 = 57;
class LevelScreen {
    constructor(canvas, ctx, keyboardListener) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.keyboardListener = keyboardListener;
        this.timer = 300;
        this.player = new Player(290, 0, 3, 3, this.keyboardListener);
    }
    draw() {
        this.player.move(this.canvas, this.ctx);
        this.player.draw(this.ctx);
    }
    startTimer() {
        window.setInterval(() => this.timera(this.timer, document.querySelector('#time')), 1000);
    }
    timera(duration, display) {
        var duration;
        this.minutes = Math.floor(this.timer / 60);
        this.seconds = Math.floor(this.timer % 60);
        this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
        this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
        display.textContent = this.minutes + ":" + this.seconds;
        if (--this.timer < 0) {
            this.timer = duration;
        }
        if (this.minutes < 1 && this.seconds < 11) {
            document.getElementById("time").style.color = "red";
        }
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
        this.levelScreen.startTimer();
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
        this.coinn = [];
        this.coin1 = 0;
        this.coin2 = 0;
        this.coin3 = 0;
        this.coin4 = 0;
        this.coin5 = 0;
        this.coinCounter = this.coin1 + this.coin2 + this.coin3 + this.coin4 + this.coin5;
        this.vragen = ['Je komt ergens een bericht tegen van je favoriete youtuber die een giveaway doet. Jij…', 'Als je iets downloadt waarvan je niet weet wat het is kan dat schadelijk zijn', 'Je krijgt een reclame over een persoon die je laat zien hoe je veel munten in je spel kunt krijgen. Jij…', 'Je kunt een post/afbeelding makkelijk van het internet afhalen!', 'Iemand die je kent wilt je inloggegevens hebben om je een skin te geven, wat doe je?'];
        for (let i = 4; i < 645; i += 22) {
            this.coin.push(i);
        }
        this.fillArray();
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
        let y = [];
        for (let i = 0; i < this.coinn.length; i += 2) {
            x.push(this.coinn[i]);
            y.push(this.coinn[i]);
        }
        ctx.fillStyle = 'gold';
        for (let i = 0; i < x.length; i++) {
            ctx.beginPath();
            ctx.rect(x[i], y[i], 15, 15);
            ctx.closePath();
            ctx.fill();
        }
        for (let i = 0; i <= x.length; i++) {
            if (this.xPos >= x[i] - 8 && this.xPos <= x[i] + 8 && this.yPos >= y[i] - 8 && this.yPos <= y[i] + 8) {
                let indexX = this.coinn.indexOf(x[i]);
                let indexY = indexX + 1;
                this.coinn.splice(indexX, 1);
                this.coinn.splice(indexY - 1, 1);
                ctx.clearRect(x[i], y[i], 15, 15);
                ctx.fillStyle = 'purple';
                let p = this.vragen.pop();
                document.getElementById('question').innerHTML = `${p}`;
            }
            if (document.getElementById('question').innerHTML == 'Iemand die je kent wilt je inloggegevens hebben om je een skin te geven, wat doe je?') {
                document.getElementById('answers').innerHTML =
                    `<h1>1: Ja, Je geeft je inloggegevens omdat je het wel kan vertrouwen</h1><br>
                    <h1>2: Nee, je geeft je inloggegevens niet want misschien heeft hij/zij verkeerde bedoelingen </h1>`;
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_1)) {
                    document.getElementById('question').innerHTML = `Fout, geef nooit je inloggegevens aan anderen!`;
                    document.getElementById('answers').innerHTML = ``;
                }
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_2)) {
                    this.coin1 = 1;
                    document.getElementById('question').innerHTML = `Goed, geef nooit je inloggegevens aan anderen!`;
                    document.getElementById('answers').innerHTML = ``;
                }
            }
            if (document.getElementById('question').innerHTML == 'Je kunt een post/afbeelding makkelijk van het internet afhalen!') {
                document.getElementById('answers').innerHTML =
                    `<h1>3: Waar</h1><br>
                    <h1>4: Niet waar</h1>`;
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_3)) {
                    document.getElementById('question').innerHTML = `Fout, een post/afbeelding blijft altijd ergens opgeslagen!`;
                    document.getElementById('answers').innerHTML = ``;
                }
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_4)) {
                    this.coin2 = 1;
                    document.getElementById('question').innerHTML = `Goed, een post/afbeelding blijft altijd ergens opgeslagen!`;
                    document.getElementById('answers').innerHTML = ``;
                }
            }
            if (document.getElementById('question').innerHTML == 'Je krijgt een reclame over een persoon die je laat zien hoe je veel munten in je spel kunt krijgen. Jij…') {
                document.getElementById('answers').innerHTML =
                    `<h1>5: klikt op de reclame want je wilt die munten wel.</h1><br>
                    <h1>6: vertrouwt het niet en negeert het.</h1>`;
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_5)) {
                    document.getElementById('question').innerHTML = `Fout, ten eerste willen ze je inloggegevens en daarnaast is het misschien ook wel illegaal!`;
                    document.getElementById('answers').innerHTML = ``;
                }
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_6)) {
                    this.coin3 = 1;
                    document.getElementById('question').innerHTML = `Goed, ten eerste willen ze je inloggegevens en daarnaast is het misschien ook wel illegaal!`;
                    document.getElementById('answers').innerHTML = ``;
                }
            }
            if (document.getElementById('question').innerHTML == 'Als je iets downloadt waarvan je niet weet wat het is kan dat schadelijk zijn') {
                document.getElementById('answers').innerHTML =
                    `<h1>7: Waar</h1><br>
                    <h1>8: Niet waar</h1>`;
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_7)) {
                    this.coin4 = 1;
                    document.getElementById('question').innerHTML = `Goed, het kan je computer kapot maken!`;
                    document.getElementById('answers').innerHTML = ``;
                }
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_8)) {
                    document.getElementById('question').innerHTML = `Fout, het kan je computer kapot maken!`;
                    document.getElementById('answers').innerHTML = ``;
                }
            }
            if (document.getElementById('question').innerHTML == 'Je komt ergens een bericht tegen van je favoriete youtuber die een giveaway doet. Jij…') {
                document.getElementById('answers').innerHTML =
                    `<h1>9: doet meteen mee.</h1><br>
                    <h1>0: kijkt eerst of het ook echt die youtuber is.</h1>`;
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_9)) {
                    document.getElementById('question').innerHTML = `Fout, je weet niet of het wel de persoon is die je denkt dat het is. Hij wilt vast iets van je!`;
                    document.getElementById('answers').innerHTML = ``;
                }
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_0)) {
                    this.coin5 = 1;
                    document.getElementById('question').innerHTML = `Goed, je weet niet of het wel de persoon is die je denkt dat het is. Hij wilt vast iets van je!`;
                    document.getElementById('answers').innerHTML = ``;
                }
            }
            document.getElementById('Score').innerHTML = `Coins: ${this.coin1 + this.coin2 + this.coin3 + this.coin4 + this.coin5}`;
        }
    }
    endCheck() {
        let d = parseInt(document.getElementById('time').innerHTML.slice(1, 2)) * 60 + parseInt(document.getElementById('time').innerHTML.slice(3, 5));
        this.coinCounter = this.coin1 + this.coin2 + this.coin3 + this.coin4 + this.coin5;
        let eindscore = this.coinCounter * 40 + d;
        if (this.yPos >= 156 && this.yPos <= 160 && this.xPos == 647) {
            setInterval(window.location.href = '../scorescreen.html', 1000);
            localStorage.setItem('Eindscore', eindscore.toString());
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
    fillArray() {
        let RemoveElement = function (myArray, randomItem) {
            let index = myArray.indexOf(randomItem);
            if (index > -1) {
                myArray.splice(index, 1);
            }
        };
        let GetRandomElement = function (myArray, deleteFlag) {
            let randomItem = myArray[Math.floor(Math.random() * myArray.length)];
            if (deleteFlag == true) {
                RemoveElement(myArray, randomItem);
            }
            return randomItem;
        };
        for (let i = 0; i < 10; i++) {
            this.coinn.push(GetRandomElement(this.coin, true));
        }
    }
}
//# sourceMappingURL=app.js.map