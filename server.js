const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const interventionsRoutes = require('./routes/interventions');
const areaRoutes = require('./routes/area')

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url} - Query params:`, req.query);
  next();
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api', interventionsRoutes);
app.use('/api/area', areaRoutes)

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
