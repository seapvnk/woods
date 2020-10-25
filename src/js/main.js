const DIMENSIONS = [800, 500]

function Element(tag, className) {
    const elem = document.createElement(tag)
    elem.style.position = 'absolute';
    elem.className = className
    return elem
}

const screen = new Screen(document.querySelector('[s-woods]'), DIMENSIONS, new WeapeonSelection())
const player = new Player(screen)


screen.canvas.appendChild(player.element)
screen.canvas.appendChild(screen.selectionMenu)
screen.canvas.appendChild(player.weapeonObject)

window.addEventListener('keydown', e => {
    player.handleKeyDown(e.key)
})

window.addEventListener('keyup', e => {
    player.handleKeyUp(e.key)
})



setInterval(() => {
    document.querySelector('h1').innerHTML = [player.x, player.y].join(', ')
    player.move()
}, 100);