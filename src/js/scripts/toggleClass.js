export var toggleClass = function () {

    // Highlight current icon for PC sidenav.
    document.addEventListener('click', e => {
        var target = e.target;
        // Event delegation to target only clicks on sidenav.
        if (target.getAttribute("class") === 'btn-js__invisible') {
            // Turn off all current highlighted items.
            [...document.querySelectorAll('.btn-js__invisible')].forEach(element => {
                element.previousElementSibling.classList.remove('visible_on-js');
            });
            // Toggle the relevant class on the SVG element of the clicked item.
            target.previousElementSibling.classList.toggle('visible_on-js');
        }
    });
}