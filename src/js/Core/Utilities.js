class Utilities {

    static listenInputs(obj, settings) {
        for (let ev in settings) {
            obj.addEventListener(ev, settings[ev])
        }
    }
    
    static appendManyTo(obj, ...childs) {
        childs.forEach(child => {
            if (Array.isArray(child)) {
                Utilities.appendManyTo(obj, ...child)
            } else {
                obj.appendChild(child)
            }
        })
    }

}
