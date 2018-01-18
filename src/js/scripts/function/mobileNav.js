export var mobileNav = function () {

     // Activate/ deactivate mobile nav.
     document.querySelector('.nav-icon').addEventListener('click', e => {
        
            // Set nav-icon and the moile nav to active.    
            document.querySelector('.nav-icon').classList.toggle('active');
            document.querySelector('.sidebar__sidenav').classList.toggle('active');
        
    });
}