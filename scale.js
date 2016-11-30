;(function () {
    var head = document.getElementsByTagName('head')[0]
    var contentWidth = 640
    var viewport = null
    Array.prototype.slice.call(head.children).forEach(function(item) {
        if(item.name === 'viewport') 
            item.parentNode.removeChild(item)
        if (item.getAttribute('data-name') === 'scale')
            contentWidth = parseFloat(item.getAttribute('data-content-width'))
    })

    checkScale()

    window.addEventListener('resize', () => {
        checkScale()
    })

    function createViewport(scale) {
        var meta = document.createElement('meta')
        meta.name = 'viewport'
        meta.content = createViewportContent(scale || 1)
        if (viewport)
            viewport.parentNode.removeChild(viewport)
        viewport = meta
        return meta
    }

    function createViewportContent(scale) {
        return 'width=device-width,\
            initial-scale=' + scale + ', \
            minimum-scale=' + scale + ', \
            maximum-scale=' + scale + ', \
            user-scalable=no'
    }

    function checkScale() {
        head.appendChild(createViewport(screen.availWidth / contentWidth))
    }
}());