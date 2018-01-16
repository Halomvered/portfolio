export var contactForm = function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBJICMhwpsbx9mSKKdEZOicrteFWB-0qwQ",
        authDomain: "contact-form-portfolio-c7904.firebaseapp.com",
        databaseURL: "https://contact-form-portfolio-c7904.firebaseio.com",
        projectId: "contact-form-portfolio-c7904",
        storageBucket: "contact-form-portfolio-c7904.appspot.com",
        messagingSenderId: "648379327909"
    };
    firebase.initializeApp(config);

    // Reference messsages collections
    var messagesRef = firebase.database().ref('messages');
    
    // Listen for form submit
    document.querySelector('#contactForm').addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();
        // Create object for form input
        var contactInput = {};
        // Fill object with the values of the input areas present at the moment of pressing 'submit'
        [...document.querySelectorAll('input, textarea')].forEach( item => {
            // Check to see which radio button was pressed.
            if (item.name === 'workType' && item.checked) {
                contactInput[item.id] = item.checked;
            // Get other values, as long as they don't come from the remaining radio button.
            } else if (item.name !== 'workType') {
                contactInput[item.name] = item.value;
            }
        });

        console.log(contactInput);
        
    }
};