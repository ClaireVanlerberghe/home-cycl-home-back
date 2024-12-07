const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModule = require('../modules/auth');
require('dotenv').config()
const { verifyToken } = require('../utils/jwt');

const router = express.Router();

// Clé secrète pour signer les tokens JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Route : Inscription
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await authModule.findUserByEmail(email);
    if (user) return res.status(400).send('Cet utilisateur existe déjà.');

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashPassword', hashedPassword)

    const userId = await authModule.createUser(name, email, hashedPassword);
    res.status(201).send({ message: 'Utilisateur créé avec succès', userId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route : Connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      console.log("req.Body", req.body);
  
      // Récupération de l'utilisateur
      const user = await authModule.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }
  
      console.log("Utilisateur trouvé:", user);
  
      // Comparaison des mots de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }
  
      // Génération du token JWT
      const token = jwt.sign(
        { userId: user.Id_user, role: user.Id_role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      return res.status(200).json({ token, user: { id: user.Id_user, email: user.email } });
  
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      return res.status(500).json({ message: "Erreur interne" });
    }
  });

// Route : Test des tokens protégés
router.get('/profile', verifyToken, (req, res) => {
  res.send({ message: 'Accès autorisé', user: req.user });
});

module.exports = router;
