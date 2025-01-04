const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModule = require('../modules/auth');
require('dotenv').config()
const { verifyToken } = require('../utils/jwt');
const req = require('express/lib/request');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Route : Inscription
router.post('/signup', async (req, res) => {
  const { email, firstName, lastName, address, phone, password, latitude, longitude, Id_role } = req.body;

  try {
    const user = await authModule.findUserByEmail(email);
    if (user) {
      return res.status(400).send('Cet utilisateur existe déjà.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashPassword', hashedPassword)

    const userId = await authModule.createUser(email, firstName, lastName, address, phone, hashedPassword, latitude, longitude, Id_role);
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
  
      return res.status(200).json({ token, user: { id: user.Id_user, email: user.email, address: user.address } });
  
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      return res.status(500).json({ message: "Erreur interne" });
    }
  });

// Route : Test des tokens protégés
router.get('/profile', verifyToken, (req, res) => {
  res.send({ message: 'Accès autorisé', user: req.user });
});

// Route : Changement nom du user
router.post('/lastName', async (req, res) => {
  const { lastName, email } = req.body;

  try {
    console.log("req.Body", req.body);

    const newLastName = await authModule.updateLastName(lastName, email);
    res.status(201).send({ message: 'Nom changé avec succès', newLastName });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route : Changement prénom du user
router.post('/firstName', async (req, res) => {
  const { firstName, email } = req.body;

  try {

    const newFirstName = await authModule.updateFirstName(firstName, email);
    res.status(201).send({ message: 'Prénom changé avec succès', newFirstName });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route : Changement email du user
router.post('/email', async (req, res) => {
  const { newEmail, email } = req.body;

  try {

    const newEmailResult = await authModule.updateEmail(newEmail, email);
    res.status(201).send({ message: 'Email changé avec succès', newEmailResult });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route : Changement adresse du user
router.post('/address', async (req, res) => {
  const { address, email } = req.body;

  try {

    const newAddress = await authModule.updateAddress(address, email);
    res.status(201).send({ message: 'Adresse changé avec succès', newAddress });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route : Changement téléphone du user
router.post('/phone', async (req, res) => {
  const { phone, email } = req.body;

  try {

    const newPhone = await authModule.updatePhone(phone, email);
    res.status(201).send({ message: 'Téléphone changé avec succès', newPhone });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route : Récupération utilisateur
router.post('/getUser', async (req, res) => {
  const email = req.body;

  const user = await authModule.findUserByEmail(email)
  if(!user) {
    return res.status(404).json({ message: "Utilisateur introuvable" });
  }
  console.log("Utilisateur trouvé:", user);

  return res.status(200).json({ user })

});


module.exports = router;
