// VARIABLES

// Postcode
const postcodeSection = document.getElementById("postcodeSection");
const postcodeBtn = document.getElementById("postcodeBtn");

// Registration
const regSection = document.getElementById("regSection");
const regBtn = document.getElementById("regBtn");
const backToPostcodeBtn = document.getElementById("backToPostcodeBtn");

// Vehicle
const vehicleSection = document.getElementById("vehicleSection");
const vehicleMake = document.getElementById("vehicleMake");
const vehicleModel = document.getElementById("vehicleModel");
const correctVehicleBtn = document.getElementById("correctVehicleBtn");
const incorrectVehicleBtn = document.getElementById("incorrectVehicleBtn");

// Tyre Size
const tyreSizeSection = document.getElementById("tyreSizeSection");
const tyreSizeSelect = document.getElementById("tyreSizeSelect");
const correctSizeBtn = document.getElementById("correctSizeBtn");
const incorrectSizeBtn = document.getElementById("incorrectSizeBtn");

// Contact
const contactSection = document.getElementById("contactSection");
const backToSizeBtn = document.getElementById("backToSizeBtn");
const submitBtn = document.getElementById("submitBtn");

// Misc Elements
const spinner = document.getElementById("spinner");
const urlInput = document.getElementById("urlInput");

// Arrays
let tyreSizes = [];

// FUNCTIONS

// Remove all the options from a select element
function removeOptions(selectElement) {
    let i,
        L = selectElement.options.length - 1;
    for (i = L; i >= 0; i--) {
        selectElement.remove(i);
    }
}

// Reformat a long tyre size to just the necessities
function formatSize(tyreSizes) {
    // Create empty array
    let result = [];
    // Take an array of tyre sizes
    tyreSizes.forEach((size) => {
        // Convert them from format "225/45R17 94W" to format "225/45R17"
        const newSize = size.slice(0, 9);
        result.push(newSize);
    });

    return result;
}

// Remove duplicate tyre sizes from a given array
function removeDuplicates(tyreSizes) {
    let result = [];
    tyreSizes.forEach((size, index) => {
        if (tyreSizes.indexOf(size) == index) result.push(size);
    });
    return result;
}

// Show spinner whilst waiting for data to return
function showSpinner() {
    spinner.classList.remove("d-none");
}

// Remove spinner once the data is ready to be loaded
function hideSpinner() {
    spinner.classList.add("d-none");
}

// EVENT LISTENERS

// When the postcode button is pressed...
postcodeBtn.addEventListener("click", async (e) => {
    // Prevent default event when link is clicked
    e.preventDefault();
    // Save the href to the form
    urlInput.value = `${window.location.href}`;
    // Get the postcode value
    const postcodeInput = document.getElementById("postcodeInput").value;
    // If no postcode was entered, return an alert to the user
    if (!postcodeInput) {
        return alert("Please enter a postcode.");
    }
    try {
        // Hide postcode section
        postcodeSection.classList.add("d-none");
        // Show loading spinner
        showSpinner();
        // Set max distance
        const maxDistance = 80000;
        // Check postcode is within a valid distance
        const res = await fetch(
            `https://api.getAddress.io/distance/${postcodeInput}/DT117TQ?api-key=dtoken_hEDzcyiWMr04buhQw-OKlmNLrXQfXZD5RqLfTqCWZ1uS4Wwg-IsVaY1eyhADhPZyB5ACEJ89VEYx88eqn9HIYm5Whc0VYvhbcJNtHsNbk5qO4XthDq41jrRpHGh1lHfgk8fGurQB9GrWUYnTbW-3mvT63avurJC5cXlqA88Xrxz3e4IDbyKXExVB_BK289ntCt8Rjb2tuVwvMetEJarCYg`
        );
        // Parse the data
        const data = await res.json();
        // If there is no metres property then return an error
        if (!data.metres) {
            throw new Error(
                "An error occurred. Please try again and make sure your postcode is correct."
            );
        }
        // Check distance is not greater than max amount
        if (data.metres > maxDistance) {
            // Hide loading spinner
            hideSpinner();
            // Show postcode section
            postcodeSection.classList.remove("d-none");
            // Show user alert
            return alert(
                "Your postcode is outside of our normal service area."
            );
        }
        // Hide loading spinner
        hideSpinner();
        // Load the next part of the form
        regSection.classList.remove("d-none");
    } catch (e) {
        // Hide loading spinner
        hideSpinner();
        // Show postcode section
        postcodeSection.classList.remove("d-none");
        // Alert the user with the error message
        return alert(e.message);
    }
});

