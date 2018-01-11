export var clickAndDrad = function (scrollSpeed) {

    // Selecet the clickndrag-nav element.
    const slider = document.querySelector('.clickndrag-nav');
    // Create a mousedown flag.
    let isDown = false;
    // The x coordinate for where the mouse clicks down.
    let startX;
    // The distance scrolled left from the startX.
    let scrollLeft;

    slider.addEventListener('mousedown', mouseDown);
    slider.addEventListener('mouseleave', mouseLeave);
    slider.addEventListener('mouseup', mouseUp);
    slider.addEventListener('mousemove', mouseMove);


    function mouseDown(e) {
        // Set mousedown flag to true.
        isDown = true;
        // Add class to slider to make it bigger, change background and cursor.
        slider.classList.add('active');
        // Find the x coordinates by use of pageX minus the slider offsetLeft
        startX = e.pageX - slider.offsetLeft;
        // Put the scrollLeft distance in a variable.
        scrollLeft = slider.scrollLeft;
    }
    
    function mouseLeave(e) {
        // Set mousedown flag to flase.
        isDown = false;
        // Remove the active class from slider.
        slider.classList.remove('active');
    }
    
    function mouseUp(e) {
        // Set mousedown flag to flase.
        isDown = false;
        // Remove the active class from slider.
        slider.classList.remove('active');
    }

    function mouseMove(e) {
        // Stop the function from running of the flag is flase.
        if(!isDown) return;
        // Prevent any clicking default behaviour that might interfere with the scrolling action.
        e.preventDefault();
        // Find the x coordinate to where the mouse scrolled.
        const x = e.pageX - slider.offsetLeft;
        // Find the distance between the start and end point.
        const walk = (x - startX) * scrollSpeed;
        // Commence the scrolling itself.
        slider.scrollLeft = scrollLeft - walk;
    }
    
};