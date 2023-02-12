// Save URL href to the form
const urlInput = document.getElementById("urlInput");
urlInput.value = window.location.href;

// Find all elements with the class 'next-btn' and return them as an array
const nextBtns = document.querySelectorAll(".next-btn");

// Apply an event listener to each element that has the class of next-btn
nextBtns.forEach((el) => {
    el.addEventListener('click', (event) => {
        event.preventDefault();
        // Return containing div
        const currentDiv = el.parentElement.parentElement.parentElement;
        // Return next div
        const nextDiv = currentDiv.nextElementSibling;
        // Hide div
        currentDiv.classList.add('d-none');
        // Show div
        nextDiv.classList.remove('d-none');
    })
});

// Find all elements with the class 'back-btn' and return them as an array
const backBtns = document.querySelectorAll(".back-btn");

// Apply an event listener to each element that has the class of back-btn
backBtns.forEach((el) => {
    el.addEventListener("click", (event) => {
        event.preventDefault();
        // Return containing div
        const currentDiv = el.parentElement.parentElement.parentElement;
        // Return the previous div
        const previousDiv = currentDiv.previousElementSibling;
        // Hide div
        currentDiv.classList.add('d-none');
        // Show div
        previousDiv.classList.remove('d-none');
    })
})
