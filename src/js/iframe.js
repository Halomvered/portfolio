////////////////////////////////////////////
// iframe management and communication with
// the parent window.
////////////////////////////////////////////
function initIframe() {
    
    // Store elements we'll need later on in variables.
        var chatMessages        = document.querySelector('.chat-messages'),
            chatArea            = document.querySelector('.chat-area'),
            chatMessage         = document.querySelectorAll('.chat-message'),
            chatBox             = document.querySelector('.chat-form'),
            localMessagesArray  = [];
      
    
    
        // Function for sending a new message to the chat.
        function addMessage(e) {
            // Prevent default behaviour of a clicked submit button.
            e.preventDefault();
            
            // Store the text typed into the input in aa variable.
            var text = (this.querySelector('[name="message"]')).value;
            // Store in a var the id of this iframe(which was set during it's creating in accordance to the current iframeCounter).
            var id = (this.querySelector('[type="submit"]')).id;
            // Place the above values in an object.
            var messageLog = {
                text: text,
                iframeId: id
            };
            // Post the message to the parent window, where it will be saved in storage and redistributed to all iframes.
            exportMessageLog(messageLog);
            localMessagesArray.push(messageLog);
            // Reset the text in the input box.
            this.reset();
        }
        // Function for sending messages to the parent window.
        function exportMessageLog(messageLog) {
            // Turn message object into string and post it to parent window..
            parent.window.postMessage(JSON.stringify(messageLog),
            this.origin);
        }
        
        // Function to listen to messages sent from iframes.
        function ListenToParent(e) {
            // If this window doesn't share the same origin as the iframe - do nothing.
            if (e.origin !== parent.window.origin) {
                return;
            // otherwish, parse its data(all existing messages), use it to populate the chatMessages ul.
            } else {
                populateIframe(JSON.parse(e.data), chatMessages);
            }
        };
        // Function to populate the chatMessages ul.
        function populateIframe(messages = [], messagesList) {
            // Map through the messages array, create a an array of <P> elements. One for each + its sender, and nested in its own <li> element.
            // Then turn the array into one big string using join() - and set it to be the Ul's innerHTML content.
            messagesList.innerHTML = messages.map(function (message) {
                        return '<li class="chat-message">\n' +
                        '<p>['+ message.iframeId +'] '+ message.text +'</p>\n' +
                        '</li>';
                    }).join('');
            //Each time chatMessages ul is populated, scroll to its bottom.
            chatArea.scrollBy(0, chatMessages.offsetHeight);
        }
        // Listen to the chat submit button.
        chatBox.addEventListener('submit', addMessage);
        // Listen to messages posted from parent.
        window.addEventListener("message", ListenToParent, false);
    }
    // // Initiate all of the above after page loads.
    window.addEventListener('load', initIframe);