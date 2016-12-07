class Anmation {
    constructor(anmationArr) {
        this.anmationArr = anmationArr || []
        this.time = 0
    }
    add(DOM, information, bool, cb = function() {}) {
        this.anmationArr.push({
            DOM,
            information,
            bool,
            cb
        })
    }
    init() {
        this.anmationArr.forEach(function(item) {
            if (!item.bool) {
                for (const key in item.information.endStyle) {
                    item.DOM.style[key] = item.information.startStyle[key]
                }
            }
        })
    }
    start() {
        requestAnimationFrame(function() {
            this.anmationArr = this.anmationArr.filter(function(item) {
                if (item.information.endIn <= this.time) {
                    item.DOM.style.WebkitTransition = ''
                    return false
                } else {
                    if (!item.start && item.information.startIn <= this.time) {
                        if (item.bool) {
                            for (const key in item.information.endStyle) {
                                item.DOM.style[key] = item.information.startStyle[key]
                            }
                        }
                        item.start = true
                    }
                    if (item.start) {
                        item.cb()
                        if (!item.hasSetAnimation) {
                            item.hasSetAnimation = true
                            item.DOM.style.WebkitTransition = `all ${(item.information.endIn - item.information.startIn) / 1000}s`
                            for (const key in item.information.endStyle) {
                                item.DOM.style[key] = item.information.endStyle[key]
                            }
                        }
                    }
                    return true
                }
            }.bind(this))
            this.time += 1000 / 60
            this.start()
        }.bind(this))
    }
}


