class Player {

    public xPos: number;
    public yPos: number;
    private xVel: number;
    private yVel: number;
    private collision: number;
    private keyboardListener: KeyboardListener;

    // Coins
    private coinCounter: number;
    private coin: any;
    private coinn: any[];
    private vragen: any;
    private coin1: number;
    private coin2: number;
    private coin3: number;
    private coin4: number;
    private coin5: number;

    constructor(
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        keyboardListener: KeyboardListener,
    ) {
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

        // console.log(this.coin)
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
        // console.log(this.xPos, this.yPos)
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



        let x: any[] = []
        let y: any[] = []
        for (let i = 0; i < this.coinn.length; i += 2) {
            x.push(this.coinn[i])
            y.push(this.coinn[i])
        }


        // console.log(x,y)
        ctx.fillStyle = 'gold'
        for (let i = 0; i < x.length; i++) {
            ctx.beginPath();
            ctx.rect(x[i], y[i], 15, 15)
            ctx.closePath();
            ctx.fill();
        }
        for (let i = 0; i <= x.length; i++) {
            if (this.xPos >= x[i] - 8 && this.xPos <= x[i] + 8 && this.yPos >= y[i] - 8 && this.yPos <= y[i] + 8) {
                // console.log(this.coin)
                let indexX = this.coinn.indexOf(x[i])
                let indexY = indexX + 1;
                // console.log(indexX, indexY)
                // console.log(this.coinn)
                // console.log(x, y)
                this.coinn.splice(indexX, 1)
                this.coinn.splice(indexY - 1, 1)
                ctx.clearRect(x[i], y[i], 15, 15)
                ctx.fillStyle = 'purple';
                // this.rect(x[i], y[i], 15, 15, ctx);
                // console.log(this.coinn);
                // console.log(x,y)


                // console.log(this.vragen)
                let p = this.vragen.pop()
                document.getElementById('question').innerHTML = `${p}`
                // console.log(this.vragen)

            }
            if (document.getElementById('question').innerHTML == 'Iemand die je kent wilt je inloggegevens hebben om je een skin te geven, wat doe je?') {
                document.getElementById('answers').innerHTML =
                    `<h1>1: Ja, Je geeft je inloggegevens omdat je het wel kan vertrouwen</h1><br>
                    <h1>2: Nee, je geeft je inloggegevens niet want misschien heeft hij/zij verkeerde bedoelingen </h1>`

                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_1)) {

                    document.getElementById('question').innerHTML = `Fout, geef nooit je inloggegevens aan anderen!`
                    document.getElementById('answers').innerHTML = ``
                }
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_2)) {

                    this.coin1 = 1;

                    document.getElementById('question').innerHTML = `Goed, geef nooit je inloggegevens aan anderen!`
                    document.getElementById('answers').innerHTML = ``

                    // window.setInterval(() => this.test(), 3000);


                }
            }
            if (document.getElementById('question').innerHTML == 'Je kunt een post/afbeelding makkelijk van het internet afhalen!') {
                document.getElementById('answers').innerHTML =
                    `<h1>3: Waar</h1><br>
                    <h1>4: Niet waar</h1>`
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_3)) {
                    document.getElementById('question').innerHTML = `Fout, een post/afbeelding blijft altijd ergens opgeslagen!`
                    document.getElementById('answers').innerHTML = ``
                }
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_4)) {
                    this.coin2 = 1;

                    document.getElementById('question').innerHTML = `Goed, een post/afbeelding blijft altijd ergens opgeslagen!`
                    document.getElementById('answers').innerHTML = ``
                    // window.setInterval(() => this.test(), 3000);
                }
            }
            if (document.getElementById('question').innerHTML == 'Je krijgt een reclame over een persoon die je laat zien hoe je veel munten in je spel kunt krijgen. Jij…') {
                document.getElementById('answers').innerHTML =
                    `<h1>5: klikt op de reclame want je wilt die munten wel.</h1><br>
                    <h1>6: vertrouwt het niet en negeert het.</h1>`
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_5)) {

                    document.getElementById('question').innerHTML = `Fout, ten eerste willen ze je inloggegevens en daarnaast is het misschien ook wel illegaal!`
                    document.getElementById('answers').innerHTML = ``
                }
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_6)) {

                    this.coin3 = 1;
                    document.getElementById('question').innerHTML = `Goed, ten eerste willen ze je inloggegevens en daarnaast is het misschien ook wel illegaal!`
                    document.getElementById('answers').innerHTML = ``
                    // window.setInterval(() => this.test(), 3000);
                }
            }
            if (document.getElementById('question').innerHTML == 'Als je iets downloadt waarvan je niet weet wat het is kan dat schadelijk zijn') {
                document.getElementById('answers').innerHTML =
                    `<h1>7: Waar</h1><br>
                    <h1>8: Niet waar</h1>`
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_7)) {

                    this.coin4 = 1;
                    document.getElementById('question').innerHTML = `Goed, het kan je computer kapot maken!`
                    document.getElementById('answers').innerHTML = ``
                }
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_8)) {
                    document.getElementById('question').innerHTML = `Fout, het kan je computer kapot maken!`
                    document.getElementById('answers').innerHTML = ``
                    // window.setInterval(() => this.test(), 3000);
                }
            }
            if (document.getElementById('question').innerHTML == 'Je komt ergens een bericht tegen van je favoriete youtuber die een giveaway doet. Jij…') {
                document.getElementById('answers').innerHTML =
                    `<h1>9: doet meteen mee.</h1><br>
                    <h1>0: kijkt eerst of het ook echt die youtuber is.</h1>`
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_9)) {

                    document.getElementById('question').innerHTML = `Fout, je weet niet of het wel de persoon is die je denkt dat het is. Hij wilt vast iets van je!`
                    document.getElementById('answers').innerHTML = ``
                    // console.log('test1')
                }
                if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_0)) {
                    this.coin5 = 1;
                    // window.setInterval(() => this.test(), 3000);

                    document.getElementById('question').innerHTML = `Goed, je weet niet of het wel de persoon is die je denkt dat het is. Hij wilt vast iets van je!`
                    document.getElementById('answers').innerHTML = ``
                    // console.log('test2')
                }
                // console.log('testestestest')
            }

            document.getElementById('Score').innerHTML = `Coins: ${this.coin1 + this.coin2 + this.coin3 + this.coin4 + this.coin5}`

        }
    }
    /**
     * endCheck
     */
    public endCheck() {
        let d = parseInt(document.getElementById('time').innerHTML.slice(1, 2)) * 60 + parseInt(document.getElementById('time').innerHTML.slice(3, 5))
        this.coinCounter = this.coin1 + this.coin2 + this.coin3 + this.coin4 + this.coin5;
        let eindscore = this.coinCounter * 40 + d;
        if (this.yPos >= 156 && this.yPos <= 160 && this.xPos == 647) {
            setInterval(window.location.href = '../scorescreen.html', 1000)
            localStorage.setItem('Eindscore', eindscore.toString())
        }
        // console.log(eindscore);
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
        // console.log(rand)
        return rand;
    }
    /**
     * test
     */
    public fillArray() {
        //this function will delete elements from your array
        let RemoveElement = function (myArray: any[], randomItem: any) {
            let index = myArray.indexOf(randomItem);

            //this will delete the actual array element
            if (index > -1) {
                myArray.splice(index, 1);
            }
        }

        //this function gets a random value and you can set a deleteFlag in order to decide remove or not that from the given array
        let GetRandomElement = function (myArray: any[], deleteFlag: boolean) {
            let randomItem = myArray[Math.floor(Math.random() * myArray.length)];

            if (deleteFlag == true) {
                RemoveElement(myArray, randomItem);
            }

            return randomItem;
        }
        for (let i = 0; i < 10; i++) {
            this.coinn.push(GetRandomElement(this.coin, true))

        }
        // console.log(this.coinn)

    }
}


