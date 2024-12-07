const express = require('express');
const router = express.Router();
const db = require('../db');
const queries = require('../modules/interventions');

// Route pour obtenir tous les utilisateurs
router.get('/interventions', async (req, res) => {
  try {
    const [rows] = await db.query(queries.queryGetAllInterventions);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur interne');
  }
});


module.exports = router;
