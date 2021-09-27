const express = require('express');
const CONTACT_CTRL = require('../controllers/contact_controller')
const router = express.Router();

router.get('/', CONTACT_CTRL.getContacts)
router.get('/:_id', CONTACT_CTRL.getContactById)
router.get('/user/:owner', CONTACT_CTRL.getContactsByUserId)
router.post('/', CONTACT_CTRL.createContact)
router.patch('/:_id', CONTACT_CTRL.updateContact)
router.delete('/:_id', CONTACT_CTRL.deleteContact)

module.exports = router;