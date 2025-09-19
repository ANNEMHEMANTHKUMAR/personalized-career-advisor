const mongoose = require('mongoose');

const chatLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow anonymous chats
  },
  userMessage: {
    type: String,
    required: true
  },
  botResponse: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  sessionId: {
    type: String,
    required: false
  },
  metadata: {
    userAgent: String,
    ipAddress: String,
    responseTime: Number
  }
}, {
  timestamps: true
});

// Index for better query performance
chatLogSchema.index({ userId: 1, timestamp: -1 });
chatLogSchema.index({ sessionId: 1 });

module.exports = mongoose.model('ChatLog', chatLogSchema);