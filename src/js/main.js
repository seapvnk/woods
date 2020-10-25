const DIMENSIONS = [800, 500]

const screen = new Screen(document.querySelector('[s-woods]'), DIMENSIONS, new WeapeonSelection())
const player = new Player(screen)

const zombies = new Array(4).fill(0).map(_ => {
    let [max, min] = DIMENSIONS

    const zombie = new Zombie(screen, player)
    max += 200
    min += 200

    zombie.x = Math.random() * (max - min) + min;
    zombie.y = Math.random() * (max - min) + min;

    return zombie
})

screen.canvas.appendChild(player.element)
screen.canvas.appendChild(screen.selectionMenu)
screen.canvas.appendChild(player.weapeonObject)
zombies.forEach(zombie => screen.canvas.appendChild(zombie.element))


window.addEventListener('keydown', e => {
    player.handleKeyDown(e.key)
})
window.addEventListener('keyup', e => {
    player.handleKeyUp(e.key)
})
screen.canvas.addEventListener('click', e => {
    player.attack(e)
})

setInterval(() => {
    document.querySelector('h1').innerHTML = [player.x, player.y].join(', ')
    player.animation()
    zombies.forEach(zombie => zombie.animation())
}, 100);