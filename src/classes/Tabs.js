export default class Tabs {
  constructor() {
    this.init()
  }

  init() {
    this.tabs = document.querySelectorAll(".js-tabs")
    this.buttons = document.querySelectorAll(".js-tabs-buttons-item")

    this.buttons.forEach(button => {
      button.addEventListener("click", this.onButtonClick)
    })
  }

  onButtonClick() {
    if (!this.classList.contains("active")) {
      const currentTabs = this.parentElement.parentElement
      
      const nextTabContentName = this.getAttribute("data-tab")
      const nextTabContent = currentTabs.querySelector(`[data-tab-content=${nextTabContentName}]`)
      const currentTabContent = currentTabs.querySelector(".js-tabs-content-item.active")
      const currentTabButton = currentTabs.querySelector(".js-tabs-buttons-item.active")

      if (!nextTabContent.classList.contains("active")) {
        nextTabContent.classList.add("active")
        currentTabContent.classList.remove("active")

        this.classList.add("active")
        currentTabButton.classList.remove("active")
      }
    }
  }
}