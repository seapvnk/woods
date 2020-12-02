const DIMENSIONS = [800, 500]

const body = document.querySelector('body')
const title = document.querySelector('h1')

const screen = new Screen(document.querySelector('[s-woods]'), DIMENSIONS, new WeapeonSelection())
const player = new Player(screen)
const death = new Death(screen, player)
const zombies = Zombie.getZombieHorde(4, DIMENSIONS.map(x => x + 200))

let inGame = true

screen.canvas.appendChild(death.element)
screen.canvas.appendChild(player.element)
screen.canvas.appendChild(screen.selectionMenu)
screen.canvas.appendChild(player.weapeonObject)
zombies.forEach(zombie => screen.canvas.appendChild(zombie.element))

listenInputs(window, {
    'keydown': e => player.handleKeyDown(e.key),
    'keyup': e => player.handleKeyUp(e.key),
    'click': e => player.handleAttack(e),
})

setInterval(() => {
    if (inGame) {
        
        title.innerHTML = player.score
        player.animation()
        zombies.forEach(zombie => zombie.animation())

        if (player.hp <= 0) {
            inGame = false
        }

        if (zombies.every(allZombiesDead)) {
            gameEvolve(player, zombies)
        }

        death.animate()


    } else {

        if (screen.canvas) {
            body.removeChild(screen.canvas)
        }

        title.innerHTML = 'GAME OVER'
        title.classList.add('gameover')

        const score = Element('h2', 'score')
        score.innerHTML = `your score was: <span>${player.score}</span> <br>`
        score.innerHTML += 'click here to play again'

        score.addEventListener('click', e => { window.location.reload() })

        
        body.appendChild(score)
        body.appendChild(button)

    }

}, 100);


const allZombiesDead = zombie => zombie.hp <= 0

const gameEvolve = (player, zombies) => {

    zombies.forEach(zombie => {
        let [max, min] = DIMENSIONS

        max += 200
        min += 200
        
        zombie.level++
        zombie.hp = 1 + zombie.level
        zombie.speed += 2

        zombie.x = Math.random() * (max - min) + min
        zombie.y = Math.random() * (max - min) + min

        return zombie
    })

    player.hp += player.score / 100
    player.bullets += 2
}