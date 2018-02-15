import {followNav} from './scripts/function/followNav.js';
import {projectFrame} from './scripts/function/projectFrame.js';

///////////////////////////////////////////
// iframe creation, and window.top managment
// of each iframe and its container + siblings
////////////////////////////////////////////
function init() {
    

    // Create an array which will house - future iframe objects.
    // Pull out of localstorage and parse an array of previous logged messages, or declare an empty array for future ones.
    // Set counter of iframes objects number.
    // Set variables for iframe drag functionality.
    var iframesArray    = [],
        messagesLog     = JSON.parse(localStorage.getItem('messagesLog')) || [],
        iframeCounter   = 1,
                        obj, x, y, prev_x, prev_y;

    // Create IframeChatWindow class
    function IframeChatWindow(iframeCounter) {
        // Set this IframeChatWindow to current counter.
        this.iframeCounter = iframeCounter;
        // Create the iframe HTML element.
        this.iframe = document.createElement("iframe");
        // Create the iframe's container.
        this.iframeContainer = document.createElement("div");
        // Create the iframe's blue bar on top.
        this.iframeTop = document.createElement("div");
        // Create the iframe's close button.
        this.iframeClose = document.createElement("a");
        // Method for iframes creation.
        this.create = function () {
                // Append each element for its designated location.
                this.iframeContainer.appendChild(this.iframeTop);
                this.iframeTop.appendChild(this.iframeClose);
                this.iframeClose.innerHTML = '&Cross;';
                this.iframeContainer.appendChild(this.iframe);
                // Set each element's intended class.
                this.iframeTop.classList.add('iframe-top');
                this.iframeClose.classList.add('iframe-close');
                this.iframeContainer.classList.add('iframe-container');
                this.iframeContainer.setAttribute('id', 'iframe'+ this.iframeCounter);
                this.iframe.classList.add('iframe');
                // Inject the container into it's place in the topmost window.
                document.querySelector('.iframes-container').appendChild(this.iframeContainer);
                // Link the iframe to its intended JS file, and to the general CSS file.
                let link = document.createElement("link");
                link.href = "main.css";
                link.rel = "stylesheet";
                
                let script = document.createElement("script");
                script.src = "iframe.bundle.js"
                
                this.iframe.contentDocument.head.appendChild(link);
                this.iframe.contentDocument.documentElement.appendChild(script);
                // Set the inside HTML structure of the iframe.
                this.iframe.contentDocument.body.innerHTML =
                            '<div class="chat-container">\n' +
                                '<div class="chat-area">\n' +
                                    '<ul class="chat-messages"></ul>\n' +
                                '</div>\n' +
                                '<form class="chat-form" id="the-form" action="/">\n' +
                                    '<input class="iframe-input" type="text" name="message" placeholder="iFrame '+ this.iframeCounter +'\ says:">\n' +
                                    '<input class="iframe-button" id="iFrame ' + this.iframeCounter +'" type="submit" value="send">\n' +
                                '</form>\n' +
                            '</div>';
        };
        // Method for updating each iframe with the messages log.
        this.update = function() {
            // Post the messagesLog item of local storage, to this iframe.
            this.iframe.contentWindow.postMessage(localStorage.getItem('messagesLog'),
            this.iframe.contentWindow.origin);
        };
        // Method to declare this iframes entrance or exit of the conversation.
        this.logStatus = function(status) {
            // Define the content of the log-node object.
            let createdLog = {
                text: ' - iframe' + this.iframeCounter + ' ' + status + ' the conversation.',
                iframeId: 'system'
            };
            // Add the log to the array of previous logs.
            messagesLog.push(createdLog);
            // Replace the outdated messagesLog item in localstorage - with the updated one.
            storeItem('messagesLog', JSON.stringify(messagesLog));
        };
    }

////////////////////////////////////////////////
// iframes generation and postMessage managment.
////////////////////////////////////////////////


    // Function for IframeChatWindow generation.
    function generateIframe(counter, regnerated) {
            // In case all IframeChatWindows were closed, reset the iframeCounter to it's starting value.
            if (iframesArray.length === 0) iframeCounter = 1;
            // Create a dynamically variable for the new IframeChatWindow - both with the current iframeCounter.
            window['IframeChatWindow' + iframeCounter] = new IframeChatWindow(iframeCounter);
            // Push the new IframeChatWindow into the iframesArray,
            iframesArray.push(window['IframeChatWindow' + iframeCounter]);
            // Activate it's create() method.
            iframesArray[iframesArray.length - 1].create()
            // Set on it's "top" area an event listener, set for the drag function.
            iframesArray[iframesArray.length - 1].iframeTop.onmousedown = drag;
            
            // If this function was used only once, after the user pressed the big "+" generation button -
            if (!regnerated) {            
                // Then add a log status to the messagesLog, declaring it's entrance to the chat.
                iframesArray[iframesArray.length - 1].logStatus('joined');
                // Then add a log status to the messagesLog, declaring it's entrance to the chat.
                setTimeout(function () {
                    // Update all existing iframes messageLog.
                    updateAll();
                }, 500);
            };
            // Replace the outdated exitingIframes item in localstorage - with the updated iframesArray.
            storeItem('exitingIframes', JSON.stringify(iframesArray));
            // Increment the counter.
            iframeCounter++;
    };
    // Function regenerate all iframes when page is refreshed, by using data stored in localstorage.
    function regenerateIframes() {
        // If there are existing frames stored in memory.
        if (JSON.parse(localStorage.getItem('exitingIframes'))) {
            // Turn the data from string to array of objects, and use each item as a replacement for the counter.
            JSON.parse(localStorage.getItem('exitingIframes')).forEach(function (iframe) {
                // Use the boolean true to let prevent generateIframe() from creating a login announcement for each
                // regenerate iframe.
                generateIframe(iframe.iframeCounter, true);
            });
        };
    };
    // Function to update all iframes with new messages.
    function updateAll() {
            // Go through each iframe and activate its update method, to send it the most updated
            // messages log from localstorage.
            iframesArray.forEach(function (iframe) {        
            iframe.update();
            });
    };

    // Function to listen to messages sent from iframes.
    function listenToIframe(e) {
        // If this window doesn't share the same origin as the iframe - do nothing.
        if (e.origin !== parent.window.origin) {
            return;
            // otherwish, parse its data(a new message), and push it into the messages array.
        } else {
            if (e.data.type !== "webpackOk") {
                messagesLog.push(JSON.parse(e.data));
                storeItem('messagesLog', JSON.stringify(messagesLog));
                // Then update the messages log of all iframes
                updateAll()
            }
            
        };
    };
    // After page loads -
    setTimeout(function() {
        // If there's an existing message log in storage - send it to all iframes.
        if (localStorage.getItem('messagesLog')) {
            updateAll()
        }
    }, 1000);

    // Function for repeated operations of setting items in local storage, to make the code more DRY.
    function storeItem(key, content) {
        localStorage.setItem(key, content);
    };



////////////////////////////////////////////
// iframe functionality - drag and close.
////////////////////////////////////////////

    // Function for removing iframe after user presses its close button.
    function removeIframe(e) {
        // Event is set on the iframes-container, and relies on event propagation, to catch elements that are
        // yet to be created.
        var target = e.target;
        // If the user pressed the close button.
        if (target.getAttribute('class').includes('iframe-close')) {
            // Retrieve the id the frame was assigned in accordance to the iframeCounter at the time of its creation.
            let id = target.parentElement.parentElement.getAttribute('id');
            // Turn it into a number and set it in a temporary variable.
            let counter = parseInt(id.slice(id.length - 1));
            
            // Map through the iframesArray -
            iframesArray.map(function (item, i) {
                // When reaching an iframe with a matching counter number:
                if(item.iframeCounter === counter) {
                    // Use its logStatus method to announce its logging out.
                    item.logStatus('left');
                    // Delete it from the iframesArray so it won't be regenerated on page refresh.
                    iframesArray.splice(i, 1);
                };
            });
            // Update the localstorage item of exitingIframes.
            storeItem('exitingIframes', JSON.stringify(iframesArray));
            // Use the id number to remove the HTML element itself.
            document.querySelector('#' + id).remove();
            // Send the messages log to all remaining iframes.
            setTimeout(function () {
                updateAll();
            }, 500);
        };
    };


    // Drag element function learned and adjusted for this environment from "Shikkediel" answer on:
    // https://stackoverflow.com/questions/29703473/pure-javascript-draggable-element
    function drag(e) {
        // If the user presses the 'close' button, do nothing.
        if (e.target.getAttribute('class') !== 'iframe-close') {
        // Set obj to be the currently clicked iframe-container.
        obj = e.target.parentElement;
        // Set current X coordinate minus distance left from offsetParent node.
        prev_x = x - obj.offsetLeft;
        // Set current Y coordinate minus distance top from offsetParent node.
        prev_y = y - obj.offsetTop;
        // Set iframe-container position to absolute. 
        obj.setAttribute('style', 'position: absolute;');
        // Set its left and top coordinates to keep it where it was, instead of changing its location abruptly. 
        obj.style.left = (x - prev_x - 10) + 'px';
        obj.style.top = (y - prev_y - 10 ) + 'px';
        }
    };

    function move(e) {
        // Always track and record the mouse's current position.
        if (e.pageX) {
            x = e.pageX; // X coordinate based on page, not viewport.
            y = e.pageY; // Y coordinate based on page, not viewport.
        };
        //  else if (e.clientX) {
        //    x=clientX; // X coordinate based on viewport.
        //    y=clientY; // Y coordinate based on viewport.
        //  }

        // If the object specifically is selected, then move it to the X/Y coordinates that are always being tracked.
        if(obj) {
            obj.style.left = (x - prev_x) + 'px';
            obj.style.top = (y - prev_y) + 'px';
        };
    };

    function drop() {
        // Remove the attached event from the element so it doesn't keep following your mouse.
        if(obj) {
        obj = false;
        };
    };
    // Make a specific element movable
    document.onmousemove = move;
    document.onmouseup = drop;




    // When user presses the generation button - generate an iframe.
    document.querySelector('.play--js').addEventListener("click", generateIframe, false);
    // When user presses a close button - close its iframe.
    document.querySelector('.iframes-container').addEventListener("click", removeIframe, false);
    // Listen to messages posted from Iframes.
    window.addEventListener("message", listenToIframe, false);
    // Regenrate iframes on page refresh, if there are any stored in localstorage.
    regenerateIframes();
};
// Initiate all of the above after page loads.
window.addEventListener('load', init);