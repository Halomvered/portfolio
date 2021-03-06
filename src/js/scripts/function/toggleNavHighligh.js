export var toggleNavHighligh = function () {

    // All sidenav icons are stored in a var.
    var sideNavItems = [...document.querySelectorAll('.btn-js__visible')];
    var buttons = document.querySelectorAll('.navMarker--js');
    
    buttons.forEach( button => {
        // Highlight current icon for PC sidenav.
        button.addEventListener('click', e => {

            // Turn off all current highlighted items.
            sideNavItems.forEach(element => {
                element.classList.remove('highlight-nav--js');
            });
            // If a side-nav button was pressed, highlight it.
            if (button.getAttribute("class").includes('btn-js__invisible')) {
                button.previousElementSibling.classList.toggle('highlight-nav--js');

            // If the call to action button was pressed highlight the contact icon
            // And make the cta button disappear.
            } else if (button.getAttribute("class").includes('cta--js')) {
                sideNavItems[sideNavItems.length - 1].classList.toggle('highlight-nav--js');
                document.querySelector('.main-content__cta').classList.toggle('active');

            // if the close-window button or logo were pressed, highlight the home icon
            // and make the cta button reappear.
            } else {
                sideNavItems[0].classList.toggle('highlight-nav--js');
                document.querySelector('.main-content__cta').classList.toggle('active');
            }
        });
    });

    
}