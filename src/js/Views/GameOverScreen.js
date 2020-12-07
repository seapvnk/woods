function gameoverScreen(screen, title, player) {

    if (screen.canvas) {
        body.removeChild(screen.canvas)
    }

    title.innerHTML = 'GAME OVER'
    title.classList.add('gameover')

    const score = Element('h2', 'score')

    score.innerHTML = `your score was: <span>${player.score}</span> <br>`
    score.innerHTML += 'click here to play again'

    score.addEventListener('click', e => {
        window.location.reload() 
    })
    
    body.appendChild(score)
}