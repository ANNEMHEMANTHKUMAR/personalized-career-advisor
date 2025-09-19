const Stream = require('../models/Stream');

// Get all streams
const getAllStreams = async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = { isActive: true };
    if (category) {
      query.category = category;
    }

    const streams = await Stream.find(query).sort({ title: 1 });

    res.status(200).json({
      message: 'Streams retrieved successfully',
      streams
    });
  } catch (error) {
    console.error('Get streams error:', error);
    res.status(500).json({
      message: 'Failed to retrieve streams',
      error: error.message
    });
  }
};

// Get stream by ID
const getStreamById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const stream = await Stream.findOne({ 
      $or: [{ _id: id }, { id: id }],
      isActive: true 
    });

    if (!stream) {
      return res.status(404).json({
        message: 'Stream not found'
      });
    }

    res.status(200).json({
      message: 'Stream retrieved successfully',
      stream
    });
  } catch (error) {
    console.error('Get stream error:', error);
    res.status(500).json({
      message: 'Failed to retrieve stream',
      error: error.message
    });
  }
};

// Create new stream (Admin only)
const createStream = async (req, res) => {
  try {
    const streamData = req.body;
    
    const stream = new Stream(streamData);
    await stream.save();

    res.status(201).json({
      message: 'Stream created successfully',
      stream
    });
  } catch (error) {
    console.error('Create stream error:', error);
    res.status(500).json({
      message: 'Failed to create stream',
      error: error.message
    });
  }
};

// Update stream (Admin only)
const updateStream = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const stream = await Stream.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!stream) {
      return res.status(404).json({
        message: 'Stream not found'
      });
    }

    res.status(200).json({
      message: 'Stream updated successfully',
      stream
    });
  } catch (error) {
    console.error('Update stream error:', error);
    res.status(500).json({
      message: 'Failed to update stream',
      error: error.message
    });
  }
};

// Delete stream (Admin only)
const deleteStream = async (req, res) => {
  try {
    const { id } = req.params;

    const stream = await Stream.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!stream) {
      return res.status(404).json({
        message: 'Stream not found'
      });
    }

    res.status(200).json({
      message: 'Stream deleted successfully'
    });
  } catch (error) {
    console.error('Delete stream error:', error);
    res.status(500).json({
      message: 'Failed to delete stream',
      error: error.message
    });
    }
};

module.exports = {
  getAllStreams,
  getStreamById,
  createStream,
  updateStream,
  deleteStream
};