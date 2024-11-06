//routes/blogRouter.js
'use strict';

const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Route để lấy bài viết theo ID
// router.get('/posts/:id', blogController.showArticle);

router.get('/posts', blogController.getPosts);
router.post('/posts', blogController.createPost);

router.get('/post/:documentId', blogController.getPostById);
router.put('/post/:documentId', blogController.updatePost);
router.delete('/post/:documentId', blogController.deletePost);

module.exports = router;