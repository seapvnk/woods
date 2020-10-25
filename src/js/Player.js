class Player {
    constructor(screen) {
        this.screen = screen

        this.element = Element('div', 'player')
        this.element.style.transform = 'scale(0.4)'
        
        this.height = 75
        this.width = 50

        this.xMovement = 0
        this.yMovement = 0
        this.speed = 20

        this.weapeon  = 0
        this.weapeonObject = this.screen.weapeons.getWeapeon(this.weapeon)
        this.updateWeapeonObject()

        this.x = 360
        this.y = 330

        this.hp = 250
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

        const [w, a, s, d] = 'xyxy'.split('').map((axis, index) => {
            handleMovement(axis, -1)
        })

        const keyHandle = {
            w: handleMovement('y',  1),
            a: handleMovement('x', -1),
            s: handleMovement('y', -1),
            d: handleMovement('x',  1),
        }

        const keyDown = keyHandle[key]
        keyDown && keyDown(player)
        
    }

    move() {
        if (this.xMovement === -1 && this.x > 0) {
            this.x += this.xMovement * this.speed
        } else if (this.xMovement === 1 && this.x + this.width < this.screen.width) {
            this.x += this.xMovement * this.speed
        }

        if (this.yMovement === -1 && this.y > 0 + this.height) {
            this.y += this.yMovement * this.speed
        } else if (this.yMovement === 1 && this.y < 0 + this.screen.height - 17) {
            // 17 is hat size :^)
            this.y += this.yMovement * this.speed
        }

        this.updateWeapeonObject()
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