// When the back button is pressed on the registration section
backToPostcodeBtn.addEventListener("click", (e) => {
    // Hide the registration section
    regSection.classList.add("d-none");
    // Show the postcode section
    postcodeSection.classList.remove("d-none");
});

// When the registration button is pressed
regBtn.addEventListener("click", async (e) => {
    // Prevent default event when link is clicked
    e.preventDefault();
    // Get the registration information
    const regInput = document.getElementById("regInput").value;
    // If no registration was entered...
    if (!regInput) {
        // Alert the user and prompt them to enter a registration
        return alert("Enter your vehicle registration");
    }
    // Hide the registration section of the form
    regSection.classList.add("d-none");
    // Show loading spinner
    showSpinner();
    // Check the registration exists
    const res = await fetch(
        `https://dvlasearch.appspot.com/TyreSearch?apikey=DvlaSearchDemoAccount&licencePlate=${regInput}`
    );
    // Parse the data
    const data = await res.json();
    // If there is an error in the data or it doesn't contain a vehicle make...
    if (data.error || !data.make) {
        // Hide loading spinner
        hideSpinner();
        // Show the registration section
        regSection.classList.remove("d-none");
        // Alert the user that there is an issue with the registration
        return alert("Registration does not exist.");
        // Take them back to the registration section
    }
    // Get the make and model of the vehicle
    vehicleMake.value = data.make;
    vehicleModel.value = data.model;
    // Iterate through the possible sizes only return unique options
    const formattedSizes = formatSize(data.tyreFitments);
    // Update the tyreSizes array
    tyreSizes = removeDuplicates(formattedSizes);
    // Hide the loading spinner
    hideSpinner();
    // Show vehicle confirmation section
    vehicleSection.classList.remove("d-none");
});

// When the user clicks the back button
incorrectVehicleBtn.addEventListener("click", (e) => {
    // Prevent default event when linked is clicked
    e.preventDefault();
    // Show the registration section
    regSection.classList.remove("d-none");
    // Hide the vehicle section
    vehicleSection.classList.add("d-none");
});

// When the user clicks the next button
correctVehicleBtn.addEventListener("click", (e) => {
    // Prevent default event when link is clicked
    e.preventDefault();
    // Remove disabled attribute so that the information is available to the receiver of the form
    vehicleMake.removeAttribute("disabled");
    vehicleModel.removeAttribute("disabled");
    // Clear all the options from the tyre select element
    removeOptions(tyreSizeSelect);
    // Update the tyre size select to show the possible sizes
    for (let size of tyreSizes) {
        tyreSizeSelect.options[tyreSizeSelect.options.length] = new Option(
            size,
            size
        );
    }
    // Add a final option of 'unknown' at the end
    tyreSizeSelect.options[tyreSizeSelect.options.length] = new Option(
        "Not Sure",
        "Unknown"
    );
    // Hide the vehicle section
    vehicleSection.classList.add("d-none");
    // Show the tyre size section
    tyreSizeSection.classList.remove("d-none");
});

// When the user clicks the back button
incorrectSizeBtn.addEventListener("click", (e) => {
    // Prevent default event when link is clicked
    e.preventDefault();
    // Set the make and model inputs to be disabled
    vehicleMake.setAttribute("disabled", true);
    vehicleModel.setAttribute("disabled", true);
    // Show the vehicle section
    vehicleSection.classList.remove("d-none");
    // Hide the tyre size section
    tyreSizeSection.classList.add("d-none");
});

// When the user clicks the next button
correctSizeBtn.addEventListener("click", (e) => {
    // Prevent default event when link is clicked
    e.preventDefault();
    // Hide the tyre size section
    tyreSizeSection.classList.add("d-none");
    // Show the contact section
    contactSection.classList.remove("d-none");
});

// If the user wants to go back to the registration section
backToSizeBtn.addEventListener("click", (e) => {
    // Prevent default event when link is clicked
    e.preventDefault();
    // Show the tyre size section
    tyreSizeSection.classList.remove("d-none");
    // Hide the postcode section
    contactSection.classList.add("d-none");
});
