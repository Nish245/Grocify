// Function used in Forgot Password Page
const form = document.getElementById('forgot-password-form');
const emailInput = document.getElementById('email');
const messageDiv = document.getElementById('message');

// Handle form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
   
    const email = emailInput.value;

    if (validateEmail(email)) {
        try {
            // Send the API request to the backend
            const response = await fetch('http://localhost:4000/api/user/forgotPasswordEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const result = await response.json();
            if (response.ok) {
                messageDiv.innerHTML = `<span class="green-text">A reset link has been sent to <b>${email}</b>.</span>`;
                emailInput.value = ""; // Clear the input field
            } else {
                messageDiv.innerHTML = `<span class="red-text">${result.error || 'Failed to send the reset link. Please try again.'}</span>`;
            }
        } catch (error) {
            messageDiv.innerHTML = `<span class="red-text">Error connecting to the server. Please try again later.</span>`;
        }
    } else {
        messageDiv.innerHTML = `<span class="red-text">Please enter a valid email address.</span>`;
    }

});

// Validate email format
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}