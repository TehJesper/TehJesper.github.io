class Player {

    public xPos: number;
    public yPos: number;
    private xVel: number;
    private yVel: number;
    private collision: number;
    private keyboardListener: KeyboardListener;

    // Coins
    private coinCounter: number;
    private coin1: any;

    constructor(
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        keyboardListener: KeyboardListener
    ) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.keyboardListener = keyboardListener;
        this.collision = 0;
        this.coin1 = [this.rand(2,630,22), this.rand(2,645,22)]
        this.coinCounter = 0;


    }



    public move(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT) && this.xPos !== 702) {
            this.xPos += this.xVel;

            this.checkCollision(ctx);
            if (this.collision == 1) {
                this.xPos -= this.xVel;
                this.collision = 0;
                // console.log('testseteet')
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
    public draw(ctx: CanvasRenderingContext2D) {
        const x = 15;
        const y = 15;
        ctx.fillStyle = 'purple';
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, x, y);
        ctx.closePath();
        ctx.fill();
        console.log(this.xPos, this.yPos)
        this.coins(ctx);
        this.endCheck();
    }

    public checkCollision(ctx: CanvasRenderingContext2D) {
        let imgd = ctx.getImageData(this.xPos, this.yPos, 15, 15);
        let pix = imgd.data;
        // console.log(pix)
        for (let i = 0; i < pix.length; i += 4) {
            if (pix[i] == 0) {
                this.collision = 1;
            }
        }
    }
    public rect(x: number, y: number, w: number, h: number, ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();
    }
    /**
     * Coins
     */
    public coins(ctx: CanvasRenderingContext2D) {
        let x = this.coin1[0];
        let y = this.coin1[1];

        ctx.fillStyle = 'gold'
        ctx.beginPath();
        ctx.rect(this.coin1[0], this.coin1[1], 15,15)
        ctx.closePath();
        ctx.fill();
        if (this.xPos >= x-4 && this.xPos <= x+4 && this.yPos >= y-4 && this.yPos <= y+4) {

            // document.getElementById('question').innerHTML = `Vraag: y/n?`
            // document.getElementById('answers').innerHTML = `
            // <button id="option1">Y</button>
            // <button id="option2">N</button>`
            // document.getElementById('option1').onclick = function () {
            // }

            this.coin1.pop();
            ctx.clearRect(x, y, 15, 15)
            ctx.fillStyle = 'purple';
            this.rect(x, y, 15, 15, ctx);
            if (this.coinCounter < 100) {

                this.coinCounter += 100;
            }
            console.log(this.coinCounter);


        }
        else {
            document.getElementById('question').innerHTML = ``
            document.getElementById('answers').innerHTML = ``
        }

        document.getElementById('Score').innerHTML = `Coins: ${this.coinCounter}`
        // document.body.innerHTML =  `${this.coinCounter}` ;
    }
    /**
     * endCheck
     */
    public endCheck() {
        if (this.yPos >= 156 && this.yPos <= 160 && this.xPos == 647) {
            window.location.href = '../maze.html'
        }
    }

    public rand(min: number, max: number, step: number) {
        var delta,
            range,
            rand;
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


