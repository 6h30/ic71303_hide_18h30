//routes/projectRouter.js
'use strict';

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Route để lấy bài viết theo ID
router.get('/projects', projectController.getProjects);
router.post('/projects', projectController.createProject);

router.get('/project/:projectId', projectController.getProjectById);
router.put('/project/:projectId', projectController.updateProject);
router.delete('/project/:projectId', projectController.deleteProject);

module.exports = router;