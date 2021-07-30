export default class Npc {
  constructor(data) {
    this.init(data)
  }

  init(data) {
    this.positions = data.positions || []
    this.positionIndex = 0
    this.speed = data.speed || 1200
    this.npc = document.querySelector(data.npc)

    if (this.npc) {
      this.npc.style.animationDuration = `${this.speed}ms`
      this.setCurrentPosition()
    }
  }

  resetPosition() {
    this.positionIndex = 0
    this.setCurrentPosition()
  }

  move() {
    if (this.moving) return;

    this.moving = true
    const nextPositions = this.positions[++this.positionIndex]
    if (nextPositions) {
      const keyframe = this.createKeyframe(nextPositions)
      this.updateKeyframe(keyframe)
      this.npc.classList.add("move")
      
      setTimeout(() => {
        this.setCurrentPosition()
        this.npc.classList.remove("move")
        this.moving = false

        if (this.positionIndex >= this.positions.length - 1) {
          this.onFinished()
        }
      }, this.speed);
    }
  }

  onFinished() {
    const event = new Event("finish")
    dispatchEvent(event)
  }

  setCurrentPosition() {
    const positions = this.positions[this.positionIndex]
    if (positions) {
      const { left, top } = positions[positions.length - 1]
      this.npc.style.top = `${top}px`
      this.npc.style.left = `${left}px`
    }
  }

  createKeyframe(positions) {
    const steps = positions.length
    const step = 100 / steps
    let keyframe = '@keyframes move {'

    for (let i = 0; i < steps; i++) {
      const percent = (i + 1) * step
      const position = positions[i]
      keyframe += `\n${percent}% { top: ${position.top}px; left: ${position.left}px }`
    }
    keyframe += '\n}'

    return keyframe
  }

  updateKeyframe(keyframe) {
    let style = document.querySelector("style#npc-move-keyframe")
    if (!style) {
      style = document.createElement("style")
      style.id = "npc-move-keyframe"
      document.head.appendChild(style)
    }
    
    style.innerHTML = keyframe
  }
}