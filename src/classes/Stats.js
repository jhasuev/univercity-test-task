export default class Stats {
  constructor(selector) {
    this.htmlElement = document.querySelector(selector).querySelector("tbody")
  }

  draw(users, friends) {
    // + сортировка по очкам
    this.users = users.sort((a, b) => b.points - a.points)
    this.htmlElement.innerHTML = ""

    let html = ""
    let isFriendLayout = '<i class="is-friend" title="Ваш друг"></i>'
    this.users.forEach((user, userIndex) => {
      let isFriend = friends.some(friend => friend.id === user.id)
      html += `
        <tr>
          <td class="table__col">${userIndex + 1}</td>
          <td class="table__col">
            ${isFriend ? isFriendLayout : ''}
          </td>
          <td class="table__col table__col--naming">${user.name} ${user.lastName}</td>
          <td class="table__col">${user.points}</td>
        </tr>`
    })

    this.htmlElement.innerHTML = html
  }
}