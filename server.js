const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const interventionsRoutes = require('./routes/interventions');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', interventionsRoutes);

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
