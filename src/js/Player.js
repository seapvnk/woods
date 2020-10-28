class Player extends Creature {
    constructor(screen) {
        super(screen, 'player')

        this.xMovement = 0
        this.yMovement = 0
        this.speed = 20

        this.hp = 5

        this.weapeon  = 0
        this.weapeonObject = this.screen.weapeons.getWeapeon(this.weapeon)
        this.updateWeapeonObject()

        this.x = 360
        this.y = 330


        this.bullets = 2
        this.score = 0
    }

    renderBulletsSlots() {
        if (this._lastBulletSlotRendered) {
            this.screen.canvas.removeChild(this._lastBulletSlotRendered)
        }

        const bulletsSlot = Element('div', '')
        bulletsSlot.style.display = 'absolute'
        bulletsSlot.style.left = `${this.x - (16 * Math.floor(this.hp / 2) / 2)}px`
        bulletsSlot.style.bottom = `${this.y + 54}px`
        
        for(let i = 0; i < this.bullets; i++) {
            const bullet = Element('div', 'bullet')
            bullet.style.transform = 'scale(0.2)'
            bullet.style.marginLeft = `${i * 16}px`
    
            bulletsSlot.appendChild(bullet)
        }

        this._lastBulletSlotRendered = bulletsSlot
        this.screen.canvas.appendChild(this._lastBulletSlotRendered)
    }

    setWeapeonObject() {
        if (this.weapeon === 0) {
            this.weapeonObject.classList.add('axe')
            this.weapeonObject.classList.remove('shotgun')
        } else {
            this.weapeonObject.classList.remove('axe')
            this.weapeonObject.classList.add('shotgun')
        }

        this.screen.setWeapeonSelection(this.weapeon)
    }

    updateWeapeonObject() {
        if (this.weapeon === 0) {
            this.weapeonObject.style.transform = 'rotate(-90deg) scale(0.2)'
            this.weapeonObject.style.position = 'absolute'
            this.weapeonObject.style.left = `${this.x}px`
            this.weapeonObject.style.bottom = `${this.y - 64}px`
        } else {
            this.weapeonObject.style.transform = 'scale(0.2)'
            this.weapeonObject.style.position = 'absolute'
            this.weapeonObject.style.left = `${this.x + 5}px`
            this.weapeonObject.style.bottom = `${this.y - 40}px`
        }
    }

    handleAttack(e) {
        if (this.weapeon === 0 && !this._slashRender) {
            
            this.attack = 1
            const slash = Element('div', 'slash')

            slash.position = 'absolute'
            slash.style.transform = 'scale(0.8)'
            slash.style.left = `${this.x + 15}px`
            slash.style.bottom = `${this.y - 15}px`

            
            if (e.clientX <= this.x + this.width * 6) {
                slash.style.transform += ' rotate(180deg)'
                slash.style.left = `${this.x + 15}px`
                slash.style.bottom = `${this.y - 85}px`

                this.attack = -1

            }

            this.screen.canvas.appendChild(slash)
            this._attackRender = slash

        } else if (this.weapeon === 1 && !this._slashRender && this.bullets > 0) {

            this.attack = 2
            this.bullets--

            const shoot = Element('div', 'shoot')
            shoot.position = 'absolute'
            shoot.style.transform = 'scale(0.8)'
            shoot.style.left = `${this.x + 15}px`
            shoot.style.bottom = `${this.y + 5}px`
            
            if (e.clientX <= this.x + this.width * 6) {
                shoot.style.transform += ' rotate(180deg)'
                shoot.style.left = `${this.x + 15}px`
                shoot.style.bottom = `${this.y - 105}px`

                this.attack = -2

            }

            this.screen.canvas.appendChild(shoot)
            this._attackRender = shoot
        }
    }

    handleKeyUp(key) {
        const [a, d, w, s] = (new Array(2)).fill(player => player.xMovement = 0).concat((
                              new Array(2)).fill(player => player.yMovement = 0))

        const chooseWeapeon = weapeon => player => {
            player.weapeon = weapeon
            player.setWeapeonObject()
        }

        const keyHandle = {
            w, a, s, d,
            q: chooseWeapeon(0),
            e: chooseWeapeon(1),
        }

        const keyUp = keyHandle[key];
        keyUp && keyUp(player)

    }

    handleKeyDown(key) {
        const handleMovement = (axis, direction) => {
            const property = `${axis.toLowerCase()}Movement`
            return player => {
                player[property] = direction
            }
        }

        const keyHandle = {
            w: handleMovement('y',  1),
            a: handleMovement('x', -1),
            s: handleMovement('y', -1),
            d: handleMovement('x',  1),
        }

        const keyDown = keyHandle[key]
        keyDown && keyDown(player)
    }

    animation() {
        super.animation()

        if (this.score >= 80) {
            player.element.classList.remove('player')
            player.element.classList.add('player-2')
        }

        if (this._animationCounter === undefined || this._animationCounter > 1000) {
            this._animationCounter = 0
        }

        if (this._animationCounter % 3 === 0) {
            if (this._attackRender) {
                try {
                    this.screen.canvas.removeChild(this._attackRender)
                } catch (e) {
                    this._attackRender = null
                }
                this.attack = 0
            }

            document.querySelectorAll('.shoot').forEach(c => this.screen.canvas.removeChild(c))
            document.querySelectorAll('.slash').forEach(c => this.screen.canvas.removeChild(c))

        }

        this.renderBulletsSlots()
        this.updateWeapeonObject()
        this._animationCounter++
    }

}
