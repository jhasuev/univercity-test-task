export default class Modals {
  constructor() {
    this.init()
  }

  init() {
    this.speed = 300
    this.modals = document.querySelector(".js-modals")
    window.addEventListener("click", (event) => {
      const target = event.target
      if (target.hasAttribute("data-modal")) {
        this.onButtonClick(target)
      }
      if (target.classList.contains("js-modals-close")) {
        this.close()
      }
    })
  }

  onOpen(id, fb) {
    if (!this.fallbacks) {
      this.fallbacks = []
    }

    // регистрируем фоллбэки
    this.fallbacks.push({ id, fb })
  }

  executeFallback(id) {
    this.fallbacks.forEach(fallback => {
      if (fallback.id === id) {
        fallback.fb()
      }
    })
  }

  onButtonClick(button) {
    const id = button.getAttribute("data-modal")
    const modal = document.querySelector(`#${id}`)
    if (modal) {
      this.executeFallback(id)
      this.open({ modal })
    }
  }

  open(data) {
    this.setSpeed(data.speed)

    this.modals.classList.add("open")
    data.modal.classList.add("open")
  }

  setSpeed(speed) {
    if (typeof speed != "undefined") {
      this.speed = speed
    }

    this.modals.style.transition = `${this.speed}ms`
  }

  close() {
    this.modals.classList.remove("open")
    document.querySelectorAll(".js-modals-item").forEach(modal => {
      modal.classList.remove("open")
    })
  }
}