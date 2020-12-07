function gameLoop(title, player, enemies, death) {
    title.innerHTML = player.score
    
    if (player.hp <= 0) {
        inGame = false
    }
    
    if (enemies.every(allEnemiesDead)) {
        gameEvolve(player, zombies)
    }

    player.animation()
    death.animate()
    enemies.forEach(enemy => enemy.animation())
}

const allEnemiesDead = enemy => enemy.hp <= 0

const gameEvolve = (player, enemies) => {

    enemies.forEach(enemy => {
        let [max, min] = DIMENSIONS

        max += 200
        min += 200
        
        enemy.level++
        enemy.hp = 1 + enemy.level
        enemy.speed += 2

        enemy.x = Math.random() * (max - min) + min
        enemy.y = Math.random() * (max - min) + min

        return enemy
    })

    player.hp += player.score / 100
    player.bullets += 2
}