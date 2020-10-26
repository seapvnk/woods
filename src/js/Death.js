class Death {
    constructor(screen, player) {
        this.screen = screen
        this.target = player

        this.width = 230

        this.element = Element('div', 'death-object')

        this.body = Element('div', 'death')
        this.scythe = Element('div', 'scythe')

        this.body.style.transform = 'scale(1.2)'
        this.body.style.bottom = '270px'

        this.scythe.style.transform = 'scale(1.2)'
        this.scythe.style.top = '-30px'

        this.element.appendChild(this.scythe)
        this.element.appendChild(this.body)
        this.updateOpenning

        this.x = 0
        this.y = 0
    }

    updateOpenning() {
        const scytheLen =  Math.random() * (170 - (-40)) + (-140)
        
        this.openning = scytheLen

        this.scythe.style.top = `${-30 + scytheLen}px`
        this.body.style.bottom = `${250 - scytheLen}px`

        this.hasCollided = false

    }

    animate() {
        if (this.target.score >= 60) {
            this.element.style.display = 'flex'

            this.x += 30
            if (this.x > window.innerWidth) {
                this.x = 0
                this.updateOpenning()
            }

            this.element.style.left = `${this.x}px`
            if (this.collisionActive || true) {
                const targetX = this.target.x
                const targetY = this.target.y

                const collisionX = targetX > this.x - this.width && targetX < this.x - 90
                const collisionY = targetY > -20 + this.openning || targetY < 280 - this.openning
                
                if (collisionY && collisionX && !this.hasCollided) {
                    this.target.hp--
                    this.hasCollided = true
                }
            }
        } else {
            this.element.style.display = 'none'
        }
    }
}