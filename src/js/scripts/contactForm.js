export var contactForm = function () {
    // Listen for form submit
    document.querySelector('#contactForm').addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        // Create object for form input
        var contactInput = {};

        // Fill object with the values of the input areas present at the moment of pressing 'submit'
        [...document.querySelectorAll('input')].forEach( item => {
            // Check to see which radio button was pressed.
            if (item.name === 'workType' && item.checked) {
                contactInput[item.id] = item.checked;
            // Get other values, as long as they don't come from the remaining radio button.
            } else if (item.name !== 'workType') {
                contactInput[item.name] = item.value;
            }
        });
    }

};