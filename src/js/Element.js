function Element(tag, className) {
    const elem = document.createElement(tag)
    elem.style.position = 'absolute';
    elem.className = className
    return elem
}