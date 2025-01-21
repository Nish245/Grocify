const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// Payment Method Schema
const PaymentMethodSchema = new mongoose.Schema({
    userId: String,
    paymentType: String, // 'credit', 'debit', 'paypal'
    cardDetails: {
        cardNumber: String,
        expiryDate: String,
        cvv: String,
    },
    cardNickname: String,
    isDefault: Boolean,
}, { timestamps: true });

const PaymentMethod = mongoose.model('PaymentMethod', PaymentMethodSchema);

// Bank Account Schema
const BankAccountSchema = new mongoose.Schema({
    userId: String,
    accountHolderName: String,
    accountNumber: String,
    ifscCode: String,
    bankName: String,
    isDefault: Boolean,
}, { timestamps: true });

const BankAccount = mongoose.model('BankAccount', BankAccountSchema);

// Routes for Payment Methods
app.post('/api/payment-methods', async (req, res) => {
    try {
        const newMethod = new PaymentMethod(req.body);
        await newMethod.save();
        res.status(201).json({ message: 'Payment method added successfully!' });
    } catch (err) {
        console.error('Error adding payment method:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/payment-methods/:userId', async (req, res) => {
    try {
        const methods = await PaymentMethod.find({ userId: req.params.userId });
        res.status(200).json(methods);
    } catch (err) {
        console.error('Error fetching payment methods:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/payment-methods/:id', async (req, res) => {
    try {
        await PaymentMethod.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Payment method removed successfully!' });
    } catch (err) {
        console.error('Error deleting payment method:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Routes for Bank Accounts
app.post('/api/bank-accounts', async (req, res) => {
    try {
        const newAccount = new BankAccount(req.body);
        await newAccount.save();
        res.status(201).json({ message: 'Bank account added successfully!' });
    } catch (err) {
        console.error('Error adding bank account:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/bank-accounts/:userId', async (req, res) => {
    try {
        const accounts = await BankAccount.find({ userId: req.params.userId });
        res.status(200).json(accounts);
    } catch (err) {
        console.error('Error fetching bank accounts:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/bank-accounts/:id', async (req, res) => {
    try {
        await BankAccount.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Bank account removed successfully!' });
    } catch (err) {
        console.error('Error deleting bank account:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
