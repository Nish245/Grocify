document.addEventListener('DOMContentLoaded', async function () {
    const cardsList = document.getElementById('cardsList');
    const bankAccountsList = document.getElementById('bankAccountsList');

    const userId = '12345'; // Replace with the actual user ID

    // Fetch Saved Cards
    try {
        const response = await fetch(`http://localhost:3000/api/payment-methods/${userId}`);
        if (response.ok) {
            const savedCards = await response.json();
            if (savedCards.length > 0) {
                savedCards.forEach(card => {
                    const li = document.createElement('li');
                    li.classList.add('collection-item');
                    li.innerHTML = `
                        <span><b>${card.cardNickname || 'Unnamed Card'}</b> (${card.paymentType.toUpperCase()})</span>
                        <p>Card Number: **** **** **** ${card.cardDetails.cardNumber.slice(-4)}</p>
                        <p>Expiry Date: ${card.cardDetails.expiryDate}</p>
                        <button class="btn red lighten-1" onclick="deleteCard('${card._id}')">Remove</button>
                    `;
                    cardsList.appendChild(li);
                });
            } else {
                cardsList.innerHTML = '<li class="collection-item">No saved cards found.</li>';
            }
        } else {
            cardsList.innerHTML = '<li class="collection-item">Error loading saved cards.</li>';
        }
    } catch (err) {
        console.error('Error fetching saved cards:', err);
        cardsList.innerHTML = '<li class="collection-item">Error loading saved cards.</li>';
    }

    // Fetch Saved Bank Accounts
    try {
        const response = await fetch(`http://localhost:3000/api/bank-accounts/${userId}`);
        if (response.ok) {
            const savedAccounts = await response.json();
            if (savedAccounts.length > 0) {
                savedAccounts.forEach(account => {
                    const li = document.createElement('li');
                    li.classList.add('collection-item');
                    li.innerHTML = `
                        <span><b>${account.accountHolderName}</b></span>
                        <p>BSB: ${account.bsb}</p>
                        <p>Account Number: ****${account.accountNumber.slice(-4)}</p>
                        <p>Bank Name: ${account.bankName}</p>
                        <button class="btn red lighten-1" onclick="deleteBankAccount('${account._id}')">Remove</button>
                    `;
                    bankAccountsList.appendChild(li);
                });
            } else {
                bankAccountsList.innerHTML = '<li class="collection-item">No saved bank accounts found.</li>';
            }
        } else {
            bankAccountsList.innerHTML = '<li class="collection-item">Error loading saved bank accounts.</li>';
        }
    } catch (err) {
        console.error('Error fetching saved bank accounts:', err);
        bankAccountsList.innerHTML = '<li class="collection-item">Error loading saved bank accounts.</li>';
    }
});

// Delete Card Function
async function deleteCard(cardId) {
    try {
        const response = await fetch(`http://localhost:3000/api/payment-methods/${cardId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            alert('Card removed successfully!');
            location.reload();
        } else {
            alert('Failed to remove card.');
        }
    } catch (err) {
        console.error('Error removing card:', err);
        alert('An error occurred. Please try again.');
    }
}

// Delete Bank Account Function
async function deleteBankAccount(accountId) {
    try {
        const response = await fetch(`http://localhost:3000/api/bank-accounts/${accountId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            alert('Bank account removed successfully!');
            location.reload();
        } else {
            alert('Failed to remove bank account.');
        }
    } catch (err) {
        console.error('Error removing bank account:', err);
        alert('An error occurred. Please try again.');
    }
}
