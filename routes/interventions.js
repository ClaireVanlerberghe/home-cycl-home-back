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

router.get('/interventions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await db.query(queries.queryGetInterventionById, [id]);
    if (data.length === 0) {
      return res.status(404).send('Intervention introuvable');
    }
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur interne une intervention');
  }
});


module.exports = router;
