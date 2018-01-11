export var toggleClass = function () {

    // Highlight current icon for PC sidenav.
    document.addEventListener('click', e => {
        var target = e.target;
        
        // Event delegation to target only clicks on sidenav or the call to action button.
        if (target.getAttribute("class") === 'btn-js__invisible' || 
        target.getAttribute("class").includes('btn-higlight-js')) {

            // All sidenav items are stored in a var.
            var sideNavItems = [...document.querySelectorAll('.btn-js__invisible')];

            // Turn off all current highlighted items.
            sideNavItems.forEach(element => {
                element.previousElementSibling.classList.remove('highlight-nav--js');
            });

            // If the call to action button was called, toggle the active class on the contact icon in the side nav.
            if (target.getAttribute("class").includes('btn-higlight-js')) {
                sideNavItems[sideNavItems.length - 1].previousElementSibling.classList.toggle('highlight-nav--js');
            } else {
                // Toggle the relevant class on the SVG element of the clicked item.
                target.previousElementSibling.classList.toggle('highlight-nav--js');
            }
            
        }
    });
}