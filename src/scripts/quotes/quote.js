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

