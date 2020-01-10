class LevelScreen {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    private player: Player;
    private keyboardListener: KeyboardListener;

    private seconds: any;
    private minutes: any;
    private timer: any;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.keyboardListener = keyboardListener;

        // this.seconds = 0;
        // this.minutes = 0;
        this.timer = 300;

        this.player = new Player(
            290,
            0,
            3,
            3,
            this.keyboardListener,

        )
    }
    public draw() {
        this.player.move(this.canvas, this.ctx);
        this.player.draw(this.ctx);
    }
    public startTimer() {

        window.setInterval(() => this.timera(this.timer, document.querySelector('#time')), 1000)

    }
    public timera(duration: any, display: any) {

        var duration
        this.minutes = Math.floor(this.timer / 60);
        this.seconds = Math.floor(this.timer % 60);

        this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
        this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

        display.textContent = this.minutes + ":" + this.seconds;
        // console.log(this.seconds, this.minutes)
        if (--this.timer < 0) {
            this.timer = duration;
        }

        if (this.minutes < 1 && this.seconds < 11) {
            document.getElementById("time").style.color = "red";
        }
    }
}