const express = require('express');
const router = express.Router();
const db = require('../db');
const queries = require('../modules/area');

router.use((req, res, next) => {
    console.log('Requête reçue pour /create-area:', req.method, req.originalUrl);
    next();
  });
  

router.post('/create-area', async (req, res) => {
    console.log('params ? ', req.body)
  const { latitude, longitude, rayon, Id_user } = req.body;
  
  try {
    const [data] = await db.query(queries.queryCreateArea, [latitude, longitude, rayon, Id_user]);
    if (data.length === 0) {
      return res.status(404).send('Creation failed');
    }
    console.log('data area', data)
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur interne lors de la creation');
  }
});




module.exports = router;
