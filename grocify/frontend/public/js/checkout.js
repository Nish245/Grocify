// Fucntion used in CheckOut Pages
const cardNumberInput = document.getElementById('payment-card-number');
const cardCompanyIcon = document.getElementById('payment-card-company-icon');
const generateRandomButton = document.getElementById('generate-random');

// Card Type Detection
cardNumberInput.addEventListener('input', () => {
  const cardNumber = cardNumberInput.value;
  const cardType = detectCardType(cardNumber);
  updateCardCompanyIcon(cardType);
});

// Generate Random Card Number
generateRandomButton.addEventListener('click', () => {
  const randomCardNumber = generateRandomCard();
  cardNumberInput.value = randomCardNumber;
  const cardType = detectCardType(randomCardNumber);
  updateCardCompanyIcon(cardType);
});

// Detect Card Type Based on First Two Digits
function detectCardType(number) {
  const firstTwoDigits = number.slice(0, 2);

  if (firstTwoDigits >= "40" && firstTwoDigits <= "49") return 'visa';
  if (firstTwoDigits >= "51" && firstTwoDigits <= "55") return 'mastercard';
  if (firstTwoDigits === "34" || firstTwoDigits === "37") return 'amex';
  return 'default';
}

// Update Card Icon Based on Type
function updateCardCompanyIcon(type) {
  cardCompanyIcon.className = `card-company-icon ${type}-icon`;
}

// Generate Random Card Number
function generateRandomCard() {
  const cardPrefixes = ['4111111111111111', '5555555555554444', '378282246310005'];
  return cardPrefixes[Math.floor(Math.random() * cardPrefixes.length)];
}
