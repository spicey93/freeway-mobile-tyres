const spinner = document.getElementById("spinner");
const regSection = document.getElementById("regSection");
const postcodeSection = document.getElementById("postcodeSection");
const regBtn = document.getElementById("regBtn");
const vehicleSection = document.getElementById("vehicleSection");
const correctBtn = document.getElementById("correctBtn");
const incorrectBtn = document.getElementById("incorrectBtn");
const backToRegBtn = document.getElementById("backToRegBtn");
const postcodeBtn = document.getElementById("postcodeBtn");
const backToPostcodeBtn = document.getElementById("backToPostcodeBtn");
const contactSection = document.getElementById("contactSection");
const submitBtn = document.getElementById("submitBtn");
const vehicleMake = document.getElementById("vehicleMake")
const vehicleModel = document.getElementById("vehicleModel")

function showSpinner() {
    spinner.classList.remove("d-none");
}

function hideSpinner() {
    spinner.classList.add("d-none");
}

regBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const regInput = document.getElementById("regInput").value;
    if (!regInput) {
        alert("Enter your vehicle registration");
    } else {
        regSection.classList.add("d-none");
        showSpinner();
        // Check the registration exists
        const res = await fetch(`https://dvlasearch.appspot.com/TyreSearch?apikey=DvlaSearchDemoAccount&licencePlate=${regInput}`)
        const data = await res.json()
        if (data.error || !data.make) {
            alert("Registration does not exist.")
            hideSpinner();
            regSection.classList.remove("d-none")
        } else {
            vehicleMake.value=data.make
            vehicleModel.value=data.model
            vehicleMake.toggleAttribute("disabled")
            vehicleModel.toggleAttribute("disabled")
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

postcodeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const postcodeInput = document.getElementById("postcodeInput").value;
    if (!postcodeInput) {
        alert("Enter your postcode");
    } else {
        postcodeSection.classList.add("d-none");
        showSpinner();
        setTimeout(function () {
            hideSpinner(), contactSection.classList.remove("d-none");
        }, 1000);
    }
});

backToPostcodeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    postcodeSection.classList.remove("d-none");
    contactSection.classList.add("d-none");
});

submitBtn.addEventListener("click", (e) => {
    const nameInput = document.getElementById("nameInput");
    const telInput = document.getElementById("telInput");
    const emailInput = document.getElementById("emailInput");
    if (!nameInput.value) {
        e.preventDefault();
        alert("Enter your name");
    } else if (!telInput.value) {
        e.preventDefault();
        alert("Enter your phone no.");
    } else if (!emailInput.value) {
        e.preventDefault();
        alert("Enter your email");
    }
});
