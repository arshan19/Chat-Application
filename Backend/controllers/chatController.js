const Chat = require('../models/chatModel');
const broadcastMessage = require('../socket/socketLogic');

const getChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: 'asc' }).populate('userId', 'username');
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addChat = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    const chat = new Chat({
      message,
      userId,
    });
    await chat.save();

    // Send the chat message to all connected WebSocket clients
    broadcastMessage(chat);

    res.json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getChats,
  addChat,
};
