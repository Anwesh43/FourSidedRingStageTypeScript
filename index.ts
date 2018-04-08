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
