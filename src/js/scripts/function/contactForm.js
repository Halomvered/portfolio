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

    // Reference messsages collectionsgit 
    var messagesRef = firebase.database().ref('messages');
    
    // Store contact form in var
    var contactForm = document.querySelector('#contactForm');

    // Listen for form submit
    contactForm.addEventListener('submit', submitForm);

    // Submit form
    function submitForm(e) {
        e.preventDefault();
        // Create object for form input
        var contactInput = {};
        // Fill object with the values of the input areas present at the moment of pressing 'submit'
        [...document.querySelectorAll('input, textarea')].forEach( item => {
            // Check to see which radio button was pressed.
            if (item.name === 'workType' && item.checked) {
                contactInput[item.name] = item.id;
            // Get other values, as long as they don't come from the remaining radio button.
            } else if (item.name !== 'workType') {
                contactInput[item.name] = item.value;
            }
        });    
        
        
        // Save message for firebase.
        saveMessage(contactInput);
        
        // Show authentication message
        document.querySelector('#auth--js').classList.toggle("active");

        setTimeout(() => {
            document.querySelector('#auth--js').classList.toggle("active");
        }, 3000);

        // Reset contactForm
        contactForm.reset();
    }

    // Save message for firebase
    function saveMessage(contactInput) {
        var newMessageRef = messagesRef.push();
        newMessageRef.set(contactInput);
    }

};