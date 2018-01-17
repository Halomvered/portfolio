export var toggleNavHighligh = function () {

    // Highlight current icon for PC sidenav.
    document.addEventListener('click', e => {
        var target = e.target;
        
        // Event delegation to target only clicks on sidenav, call to action button, or window close buttons.
        if (target.getAttribute("class").includes('navMarker--js')) {

            // All sidenav icons are stored in a var.
            var sideNavItems = [...document.querySelectorAll('.btn-js__visible')];

            // Turn off all current highlighted items.
            sideNavItems.forEach(element => {
                element.classList.remove('highlight-nav--js');
            });

            // If a side-nav button was pressed, highlight it.
            if (target.getAttribute("class").includes('btn-js__invisible')) {
                target.previousElementSibling.classList.toggle('highlight-nav--js');
            // If the call to action button was pressed highlight the contact icon.
            } else if (target.getAttribute("class").includes('cta--js')) {
                sideNavItems[sideNavItems.length - 1].classList.toggle('highlight-nav--js');
            // if the close-window button was pressed, highlight the home icon.
            } else {
                sideNavItems[0].classList.toggle('highlight-nav--js');
            }
            
        }
    });
}