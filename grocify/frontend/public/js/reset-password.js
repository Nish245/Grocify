document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const tokenInput = document.getElementById('token');
    if (tokenInput) {
        tokenInput.value = token;
    }

    const form = document.getElementById('reset-password-form');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const messageDiv = document.getElementById('reset-password-message');

    // Function to validate password
    function isValidPassword(password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const newPassword = newPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            // Validate password length
            if (newPassword.length < 8) {
                messageDiv.textContent = 'Password must be at least 8 characters long';
                messageDiv.className = 'error';
                return;
            }

            // Validate password strength
            if (!isValidPassword(newPassword)) {
                messageDiv.textContent = 'Password must contain at least one letter, one number, and one special character';
                messageDiv.className = 'error';
                return;
            }

            // Validate password match
            if (newPassword !== confirmPassword) {
                messageDiv.textContent = 'Passwords do not match';
                messageDiv.className = 'error';
                return;
            }

            try {
                const response = await fetch('http://localhost:4000/api/user/resetPassword', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token, newPassword })
                });

                const result = await response.json();
                if (response.ok) {
                    messageDiv.textContent = 'Password reset successfully';
                    messageDiv.className = 'success';
                } else {
                    messageDiv.textContent = result.error;
                    messageDiv.className = 'error';
                }
            } catch (error) {
                messageDiv.textContent = 'An error occurred. Please try again later.';
                messageDiv.className = 'error';
            }
        });
    }
});