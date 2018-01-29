export var project2 = function () {









  // Set variables for the element in which you want to create it + declare its context
  // in a variable.
  var canvas = document.querySelector('.heatmap__canvas'),
      c      = canvas.getContext('2d');

      
      // Use a function to generate the canvas in the selected element.
      fitToContainer(canvas);
      
  // Set the canvas to fill the entirety of its parent element.
  function fitToContainer(canvas){
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  
  // Regenerate and restart heatmap when the window is resized.
  // window.addEventListener('resize', function(e){
  //   canvas.width = canvas.offsetWidth;
  //   canvas.height = canvas.offsetHeight;
  //   init();
  // });

  // Create object to track mouse movement.
  var mouse = {
    x : undefined,
    y : undefined
  };
  // Create object to track mouse clicks.
  var mouseClick = {
      x : undefined,
      y : undefined
  };
  // Update above objects in synch with their matching events
  window.addEventListener('mousemove', function(e){
      mouse.x = event.x - canvas.parentElement.offsetLeft;
      mouse.y = event.y - canvas.parentElement.offsetTop;
  });
  window.addEventListener('click', function(e){
      mouseClick.x = event.clientX  - canvas.parentElement.offsetLeft;
      mouseClick.y = event.clientY  - canvas.parentElement.offsetTop;
      console.log(mouseClick);
  });

  // Class for the template of the a heat map particle.
  function MapParticle(x, y, side) {
    // Rect location coordinates.
    this.x = x * side;
    this.y = y * side;
    // Rect sides size.
    this.side = side;
    // Rect starting color.
    this.hue = 210;

    // Create particle
    this.draw = function(){
        c.fillStyle = 'hsla('+ this.hue +', 100%, 50%, 0.5)';
        c.fillRect(this.x, this.y, this.side, this.side);
    };

    // Change particle hue on mouse proximity.
    this.update = function () {
        // Change the particles hue towards 'hotter' colors, and finally red - whenever the move passes over and near them.
        if (mouse.x - this.x < 25 && mouse.x - this.x > -25 && mouse.y - this.y < 25 && mouse.y - this.y > -25) {
          // Change particles colors only if they are not red.
          if (this.hue > 1) {
            this.hue -= 10;              
            this.draw();
          }
          // If the mouse clicked fill particles on that location with the color purple.
          if (mouseClick.x - this.x < 15 && mouseClick.x - this.x > -15 && mouseClick.y - this.y < 15 && mouseClick.y - this.y > -15) {
            this.hue = 270;
            this.draw();
          }
        }
    }
  };

  // Make newly updated particles replace the old ones, instead of being drawn on top of them.
  c.globalCompositeOperation = 'xor';

  // Declare array that will house all particles(and can be sent later to a database to along with a summary
  // of the page and its dimensions - to recreate the map in a remote enviorment).
  var particleArray = [];
  // Populate the particleArray.
  function init() {
    particleArray = [];
      // Create enough particles to fill the entire canvas width.
      for (var i = 0; i < canvas.width; i++) {
        // Create enough particles to fill the entire canvas height.
        for (var j = 0; j < canvas.height; j++) {
          particleArray.push(new MapParticle(i, j, 10));
        }
      }
      // Draw all of the particles once.
      particleArray.forEach( function (particle){
        particle.draw(); 
      });
  };

  function animate() {
    // use requestAnimationFrame to run the update function economically.
    requestAnimationFrame(animate);

    // Redraw updated particles.
    particleArray.forEach( function (particle){
      particle.update(); 
    });
  };

  // Initiate the heatmap.
  animate();
  init();

};