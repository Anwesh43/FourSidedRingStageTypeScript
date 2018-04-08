const w : number = window.innerWidth
const h : number = window.innerHeight
const size : number = Math.min(w,h) * 0.8
class FourSidedRingStage {
    private canvas : HTMLCanvasElement = document.createElement('canvas')
    private context : CanvasRenderingContext2D;
    constructor() {
        this.initCanvas()
    }
    initCanvas() {
        this.canvas.width = size
        this.canvas.height = size
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }
    render() {
        this.context.fillStyle = '#212121'
        this.context.fillRect(0, 0, size, size)
    }
    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }
}
class FSRState {
    scales : Array<number> = [0, 0]
    scale : number = 0
    dir : number = 0
    prevScale : number = 0
    j : number = 0
    update (stopcb : Function) {
        this.scales[this.j] += 0.1 * this.dir
        if (Math.abs(this.scales[this.j] - this.prevScale) > 1) {
            this.scales[this.j] = this.prevScale + this.dir
            this.j += this.dir
            if (this.j == this.scales.length || this.j == -1) {
                stopcb()
            }
        }
    }
    startUpdating (startcb : Function) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            startcb()
        }
    }
}
