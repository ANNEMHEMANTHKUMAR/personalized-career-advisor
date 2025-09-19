const express = require('express');
const streamController = require('../controllers/streamController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();

// Public routes
router.get('/', streamController.getAllStreams);
router.get('/:id', streamController.getStreamById);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, streamController.createStream);
router.put('/:id', authMiddleware, adminMiddleware, streamController.updateStream);
router.delete('/:id', authMiddleware, adminMiddleware, streamController.deleteStream);

module.exports = router;