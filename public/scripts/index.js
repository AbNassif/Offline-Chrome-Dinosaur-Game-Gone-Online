let canvas = document.getElementById("canvas");
var window_height = window.innerHeight;
var window_width = window.innerWidth;
// canvas.style.background = "yellow";

let context = canvas.getContext("2d");

var grd = context.createLinearGradient(0, 0, 170, 0);
grd.addColorStop(0, "black");
grd.addColorStop(1, "white");

ctx.fillStyle = grd;
ctx.fillRect(20, 20, 150, 100);

class Circle{
    constructor(x, y, radius, color,speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.dx = speed;
        this.dy = speed;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        context.lineWidth = 5;
        context.stroke();
        context.closePath();
    }

    update() {
        context.clearRect(0,0,window_width,window_height)
        this.x += this.dx;
        this.y += this.dy;
        this.draw(context);
    }
}

let myCircle = new Circle(500, 500, 100, "red",2)

myCircle.draw(context);
function move() {
    requestAnimationFrame(move);
    myCircle.update();
}


class Image{
    constructor(imagePath, x, y, width, height){
        this.imagePath = imagePath;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

function createImage(context, imagePath, x, y, width, height) {
    let myImage = document.createElement("img");
    myImage.src = imagePath;

    myImage.onload = function () {
        context.drawImage()
    }
}
function createImage(context, imagePath) {
    let myImage = document.createElement("img");
    myImage.src = imagePath
}