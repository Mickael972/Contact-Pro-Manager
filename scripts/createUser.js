const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Connexion à MongoDB
mongoose.connect('mongodb+srv://madallstar:mada@cluster0.epg1udi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connexion à MongoDB établie');
}).catch(err => {
  console.error('Erreur de connexion à MongoDB:', err);
});

// Créer un utilisateur
async function createUser() {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({
      nom: 'John',
      prenom: 'Doe',
      email: 'john.doe@example.com',
      password: hashedPassword
    });
    await user.save();
    console.log('Utilisateur créé avec succès');
  } catch (err) {
    console.error('Erreur lors de la création de l\'utilisateur:', err);
  } finally {
    mongoose.disconnect();
  }
}

createUser(); 