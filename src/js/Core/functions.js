const listenInputs = (obj, settings) => {
    for (ev in settings) {
        obj.addEventListener(ev, settings[ev])
    }
}