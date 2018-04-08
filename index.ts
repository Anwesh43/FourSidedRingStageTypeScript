const w : number = window.innerWidth
const h : number = window.innerHeight
const size : number = Math.min(w,h) * 0.8
class FourSidedRingStage {
    private canvas : HTMLCanvasElement = document.createElement('canvas')
    private fsr : FourSidedRing = new FourSidedRing()
    private animator : FSRAnimator = new FSRAnimator()
    private context : CanvasRenderingContext2D
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
        this.fsr.draw(this.context)
    }
    handleTap() {
        this.canvas.onmousedown = () => {
            this.fsr.startUpdating(() => {
                this.animator.start(() => {
                    this.render()
                    this.fsr.update(() => {
                        this.animator.stop()
                    })
                })
            })
        }
    }
}
class FSRState {
    public scales : Array<number> = [0, 0]
    private dir : number = 0
    private prevScale : number = 0
    private j : number = 0
    update (stopcb : Function) {
        this.scales[this.j] += 0.1 * this.dir
        if (Math.abs(this.scales[this.j] - this.prevScale) > 1) {
            this.scales[this.j] = this.prevScale + this.dir
            this.j += this.dir
            if (this.j == this.scales.length || this.j == -1) {
                this.j -= this.dir
                this.dir = 0
                this.prevScale = this.scales[this.j]
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

class FSRAnimator {
    private animated : boolean = false
    private interval : number
    start (updatecb : Function) {
        if (!this.animated) {
            this.animated = true
            this.interval = window.setInterval(() => {
                updatecb()
            }, 50)
        }
    }
    stop () {
        if (!this.animated) {
            this.animated = true
            window.clearInterval(this.interval)
        }
    }
}

class FourSidedRing {
    private state : FSRState = new FSRState()
    draw(context : CanvasRenderingContext2D) {
        const r : number = 0.1 * size
        const l : number = (size) * 0.45 * this.state.scales[1]
        context.strokeStyle = '#2ecc71'
        context.lineWidth = r/(5.5)
        context.save()
        context.translate(size/2, size/2)
        for (var i = 0; i < 4; i++) {
            context.save()
            context.rotate(i * Math.PI/2)
            context.translate(l, l)
            context.beginPath()
            for (var j = 0; j < 360 * this.state.scales[0]; j++) {
                const x : number = r * Math.cos(j * Math.PI/180)
                const y : number = r * Math.sin(j * Math.PI/180)
                if (j == 0) {
                    context.moveTo(x, y)
                }
                else {
                    context.lineTo(x, y)
                }
            }
            context.stroke()
            context.restore()
        }
        context.restore()
    }
    update(stopcb : Function) {
        this.state.update(stopcb)
    }
    startUpdating(startcb : Function) {
        this.state.startUpdating(startcb)
    }
}
this.fsrs = new FourSidedRingStage()
this.fsrs.render()
this.fsrs.handleTap()
