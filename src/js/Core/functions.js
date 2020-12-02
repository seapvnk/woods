const listenInputs = (obj, settings) => {
    for (ev in settings) {
        obj.addEventListener(ev, settings[ev])
    }
}

const appendManyTo = (obj, ...childs) => {
    childs.forEach(child => {
        if (Array.isArray(child)) {
            appendManyTo(obj, ...child)
        } else {
            obj.appendChild(child)
        }
    })
}