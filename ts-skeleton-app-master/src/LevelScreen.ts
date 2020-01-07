class LevelScreen {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    private player: Player;
    private keyboardListener: KeyboardListener;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.keyboardListener = keyboardListener;

        this.player = new Player(
            290,
            0,
            3,
            3,
            this.keyboardListener
        )
    }
    public draw() {
        this.player.move(this.canvas, this.ctx);
        this.player.draw(this.ctx);
    }
}