const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

var mouseHold = false

var eraser = false

var paint = false

var pencil = true

var text = {
    status:false,
    content:''
}

var circle = {
    status: false,
    radius: 0
}

var rectangle = {
    status: false,
    width:0,
    height:0
}

var line = {
    status: false
}

var width = 0
var height = 0

var size = 1
var color = 'black'

var mouse = {
    x:0,
    y:0
}

for (sz of $('.size').children()) {
    $(sz).click(function(){
        size = $(this).attr('data-size')
        displayChoosenSize()
        $(this).css('border', '4px solid blue')
    })
}

for (cl of $('.color-picker').children()) {
    $(cl).click(function(){
        color = $(this).attr('data-color')

        if(line.status){
            ctx.beginPath()
        }

        displayChoosenColor()

        $(this).css('border', '5px solid blue')
    })
}

const clearCanvas = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height)
}

const displayChoosenColor = () => {
    for(cl of $('.color-picker').children()) {
        $(cl).css('border', '1px solid black')
    }
}

const displayChoosenSize = () => {
    for (sz of $('.size').children()) {
        $(sz).css('border', 'none')
    }
}

const displayChoosenFeature = featureName => {
    for (tool of $('.tools').children()) {
        $(tool).css('border', '1px solid black')
    }

    for (shape of $('.shapes').children()) {
        $(shape).css('border', '1px solid black')
    }

    $(featureName).css('border', '5px solid blue')
}

const turnOffAllFeatures = () => {
    pencil = false
    rectangle.status = false
    circle.status = false
    line.status = false
    eraser = false
    paint = false
    text.status = false
}

const paintMode = () => {
    turnOffAllFeatures()
    paint = true
    displayChoosenFeature('.menu-bar__tools-paint')
}

const pencilMode = () => {
    turnOffAllFeatures()
    pencil = true
    displayChoosenFeature('.menu-bar__tools-pencil')
}

const textMode = () => {
    turnOffAllFeatures()
    displayChoosenFeature('.menu-bar__tools-text')
    text.content = prompt('Input content: ')
    text.status = true
}

const erase = () => {
    if (eraser){
        $('.menu-bar__tools-eraser').css('border', '1px solid black')
    }
    else {
        $('.menu-bar__tools-eraser').addClass('active')
        turnOffAllFeatures()
        displayChoosenFeature('.menu-bar__tools-eraser')
        eraser = true
    }
}

const circleMode = () => {
    circle.radius = Number.parseFloat(prompt('Input radius(px):'))
    if(Number.isNaN(circle.radius)) {
        alert('Invalid input!')
        circle.radius = 0
    }

    turnOffAllFeatures()
    displayChoosenFeature('.menu-bar__shapes-circle')
    circle.status = true
}

const rectangleMode = () => {
        rectangle.width = Number.parseFloat(prompt('Input width(px): '))
        rectangle.height = Number.parseFloat(prompt('Input height(px): '))

        if (Number.isNaN(rectangle.width) || Number.isNaN(rectangle.height)) {
            alert('Invalid input!')
            rectangle.width = 0
            rectangle.height = 0
        }

        turnOffAllFeatures()
        displayChoosenFeature('.menu-bar__shapes-rectangle')
        rectangle.status = true
}

const lineMode = () => {
    turnOffAllFeatures()
    displayChoosenFeature('.menu-bar__shapes-line')
    line.status = true
}

canvas.addEventListener('click', e => {
    if (circle.status) {
        ctx.beginPath()
        ctx.lineWidth = size
        ctx.arc(mouse.x, mouse.y, circle.radius, 0, Math.PI*2)
        ctx.strokeStyle = color
        ctx.stroke()
    }

    if (rectangle.status) {
        ctx.beginPath()
        ctx.lineWidth = size
        ctx.rect(mouse.x,mouse.y, rectangle.width, rectangle.height)
        ctx.strokeStyle = color
        ctx.stroke()
    }

    if(line.status) {
        ctx.lineWidth = size
        ctx.arc(mouse.x, mouse.y, size, 0, Math.PI*0.001)
        ctx.strokeStyle = color
        ctx.stroke()
    }

    if(text.status) {
        ctx.font = `${size*10}px Arial`;
        ctx.fillStyle = color
        ctx.fillText(text.content, mouse.x, mouse.y)
    }

    if(pencil) {
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, size / 2, 0, Math.PI*2)
        ctx.fillStyle = color
        ctx.fill()
    }
})

canvas.addEventListener('mousemove', e => {
    mouse.x = e.clientX - $(canvas).position().left
    mouse.y = e.clientY - $(canvas).position().top

        if(mouseHold) {
            if (eraser) {
                ctx.beginPath()
                ctx.fillStyle = '#fff'
                ctx.fillRect(mouse.x, mouse.y, 30, 30)
            }
            else if(paint) {
                ctx.beginPath()
                ctx.rect(mouse.x, mouse.y, size*10, size*10)
                ctx.fillStyle = color
                ctx.fill()
            }
            else if (pencil)
            {
                ctx.beginPath()
                ctx.arc(mouse.x, mouse.y, size / 2, 0, Math.PI*2)
                ctx.fillStyle = color
                ctx.fill()
            }
        }

})

canvas.addEventListener('mousedown', () => {
    mouseHold = true;
})

canvas.addEventListener('mouseup', () => {
    mouseHold = false;
})


