//I want users to only be able to add valid names
//I want users to only be able to add valid email addresses
//I want users to only be able to add valid credit/debit card information
//alll validaiton to be done on one page utilisiing local.storage
//issues being highlighted to the user when they are still entering a field of as soon as possible after
//correct fields should be shown as DN green, errors shown in DN pink
//ensure that any data capture is secure and there is no risk of database corruption through SQL injection. Only standard upper / lower case. letters and printable characters: !#$%&'*+-/=?^_`{|}~ should be allowed in all fields.
//ensure that all accepted credit cards conform to the LUHN algorithm
//I need an Email to test@dn-uk.com be sent containing the validated information when a user presses a ‘Submit’ button.

//regex for name, email, and 2 most common banking cards
const yourName = document.getElementById("nameInput");
const yourEmail = document.getElementById("emailInput");
const yourCard = document.getElementById("cardInput");


//functions for validating name, email and card details
function isValidName(name) {
    const nameReg = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return nameReg.test(name);
}

function isValidEmail(email) {
    const emailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailReg.test(email);
}

function isValidCard(card) {
    const cardReg = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/;
    return (cardReg.test(card)) && luhnCheck(card);
}

//LUHN algorithm check
function luhnCheck(cardNumber) {
    let sum = 0;
    let alternate = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let num = parseInt(cardNumber.charAt(i), 10);
        if (alternate) {
            num *= 2;
            if (num > 9) {
                num -= 9;
            }
        }
        sum += num;
        alternate = !alternate;
    }
    return sum % 10 === 0;
}


// Adding event listeners to submit button to validate
const validateAll = document.getElementById("submitButton").addEventListener("click", function () {
    const nameInput = yourName.value; // Corrected here
    const emailInput = yourEmail.value; // Corrected here
    const cardInput = yourCard.value; // Corrected here

    let isValid = true;

    // Validate name
    if (!isValidName(nameInput)) {
        alert("Please enter a valid name.");
        isValid = false;
    }

    if (!isValidEmail(emailInput)) {
        alert("Please enter a valid email address");
        isValid = false;
    }

    if (!isValidCard(cardInput)) {
        alert("Please enter a valid card number");
        isValid = false;
    }

    // If all inputs are valid, proceed with submission
    if (isValid) {
        alert("Form submitted successfully!");
    }
})



