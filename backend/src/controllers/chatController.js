const ChatLog = require('../models/ChatLog');

// Simple keyword-based chatbot responses
const getKeywordResponse = (message) => {
  const keywords = message.toLowerCase();
  
  // Career guidance responses
  if (keywords.includes('mpc') || keywords.includes('mathematics') || keywords.includes('physics') || keywords.includes('chemistry')) {
    return "MPC (Mathematics, Physics, Chemistry) is perfect for students interested in Engineering, Technology, and Research careers. You can pursue B.Tech, prepare for JEE, NEET (for some medical courses), and various competitive exams. Would you like to know about specific colleges or study materials?";
  }
  
  if (keywords.includes('bipc') || keywords.includes('biology')) {
    return "BiPC (Biology, Physics, Chemistry) is ideal for medical and life sciences careers. You can pursue MBBS, BDS, Pharmacy, Nursing, Biotechnology, and many other healthcare careers. NEET is the primary entrance exam. Need information about medical colleges?";
  }
  
  if (keywords.includes('mec') || keywords.includes('commerce') || keywords.includes('economics')) {
    return "MEC (Mathematics, Economics, Commerce) opens doors to business, finance, and commerce careers. You can pursue CA, CS, CMA, MBA, B.Com, BBA, and various management roles. Would you like guidance on commerce entrance exams?";
  }
  
  if (keywords.includes('engineering') || keywords.includes('jee') || keywords.includes('eapcet')) {
    return "Engineering is a vast field with specializations like CSE, ECE, Mechanical, Civil, and more. Key exams include JEE Main, JEE Advanced, AP EAPCET, TS EAPCET. Top colleges include IITs, NITs, IIITs. What specific engineering branch interests you?";
  }
  
  if (keywords.includes('medical') || keywords.includes('neet') || keywords.includes('mbbs')) {
    return "Medical careers require NEET qualification. Options include MBBS, BDS, BAMS, BHMS, Nursing, Pharmacy, and Allied Health Sciences. Top colleges include AIIMS, JIPMER, and various government medical colleges. Need NEET preparation guidance?";
  }
  
  if (keywords.includes('college') || keywords.includes('admission') || keywords.includes('apply')) {
    return "I can help you find colleges based on your stream and location. We have information about top colleges, their rankings, admission processes, and fee structures. Which stream are you interested in, and what's your preferred location?";
  }
  
  if (keywords.includes('study material') || keywords.includes('books') || keywords.includes('notes')) {
    return "We provide comprehensive study materials for all streams including textbooks, reference materials, previous year papers, and model papers. Which subject or stream materials do you need?";
  }
  
  if (keywords.includes('practice test') || keywords.includes('mock test') || keywords.includes('quiz')) {
    return "Practice tests are crucial for exam preparation! We offer topic-wise MCQs, full-length mock tests, and previous year question papers for all major exams. Which exam are you preparing for?";
  }
  
  if (keywords.includes('career') || keywords.includes('job') || keywords.includes('future')) {
    return "Career planning depends on your interests and strengths. After identifying your stream, you can explore various career paths, salary expectations, and growth opportunities. What are your main interests - Science, Commerce, Arts, or Technical fields?";
  }
  
  if (keywords.includes('coaching') || keywords.includes('institute') || keywords.includes('classes')) {
    return "Good coaching can significantly help in competitive exam preparation. We can help you find nearby coaching centers for JEE, NEET, CA, and other competitive exams. What exam are you preparing for and what's your location?";
  }
  
  // Greetings and general responses
  if (keywords.includes('hello') || keywords.includes('hi') || keywords.includes('hey')) {
    return "Hello! I'm your CareerPath Explorer assistant. I can help you with career guidance, stream selection, college information, study materials, and exam preparation. What would you like to know about?";
  }
  
  if (keywords.includes('thank') || keywords.includes('thanks')) {
    return "You're welcome! I'm here to help you with all your career-related questions. Feel free to ask anything about streams, colleges, exams, or career guidance.";
  }
  
  if (keywords.includes('help') || keywords.includes('assist')) {
    return "I can help you with:\\n• Career guidance after 10th and 12th\\n• Stream selection (MPC, BiPC, MEC, etc.)\\n• College and coaching center information\\n• Study materials and practice tests\\n• Exam preparation guidance\\n• Career opportunities and salary information\\n\\nWhat specific information do you need?";
  }
  
  // Default response
  return "I'm here to help with your career-related questions! You can ask me about:\\n• Career options after 10th/12th\\n• Stream selection guidance\\n• College information and admissions\\n• Study materials and practice tests\\n• Competitive exam preparation\\n• Career opportunities and growth\\n\\nWhat would you like to know more about?";
};

// Send message to chatbot
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user?.userId;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        message: 'Message is required'
      });
    }

    // Generate response
    const botResponse = getKeywordResponse(message);

    // Save chat log
    if (userId) {
      const chatLog = new ChatLog({
        userId,
        userMessage: message,
        botResponse,
        timestamp: new Date()
      });
      
      await chatLog.save();
    }

    res.status(200).json({
      message: botResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      message: 'Sorry, I encountered an error. Please try again.',
      error: error.message
    });
  }
};

// Get chat history
const getChatHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { limit = 50, page = 1 } = req.query;

    const chats = await ChatLog.find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.status(200).json({
      message: 'Chat history retrieved successfully',
      chats
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({
      message: 'Failed to retrieve chat history',
      error: error.message
    });
  }
};

module.exports = {
  sendMessage,
  getChatHistory
};