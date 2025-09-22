const mongoose = require('mongoose');
const fs = require('fs');
const Stream = require('./src/models/Stream'); // Adjust this path if needed

// Replace with your MongoDB connection string
const MONGODB_URI = 'mongodb://localhost:27017/careerpath-explorer';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    // Load your JSON data file
    const rawData = fs.readFileSync('./intermediate-streams.json'); // Adjust this path
    const streamsData = JSON.parse(rawData);

    await Stream.deleteMany({});
    console.log('Existing streams cleared.');

    await Stream.insertMany(streamsData);
    console.log('Database seeded successfully! 🎉');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

seedDatabase();