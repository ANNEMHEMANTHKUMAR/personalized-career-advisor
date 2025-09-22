// src/models/Stream.js or src/routes/streams.js
const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['after-10th', 'after-12th'],
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  subjects: [{
    name: String,
    description: String,
    code: String
  }],
  roadmap: [String],
  careers: [{
    title: String,
    description: String,
    salary: String,
    demand: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium'
    }
  }],
  examinations: [{
    name: String,
    description: String,
    eligibility: String,
    applicationProcess: String
  }],
  topColleges: [{
    name: String,
    location: String,
    rank: Number,
    type: {
      type: String,
      enum: ['Government', 'Private', 'Autonomous']
    },
    website: String
  }],
  coachingCenters: [{
    name: String,
    location: String,
    specialization: String,
    contact: String
  }],
  requirements: {
    minimumMarks: String,
    eligibilityCriteria: [String],
    documents: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  _id: false
});

module.exports = mongoose.model('Stream', streamSchema);