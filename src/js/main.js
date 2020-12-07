const DIMENSIONS = [800, 500]

const body = document.querySelector('body')
const title = document.querySelector('h1')

const screen = new Screen(document.querySelector('[s-woods]'), DIMENSIONS, new WeapeonSelection())
const player = new Player(screen)
const death = new Death(screen, player)
const zombies = Zombie.getZombieHorde(4, DIMENSIONS.map(x => x + 200))

let inGame = true

appendManyTo(screen.canvas,
    death.element,
    player.element,
    screen.selectionMenu,
    player.weapeonObject,
    zombies.map(z => z.element)
)

listenInputs(window, {
    'keydown': e => player.handleKeyDown(e.key),
    'keyup': e => player.handleKeyUp(e.key),
    'click': e => player.handleAttack(e),
})

setInterval(() => {
    if (inGame) {
        gameLoop(title, player, zombies, death)
    } else {
        gameoverScreen(screen, title, player)
    }
}, 100);


