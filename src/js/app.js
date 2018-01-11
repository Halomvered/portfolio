import '../css/main.scss';
import '../contentscript.html';
import {randomFadingCircles} from './scripts/randomFadingCircles.js';
import {canvasWriting} from './scripts/canvasWriting.js';
import {clickAndDrad} from './scripts/clickAndDrad.js';

// SETUP FOR USING randomFadingCircles
// Insert the class of the canvas element you'd like to work with.
var elementMain = '.main-content__canvas';
// // Set the maximum radius that a circle can grow to.
// var maxRadius = 40;
// // Set the minimum radius that a circle can shrink to.
// var minRadius = 20;
// // Set the range of size the of each circle is generated as.
var radiusRange = 1.5;
// // Set the range of size the of each circle is generated as.
var changeRate = 0.005;
// Define an array of colors from which the circles are randomly generated.
var colorsMain = [
    "rgba(255, 255, 255, 0.055)",
];
var circleNum = 80;


// SETUP FOR USING canvasWriting
// Insert the class of the canvas element you'd like to work with.
var elementPopup = '.popup__canvas';
// Define the minimum font size that will be drawn on the canvas.
var minFontSize = 15;
// Set the text font.
var canvasfont = "Roboto";
// Set the text that will be drawn on the canvas.
var letters = "Javascript, CSS, HTML, Sass, Node, Express, MongoDB, Version Control, Webpack, Jqeury, Ajax, API, REST, Illustrator, Photoshop, Bootstrap.";

// SETUP FOR USING clickAndDrad
// Insert the speed in which you want to scroller to move.
var scrollSpeed = 1.5;

window.addEventListener('load', ev => {
    randomFadingCircles(elementMain, radiusRange, changeRate, colorsMain, circleNum);
    canvasWriting(elementPopup, minFontSize, canvasfont, letters);
    clickAndDrad(scrollSpeed);
});