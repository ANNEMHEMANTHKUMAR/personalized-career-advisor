const express = require('express');
const Stream = require('../models/Stream');
const router = express.Router();

// Get all streams
router.get('/', async (req, res) => {
  try {
    const streams = await Stream.find();
    res.status(200).json(streams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching streams', error });
  }
});

// Get a single stream by its ID
router.get('/:id', async (req, res) => {
  try {
    const stream = await Stream.findOne({ id: req.params.id });
    if (!stream) {
      return res.status(404).json({ message: 'Stream not found' });
    }
    res.status(200).json(stream);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stream', error });
  }
});

module.exports = router;