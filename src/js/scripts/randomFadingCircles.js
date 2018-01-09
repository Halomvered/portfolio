// Exporting to app.js
export var randomFadingCircles = function (element, radiusRange, changeRate, colorsMain, circleNum) {

// Set variables for the element in which you want to create it + set its context
// in a variable.
var canvas = document.querySelector(element),
    c      = canvas.getContext('2d');

// Use a function to generate the canvas in the selected element.
fitToContainer(canvas);

// Set the element's style properties width and height, and set
// the canvas to fill the entire element.
function fitToContainer(canvas){
  canvas.style.width='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}


// // Create object to track mouse movement, in case you want to use
// // this animation interactively.
// var mouse = {
//     x : undefined,
//     y : undefined
// };
// window.addEventListener('mousemove', (e) => {
//     mouse.x = event.x - canvas.parentElement.offsetLeft;
//     mouse.y = event.y - canvas.parentElement.offsetTop;
// });



// Regenerate the circles and thier boundries when the window is resized.
window.addEventListener('resize', (e) => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    init();
});


// Class for the template of the circle
function Circle(x, y, dx, dy, radius, changeRate) {
    // Coordinates where it's generated on the screen.
    this.x = x;
    this.y = y;

    // The dicrection amd speed in which it moves.
    this.dx = dx;
    this.dy = dy;

    // Its size and minimum size.
    this.radius = radius + 1;
    this.minRadius = radius - Math.random() + 1;
    this.maxRadius = radius + Math.random() + 2;
    this.changeRate = (Math.random() < 0.5 ? -1 : 1) * changeRate;

    // Randomaly selected color from a predefined array of colors.
    this.color = colorsMain[Math.floor(Math.random() * colorsMain.length)];

    // Method for circle creation.
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };

    // Method to define the circle's behaviour(direction, when it changes direction and
    // how much should it grow/shrink)

    // Change the circle's direction when it reaches the canvas's border.
    this.update = function () {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        };

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        // Generate the the next circle in its next position according to its
        // speed and direction variables.
        this.x += this.dx;
        this.y += this.dy;

        // Make the radius shrink when it reaches maximum size.
        if (this.radius > this.maxRadius && this.changeRate > 0) {
            this.changeRate = -this.changeRate;
        } 
        // Make the radius grow when it reaches minimum size.
        if (this.radius < this.minRadius && this.changeRate < 0) {
            this.changeRate = -this.changeRate;
        } 
        
        // Generate the the next circle in its next position according to its
        // radius growth/shrink ratio.
        this.radius += this.changeRate;
        

        // if (this.radius < this.maxRadius) {
        // } 
        

        // Interactivity to make each circle grow when it comes with a certain radius of the mouse.
        // if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        //     if (this.radius < maxRadius) {
        //         this.radius += 1;
        //         }
        // } else if (this.radius > this.minRadius) {
        //     this.radius -= 1;
        // }

        // Redraw the circle with it's updates.
        this.draw();
    }
};


var circleArray = [];
// Function to populate the circleArray
function init() {
    circleArray = [];
    for (let i = 0; i < circleNum; i++) {
        var radius = Math.random() * radiusRange + 1;
        var x = Math.random() * (canvas.width - (radius * 2)) + radius;
        var y = Math.random() * (canvas.height - (radius * 2)) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius, changeRate));
    }
};


function animate() {
    // use requestAnimationFrame to make run the animation economically.
    requestAnimationFrame(animate);
    // Clear all the previous positions of the circles.
    c.clearRect(0, 0, innerWidth, innerHeight);
    // Use each circles method to redraw it in its new position.
    circleArray.forEach( circle => circle.update());
};


animate();
init();
};