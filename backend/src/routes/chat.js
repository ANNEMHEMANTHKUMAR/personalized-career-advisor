const express = require('express');
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Chat routes - public access for demo, can be protected if needed
router.post('/', authMiddleware, chatController.sendMessage);
router.get('/history', authMiddleware, chatController.getChatHistory);

module.exports = router;