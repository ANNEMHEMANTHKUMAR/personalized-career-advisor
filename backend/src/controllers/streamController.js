// src/controllers/streamController.js
const Stream = require('../models/Stream'); // Make sure this path is correct

const getIntermediateStreams = async (req, res) => {
    try {
        // Find all documents where the category is 'intermediate'
        const streams = await Stream.find({ category: 'intermediate' });
        
        res.status(200).json({
            message: 'Intermediate streams retrieved successfully',
            streams
        });
    } catch (error) {
        console.error('Error fetching intermediate streams:', error);
        res.status(500).json({
            message: 'Failed to retrieve streams',
            error: error.message
        });
    }
};

module.exports = {
    // ... other exports
    getIntermediateStreams
};