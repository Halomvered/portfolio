export var mobileNav = function () {

     // Activate/ deactivate mobile nav.
     document.addEventListener('click', e => {
        var target = e.target;
            
        // Event delegation to target only clicks on nav-icon.
        if (target.parentElement.getAttribute("class") === 'nav-icon' ||
            target.getAttribute("class") === 'nav-icon' ||
            target.parentElement.getAttribute("class").includes('nav-icon') ||
            target.getAttribute("class").includes('nav-icon')) {
                    
            // Set nav-icon and the moile nav to active.    
            document.querySelector('.nav-icon').classList.toggle('active');
            document.querySelector('.sidebar__sidenav').classList.toggle('active');
        }
    });
}