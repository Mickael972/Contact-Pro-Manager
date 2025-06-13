const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const ensureAuthenticated = require('../middlewares/authMiddleware');

// Routes pour la gestion des contacts
router.get('/', ensureAuthenticated, contactController.listContacts);
router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('add-item', { error: null });
});
router.post('/add', ensureAuthenticated, contactController.addContact);
router.get('/view/:id', ensureAuthenticated, contactController.getContact);
router.get('/edit/:id', ensureAuthenticated, contactController.getContactForEdit);
router.post('/edit/:id', ensureAuthenticated, contactController.editContact);
router.post('/delete/:id', ensureAuthenticated, contactController.deleteContact);
router.get('/test', (req, res) => {
  res.send('Route test OK');
});

module.exports = router; 