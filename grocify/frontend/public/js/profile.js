// Function used in profile.html

// Handle Profile Picture Upload
    document.getElementById('upload-picture').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
        document.getElementById('profile-img').src = e.target.result; // Preview the image
        };
        reader.readAsDataURL(file);
    }
    });

    // Handle Personal Information Update
    document.getElementById('update-info-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        console.log(`Updated Info: Name: ${name}, Email: ${email}, Phone: ${phone}`);
        alert('Your information has been updated successfully!');
    });

    // Handle Password Change
    document.getElementById('change-password-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const currentPassword = document.getElementById('current-password').value.trim();
        const newPassword = document.getElementById('new-password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        if (newPassword === confirmPassword) {
            console.log(`Password Changed! Current: ${currentPassword}, New: ${newPassword}`);
            alert('Your password has been changed successfully!');
        } else {
            alert('New password and confirmation do not match.');
        }
    });