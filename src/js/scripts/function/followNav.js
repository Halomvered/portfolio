export var followNav = function () {
    
    // Capture the elements that trigger the hover affect in a vraiable.
    var triggers = document.querySelectorAll('.item--js');
    // Capture the follow-along background.
    var background = document.querySelector('.follow-nav__dropdownBackground');
    // Capture the entire nav element.
    var nav = document.querySelector('.follow-nav');

    function handleEnter() {
        // Add class that makes element a block, to make it visibile, and possible to capture its
        // coordinates.
        this.classList.add('trigger-enter');

        // Add class that change that elements opacity from 0 to 1, to animate its appearence.
        // unless the mouse already moved on to a different trigger element.
        setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
        background.classList.add('open');

        // Find the coordinates for both the dropdown and the entire nav.
        var dropdown = this.querySelector('.follow-nav__dropdown');
        var dropdownCoords = dropdown.getBoundingClientRect();
        var navCoords = nav.getBoundingClientRect();
        // Place the dropdown coordinates in an object.
        var coords = {
            height: dropdownCoords.height,
            width: dropdownCoords.width,
            top: dropdownCoords.top - navCoords.top,
            left: dropdownCoords.left - navCoords.left
        };
        
        // Set the height and width of the background according to the dropdown content current dimentions.
        background.style.setProperty('width', `${coords.width}px`);
        background.style.setProperty('height', `${coords.height}px`);
        // Set the location of the background according to the dropdown top and left coordinates.
        background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
        
    }
    
    function handleLeave() {
        this.classList.remove('trigger-enter', 'trigger-enter-active');
        background.classList.remove('open');

        
        
    }

    triggers.forEach(trigger => trigger.addEventListener('mouseenter',handleEnter));
    triggers.forEach(trigger => trigger.addEventListener('mouseleave',handleLeave));
    
    
}