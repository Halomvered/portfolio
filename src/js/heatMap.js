import {project2} from './scripts/projects/project2.js';
import {followNav} from './scripts/function/followNav.js';
import {projectFrame} from './scripts/function/projectFrame.js';

// Reveal the heatmap script script when user places play.
document.querySelector('.play--js').addEventListener('click', ev => {
    document.querySelector('.heatmap__canvas').style.visibility = "visible";
    document.querySelector('.heatmap__canvas').style.style.zIndex = "9999";
});

// Initiate the heatmap.
project2();    