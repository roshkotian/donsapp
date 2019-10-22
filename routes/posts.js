const router = require('express').Router();
let Post = require('../models/posts.model');
const postController = require('../controllers/posts.controller');

//getall posts from mongodb
router.get('/', postController.getallposts);
router.post('/save', postController.save);
module.exports = router;