class Screen {
    constructor(canvas, dimensions, selectionMenu) {
        const [width, height] = dimensions

        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`

        this.height = height
        this.width = width
        this.canvas = canvas
        this.weapeons = selectionMenu
        this.selectionMenu = selectionMenu.render()
    }

    setWeapeonSelection(weapeon) {
        this.canvas.removeChild(this.selectionMenu)
        this.selectionMenu = new WeapeonSelection(weapeon).render()
        this.canvas.appendChild(this.selectionMenu)
    }
}