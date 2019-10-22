const router = require('express').Router();
const registerController = require('../controllers/register.controller');

//getall posts from mongodb
router.post('/save', registerController.save);
module.exports = router;