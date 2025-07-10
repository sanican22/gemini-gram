import React from 'react';
import { Message } from '../types';
import { useAuth } from '../hooks/useAuth';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { user: currentUser } = useAuth();
  const isSentByCurrentUser = message.senderId === currentUser?.id;

  const bubbleClasses = isSentByCurrentUser
    ? 'bg-accent text-white self-end rounded-tr-lg'
    : 'bg-surface-2 text-primary self-start rounded-tl-lg';

  return (
    <div className={`flex ${isSentByCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${bubbleClasses}`}>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;