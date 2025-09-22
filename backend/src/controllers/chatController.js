const ChatLog = require('../models/ChatLog');
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// IMPORTANT: Never expose your API key in client-side code.
// Store it in a .env file and access it like this.
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY){
    throw new Error("missing OPENROUTER_API_KEY IN .env file");
}

// Use a free or low-cost model from OpenRouter
// You can browse available models at https://openrouter.ai/models
// Some free models might have rate limits or performance differences.
const OPENROUTER_MODEL = "mistralai/mistral-7b-instruct:free"; // A good free option

const getAIResponse = async (messages) => {
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions', {
                model: OPENROUTER_MODEL,
                messages: messages,
            }, {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    // Optional: Add your site details for rankings on OpenRouter
                    'HTTP-Referer': 'https://your-career-platform.com', 
                    'X-Title': 'Career Advisor Platform',
                },
            }
        );

        // Extract the AI's response message
        const botResponse = response.data.choices[0].message.content;
        return botResponse;

    } catch (error) {
        console.error('Error fetching response from OpenRouter:', error.response ? error.response.data : error.message);
        throw new Error('Sorry, I encountered an error. Please try again later.');
    }
};

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user?.userId;
        
        if (!message || message.trim().length === 0) {
            return res.status(400).json({
                message: 'Message is required'
            });
        }

        // To provide context, you should fetch the user's chat history.
        // This is crucial for a meaningful conversation with the AI.
        const chatHistory = await ChatLog.find({ userId })
                                        .sort({ timestamp: 1 })
                                        .limit(50); // Get recent 50 messages

        // Map the chat history to the format required by the API
        const formattedMessages = chatHistory.map(chat => ({
            role: 'user',
            content: chat.userMessage,
        })).concat(chatHistory.map(chat => ({
            role: 'assistant',
            content: chat.botResponse,
        })));

        // Add the current user message
        formattedMessages.push({ role: 'user', content: message });
        
        // Add a system prompt to guide the AI's behavior
        const systemPrompt = {
            role: 'system',
            content: 'You are an expert career advisor. Your purpose is to provide helpful, concise, and accurate career guidance to students. Focus on subjects like MPC, BiPC, MEC, and entrance exams like JEE, NEET, and EAPCET. Advise on career paths, college selection, study materials, and preparation strategies. Be empathetic and encouraging.',
        };
        
        // Combine system prompt, history, and current message
        const messagesToSend = [systemPrompt, ...formattedMessages];
        
        // Generate response using OpenRouter API
        const botResponse = await getAIResponse(messagesToSend);

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

const getChatHistory = async (req, res) => {
    // This function remains the same, as it just retrieves data.
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