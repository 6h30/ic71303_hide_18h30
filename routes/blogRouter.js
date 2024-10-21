//routes/blogRouter.js
'use strict';

const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Route để lấy bài viết theo ID
// router.get('/posts/:id', blogController.showArticle);

router.get('/posts', blogController.getPosts);
router.post('/posts', blogController.createPost);

router.get('/posts/:documentId', blogController.getPostById);
router.put('/posts/:documentId', blogController.updatePost);
router.delete('/posts/:documentId', blogController.deletePost);

module.exports = router;