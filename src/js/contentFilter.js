import {project1} from './scripts/projects/project1.js';
import {followNav} from './scripts/function/followNav.js';
import {projectFrame} from './scripts/function/projectFrame.js';

// Activate project1 script when user places play.
document.querySelector('.play--js').addEventListener('click', ev => {
    project1();    
});