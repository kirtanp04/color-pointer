const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particalArray = []
hue = 0
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

const mouse = {
  x: undefined,
  y: undefined,
}
canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.x
  mouse.y = e.y
  for (let i = 0; i < 20; i++) {
    particalArray.push(new partical())
  }
})

class partical {
  constructor() {
    this.x = mouse.x
    this.y = mouse.y
    this.size = Math.random() * 10 + 1
    this.speedX = Math.random() * 4.5 - 1.5
    this.speedY = Math.random() * 4.5 - 1.5
    this.color = 'hsl(' + hue + ',100%,50%)'
  }
  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.size > 0.2) {
      this.size -= 0.1
    }
  }
  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, 360)
    ctx.fill()
  }
}

function handelparticals() {
  for (let y = 0; y < particalArray.length; y++) {
    particalArray[y].update()
    particalArray[y].draw()
    if (particalArray[y].size <= 0.3) {
      particalArray.splice(y, 1)
      console.log(particalArray.length)
      y--
    }
  }
}

function animation() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  handelparticals()
  requestAnimationFrame(animation)
  hue += 3
}
animation()