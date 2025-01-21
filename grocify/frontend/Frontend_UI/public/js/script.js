document.addEventListener('DOMContentLoaded', function () {
    // Initialize Materialize components
    M.FormSelect.init(document.querySelectorAll('select'));

    const paymentType = document.getElementById('paymentType');
    const cardFields = document.querySelectorAll('.card-fields');
    const paypalField = document.getElementById('paypalField');
    const cardLogo = document.getElementById('cardLogo');
    const cardPreviewNumber = document.querySelector('.card-preview .card-number');
    const cardPreviewExpiry = document.querySelector('.card-preview .card-expiry');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');

    // Payment Type Change Event
    paymentType.addEventListener('change', () => {
        if (paymentType.value === 'paypal') {
            // Hide card-related fields and show PayPal email field
            cardFields.forEach(field => field.style.display = 'none');
            cardLogo.style.display = 'none';
            cardPreviewNumber.textContent = '**** **** **** ****';
            cardPreviewExpiry.textContent = 'MM/YY';
            paypalField.style.display = 'block';
        } else {
            // Show card-related fields and hide PayPal email field
            cardFields.forEach(field => field.style.display = 'block');
            paypalField.style.display = 'none';
        }
    });

    // Card Type Detection and Dynamic Logo
    cardNumberInput.addEventListener('input', () => {
        const value = cardNumberInput.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        cardNumberInput.value = value.match(/.{1,4}/g)?.join(' ') || value;

        // Update card number preview
        cardPreviewNumber.textContent = cardNumberInput.value.padEnd(19, '*');

        // Detect card type
        if (value.startsWith('4')) {
            cardLogo.src = 'images/Visa.png';
            cardLogo.style.display = 'block';
        } else if (value.startsWith('5')) {
            cardLogo.src = 'images/Mastercard.png';
            cardLogo.style.display = 'block';
        } else if (value.startsWith('3')) {
            cardLogo.src = 'images/American_express.png';
            cardLogo.style.display = 'block';
        } else if (value.startsWith('6')) {
            cardLogo.src = 'images/Diners_Club.png';
            cardLogo.style.display = 'block';
        } else {
            cardLogo.style.display = 'none';
        }
    });

    // Expiry Date Formatting
    expiryDateInput.addEventListener('input', () => {
        let value = expiryDateInput.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2, 4);
        expiryDateInput.value = value;

        // Update expiry date preview
        cardPreviewExpiry.textContent = value || 'MM/YY';
    });

    // Form Submission
    document.getElementById('paymentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const paymentTypeValue = paymentType.value;
        if (paymentTypeValue === 'paypal') {
            alert(`PayPal Email: ${document.getElementById('paypalEmail').value} added successfully!`);
        } else {
            alert('Payment method added successfully!');
        }
    });
});
