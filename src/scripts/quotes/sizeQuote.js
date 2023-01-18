// Variables
const spinner = document.getElementById("spinner");
const urlInput = document.getElementById("urlInput")
const regSection = document.getElementById("regSection");
const regBtn = document.getElementById("regBtn");
const postcodeSection = document.getElementById("postcodeSection");
const postcodeBtn = document.getElementById("postcodeBtn");
const vehicleSection = document.getElementById("vehicleSection");
const vehicleMake = document.getElementById("vehicleMake");
const vehicleModel = document.getElementById("vehicleModel");
const tyreSizeSelect = document.getElementById("tyreSizeSelect");
const correctBtn = document.getElementById("correctBtn");
const incorrectBtn = document.getElementById("incorrectBtn");
const backToRegBtn = document.getElementById("backToRegBtn");
const contactSection = document.getElementById("contactSection");
const backToPostcodeBtn = document.getElementById("backToPostcodeBtn");
const submitBtn = document.getElementById("submitBtn");

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

// When the registration button is pressed...
regBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    // Save the href to the form
    urlInput.value = `${window.location.href}${window.location.search}`;
    // Get the registration information
    const regInput = document.getElementById("regInput").value;
    // If no registration was entered...
    if (!regInput) {
        // Alert the user and prompt them to enter a registration
        alert("Enter your vehicle registration");
    } else {
        // Hide the registration section of the form
        regSection.classList.add("d-none");
        showSpinner();
        // Check the registration exists
        const res = await fetch(
            `https://dvlasearch.appspot.com/TyreSearch?apikey=DvlaSearchDemoAccount&licencePlate=${regInput}`
        );
        // Parse the data
        const data = await res.json();
        // If there is an error in the data or it doesn't contain a vehicle make...
        if (data.error || !data.make) {
            // Alert the user that there is an issue with the registration
            alert("Registration does not exist.");
            hideSpinner();
            // Take them back to the registration section
            regSection.classList.remove("d-none");
        } else {
            // Get the make and model of the vehicle
            vehicleMake.value = data.make;
            vehicleModel.value = data.model;
            // Prevent the user from modifying this information
            vehicleMake.disabled = true;
            vehicleModel.disabled = true;
            // Clear the tyre size select options
            removeOptions(tyreSizeSelect);
            tyreSizeSelect.options[tyreSizeSelect.options.length] = new Option(
                "Select Tyre Size",
                "0"
            );
            // Iterate through the possible sizes only return unique options
            const formattedSizes = formatSize(data.tyreFitments);
            const uniqueSizes = removeDuplicates(formattedSizes);
            // Update the tyre size select to show the possible sizes
            for (let size of uniqueSizes) {
                tyreSizeSelect.options[tyreSizeSelect.options.length] =
                    new Option(size, size);
            }
            // Add a final option of 'unknown' at the end
            tyreSizeSelect.options[tyreSizeSelect.options.length] = new Option(
                "Not listed / I don't know",
                "Unknown"
            );
            // Prevent the user from pressing the next button until they select a tyre size option
            correctBtn.classList.add("disabled");
            hideSpinner();
            // Show vehicle confirmation section
            vehicleSection.classList.remove("d-none");
        }
    }
});

// When the user selects an option...
tyreSizeSelect.addEventListener("change", (e) => {
    // Check it isn't the 'Select Tyre Size' option
    if (tyreSizeSelect.value == "0") {
        // If it is, apply the disabled class to the button
        correctBtn.classList.add("disabled")
    } else {
        // If not, then allow them to move on.
        correctBtn.classList.remove("disabled")
    }
})

// When the user clicks the back button
incorrectBtn.addEventListener("click", (e) => {
    e.preventDefault()
    // Show the registration section
    regSection.classList.remove("d-none");
    // Hide the vehicle section
    vehicleSection.classList.add("d-none");
    // Remove the disabled class from the select elements
    vehicleMake.disabled = false;
    vehicleModel.disabled = false;
});

// When the user clicks the next button
correctBtn.addEventListener("click", (e) => {
    e.preventDefault()
    // Remove the disabled class from the select elements
    vehicleMake.disabled = false;
    vehicleModel.disabled = false;
    // Hide the vehicle section
    vehicleSection.classList.add("d-none");
    // Show the postcode section
    postcodeSection.classList.remove("d-none");
});

// If the user wants to go back to the registration section
backToRegBtn.addEventListener("click", (e) => {
    e.preventDefault()
    // Show the registration section
    regSection.classList.remove("d-none");
    // Hide the postcode section
    postcodeSection.classList.add("d-none");
});

// If the user has submitted a postcode...
postcodeBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    // Get the data they have entered
    const postcodeInput = document.getElementById("postcodeInput").value;
    // Check it's not empty
    if (!postcodeInput) {
        alert("Enter your postcode");
    } else {
        // Hide the postcode section
        postcodeSection.classList.add("d-none");
        // Show the contact section
        contactSection.classList.remove("d-none");
    }
});

// If the user wants to go back to the postcode section
backToPostcodeBtn.addEventListener("click", (e) => {
    e.preventDefault()
    // Show the postcode section
    postcodeSection.classList.remove("d-none");
    // Hide the contact section
    contactSection.classList.add("d-none");
});
