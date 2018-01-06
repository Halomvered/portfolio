import '../css/main.scss';
import '../contentscript.html';
import {randomFadingCircles} from './scripts/randomcircles.js';

// SETUP FOR USING randomFadingCircles()
// Insert the class of the canvas element you'd like to work with.
var element = '.main-content__canvas';
// // Set the maximum radius that a circle can grow to.
// var maxRadius = 40;
// // Set the minimum radius that a circle can shrink to.
// var minRadius = 20;
// // Set the range of size the of each circle is generated as.
var radiusRange = 1.5;
// // Set the range of size the of each circle is generated as.
var changeRate = 0.005;
// Define an array of colors from which the circles are randomly generated.
var colorArray = [
    "rgba(255, 255, 255, 0.055)",
];
var circleNum = 80;

;
randomFadingCircles(element, radiusRange, changeRate, colorArray, circleNum);