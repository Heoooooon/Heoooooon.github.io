class FlexRect {
    constructor(x , y) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = 30;
        this.height = 30;
        this.x = x;
        this.y = y;
        this.isDragging = false;
    }
    draw() {
        this.ctx.strokeStyle = 'rgb(255,255,255)';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        this.ctx.moveTo(this.x, this.y );
        this.ctx.lineTo(this.x + 30, this.y);
        this.ctx.arc(this.x + 30, this.y, 5, 0, 2 * Math.PI);
        this.ctx.moveTo(this.x + 30, this.y);
        this.ctx.lineTo(this.x + 30, this.y + 30);
        this.ctx.arc(this.x + 30, this.y + 30, 5, 0, 2 * Math.PI);
        this.ctx.moveTo(this.x + 30, this.y + 30);
        this.ctx.lineTo(this.x, this.y + 30);
        this.ctx.arc(this.x, this.y + 30, 5, 0, 2 * Math.PI);
        this.ctx.moveTo(this.x, this.y + 30);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.stroke();
    }
    setSize(mouse) {
        this.x = mouse.x;
        this.y = mouse.y;
    }
}

const canvas = document.querySelector('#drawing-canvas');
canvas.width = document.querySelector('main').clientWidth;
canvas.height = document.querySelector('main').clientHeight;
const mouse = {x: canvas.width / 2 - 15, y: canvas.height / 2 - 15};
const pointer = {x: 0, y: 0};
let isDragging = false;
let Rect = new FlexRect(10,10);
let Rect2 = new FlexRect(20,20);
let Rect3 = new FlexRect(50,50);
let RectArray = [Rect, Rect2, Rect3];
function init() {
    if (canvas.getContext) {

        draw()
    } else {
        console.log('canvas 지원 안함')
    }
}

function draw() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    RectArray.forEach(item => {
        item.draw();
    })
    requestAnimationFrame(draw);
}

init();

function setCanvasSize() {
    const canvas = document.querySelector('#drawing-canvas');
    canvas.width = document.querySelector('main').clientWidth;
    canvas.height = document.querySelector('main').clientHeight;
}
function isMouseInShape(mx, my, shape) {
    let rLeft = shape.x;
    let rRight = shape.x + shape.width;
    let rTop = shape.y;
    let rBottom = shape.y + shape.height;
    if (rLeft < mx && rRight > mx && rTop < my && rBottom > my) {
        shape.isDragging = true;
        isDragging = true;
        shape.x = mx;
        shape.y = my;
    } else {
        shape.isDragging = false;
    }

}
canvas.addEventListener('pointerdown', (e) => {
        RectArray.forEach(item => {
            if (!item.isDragging) {
                isMouseInShape(pointer.x + 15, pointer.y + 15, item);
                if (item.isDragging) return
            } else {

            }


        })

        // isDragging = true;
        if(isDragging) {
            mouse.x = e.offsetX -15;
            mouse.y = e.offsetY -15;
        }

})

canvas.addEventListener('pointerup', (e) => {
    if (isDragging) {

        mouse.x = e.offsetX -15;
        mouse.y = e.offsetY -15;
        RectArray.forEach(item => {
            if (item.isDragging) {
                item.setSize(mouse);
                item.isDragging = false;
                return;
            }
        })
        // Rect.x = mouse.x;
        // Rect.y = mouse.y;
    }
    isDragging = false;
})

canvas.addEventListener('pointermove', (e) => {
    if (isDragging) {
        mouse.x = e.offsetX -15;
        mouse.y = e.offsetY -15;

        RectArray.forEach(item => {
            if (item.isDragging) {
                item.setSize(mouse);
                return;
            }
        })
    }

    pointer.x = e.offsetX -15;
    pointer.y = e.offsetY -15;
})
window.addEventListener('resize', () => {
    setCanvasSize();
});

