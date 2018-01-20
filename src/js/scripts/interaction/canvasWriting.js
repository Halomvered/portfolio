export var canvasWriting = function (element, height, width, minFontSize, canvasfont, letters) {



    // Basic var declaration
    var     position        = {x: 0, y: window.innerHeight/2},
            counter         = 0,
            angleDistortion = 0,
            mouse           = {x: 0, y: 0, down: false};

    // Set variables for the element in which you want to create it + set its context
    // in a variable.
    var canvas = document.querySelector(element),
        c      = canvas.getContext('2d');

    // Use a function to generate the canvas in the selected element.
    fitToContainer(canvas);
    
    // Set the element's style properties width and height, and set
    // the canvas to fill the entire element.
    function fitToContainer(canvas){
      canvas.style.width  = width;
      canvas.style.height = height;
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };


    // Setting up event listeners
    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mouseout',mouseUp,false);
    canvas.addEventListener('dblclick', doubleClick, false);
    
    addEventListener('resize', () => {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        });
    

    // Find mouseclick coordinates and start the drawing function.
    function mouseMove ( e ){
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
    draw();
    }
    

    function draw() {
    if ( mouse.down ) {
     // Calculate the distance traversed since the mouse was clicked.
     var d = distance( position, mouse );
     // Adjust the fontsize according to how quickly the mouse traversed said distance.
     var fontSize = minFontSize + d/2;
     // Move letter by letter of the string by use of counter.
     var letter = letters[counter];
     // Find the width of the letter.
     var stepSize = textWidth( letter, fontSize );
     
     if (d > stepSize) {
      var angle = Math.atan2(mouse.y-position.y, mouse.x-position.x);
      
      c.font = fontSize + canvasfont;
     
      c.save();
      c.translate( position.x, position.y);
      c.rotate( angle );
      c.fillText(letter,0,0);
      c.restore();
      // Increment the counter.
      counter++;
      if (counter > letters.length-1) {
       counter = 0;
      }
     
      position.x = position.x + Math.cos(angle) * stepSize;
      position.y = position.y + Math.sin(angle) * stepSize;
    
      }
    }  
    }
    // Calculate the distance made by the mouse.
    function distance( pt, pt2 ){
    
    var xs = 0;
    var ys = 0;
    
    xs = pt2.x - pt.x;
    xs = xs * xs;
    
    ys = pt2.y - pt.y;
    ys = ys * ys;
    
    return Math.sqrt( xs + ys );
    }
    // Set mouse.down to true on mousedown event and record its coordinates on the screen.
    function mouseDown( e ){
    mouse.down = true;
    position.x = e.offsetX;
    position.y = e.offsetY;

    e.preventDefault();
    // On mousedown make the canvas instructions text disappear.
    document.querySelector('.popup__right--text').style.display = 'none';
    
     
    }
    // On mouse up set mouse.down to false.
    function mouseUp( e ){
     mouse.down = false;
    }
    //On doubleclick event, restart the canvas & counter and restore the instructions text.
    function doubleClick( e ) {
    canvas.width = canvas.width;
    counter = 0;
    document.querySelector('.popup__right--text').style.display = 'block';
    }
    // Find text width according to the letter and fontsize while mouse is down and moving.
    function textWidth( string, size ) {
    c.font = size + "px Georgia";
    
    if ( c.fillText ) {
     return c.measureText( string ).width;
    } else if ( c.mozDrawText) {
     return c.mozMeasureText( string );
    }
    
    };

};