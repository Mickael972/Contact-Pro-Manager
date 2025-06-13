const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nom: String,
  prenom: String,
  email: { type: String, unique: true },
  password: String,
  contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }]
});

module.exports = mongoose.model('User', userSchema); 