export default class Friends {
  constructor(selector) {
    this.htmlElement = document.querySelector(selector)
  }

  draw(friends) {
    return new Promise(resolve => {
      this.friends = friends
      this.htmlElement.innerHTML = ""

      let html = ""
      this.friends.forEach(friend => {
        html += `
          <div class="slider__list-item  js-slider-list-item">
            <div class="friend" title="${friend.name} ${friend.lastName}">
              <img src="assets/img/${friend.img}" class="friend__img">
            </div>
          </div>`
      })

      this.htmlElement.innerHTML = html
      resolve()
    })
  }
}