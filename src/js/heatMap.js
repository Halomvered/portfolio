import {project2} from './scripts/projects/project2.js';
import {followNav} from './scripts/function/followNav.js';
import {projectFrame} from './scripts/function/projectFrame.js';

// Reveal the heatmap script script when user places play.
document.querySelector('.play--js').addEventListener('click', ev => {
    document.querySelector('.heatmap__canvas').style.visibility = "visible";
<<<<<<< HEAD
    document.querySelector('.heatmap__canvas').style.zIndex = "9999";
=======
    document.querySelector('.heatmap__canvas').style.style.zIndex = "9999";
>>>>>>> d223950005b8760fce61d8907f9e56691eede846
});

// Initiate the heatmap.
project2();    