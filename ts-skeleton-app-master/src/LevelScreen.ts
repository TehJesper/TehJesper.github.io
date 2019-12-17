class LevelScreen {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    private player: Player;
    private keyboardListener: KeyboardListener;

    constructor(canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.keyboardListener = keyboardListener;
        
        this.player = new Player(
            30,
            30,
            5,
            5,
            this.keyboardListener
        )
    }
    public draw(){
        this.player.move(this.canvas);
        this.player.draw(this.ctx);
        
    }
}