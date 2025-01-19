// Function used in login.html

// Login Form
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (response.ok) {
            alert('Login successful!');
            window.location.href = 'dashboard.html';
        } else {
            alert(result.error || 'Login failed!');
        }
    } catch (error) {
        alert('Error connecting to the server. Please try again later.');
    }
});