export default class Slider {
  constructor(params) {
    this.init(params)
  }

  init(params) {
    this.initParams(params)
    this.selectElements()
    this.initSettings()
    this.update()
    this.createEvents()
  }

  initParams(params) {
    this.selector = params.selector || this.selector
    this.slides = params.slides || this.slides || 1
    this.speed = params.speed || this.speed || 300
  }

  initSettings() {
    const styles = getComputedStyle(this.allSlides[0])
    const maringLeft = parseFloat(styles.marginLeft)
    const maringRight = parseFloat(styles.marginRight)

    this.slidesTotal = this.allSlides.length
    this.slideWidth = parseFloat(styles.width) + maringLeft + maringRight
    this.containerWidth = this.slideWidth * this.slidesTotal - maringRight
    this.containerInnerWidth = this.slideWidth * this.slides - maringRight
    this.endPoint = this.containerWidth - this.containerInnerWidth

    this.sliderList.style.width = Math.min(this.containerWidth, this.containerInnerWidth) + "px"
    this.sliderView = 0

    // утсановка скорости
    this.sliderListInner.style.transition = `${this.speed}ms`
  }

  selectElements() {
    this.slider = document.querySelector(this.selector)
    this.sliderList = this.slider.querySelector(".js-slider-list")
    this.sliderListInner = this.slider.querySelector(".js-slider-list-inner")
    this.arrowPrev = this.slider.querySelector(".js-slider-arrow.js-slider-prev")
    this.arrowNext = this.slider.querySelector(".js-slider-arrow.js-slider-next")
    this.allSlides = this.slider.querySelectorAll(".js-slider-list-item")
  }

  createEvents() {
    this.arrowPrev.addEventListener("click", () => this.prev())
    this.arrowNext.addEventListener("click", () => this.next())
  }

  prev() {
    if (this.canGoPrev()) {
      this.sliderView += this.slideWidth
      this.update()
    }
  }

  next() {
    if (this.canGoNext()) {
      this.sliderView -= this.slideWidth
      this.update()
    }
  }

  update() {
    this.sliderListInner.style.transform = `translateX(${this.sliderView}px)`
    this.updateArrows()
  }

  updateArrows() {
    if (this.canGoPrev()) {
      this.arrowPrev.removeAttribute("disabled")
    } else {
      this.arrowPrev.setAttribute("disabled", true)
    }

    if (this.canGoNext()) {
      this.arrowNext.removeAttribute("disabled")
    } else {
      this.arrowNext.setAttribute("disabled", true)
    }
  }

  canGoPrev() {
    return this.sliderView < 0
  }

  canGoNext() {
    return Math.abs(this.sliderView) < this.endPoint
  }
}
