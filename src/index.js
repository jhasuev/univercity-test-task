import './scss/main.scss'
import Slider from "./classes/Slider"
import Friends from "./classes/Friends"
import Modals from "./classes/Modals"
import Tabs from "./classes/Tabs"
import data from "./../assets/data.json"

const friends = new Friends(".js-friends")

friends.draw(data.friends).then(() => {
  new Slider({
    selector: ".js-slider",
    slides: 8,
    speed: 500,
  })
})

const modals = new Modals()
modals.onOpen("stats", () => {
  // обработать статистику
})

const tabs = new Tabs()
// двигать npc
