import '../css/main.scss';
import '../contentscript.html';
import {randomFadingCircles} from './scripts/decoration/randomFadingCircles.js';
import {preloaderOff} from './scripts/decoration/preloaderOff.js';
import {canvasWriting} from './scripts/interaction/canvasWriting.js';
import {clickAndDrag} from './scripts/interaction/clickAndDrag.js';
import {toggleNavHighligh} from './scripts/function/toggleNavHighligh.js';
import {mobileNav} from './scripts/function/mobileNav.js';
import {contactForm} from './scripts/function/contactForm.js';
import {isIe} from './scripts/function/isIe.js';


// SETUP FOR USING randomFadingCircles
// Insert the class of the canvas element you'd like to work with.
var elementMain = '.main-content__canvas';
// // Set the maximum radius that a circle can grow to.
// var maxRadius = 40;
// // Set the minimum radius that a circle can shrink to.
// var minRadius = 20;
// // Set the range of size the of each circle is generated as.
var radiusRange = 2;
// // Set the range of size the of each circle is generated as.
var changeRate = 0.006;
// Define an array of colors from which the circles are randomly generated.
var colorsMain = [
    "rgba(255, 255, 255, 0.055)",
];
var circleNum = 80;


// SETUP FOR USING canvasWriting
// Insert the class of the canvas element you'd like to work with.
var element = '.popup__canvas';
// Define the the size of the canvas.
var height = '100%';
var width = '60%';
// Define the minimum font size that will be drawn on the canvas.
var minFontSize = 15;
// Set the text font.
var canvasfont = "Roboto";
// Set the text that will be drawn on the canvas.
var letters = "Javascript, CSS, HTML, Sass, Node, Express, MongoDB, Version Control, Webpack, Jquery, Ajax, API, REST, Illustrator, Photoshop, Bootstrap.";

// SETUP FOR USING clickAndDrag
// Insert the speed in which you want to scroller to move.
var scrollSpeed = 1.5;

// SETUP FOR USING preloaderOff
// Insert the number of milliseconds in which you want to animation to fade.
var animationTimer = 2500;
// Insert the number of milliseconds in which you want to entire element to fade.
var entireTimer = 3300;




document.addEventListener('DOMContentLoaded', ev => {
    // Set timers to deactivate the preloader.
    preloaderOff(animationTimer, entireTimer);
    // Check for internet explorer, and if it is - show under construction message.
    isIe();
});

window.addEventListener('load', ev => {
    randomFadingCircles(elementMain, radiusRange, changeRate, colorsMain, circleNum);
    canvasWriting(element, height, width, minFontSize, canvasfont, letters);
    clickAndDrag(scrollSpeed);
    toggleNavHighligh();
    mobileNav();
    contactForm();
    
});