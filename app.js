const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Connexion à MongoDB
mongoose.connect('mongodb+srv://madallstar:mada@cluster0.epg1udi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connexion à MongoDB établie');
}).catch(err => {
  console.error('Erreur de connexion à MongoDB:', err);
});

// Configuration des middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuration des sessions
app.use(session({
  secret: 'votre_secret_session',
  resave: false,
  saveUninitialized: false
}));

// Configuration du moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/auth', authRoutes);
app.use('/contacts', contactRoutes);

// Routes de base
app.get('/', (req, res) => {
  res.redirect('/contacts');
});

app.get('/login', (req, res) => {
  res.render('connection', { error: null });
});

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).render('404');
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 