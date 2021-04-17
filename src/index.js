import './scss/main.scss'
import Slider from "./classes/Slider"
import Friends from "./classes/Friends"
import Modals from "./classes/Modals"
import Tabs from "./classes/Tabs"
import Stats from "./classes/Stats"
import Npc from "./classes/Npc"
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
  const weekStats = new Stats(".js-stats-week")
  const weekCommon = new Stats(".js-stats-common")
  weekStats.draw(data.rating, data.friends)
  // дублирование для наглядности
  weekCommon.draw([...data.rating, ...data.rating], data.friends)
})

const tabs = new Tabs()
const player = new Npc({
  npc: ".js-player",
  positions: data.positions
})

const univercityBtn = document.querySelector(".js-player-move")
univercityBtn.addEventListener("click", () => {
  player.move()
})
