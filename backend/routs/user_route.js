const express = require('express');
const USER_CTRL = require('../controllers/user_controller')
const router = express.Router();

router.get('/', USER_CTRL.getUsers)
router.post('/login', USER_CTRL.login)
router.get('/:user_id', USER_CTRL.findUserByName)

module.exports = router;