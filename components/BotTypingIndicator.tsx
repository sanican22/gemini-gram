import React from 'react';
import { User } from '../types';

interface BotTypingIndicatorProps {
  botUser: User;
}

const BotTypingIndicator: React.FC<BotTypingIndicatorProps> = ({ botUser }) => {
  return (
    <div className="flex items-center space-x-2">
      <img src={botUser.avatar} alt={botUser.username} className="w-8 h-8 rounded-full" />
      <div className="flex items-center space-x-1 bg-surface-2 px-4 py-2 rounded-2xl rounded-tl-lg">
        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default BotTypingIndicator;
