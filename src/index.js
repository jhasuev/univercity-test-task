import './scss/main.scss'
import Slider from "./classes/Slider"
import Friends from "./classes/Friends"
import data from "./../assets/data.json"

const friends = new Friends(".js-friends")

friends.draw(data.friends).then(() => {
  new Slider({
    selector: ".js-slider",
    slides: 8,
    speed: 500,
  })
})

// открытие/закрытие модальки
// обработать статистику
// двигать npc
