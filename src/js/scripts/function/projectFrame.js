// Put nav link in a variable.
var navLinks = document.querySelectorAll('.follow-nav__link');

// Put play button items in a variable.
var playButton = document.querySelector('.follow-nav__link--play');

function removeGlow() {
    this.classList.remove('frame-glow-js');
}


function addGlow() {
    navLinks[0].classList.remove('frame-glow-js');
    navLinks[2].classList.add('frame-glow-js');
}

// Remove glow when hovering above a nav link.
navLinks.forEach( item => {
    item.addEventListener('mouseover', removeGlow)
});

// Add glow to last nav item when play button is clicked.
playButton.addEventListener('click', addGlow);
