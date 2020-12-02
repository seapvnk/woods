class Creature {
    constructor(screen, sprite) {
        this.screen = screen
        this.element = Element('div', sprite)
        this.hp = 2
        
        this.element.style.transform = 'scale(0.4)'
        
        this.height = 75
        this.width = 50

        this.speed = 20
        
        this.x = 0
        this.y = 0
    }

    renderHP() {
        if (this._lastSlotRendered) {
            this.screen.canvas.removeChild(this._lastSlotRendered)
        }

        const heartSlots = Element('div', '')
        heartSlots.style.display = 'absolute'
        heartSlots.style.left = `${this.x - (22 * Math.floor(this.hp / 2) / 2)}px`
        heartSlots.style.bottom = `${this.y + 32}px`
        
        for(let i = 0; i < this.hp; i++) {
            const heart = Element('div', 'heart')
            heart.style.transform = 'scale(0.2)'
            heart.style.marginLeft = `${i * 22}px`
    
            heartSlots.appendChild(heart)
        }

        this._lastSlotRendered = heartSlots
        this.screen.canvas.appendChild(heartSlots)
    }

    movementAnimation() {
        // horizontal movement
        if (this.xMovement === -1 && this.x > 0) {
            this.x += this.xMovement * this.speed
        } else if (this.xMovement === 1 && this.x + this.width < this.screen.width) {
            this.x += this.xMovement * this.speed
        }

        // vertical movement
        if (this.yMovement === -1 && this.y > 0 + this.height) {
            this.y += this.yMovement * this.speed
        } else if (this.yMovement === 1 && this.y < 0 + this.screen.height - 17) {
            // 17 is hat size :^)
            this.y += this.yMovement * this.speed
        }
    }

    animation() {
        this.movementAnimation()
        this.renderHP()
    }

    set x(x) {
        this._x = x
        this.element.style.left = `${this._x}px`
    }

    set y(y) {
        this._y = y
        this.element.style.bottom = `${this._y}px`
    }

    get x() {
        return this._x
    }

    get y() {
        return this._y
    }
}