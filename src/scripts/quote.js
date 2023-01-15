const spinner = document.getElementById("spinner");
const regSection = document.getElementById("regSection");
const postcodeSection = document.getElementById("postcodeSection");
const regBtn = document.getElementById("regBtn");
const backToRegBtn = document.getElementById("backToRegBtn");
const postcodeBtn = document.getElementById("postcodeBtn");
const backToPostcodeBtn = document.getElementById("backToPostcodeBtn");
const contactSection = document.getElementById("contactSection");
const submitBtn = document.getElementById("submitBtn");
function showSpinner() {
    spinner.classList.remove("d-none");
}

function hideSpinner() {
    spinner.classList.add("d-none");
}

regBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const regInput = document.getElementById("regInput").value;
    if (!regInput) {
        alert("Enter your vehicle registration or tyre size");
    } else {
        regSection.classList.add("d-none");
        showSpinner();
        setTimeout(function () {
            hideSpinner(), postcodeSection.classList.remove("d-none");
        }, 1000);
    }
});

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
