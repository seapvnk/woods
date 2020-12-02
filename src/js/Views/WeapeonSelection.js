class WeapeonSelection {
    constructor(selected = 0) {
        this.selected = selected
    }

    setWeapeonIconConfig(element) {
        element.style.transform = 'scale(0.2) rotate(-90deg)'
        element.style.margin = `40px 10px`
        return element
    }

    getWeapeon(weapeon) {
        const weapeons = [Element('div', 'axe'), Element('div', 'shotgun')]
        return weapeons[weapeon]
    }

    render() {
        const iconsContainer = Element('div', 'icons')

        const weapeonIconConfig = this.setWeapeonIconConfig
        const weapeonIcons =  [this.getWeapeon(0), this.getWeapeon(1)].map(weapeonIconConfig)
        
        const icons = weapeonIcons.map((weapeonIcon, index) => {
            const icon = Element('div', 'weapeon-icon')
            icon.style.position = 'relative'
            icon.appendChild(weapeonIcon)

            icon.style.backgroundColor = (index === this.selected)? '#a53246' : '#afafc8'
            
            return icon
        })

        icons.forEach(icon => iconsContainer.appendChild(icon))
        
        return iconsContainer
    }
}