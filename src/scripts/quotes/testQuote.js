// Variables
const spinner = document.getElementById("spinner");
const urlInput = document.getElementById("urlInput");
const regSection = document.getElementById("regSection");
const regBtn = document.getElementById("regBtn");
const postcodeSection = document.getElementById("postcodeSection");
const postcodeBtn = document.getElementById("postcodeBtn");
const vehicleSection = document.getElementById("vehicleSection");
const vehicleMake = document.getElementById("vehicleMake");
const vehicleModel = document.getElementById("vehicleModel");
const correctVehicleBtn = document.getElementById("correctVehicleBtn");
const incorrectVehicleBtn = document.getElementById("incorrectVehicleBtn");
const tyreSizeSection = document.getElementById("tyreSizeSection");
const tyreSizeSelect = document.getElementById("tyreSizeSelect");
const correctSizeBtn = document.getElementById("correctSizeBtn");
const incorrectSizeBtn = document.getElementById("incorrectSizeBtn");
// const backToRegBtn = document.getElementById("backToRegBtn");
const backToSizeBtn = document.getElementById("backToSizeBtn");
const contactSection = document.getElementById("contactSection");
const backToPostcodeBtn = document.getElementById("backToPostcodeBtn");
const submitBtn = document.getElementById("submitBtn");
let tyreSizes = [];

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
    urlInput.value = `${window.location.href}`;
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
            // `https://dvlasearch.appspot.com/TyreSearch?apikey=DvlaSearchDemoAccount&licencePlate=${regInput}`
            `https://uk1.ukvehicledata.co.uk/api/datapackage/TyreData?v=2&api_nullitems=1&auth_apikey=61300019-5ea8-423b-ae25-9d5b5baf3d75&key_VRM=${regInput}`
        );
        // Parse the data
        const data = await res.json();
        // If there is an error in the data or it doesn't contain a vehicle make...
        // if (data.error || !data.make) {
        if (data.Response.StatusCode === "KeyInvalid") {
            // Alert the user that there is an issue with the registration
            alert("Registration does not exist.");
            hideSpinner();
            // Take them back to the registration section
            regSection.classList.remove("d-none");
        } else {
            // Get the make and model of the vehicle
            // vehicleMake.value = data.make;
            // vehicleModel.value = data.model;
            vehicleMake.value = data.Response.DataItems.VehicleDetails.Make
            vehicleModel.value = data.Response.DataItems.VehicleDetails.Model
            const records = data.Response.DataItems.TyreDetails.RecordList
            const sizes = []
            for (let record of records) {
                sizes.push(record.Front.Tyre.Size) 
            }
            tyreSizes = sizes
            hideSpinner();
            // Iterate through the possible sizes only return unique options
            // const formattedSizes = formatSize(data.tyreFitments);
            // tyreSizes = removeDuplicates(formattedSizes);
            // Show vehicle confirmation section
            vehicleSection.classList.remove("d-none");
        }
    }
});

// When the user clicks the back button
incorrectVehicleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Show the registration section
    regSection.classList.remove("d-none");
    // Hide the vehicle section
    vehicleSection.classList.add("d-none");
});

// When the user clicks the next button
correctVehicleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    vehicleMake.removeAttribute("disabled");
    vehicleModel.removeAttribute("disabled");
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
        "Not listed / I don't know",
        "Unknown"
    );
    // Hide the vehicle section
    vehicleSection.classList.add("d-none");
    // Show the tyre size section
    tyreSizeSection.classList.remove("d-none");
});

// When the user clicks the back button
incorrectSizeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    vehicleMake.setAttribute("disabled", true);
    vehicleModel.setAttribute("disabled", true);
    // Show the vehicle section
    vehicleSection.classList.remove("d-none");
    // Hide the tyre size section
    tyreSizeSection.classList.add("d-none");
});

// When the user clicks the next button
correctSizeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Hide the tyre size section
    tyreSizeSection.classList.add("d-none");
    // Show the postcode section
    postcodeSection.classList.remove("d-none");
});

// If the user wants to go back to the registration section
backToSizeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Show the registration section
    tyreSizeSection.classList.remove("d-none");
    // Hide the postcode section
    postcodeSection.classList.add("d-none");
});

// If the user has submitted a postcode...
postcodeBtn.addEventListener("click", async (e) => {
    e.preventDefault();
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
    e.preventDefault();
    // Show the postcode section
    postcodeSection.classList.remove("d-none");
    // Hide the contact section
    contactSection.classList.add("d-none");
});
