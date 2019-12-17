// let canvas: HTMLCanvasElement;
// let ctx: CanvasRenderingContext2D;

class Maze
{  
    private readonly canvas:HTMLCanvasElement;
    private readonly ctx:CanvasRenderingContext2D;
    
    private collision: number;
    private x: number;
    private y: number;
    // private w: number; 
    // private h: number;
    // private dx: number;
    // private dy: number;
    private player: Player;
    private keyboardListener: KeyboardListener;
    private levelScreen: LevelScreen;

    public constructor(canvasId: HTMLCanvasElement){
        this.canvas = canvasId;
        this.canvas.width = 482;
        this.canvas.height = 482;
        this.ctx = this.canvas.getContext('2d');
        
        this.keyboardListener = new KeyboardListener();
        this.levelScreen = new LevelScreen(this.canvas,this.ctx,this.keyboardListener)
        

        this.collision = 0;
        this.x = 200;
        this.y = 5;
    
        this.loadmaze();
        this.loop();
        
    }
public loop(){  
    requestAnimationFrame(this.loop.bind(this));
    this.clear();
    this.levelScreen.draw();
//    console.log(this.player.xPos,this.player.yPos);
    //this.checkCollision();
}

public clear(){ 
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.loadmaze();
}

public checkCollision(){
    let imgd = this.ctx.getImageData(this.x, this.y, 15, 15);
    let pix = imgd.data;
    for (let i = 0; i < pix.length; i += 4) {
    if (pix[i] == 0) {
    this.collision = 1;
        }
    }
}

public loadmaze(){
    this.loadImage('maze.gif',this.drawmaze)
}
public drawmaze(img: HTMLImageElement){
    this.ctx.drawImage(img,0,0)
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
    const Asteroids = new Maze(document.getElementById("canvas") as HTMLCanvasElement);

  };

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
