class Zombie extends Creature {
    constructor(screen, target) {
        super(screen, 'zombie')
        this.x = 200
        this.speed = 5
        this.y = 100
        this.target = target
        this.level = 1
    }

    static getZombieHorde(quantity, positionSeed) {
        return new Array(quantity).fill(0).map(_ => {
            const [max, min] = positionSeed
        
            const zombie = new Zombie(screen, player)
        
            zombie.x = Math.random() * (max - min) + min
            zombie.y = Math.random() * (max - min) + min
        
            return zombie
        })
    }

    getDistanceFromTarget(position = null) {
        const target = position || this.target
        const distance = Math.sqrt((target.x - this.x) ** 2 + (target.y - this.y) ** 2)
        return distance
    }

    follow(x, y) {
        if (this.x >= x) {
            this.x -= this.speed
        } else {
            this.x += this.speed
        }
        
        if (this.y >= y) {
            this.y -= this.speed
        } else {
            this.y += this.speed
        }
    }

    moveToTarget() {
        const distance = this.getDistanceFromTarget()
        const pursuitMode = 240 > distance
        
        if (pursuitMode) {
            this.follow(this.target.x, this.target.y)
        } else if (this._followTarget) {
            const [x, y] = this._followTarget
            this.follow(x, y)
            if (40 > this.getDistanceFromTarget({ x, y })) {
                this._followTarget = false
            }
        } else {
            this._followTarget = [Math.random() * (360 - 200) + 200, Math.random() * (360 - 200) + 200]
        }
    }

    dropItem() {
        const drop = Math.random() * 100
        if (drop < 30) {
            this.target.bullets++
        }
    }

    hurtEffect() {
        if (this._hurted) {
            this.element.classList.add('hurted')
        } else {
            this.element.classList.remove('hurted')
        }
    }

    attackEnemy() {
        const distanceToEnemy = this.getDistanceFromTarget()

        if (40 > Math.abs(distanceToEnemy)) {
            this.target.hp -= 1
            this.target.x += -distanceToEnemy
            this.target.y += -distanceToEnemy
        }
    }

    isEnemyHitting() {
        const targetX = this.target.x
        const attack = this.target.attack

        return (attack > 0 && this.x > targetX) || (attack < 0 && this.x <  targetX)
    }

    handleEnemyAttack() {
        const attack = this.target.attack
        console.log(attack)
        const hitCondition = this.isEnemyHitting()
        const distanceToEnemy = this.getDistanceFromTarget()

        const distanceToHit = this.target.weapeon === 0? 80 : 120
        
        if (attack !== 0 && distanceToHit > Math.abs(distanceToEnemy) && hitCondition) {
            this.hp -= Math.abs(attack)
            this._hurted = true
            this.x += attack * 50
            
            if (this.hp <= 0) {
                this.dropItem()
                this.target.score += 10
            }
        }
    }

    animation() {
        super.animation()

        if (this.level > 2) {
            this.element.classList.remove('zombie')
            this.element.classList.add('zombie-2')
        }

        if (this.hp > 0) {
            this.element.style.display = 'initial'
            if (this._animationCounter === undefined || this._animationCounter > 1000) {
                this._animationCounter = 0
            }
    
            this.moveToTarget()
            this.attackEnemy()
            this.hurtEffect()
            this.handleEnemyAttack()
            this._animationCounter++
            
            if (this._animationCounter % 3 === 0) {
                this._hurted = false
            }
            
        } else {
            this.element.style.display = 'none'
        }
    }
}