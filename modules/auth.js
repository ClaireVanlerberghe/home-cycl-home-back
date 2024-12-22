const db = require('../db');

module.exports = {
  findUserByEmail: async (email) => {
      try {

        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  
        if (!users || users.length === 0) {
          return null;
        }
        
        return users[0];
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        throw error;
      }
    },

    
  createUser: async (email, firstName, lastName, address, phone, hashedPassword) => {
    const [result] = await db.query('INSERT INTO users (email, firstName, lastName, address, phone, password) VALUES (?, ?, ?, ?, ?, ?)', [email, firstName, lastName, address, phone, hashedPassword]);
    return result.insertId;
  },


  updateAddress: async (address, email) => {
    const [result] = await db.query("UPDATE 'users' SET 'address' = ? WHERE 'users'.'Id_user' = ?", [address, email])
  }
};
