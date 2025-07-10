import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/Input';
import ChatMessage from '../components/ChatMessage';
import BotTypingIndicator from '../components/BotTypingIndicator';
import { User } from '../types';

const ChatPage: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const convoIdNum = Number(conversationId);
  const { conversations, sendMessage, getUserById, isBotTyping } = useApp();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find(c => c.id === convoIdNum);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages, isBotTyping[convoIdNum]]);

  if (!conversation || !currentUser) {
    return (
      <div className="text-center p-10">
        <h2 className="font-bold">Sohbet bulunamadı.</h2>
        <Link to="/messages" className="text-accent hover:underline">Mesajlara geri dön</Link>
      </div>
    );
  }

  const otherParticipantId = conversation.participantIds.find(id => id !== currentUser.id);
  const otherParticipant = otherParticipantId ? getUserById(otherParticipantId) : null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(conversation.id, newMessage);
      setNewMessage('');
    }
  };
  
  const botIsTyping = otherParticipant?.isBot && isBotTyping[convoIdNum];

  return (
    <div className="max-w-2xl mx-auto h-screen flex flex-col">
      <header className="flex items-center p-3 border-b border-surface-2 sticky top-0 bg-background z-10">
        <button onClick={() => navigate(-1)} className="mr-3">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        {otherParticipant && (
          <Link to={`/profile/${otherParticipant.username}`} className="flex items-center gap-3">
            <img src={otherParticipant.avatar} alt={otherParticipant.username} className="w-8 h-8 rounded-full" />
            <h1 className="text-lg font-bold">{otherParticipant.username}</h1>
          </Link>
        )}
      </header>

      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {conversation.messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {botIsTyping && <BotTypingIndicator botUser={otherParticipant as User} />}
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-3 border-t border-surface-2 sticky bottom-0 bg-background">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Mesaj..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow"
            autoComplete="off"
          />
          <button type="submit" className="text-accent font-bold px-3 py-2 disabled:text-secondary" disabled={!newMessage.trim()}>
             Gönder
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatPage;