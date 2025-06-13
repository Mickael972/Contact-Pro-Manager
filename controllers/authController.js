const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('connection', { error: 'Email ou mot de passe incorrect' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('connection', { error: 'Email ou mot de passe incorrect' });
    }
    req.session.userId = user._id;
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('connection', { error: 'Erreur lors de la connexion' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
}; 