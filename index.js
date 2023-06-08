const bodyParser = require('body-parser');
const twilio = require('twilio');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const accountSid = 'ACca6ad5ddc85bc3e89dbf60d1cdac693a';
const authToken = 'fa3085868cac4b3351fe4dd4a1d34abc';
const client = new twilio(accountSid, authToken);

app.get('/status', (req, res) => {
  res.send('Server is running on Vercel');
});

app.post('/send-sms', async (req, res) => {
  const { numero } = req.body;

  console.log('Request body:', req.body);

  try {
    const message = await client.messages.create({
      body: 'teste',
      from: '+13203773783',
      to: numero,
    });

    console.log('Twilio response:', message);
    res.status(200).send(message.sid);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(error.message);
  }
});

module.exports = app;
