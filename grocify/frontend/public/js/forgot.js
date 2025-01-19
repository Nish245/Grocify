// Function used in Forgot Password Page
     // Forgot Password Script
     const form = document.getElementById('forgot-password-form');
     const emailInput = document.getElementById('email');
     const messageDiv = document.getElementById('message');

     // Handle form submission
     form.addEventListener('submit', (event) => {
     event.preventDefault(); // Prevent form submission

     const email = emailInput.value;

     if (validateEmail(email)) {
         // Simulate sending a reset email
         messageDiv.innerHTML = `<span class="green-text">A reset link has been sent to <b>${email}</b>.</span>`;
         emailInput.value = ""; // Clear the input field
         console.log(`Reset link sent to: ${email}`);
     } else {
         messageDiv.innerHTML = `<span class="red-text">Please enter a valid email address.</span>`;
     }

     });

     // Validate email format
     function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
     }