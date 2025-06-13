const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  nom: String,
  prenom: String,
  societe: String,
  adresse: String,
  tel: String,
  email: String,
  secteur: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Contact', contactSchema); 