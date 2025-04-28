const express = require('express');
const router = express.Router();
const {getAllStories, getStoryById, createStory, authenticateUser, createUser, getStoriesByUser } = require('../controller/SpillTeaController')
const { authenticateRequest }  = require('../middlewares/authMiddleware');


// GET 
router.get('/stories', authenticateRequest, getAllStories);
router.get('/get-story/:id', authenticateRequest, getStoryById );
router.get('/get-user-stories', authenticateRequest, getStoriesByUser)
//POST
router.post('/add-story', authenticateRequest, createStory);
router.post('/polygon/user-auth', authenticateRequest, authenticateUser);
router.post('/create-user', authenticateRequest, createUser);

module.exports = router;