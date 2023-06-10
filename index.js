const bodyParser = require('body-parser');
const twilio = require('twilio');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

// Adicionando o cabeçalho Access-Control-Allow-Origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://pag-doar.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Add the new route for the root endpoint here
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Update the origin option in corsOptions to match the origin of your front-end application
const corsOptions = {
  origin: 'https://pag-doar.vercel.app/sms'
};
app.use(cors(corsOptions));

const accountSid = 'ACca6ad5ddc85bc3e89dbf60d1cdac693a';
const authToken = 'fa3085868cac4b3351fe4dd4a1d34abc';
const client = new twilio(accountSid, authToken);

app.get('/status', (req, res) => {
  res.send('Servidor em execução');
});

app.post('/send-sms', async (req, res) => {
  const { numero, mensagem } = req.body;

  console.log('Request body:', req.body);

  try {
    const message = await client.messages.create({
      body: mensagem,
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
