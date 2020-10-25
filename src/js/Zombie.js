class Zombie extends Creature {
    constructor(screen, target) {
        super(screen, 'zombie')
        this.x = 200
        this.speed = 5
        this.y = 100
        this.target = target
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
        const pursuitMode = 200 > distance
        
        if (pursuitMode) {
            this.follow(this.target.x, this.target.y)
        } else if (this._followTarget) {
            const [x, y] = this._followTarget
            this.follow(x, y)
            if (40 > this.getDistanceFromTarget({ x, y })) {
                this._followTarget = false
            }
        } else {
            const [min, max] = [this.screen.height, this.screen.width]
            this._followTarget = [Math.random() * (360 - 200) + 200, Math.random() * (360 - 200) + 200]
        }
    }


    animation() {
        super.animation()

        if (this._animationCounter === undefined || this._animationCounter > 1000) {
            this._animationCounter = 0
        }

        this.moveToTarget()

        const distance = this.getDistanceFromTarget()

        const slashHit = this.target.slashAtack
        const targetX = this.target.x
        const hitCondition = (slashHit == 1 && this.x > targetX) || (slashHit == -1 && this.x <  targetX)
        
        if (slashHit !== 0 && 80 > Math.abs(distance) && hitCondition) {
            this.hp--
            this.x += slashHit * 50
            this._hurted = true
        }

        if (40 > Math.abs(distance)) {
            this.target.hp--
        }

        if (this._animationCounter % 3 === 0) {
            this._hurted = false
        }

        if (this._hurted) {
            this.element.classList.add('hurted')
            console.log('ai')
        } else {
            this.element.classList.remove('hurted')
        }

        this._animationCounter++
    }
}