const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simular um banco de dados em memória
const locations = [];

// Rota para adicionar nova localização
app.post('/api/location', (req, res) => {
  const { latitude, longitude } = req.body;

  // Criar nova entrada de localização
  const newLocation = {
    id: locations.length + 1,
    latitude,
    longitude,
    timestamp: new Date(),
  };

  locations.push(newLocation);

  res.status(201).json({ message: 'Localização salva com sucesso!', location: newLocation });
});

// Rota para obter todas as localizações
app.get('/api/locations', (req, res) => {
  res.json(locations);
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
