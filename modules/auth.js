const db = require('../db');

module.exports = {
    findUserByEmail: async (email) => {
        try {
  
          const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
          // Vérifiez si les résultats existent et s'ils ne sont pas vides
          if (!users || users.length === 0) {
            return null; // Retourne null si aucun utilisateur n'est trouvé
          }
          
          // Retourne le premier utilisateur trouvé
          return users[0];
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'utilisateur :', error);
          throw error; // Propage l'erreur vers le gestionnaire d'erreurs
        }
      },

    // revoir les params pour la création d'un users
  createUser: async (name, email, hashedPassword) => {
    const [result] = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
    return result.insertId;
  }
};
