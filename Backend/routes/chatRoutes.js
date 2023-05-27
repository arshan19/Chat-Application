const express = require('express');
const chatController = require('../controllers/chatController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/chats', authenticateToken, chatController.getChats);
router.post('/chats', authenticateToken, chatController.addChat);

module.exports = router;