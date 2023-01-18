const spinner = document.getElementById("spinner");
const regSection = document.getElementById("regSection");
const regBtn = document.getElementById("regBtn");
const postcodeSection = document.getElementById("postcodeSection");
const postcodeBtn = document.getElementById("postcodeBtn");
const vehicleSection = document.getElementById("vehicleSection");
const vehicleMake = document.getElementById("vehicleMake")
const vehicleModel = document.getElementById("vehicleModel")
const tyreSizeSelect = document.getElementById("tyreSizeSelect")
const correctBtn = document.getElementById("correctBtn");
const incorrectBtn = document.getElementById("incorrectBtn");
const backToRegBtn = document.getElementById("backToRegBtn");
const contactSection = document.getElementById("contactSection");
const backToPostcodeBtn = document.getElementById("backToPostcodeBtn");
const submitBtn = document.getElementById("submitBtn");

// Remove all the options from a select element
function removeOptions(selectElement) {
   let i, L = selectElement.options.length - 1;
   for(i = L; i >= 0; i--) {
      selectElement.remove(i);
   }
}

function formatSize(tyreSizes) {
    // Create empty array
    let result = [];
    // Take an array of tyre sizes
    tyreSizes.forEach((size) => {
        // Convert them from format "225/45R17 94W" to format "225/45R17"
        const newSize = size.slice(0,9)
        result.push(newSize)
    })
    
    return result;
}

function removeDuplicates(tyreSizes) {
    let result = [];
    tyreSizes.forEach((size, index) => {
        if (tyreSizes.indexOf(size) == index) result.push(size)
    })
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
        const res = await fetch(`https://dvlasearch.appspot.com/TyreSearch?apikey=DvlaSearchDemoAccount&licencePlate=${regInput}`)
        // Parse the data
        const data = await res.json()
        // If there is an error in the data or it doesn't contain a vehicle make...
        if (data.error || !data.make) {
            // Alert the user that there is an issue with the registration
            alert("Registration does not exist.")
            hideSpinner();
            // Take them back to the registration section
            regSection.classList.remove("d-none")
        } else {
            // Get the make and model of the vehicle
            vehicleMake.value=data.make
            vehicleModel.value=data.model
            // Prevent the user from modifying this information
            vehicleMake.toggleAttribute("disabled")
            vehicleModel.toggleAttribute("disabled")
            // Clear the tyre size select options
            removeOptions(tyreSizeSelect)
            tyreSizeSelect.options[tyreSizeSelect.options.length] = new Option("Select Tyre Size", "0")
            // Iterate through the possible sizes only return unique options
            const formattedSizes = formatSize(data.tyreFitments);
            const uniqueSizes = removeDuplicates(formattedSizes);
            // Update the tyre size select to show the possible sizes
            for (let size of uniqueSizes) {
                tyreSizeSelect.options[tyreSizeSelect.options.length] =  new Option(size, size)
            }
            // Add a final option of 'unknown' at the end
            tyreSizeSelect.options[tyreSizeSelect.options.length] = new Option("I don't know", "unknown")
            hideSpinner();
            vehicleSection.classList.remove("d-none")
        }
    }
});

incorrectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    regSection.classList.remove("d-none");
    vehicleSection.classList.add("d-none");
    vehicleMake.toggleAttribute("disabled")
    vehicleModel.toggleAttribute("disabled")
})

correctBtn.addEventListener("click", (e) => {
    e.preventDefault();
    vehicleMake.toggleAttribute("disabled")
    vehicleModel.toggleAttribute("disabled")
    vehicleSection.classList.add("d-none");
    postcodeSection.classList.remove("d-none")
    postcodeInput.focus();
})

backToRegBtn.addEventListener("click", (e) => {
    e.preventDefault();
    regSection.classList.remove("d-none");
    postcodeSection.classList.add("d-none");
});

postcodeBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const postcodeInput = document.getElementById("postcodeInput").value;
    if (!postcodeInput) {
        alert("Enter your postcode");
    } else {
        postcodeSection.classList.add("d-none");
        contactSection.classList.remove("d-none")
        // postcodeSection.classList.add("d-none");
        // showSpinner();
        // const res = await fetch(`https://api.getAddress.io/distance/${postcodeInput}/DT117TQ?api-key=`)
        // const data = await res.json();
        // if (res.status !== 200 ) {
        //     hideSpinner();
        //     alert("Postcode does not exist.")
        //     postcodeSection.classList.remove("d-none")
        // } else if (data.metres > 81000) {
        //     alert("Your postcode is outside of our normal service area.")
        //     hideSpinner();
        //     postcodeSection.classList.remove("d-none")
        // } else {
        //     hideSpinner();
        //     contactSection.classList.remove('d-none')
        // }
    }
});

backToPostcodeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    postcodeSection.classList.remove("d-none");
    contactSection.classList.add("d-none");
});

