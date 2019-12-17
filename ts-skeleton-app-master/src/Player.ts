class Player {
    public xPos: number;
    public yPos: number;
    private xVel: number;
    private yVel: number;
    private keyboardListener: KeyboardListener;

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
    }
    public move(canvas:HTMLCanvasElement){
        if(this.keyboardListener.isKeyDown(KeyboardListener.ARROW_RIGHT) && this.xPos !== 482) {
            this.xPos += this.xVel;
        }
        else if(this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT) && this.xPos !== 482) {
            this.xPos += this.xVel;
        }
        if(this.keyboardListener.isKeyDown(KeyboardListener.ARROW_LEFT)) {
            this.xPos -= this.xVel;
        }
        else if(this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
            this.xPos -= this.xVel;
        }
        if(this.keyboardListener.isKeyDown(KeyboardListener.ARROW_UP)) {
            this.yPos -= this.yVel;
        }
        else if(this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)) {
            this.yPos -= this.yVel;
        }
        if(this.keyboardListener.isKeyDown(KeyboardListener.ARROW_DOWN)) {
            this.yPos += this.yVel;
        }
        else if(this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
            this.yPos += this.yVel;
        }
        if(this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)) {
            window.location.replace("../scorescreen.html");
        }
    }
    public draw(ctx: CanvasRenderingContext2D){
    const x = 15;
    const y = 15;
    ctx.fillStyle = 'purple';
    ctx.beginPath();
    ctx.rect(this.xPos,this.yPos,x,y);
    ctx.closePath();
    ctx.fill();
    }
}

// if (
//     this.keyboardListener.isKeyDown(KeyboardListener.ARROW_RIGHT)
//     && this.xPos + this.img.width / 2 < canvas.width
// ) {
//     this.xPos += this.xVel + 3;
// }
// 
// else if (
//     this.keyboardListener.isKeyDown(KeyboardListener.KEY_D)
//     && this.xPos + this.img.width / 2 < canvas.width
// ) {
//     this.xPos += this.xVel + 3;
// }
// 
// // Move left if we're not at the left canvas border
// if (
//     this.keyboardListener.isKeyDown(KeyboardListener.ARROW_LEFT)
//     && this.xPos - this.img.width / 2 > 0
// ) {
//     this.xPos -= this.xVel + 3;
// }
// 
// else if (
//     this.keyboardListener.isKeyDown(KeyboardListener.KEY_A)
//     && this.xPos - this.img.width / 2 > 0
// ) {
//     this.xPos -= this.xVel + 3;
// }
// 
// // Move up if we're not at the top canvas border
// if (
//     this.keyboardListener.isKeyDown(KeyboardListener.ARROW_UP)
//     && this.yPos - this.img.height / 2 > 0
// ) {
//     this.yPos -= this.yVel + 3;
// }
// 
// else if (
//     this.keyboardListener.isKeyDown(KeyboardListener.KEY_W)
//     && this.yPos - this.img.height / 2 > 0
// ) {
//     this.yPos -= this.yVel + 3;
// }
// 
// // Move down if we're not at the bottom canvas border
// if (
//     this.keyboardListener.isKeyDown(KeyboardListener.ARROW_DOWN)
//     && this.yPos + this.img.height / 2 < canvas.height
// ) {
//     this.yPos += this.yVel + 3;
// }
// 
// else if (
//     this.keyboardListener.isKeyDown(KeyboardListener.KEY_S)
//     && this.yPos + this.img.height / 2 < canvas.height
// ) {
//     this.yPos += this.yVel + 3;
// }