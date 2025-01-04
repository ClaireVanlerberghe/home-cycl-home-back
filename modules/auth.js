const db = require('../db');

module.exports = {
  findUserByEmail: async (emailInput) => {
    try {
      
      const email = typeof emailInput === 'object' && emailInput !== null ? emailInput.email : emailInput;
  
      if (!email || typeof email !== 'string') {
        throw new Error("L'email doit être une chaîne valide");
      }
  
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

    
  createUser: async (email, firstName, lastName, address, phone, hashedPassword, latitude, longitude, Id_role) => {
    const [result] = await db.query('INSERT INTO users (email, firstName, lastName, address, phone, password, latitude, longitude, Id_role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [email, firstName, lastName, address, phone, hashedPassword, latitude, longitude, Id_role]);
    return result.insertId;
  },


  updateLastName: async (lastName, email) => {
    const [result] = await db.query("UPDATE users SET lastName = ? WHERE email = ?", [lastName, email])
  },


  updateFirstName: async (firstName, email) => {
    const [result] = await db.query("UPDATE users SET firstName = ? WHERE email = ?", [firstName, email])
  },


  updateEmail: async (newEmail, email) => {
    const [result] = await db.query("UPDATE users SET email = ? WHERE email = ?", [newEmail, email])
  },


  updateAddress: async (address, email) => {
    const [result] = await db.query("UPDATE users SET address = ? WHERE email = ?", [address, email])
  },


  updatePhone: async (phone, email) => {
    const [result] = await db.query("UPDATE users SET phone = ? WHERE email = ?", [phone, email])
  },


};
