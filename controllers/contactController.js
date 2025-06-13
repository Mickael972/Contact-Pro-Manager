const Contact = require('../models/Contact');

exports.listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.session.userId });
    res.render('home', { contacts });
  } catch (err) {
    console.error(err);
    res.render('home', { error: 'Erreur lors de la récupération des contacts' });
  }
};

exports.addContact = async (req, res) => {
  const { nom, prenom, societe, adresse, tel, email, secteur } = req.body;
  try {
    const contact = new Contact({
      nom,
      prenom,
      societe,
      adresse,
      tel,
      email,
      secteur,
      user: req.session.userId
    });
    await contact.save();
    res.redirect('/contacts');
  } catch (err) {
    console.error(err);
    res.render('add-item', { error: 'Erreur lors de l\'ajout du contact' });
  }
};

exports.editContact = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, societe, adresse, tel, email, secteur } = req.body;
  try {
    await Contact.findByIdAndUpdate(id, {
      nom,
      prenom,
      societe,
      adresse,
      tel,
      email,
      secteur
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('edit-item', { error: 'Erreur lors de la modification du contact' });
  }
};

exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.findByIdAndDelete(id);
    res.redirect('/contacts');
  } catch (err) {
    console.error(err);
    res.render('home', { error: 'Erreur lors de la suppression du contact' });
  }
};

exports.getContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.redirect('/contacts');
    }
    res.render('item', { contact });
  } catch (err) {
    console.error(err);
    res.redirect('/contacts');
  }
};

exports.getContactForEdit = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.redirect('/contacts');
    }
    res.render('edit-item', { contact });
  } catch (err) {
    console.error(err);
    res.redirect('/contacts');
  }
}; 