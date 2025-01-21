document.addEventListener('DOMContentLoaded', function () {
    // Initialize Materialize components
    M.FormSelect.init(document.querySelectorAll('select'));

    const bankAccountForm = document.getElementById('bankAccountForm');
    const bsbInput = document.getElementById('bsb');
    const bankNameInput = document.getElementById('bankName');

    // BSB to Bank Mapping
    const bsbBankMap = {
        '062': 'Commonwealth Bank of Australia',
        '063': 'National Australia Bank',
        '082': 'Bank of Queensland',
        '032': 'Westpac Banking Corporation',
        '013': 'ANZ Banking Group',
        '091': 'Macquarie Bank',
        '805': 'ING Australia',
        '082': 'Suncorp Bank',
        // Add more as needed
    };

    // Recognize Bank Name from BSB
    bsbInput.addEventListener('input', () => {
        const bsb = bsbInput.value.trim();
        if (bsb.length === 6) {
            const bankName = bsbBankMap[bsb.slice(0, 3)];
            if (bankName) {
                bankNameInput.value = bankName;
                bankNameInput.classList.add('valid');
            } else {
                bankNameInput.value = 'Unknown Bank';
                bankNameInput.classList.add('invalid');
            }
        } else {
            bankNameInput.value = '';
            bankNameInput.classList.remove('valid', 'invalid');
        }
    });

    // Form Submission
    bankAccountForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const accountHolderName = document.getElementById('accountHolderName').value.trim();
        const bsb = document.getElementById('bsb').value.trim();
        const accountNumber = document.getElementById('accountNumber').value.trim();
        const bankName = document.getElementById('bankName').value.trim();
        const defaultBank = document.getElementById('defaultBank').checked;

        if (!/^\d{6}$/.test(bsb)) {
            alert('Invalid BSB. Please enter a 6-digit BSB.');
            return;
        }

        if (!/^\d{5,10}$/.test(accountNumber)) {
            alert('Invalid Account Number. Please enter 5-10 digits.');
            return;
        }

        const bankData = {
            accountHolderName,
            bsb,
            accountNumber,
            bankName,
            isDefault: defaultBank,
            userId: '12345', // Replace with the actual user ID
        };

        try {
            const response = await fetch('http://localhost:3000/api/bank-accounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bankData),
            });

            if (response.ok) {
                alert('Bank account added successfully!');
                bankAccountForm.reset();
            } else {
                alert('Failed to add bank account.');
            }
        } catch (err) {
            console.error('Error adding bank account:', err);
            alert('An error occurred. Please try again.');
        }
    });
});
