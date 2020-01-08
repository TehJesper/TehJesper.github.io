// let canvas: HTMLCanvasElement;
// let ctx: CanvasRenderingContext2D;

class Maze {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    private collision: number;

    // private player: Player;
    private keyboardListener: KeyboardListener;
    private levelScreen: LevelScreen;

    public constructor(canvasId: HTMLCanvasElement) {
        this.canvas = canvasId;
        this.canvas.width = 702;
        this.canvas.height = 702;
        this.ctx = this.canvas.getContext('2d');

        this.keyboardListener = new KeyboardListener();
        this.levelScreen = new LevelScreen(this.canvas, this.ctx, this.keyboardListener)
      
        this.loop();

    }
    public loop() {
        this.loadmaze();
        this.levelScreen.draw();
        requestAnimationFrame(this.loop.bind(this));
    }

    public loadmaze() {
        this.loadImage('goede_maze.jpg', this.drawmaze)
    }

    public drawmaze(img: HTMLImageElement) {
        this.ctx.drawImage(img, 0, 0)
    }

    private loadImage(source: string, callback: Function) {
        const imageElement = new Image();

        // We must wait until the image file is loaded into the element
        // We add an event listener
        // We'll be using an arrow function for this, just because we must.
        imageElement.addEventListener("load", () => {
            callback.apply(this, [imageElement]);
        });

        // Now, set the src to start loading the image
        imageElement.src = source;
    }

}
// This will get an HTML element. I cast this element in de appropriate type using <>
let init = () => {
    const maze = new Maze(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
