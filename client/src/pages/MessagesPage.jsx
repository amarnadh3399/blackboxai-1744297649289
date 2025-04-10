import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const MessagesPage = () => {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const endpoint = userId 
          ? `/api/messages/thread/${userId}` 
          : '/api/messages';
        const res = await axios.get(endpoint);
        setMessages(res.data.messages);
      } catch (err) {
        setError('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post('/api/messages', {
        receiver: userId,
        content: newMessage
      });
      setMessages([...messages, res.data.message]);
      setNewMessage('');
    } catch (err) {
      setError('Failed to send message');
    }
  };

  if (loading) return <div className="text-center p-8">Loading messages...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {userId ? 'Message Thread' : 'My Messages'}
      </h1>

      <div className="border rounded-lg p-4 mb-6 h-96 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 p-8">
            {userId ? 'No messages in this thread' : 'No messages yet'}
          </p>
        ) : (
          messages.map(message => (
            <div 
              key={message._id} 
              className={`mb-4 p-3 rounded-lg max-w-xs ${message.sender._id === user._id 
                ? 'bg-blue-100 ml-auto' 
                : 'bg-gray-100'}`}
            >
              <div className="font-medium">
                {message.sender._id === user._id ? 'You' : message.sender.name}
              </div>
              <p className="text-gray-800">{message.content}</p>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>

      {userId && (
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default MessagesPage;