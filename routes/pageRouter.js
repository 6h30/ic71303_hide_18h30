//routes/pageRouter.js
'use strict';

const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

// Route 
router.get('/pages', pageController.getPages);

router.get('/page/:documentId', pageController.getPageById);
router.put('/page/:documentId', pageController.updatePage);
// router.delete('/pages/:documentId', pageController.deletePage);

module.exports = router;