const axios = require('axios');

async function initializeTransaction(email, reference, amount) {
  const url = 'https://api.paystack.co/transaction/initialize';
  const secretKey =  process.env.PAYSTACK_KEY;
  const headers = {
    Authorization: `Bearer ${secretKey}`,
    'Content-Type': 'application/json',
  };
  const data = {
    email,
    reference,
    amount
  };

  try {
    const response = await axios.post(url, data, { headers });
    //console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', /*error.response ? error.response.data : */error.message);
    //throw error;
  }
}

// Usage
module.exports = {
  initializeTransaction
};
