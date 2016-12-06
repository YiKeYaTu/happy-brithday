const Controller3D = (body, x = 0, y = 0, z = 0) => {
    const inf = {
        rotateX: x,
        rotateY: y,
        translateZ: z
    }

    function rotateX(distance) {
        const oldRotateX = getTransfrom('rotateX')
        inf.rotateX = oldRotateX + distance
    }

    function rotateY(distance) {
        const oldRotateY = getTransfrom('rotateY')
        inf.rotateY = oldRotateY + distance
    }

    function translateZ(distance) {
        const oldTranslateZ = getTransfrom('translateZ')
        inf.translateZ = oldTranslateZ + distance
    }
    
    function getTransfrom(type) {
        return inf[type]
    }

    function update() {
        body.style.transform = `rotateX(${inf.rotateX}deg) rotateY(${inf.rotateY}deg) translateZ(${inf.translateZ}px)`
    }

    update()

    return {
        rotateX,
        rotateY,
        translateZ,
        update,
        getInf() {
            return inf
        }
    }

}


class Cylinder {
    constructor(r, height, style, firstElement) {
        this.r = parseFloat(r) + 'px'
        this.height = height
        this.style = style
        this.firstElement = firstElement
        this.init()
    }
    init() {
        const tmp = document.createDocumentFragment()
        let child
        for (let i = 0; i < this.height; i ++) {
            if (i === 0)
                child = this.firstElement
            else
                child = null
            tmp.appendChild(
                this.createDOM(this.r, this.style, i, child)
            )
        }
        this.DOM = tmp
    }
    createDOM(r, style, i, child) {
        const DOM = document.createElement('div')
        if (child)
            DOM.appendChild(child)
        if (!style.top)
            throw 'style should have property: top'
        const mixStyle = Object.assign({}, style, {
            width: r,
            height: r,
            borderRadius: style.borderRadius || '100%',
            transform: Cylinder.rotateX + ' ' + `translateZ(${parseFloat(r) / 2}px)`,
            position: Cylinder.position,
            top: parseFloat(style.top) + i + 'px'
        })
        for (const key in mixStyle)
            DOM.style[key] = mixStyle[key]
        return DOM
    }
    appendTo(target) {
        if (!target.appendChild)
            throw 'appendTo need a DOMElement params'
        target.appendChild(this.DOM)
        return this
    }
}
Cylinder.unitHeight = '1px'
Cylinder.rotateX = 'rotateX(90deg)'
Cylinder.position = 'absolute'

class CylinderX {
    constructor(num, style, child) {
        this.DOMArr = []
        this.num = num
        this.style = style
        this.child = child.reverse() || []
        this.dis = 100
        this.deg
        this.init()
    }
    init() {
        const tmp = document.createDocumentFragment()
        const deg = this.deg = 360 / this.num
        const len = this.len = parseFloat(this.style.width) / 2 / Math.tan(Math.PI / this.num / 2) + this.dis
        let DOM
        for (let i = 0; i < this.num; i ++) {
            DOM = this.createDOM(deg * i, len, this.child[i])
            tmp.appendChild(DOM)
            this.DOMArr[i] = DOM
        }
        this.DOM = tmp
    }
    createDOM(deg, len, child) {
        const DOM = document.createElement('div') 
        if (child)
            DOM.appendChild(child)
        const mixStyle = Object.assign({}, this.style, {
            transform: `rotateY(${deg}deg) translateZ(${len}px)`,
            position: CylinderX.position,
        })
        for (const key in mixStyle)
            DOM.style[key] = mixStyle[key]
        return DOM
    }
    appendTo(target) {
        if (!target.appendChild)
            throw 'appendTo need a DOMElement params'
        target.appendChild(this.DOM)
        return this
    }
}
CylinderX.position = 'absolute'