const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET; 

module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token manquant.');

    try {
      const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
      req.user = decoded; // Ajoutez les infos utilisateur dans la requête
      next();
    } catch (error) {
      res.status(401).send('Token invalide ou expiré.');
    }
  }
};
